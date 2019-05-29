const bcrypt = require('bcrypt');

const db = require('../../models');

let { env: SALT_ROUNDS } = process;
SALT_ROUNDS = parseInt(SALT_ROUNDS, 10);

const users = [
  {
    username: 'ShaunC',
    password: bcrypt.hashSync(process.env.S_PASS, SALT_ROUNDS),
  },
  {
    username: 'TimG',
    password: bcrypt.hashSync(process.env.T_PASS, SALT_ROUNDS),
  },
  {
    username: 'GregP',
    password: bcrypt.hashSync(process.env.G_PASS, SALT_ROUNDS),
  },
  {
    username: 'Poetic',
    password: bcrypt.hashSync(process.env.P_PASS, SALT_ROUNDS),
  },
];

const seedUsers = () => {
  db.User.bulkCreate(users, { returning: true }).then(() => console.log('Users Created.')).catch(error => console.log(error));
};

module.exports = seedUsers;
