import RouterClass from "./router.js";

export default class viewsRouter extends RouterClass {
  init() {
    // Login view
    this.get("/login", ["PUBLIC"], async (req, res) => {
      res.render("login");
    });

    // Register view
    this.get("/register", ["PUBLIC"], async (req, res) => {
      res.render("register");
    });

    // Recovery-password view
    this.get("/recovery-password", ["PUBLIC"], async (req, res) => {
      res.render("recovery-password");
    });
  }
}
