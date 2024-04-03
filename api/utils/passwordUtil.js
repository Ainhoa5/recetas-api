const bcrypt = require("bcrypt");

/**
 * Esta clase es una utilidad que proporciona métodos para el manejo de contraseñas encriptadas.
 * Utiliza el módulo `bcrypt` para encriptar y comparar contraseñas.
 */
class PasswordUtil {
  /**
   * Este método asincrónico toma una contraseña en texto plano como argumento y devuelve una versión encriptada de la misma.
   * Utiliza `bcrypt.hash` para encriptar la contraseña con 10 rondas de sal.
   *
   * @param {string} password - La contraseña en texto plano a encriptar.
   * @returns {Promise<string>} La contraseña encriptada.
   */

  static async encryptPassword(password) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  /**
   * Este método asincrónico toma una contraseña en texto plano y una contraseña encriptada como argumentos.
   * Utiliza `bcrypt.compare` para verificar si la contraseña en texto plano coincide con la contraseña encriptada.
   * Devuelve `true` si las contraseñas coinciden y `false` en caso contrario.
   *
   * @param {string} inputPassword - La contraseña en texto plano a comparar.
   * @param {string} hashedPassword - La contraseña encriptada a comparar.
   * @returns {Promise<boolean>} `true` si las contraseñas coinciden, `false` en caso contrario.
   */
  static async comparePasswords(inputPassword, hashedPassword) {
    const match = await bcrypt.compare(inputPassword, hashedPassword);
    return match;
  }
}

module.exports = PasswordUtil;
