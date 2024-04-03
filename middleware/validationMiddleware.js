// validation.js
const { body, validationResult } = require('express-validator');

const userValidationRules = () => {
  return [
    // Reglas comunes para registro y login
    body('nombre').trim().isLength({ min: 1 }).withMessage('El nombre es obligatorio.'),
    body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres para el registro.'),
    // Puedes ajustar la validación de la contraseña para el login si es necesario
  ];
};

const recipeValidationRules = () => {
  return [
    body('nombre').trim().isLength({ min: 1 }).withMessage('El nombre de la receta es obligatorio.'),
    body('ingredientes').trim().isLength({ min: 1 }).withMessage('Los ingredientes son obligatorios.'),
    body('alergenos').optional().isArray().withMessage('Los alérgenos deben ser un array.')
  ];
};

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  userValidationRules,
  recipeValidationRules,
  validate,
};
