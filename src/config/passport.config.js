import passport from "passport";
import local from "passport-local";
import { Strategy, ExtractJwt } from "passport-jwt";
import {userService} from '../repositories/index.js';
import {createHash} from '../utils/createHash.js'
import {isValidPassword} from '../utils/isValidPassword.js'
import config from './config.js'
import cartDao from '../daos/Mongo/cart.dao.js';

const cartService = new cartDao()

const LocalStrategy = local.Strategy;
const JWTStrategy = Strategy;
const ExtractJWT = ExtractJwt;

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) token = req.cookies["cookieToken"];

  return token;
};

export const initializePassport = () => {
  // Current - jwt Strategy
  passport.use(
    "current",
    new JWTStrategy(
      {
        jwtFromRequest: ExtractJWT.fromExtractors([cookieExtractor]),
        secretOrKey: config.tokenKey,
      },
      async (jwtPayload, done) => {
        try {
          return done(null, jwtPayload);
        } catch (error) {
          return done(error);
        }
      }
    )
  );

  // Register Strategy
  passport.use(
    "register",
    new LocalStrategy(
      {
        usernameField: "email",
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        const { first_name, last_name, age, role } = req.body;
        try {
          const existingUser = await userService.getUser({ email });
          if (existingUser) {
            return done(null, false, {
              message: "The username or the email is already registered",
            });
          }
          const hashedPassword = createHash(password);
          const newUser = {
            first_name,
            last_name,
            email,
            age,
            password: hashedPassword,
            role,
            cartId: await cartService.create(),
            documents: [],
            lastConnection: null
          }
          const createdUser = await userService.createUser(newUser);
          return done(null, createdUser);
        } catch (error) {
          console.log(error)
          return done(error);
        }
      }
    )
  );

  // Login Strategy
  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const user = await userService.getUser({ email: username });
          if (!user) {
            console.log("USER NOT FOUND");
            return done(null, false);
          }
          if (!isValidPassword(password, user.password))
            return done(null, false);
          await userService.updateUser(user._id, {last_connection: Date.now()})
          delete user.documents;
          return done(null, user);
        } catch (error) {
          return done(error);
        }
      }
    )
  );


  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await userService.getUserBy(id);
    done(null, user);
  });
};