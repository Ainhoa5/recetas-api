const express = require('express');
const router = express.Router();
const multer = require('multer');
const { body, validationResult } = require('express-validator');
const productsController = require('../controllers/productControllers');

// Configuración de Multer
const upload = multer({ dest: 'uploads/' });

// Middleware para transformar los campos del formulario multipart en req.body
const reformatFormData = (req, res, next) => {
  console.log('pruebas');
  console.log('req.body:', req.body);
  console.log('req.file:', req.file);
    if (req.file) {
        req.body.image = req.file.path; // Agrega la ruta del archivo si se subió una imagen
    }
    Object.keys(req.body).forEach(key => {
        req.body[key] = JSON.parse(JSON.stringify(req.body[key]));
    });
    next();
};

// Validaciones
const productValidationRules = [
    body('name').trim().isLength({ min: 1 }).withMessage('El nombre del producto es obligatorio.'),
    body('price').isFloat({ gt: 0 }).withMessage('El precio debe ser un número positivo.')
];

// Middleware de validación
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

// Rutas
router.post('/', upload.single('image'), reformatFormData, productValidationRules, validate, productsController.createProduct);

router.get('/', productsController.getProducts);
router.get('/:productId', productsController.getProductById);
router.patch('/:productId', productValidationRules, validate, productsController.updateProduct);
router.delete('/:productId', productsController.deleteProduct);

module.exports = router;
