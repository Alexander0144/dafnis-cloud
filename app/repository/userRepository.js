const Usuario = require("../models/Usuario");

class UserRepository {
  async getUserByUserName(userName) {
    const dbUser = await Usuario.findOne({
      where: {
        username: userName,
      },
    });
    return dbUser;
  }

  async getUserByEmail(email) {
    throw "Unimplemented";
  }
}

const userRepository = new UserRepository();

module.exports = userRepository;
