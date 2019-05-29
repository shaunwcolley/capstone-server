const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userCheck = async (array, pass) => {
  let loginResponse = '';
  if (array.length === 0) {
    return { success: false, message: 'User does not exist.', userId: null, token: null  };
  } else {
    const user = array[0]
     await bcrypt.compare(pass, user.password, (err, response) => {
      if (response) {
        jwt.sign({ userId: user.id }, process.env.JWT_SECRET, (error, token) => {
          if (token) {
            console.log(token)
            loginResponse = {
              success: true,
              message: 'User Logged In.',
              token,
              userId: user.id,
            };
          } else {
            loginResponse = { success: false, message: 'Unable to generate token', error, userId: null, token: null };
          }
        });
      } else {
        loginResponse = { sucess: false, message: 'Invalid Password.', error: err, userId: null, token: null };
      }
    });
  }
}

const login = async (username, pass, db) => {
  db.User.findAll({ where: { username } })
  .then(async (users) => {
      const response = await userCheck(users, pass)
      console.log(response)
      return response
    });
};

module.exports = login;
