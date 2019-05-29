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

const token = (user, tokenCallback) => {
   jwt.sign({ userId: user.id }, process.env.JWT_SECRET, (error, token) => {
    if (token) {
      tokenCallback(token)
      // return tokenSuccess(token);
    }
    return { success: false, message: 'Unable to generate token', error, userId: null, token: null };
  });
};

const loginCompare = (password, user, loginCompareCallback) => {
  return bcrypt.compare(password, user.password, (err, response) => {
    if (err) {
      loginCompareCallback('failure')
      // token(err, user);
    }
    token(user, (token) => {
      loginCompareCallback(token)
    })
    //loginCompareCallback('success')
    // return { success: false, message: 'Invalid Password.', error: err, userId: null, token: null };
  });
};

const login = async (array, pass) => {
  if (array.length === 0) {
    return { success: false, message: 'User does not exist.', userId: null, token: null  };
  }
  return new Promise((resolve, reject) => {
    const user = array[0]
    loginCompare(pass, user, (result) => {
      if (result) {
        resolve({ token: result });
      } else {
        reject(Error('token could not be generated'));
      }
    });
  });
}

// const login = (array, pass) {
//   const user = array[0]
//   bcrypt.compare(req.body.pass, user[0].pass, function(err, response) {
//     if(response){
//       jwt.sign({ userId: user.id }, process.env.JWT_SECRET, (error, token) => {
//         message = ''
//         if(token){
//           message = {success:true, message: 'User Logged In.', token: token, userId: user[0].id}
//         } else {
//           res.status(500).json({message: 'Unable to generate token', error: error})
//         }
//       })
//     }
//     else {
//       res.json({sucess:false, message: 'Invalid Password.', err: err})
//     }
//   })
// }



module.exports = login;
