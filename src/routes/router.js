import { Router } from "express";
import jwt from "jsonwebtoken";
import config from "../config/config.js";

export default class RouterClass {
  constructor() {
    this.router = Router();
    this.init();
  }

  getRouter = () => {
    return this.router;
  };

  init() {}

  applyCallback(callbacks) {
    return callbacks.map((callback) => async (...params) => {
      try {
        await callback.apply(this, params);
      } catch (error) {
        console.log(error);
        params[1].status(500);
      }
    });
  }

  generateCustomResponses = (req, res, next) => {
    res.sendSuccess = (payload) => res.send({ status: "success", payload });
    res.sendServerError = (error) =>
      res.status(500).send({ status: "error", error: error?.message });
    res.sendUserError = (error) =>
      res.status(400).send({ status: "error", error: error?.message });
    next();
  };

  // Policies: [ 'PUBLIC' ] [ 'USER' ] ['ADMIN' ]
  handlePolicies = (policies) => (req, res, next) => {
    if (policies[0] === "PUBLIC") return next();
    const token = req.cookies["cookieToken"];
    if (!token) return res.render("error", { error: 'Not Token'});
    const user = jwt.verify(token, config.tokenKey);
    if (!policies.includes(user.role.toUpperCase()))
      return res.render("error", { error: "NOT Authorized" });
    req.user = user;
    return next();
  };
  
  get(path, policies, ...callbacks) {
    this.router.get(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallback(callbacks)
    );
  }
  post(path, policies, ...callbacks) {
    this.router.post(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallback(callbacks)
    );
  }
  put(path, policies, ...callbacks) {
    this.router.put(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallback(callbacks)
    );
  }
  delete(path, policies, ...callbacks) {
    this.router.delete(
      path,
      this.handlePolicies(policies),
      this.generateCustomResponses,
      this.applyCallback(callbacks)
    );
  }
}
