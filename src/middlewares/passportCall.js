import passport from "passport";

export const passportCall = (strategy) => {
  return async (req, res, next) => {
    passport.authenticate(strategy, function (err, user, info) {
      if (err) return next(err);
      if(info){
        res.sendServerError(info)
      }
      //if (!user) return res.status(401).render("error", { error: info });
      req.user = user;
      next();
    })(req, res, next);
  };
};