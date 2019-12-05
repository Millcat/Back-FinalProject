function protectUserRoute(req, res, next) {
  const isAuthorized = req.session.currentUser;
  if (isAuthorized) {
    res.locals.isUser = true;
    next();
  } else {
    res.locals.isUser = false;
    req.flash("error", "Please sign in first !");
    res.redirect("/auth/signin"); //modify
  }
}

module.exports = protectUserRoute;
