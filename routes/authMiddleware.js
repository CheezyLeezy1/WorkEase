//authMiddleware

function requireAuth(req, res, next) {
  if (req.session && req.session.userId) {
    // User is authenticated, continue processing the request
    next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect("/loginPage");
  }
}

module.exports = { requireAuth };
