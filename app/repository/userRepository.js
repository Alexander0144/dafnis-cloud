class UserRepository {
  async getUserByUserName(userName) {
    throw "Unimplemented";
  }

  async getUserByEmail(email) {
    throw "Unimplemented";
  }
}

const userRepository = new UserRepository();

module.exports = userRepository;
