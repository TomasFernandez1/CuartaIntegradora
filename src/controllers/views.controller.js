export default class viewController{
    constructor(){}

    loginView = (req, res) => {
        res.render("login");
    }

    recoveryPassView = (req, res) => {
        res.render("recovery-password");
    }

    registerView = (req, res) => {
        res.render("register");
    }
}