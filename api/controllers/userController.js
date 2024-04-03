const bcrypt = require("bcrypt");
const User = require("../models/userModel");
const { use } = require("../routes/recipe");
const PasswordUtil = require("../utils/passwordUtil");
const { generateAccessToken } = require("../services/authService"); // Asumiendo que authService.js está en la carpeta services


//Registrar usuario
async function registerUser(req, res) {
  try {
    // Comprobar si ya existe un usuario con el mismo nombre
    const existingUser = await User.findOne({ nombre: req.body.nombre });
    if (existingUser) {
      return res.status(400).send("Ya existe un usuario con ese nombre");
    }

    // Si no existe, proceder a crear el nuevo usuario
    const hashedPassword = await PasswordUtil.encryptPassword(
      req.body.password
    );
    const user = new User({
      nombre: req.body.nombre,
      password: hashedPassword,
    });

    const savedUser = await user.save();
    res.json(savedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
}

async function loginUser(req, res) {
  try {
    const user = await User.findOne({ nombre: req.body.nombre });
    if (!user) {
      return res.status(400).send("Usuario no encontrado");
    }

    const passwordMatch = await PasswordUtil.comparePasswords(
      req.body.password,
      user.password
    );
    if (!passwordMatch) {
      return res.status(400).send("Contraseña incorrecta");
    } else {
      // Generación del token
      const token = generateAccessToken(user);
      res.json({ message: "Inicio de sesión exitoso", token }); // Enviar el token al cliente
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Error del servidor");
  }
}


//Obtener todos los usuarios
async function getUsers(req, res) {
  try {
    const users = await User.find().sort({ created_at: -1 });
    if (!users) {
      res.status(400).send({ msg: "No se han encontrado usuarios" });
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Obtener un usuario por id
async function getUser(req, res) {
  const idUser = req.params.idUser;

  try {
    const user = await User.findById(idUser);

    if (!user) {
      res.status(400).send({ msg: "No se ha encontrado el usuario" });
    } else {
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Actualizar usuario
async function updateUser(req, res) {
  const idUser = req.params.idUser;
  const params = req.body;

  try {
    const userUpdated = await User.findByIdAndUpdate(idUser, params);

    if (!userUpdated) {
      res.status(400).send({ msg: "No se ha podido actualizar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario actualizado" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Eliminar usuario
async function deleteUser(req, res) {
  const idUser = req.params.idUser;

  try {
    const user = await User.findByIdAndDelete(idUser);

    if (!user) {
      res.status(400).send({ msg: "No se ha podido eliminar el usuario" });
    } else {
      res.status(200).send({ msg: "Usuario eliminado" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

//Conseguir contraseña por id
async function getPasswordById(req, res) {
  try {
    const user = await User.findById(req.params.id).select("password");
    if (user) {
      res.json({ password: user.password });
    } else {
      res.status(404).json({ message: "Usuario no encontrado" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error del servidor" });
  }
}

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPasswordById,
  registerUser,
  loginUser,
};
