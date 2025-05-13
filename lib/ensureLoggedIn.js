/**
 * Ensure that a user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that a user is logged in.  If a request is received
 * that is unauthenticated, the request will be redirected to a login page (by
 * default to `/login`).
 *
 * Additionally, `returnTo` will be be set in the session to the URL of the
 * current request.  After authentication, this value can be used to redirect
 * the user to the page that was originally requested.
 *
 * Options:
 *   - `redirectTo`   URL to redirect to for login, defaults to _/login_
 *   - `setReturnTo`  set redirectTo in session, defaults to _true_
 *
 * Examples:
 *
 *     app.get('/profile',
 *       ensureLoggedIn(),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn('/signin'),
 *       function(req, res) { ... });
 *
 *     app.get('/profile',
 *       ensureLoggedIn({ redirectTo: '/session/new', setReturnTo: false }),
 *       function(req, res) { ... });
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
export default function ensureLoggedIn(options) {
  const redirectTo = '/login';
  const setReturnTo = true;

  return (req, res, next) => {
    if (!req.isAuthenticated || !req.isAuthenticated()) {
      if (setReturnTo && req.session) {
        req.session.returnTo = req.originalUrl || req.url;
        console.log(`return to: ${req.session.returnTo}`);
      }
      return res.redirect(303, redirectTo);
    }

    const user = req.user;
    const hostname = req.hostname.replace(/^www\./, '').toLowerCase(); // e.g. oak.abcsalestracking.com
    const subdomain = hostname.split('.')[0]; // e.g. 'oak'

    // Normalize user.company to lowercase for comparison
    const allowedSubdomains = (Array.isArray(user.company) ? user.company : []).map(s => s.toLowerCase());

    if (!allowedSubdomains.includes(subdomain)) {
      console.warn(`Access denied for ${user.username} to subdomain ${subdomain}`);
      return res.redirect('/');
    }

    next();
  };
}




