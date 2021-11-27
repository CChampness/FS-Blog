const withAuth = (req, res, next) => {
  // If the user is not logged in, redirect the user to the login page
  // This is directly from the `/blog/:id` and `/user/:id` routes
  if (!req.session.loggedIn) {
    res.redirect('/login');
  } else {
    // If the user is logged in, execute the route function that will allow them to view the blog
    // We call next() if the user is authenticated
    next();
  }
};

module.exports = withAuth;
