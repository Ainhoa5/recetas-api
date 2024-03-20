const bcrypt = require('bcrypt');
const User = require("../models/userModel");
const { use } = require('../routes/recipe');

//Registrar usuario
const registerUser = async (req, res) => {
    const user = new User();
    const params = req.body;
    try {
      // Encriptar la contraseña
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
      user.nombre = params.nombre;
      user.password = hashedPassword;
  
      // Guardar el nuevo usuario en la base de datos
      const savedUser = await user.save();
  
      res.json(savedUser);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Error del servidor' });
    }
  };

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
async function getPasswordById (req, res) {
  try {
    const user = await User.findById(req.params.id).select('password');
    if (user) {
      res.json({ password: user.password });
    } else {
      res.status(404).json({ message: 'Usuario no encontrado' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error del servidor' });
  }
};

module.exports = {
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getPasswordById,
  registerUser
};
