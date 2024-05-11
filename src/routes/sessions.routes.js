import RouterClass from "./router.js";
import { SessionController } from "../controllers/sessions.controller.js";
import { passportCall } from "../middlewares/passportCall.js";

const { current, login, logout, recoveryPassword, register,recoveryPasswordEmail, rPassword} = new SessionController();

export default class sessionRouter extends RouterClass {
  init() {
    // Login endpoint
    this.post("/login", ["PUBLIC"], passportCall("login"), login);

    // Register endpoint
    this.post("/register", ["PUBLIC"], passportCall("register"), register);

    // Recovery-password endpoint
    this.post("/recovery-password",["PUBLIC"],recoveryPasswordEmail);

    // Logout endpoint
    this.post("/logout", ["USER", "ADMIN", "PREMIUM"], logout);
    
    this.get('/recovery-passwords/:token', ['PUBLIC'], recoveryPassword)
    this.post('/recovery-passwords/:token', ['PUBLIC'], rPassword)

    //this.get('/recovery-password', ['PUBLIC'], (req, res) => res.render('recovery-password', {user:req.user}))
    
    // Current endpoint
    this.get("/current", ["USER", "ADMIN"], passportCall("current"), current);
  }
}
