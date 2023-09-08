/**
 * Ensure that no user is logged in before proceeding to next route middleware.
 *
 * This middleware ensures that no user is logged in.  If a request is received
 * that is authenticated, the request will be redirected to another page (by
 * default to `/`).
 *
 * Options:
 *   - `redirectTo`   URL to redirect to in logged in, defaults to _/_
 *
 * Examples:
 *
 *     app.get('/login',
 *       ensureLoggedOut(),
 *       function(req, res) { ... });
 *
 *     app.get('/login',
 *       ensureLoggedOut('/home'),
 *       function(req, res) { ... });
 *
 *     app.get('/login',
 *       ensureLoggedOut({ redirectTo: '/home' }),
 *       function(req, res) { ... });
 *
 * @param {Object} options
 * @return {Function}
 * @api public
 */
export default function ensureLoggedOut(options = {}) {
  let url;
  if (typeof options === 'string') {
    url = options;
  } else {
    url = options.redirectTo || '/';
  }

  return (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
      return res.redirect(url);
    }
    next();
  };
}
