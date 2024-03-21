const bcrypt = require("bcrypt");

class PasswordUtil {
  static async encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  static async comparePasswords(inputPassword, hashedPassword) {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  }
}

module.exports = PasswordUtil;
