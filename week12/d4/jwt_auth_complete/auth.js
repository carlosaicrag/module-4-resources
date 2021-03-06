const jwt = require('jsonwebtoken');
const secret = 'dhu48a82374537ugs';
const expiresIn = 604800;

function generateUserToken(user) {
  // create the desired payload for token
  const payload = {
    id: user.id,
    email: user.email,
    username: user.username,
  };

  // create and return the token

  const token = jwt.sign({ data: payload }, secret, { expiresIn });
  return token;
}

function requireAuth(req, res, next) {
  // destructure token from the the request object
  // express-bearer-token middleware will put it there by parsing the token out of the incoming request
  const { token } = req;
  // if no token, create an unauthorized error and forward to error handlers
  if (!token) {
    const err = new Error('Unauthorized');
    err.status = 401;
    return next(err);
  }
  // attempt to verify the token (jwt.verify)
  jwt.verify(token, secret, async (err, jwtPayload) => {
    if (err) {
      err.status = 401;
      return next(err);
    }

    res.locals.user = jwtPayload.data;
    next();
  });
}

module.exports = { requireAuth, generateUserToken };
