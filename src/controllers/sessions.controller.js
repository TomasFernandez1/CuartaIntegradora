import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../utils/sendMail.js";
import { generateUserErrorInfo } from "../repositories/errors/info.js";
import { EErrors } from "../repositories/errors/enums.js";
import configObject from "../config/config.js";
import CustomError from "../repositories/errors/CustomError.js";
import uDto from "../dtos/user.dto.js";
import {createHash} from '../utils/createHash.js'
import { userService } from "../repositories/index.js";
import jwt from 'jsonwebtoken';
export class SessionController {
  constructor() {
    this.service = userService;
  }

  login = async (req, res) => {
    try {
      const token = generateToken(req.user, '1d');
      res.cookie("cookieToken", token, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        }).redirect('/api/products')
    } catch (error) {
      req.logger.error(error);
      res.redirect('/login');
    }
  }

  register = (req, res, next) => {
    try {
      const { first_name, last_name, email } = req.body;
      if (!first_name || !last_name || !email) {
        CustomError.createError({
          name: "User creation error",
          cause: generateUserErrorInfo({
            first_name,
            last_name,
            email,
          }),
          message: "Error trying to created user",
          code: EErrors.INVALID_TYPES_ERROR,
        });
      }
      res.redirect("/login");
    } catch (error) {
      req.logger.error(error);
      next(error);
    }
  }

  recoveryPasswordEmail = async (req, res) => {
    const {email} = req.body;
    if (!(await this.service.getUser({email}))) throw Error("This email doesnt exist");
    const token = generateToken({email}, '1h');
    sendEmail({
      service: `ECOMMERCE`,
      to: email,
      subject: "Recovery password",
      html: `
      <h1>Recovery password</h1>
      <h2>Link: http://localhost:${configObject.PORT}/api/sessions/recovery-passwords/${token}</h2>`,
    });
    res.redirect("/login");
  }

  recoveryPassword = async (req, res) => {
    try {
      const { token } = req.params;
      if(!jwt.verify(token, configObject.tokenKey)) return res.redirect('/api/sessions/recovery-password')
      res.render('recovery-password-form', {token})
    } catch (error) {
      res.redirect('/recovery-password')
    }}

  rPassword = async(req, res) => {
    try {
      const {password} = req.body
      const {token} = req.params
      const {email} = jwt.verify(token, configObject.tokenKey)
      const user = await this.service.getUser({email})
      const hashedPassword = createHash(password);

      console.log('\n',user.password, '\n', hashedPassword);

      await this.service.updateUser(user._id, {password: hashedPassword})
      res.redirect('/login')
    } catch (error) {
      res.sendServerError(error)
    }
  }
  
  logout = async (req, res) => {
    await this.service.updateUser(req.user._id, {last_connection: Date.now()})
    res.clearCookie("cookieToken");
    res.redirect("/login");
  };

  current = (req, res) => {
    const UserDto = new uDto(req.user, req.user.cart);
    delete UserDto.password;
    res.render("current", { user: UserDto });
  };

}
