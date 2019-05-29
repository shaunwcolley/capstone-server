const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const tokenSuccess = async (token) => {
  return {
    success: true,
    message: 'User Logged In.',
    token,
    userId: user.id,
  };
}

const tokenGen = (user, tokenCallback) => {
  jwt.sign({ userId: user.id }, process.env.JWT_SECRET, (error, token) => {
    if (token) {
      tokenCallback({
        success: true,
        message: 'User Logged In.',
        token,
        userId: user.id,
      });
    } else {
      tokenCallback({
        success: false,
        message: 'Unable to generate token',
        error,
      });
    }
  });
};

const loginCompare = (password, user, loginCompareCallback) => {
  bcrypt.compare(password, user.password, (err, response) => {
    if (response) {
      tokenGen(user, (token) => {
        loginCompareCallback(token);
      });
    } else {
      loginCompareCallback({
        success: false,
        message: 'Invalid Password.',
        error: err,
      });
    }
  });
};

const login = async (array, pass) => {
  if (array.length === 0) {
    return { success: false, message: 'User does not exist.' };
  }
  return new Promise((resolve, reject) => {
    const user = array[0];
    loginCompare(pass, user, (result) => {
      if (result) {
        resolve(result);
      } else {
        reject(Error('token could not be generated'));
      }
    });
  });
};

module.exports = login;
