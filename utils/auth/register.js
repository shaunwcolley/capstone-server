const bcrypt = require('bcrypt');

let { env: SALT_ROUNDS } = process;
SALT_ROUNDS = parseInt(SALT_ROUNDS, 10);

const register = (username, pass, db) => {
  const password = bcrypt.hashSync(pass, SALT_ROUNDS);
  return db.User.create({
    username,
    password,
  });
};

module.exports = register;
