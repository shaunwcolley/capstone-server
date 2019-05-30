const jwt = require('jsonwebtoken');

function authenticate(token) {
  token = token.split(' ')[1];
  return jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (decoded) {
      if (decoded.userId) {
        const { userId } = decoded;
        return { userId };
      }
      return null;
    }
    return null;
  });
}

module.exports = authenticate;
