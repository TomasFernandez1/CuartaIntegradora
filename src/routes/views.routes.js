import RouterClass from "./router.js";
import viewController from '../controllers/views.controller.js';

const {loginView, recoveryPassView, registerView} = new viewController

export default class viewsRouter extends RouterClass {
  init() {
    // Login view
    this.get("/login", ["PUBLIC"], loginView);

    // Register view
    this.get("/register", ["PUBLIC"], registerView);

    // Recovery-password view
    this.get("/recovery-password", ["PUBLIC"], recoveryPassView);
  }
}
