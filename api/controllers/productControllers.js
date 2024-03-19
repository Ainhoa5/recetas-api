const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configura un directorio temporal para archivos subidos
const cloudinary = require('../../config/cloudinaryConfig');
const ProductModel = require('../models/productModel');

const getProducts = async (req, res, next) => {
    try {
        const results = await ProductModel.findAll();
        res.json(results);
    } catch (error) {
        next(error);
    }
};

const getProductById = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const product = await ProductModel.findById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ message: 'Producto no encontrado' });
        }
    } catch (error) {
        next(error);
    }
};

// Asumiendo que tienes un endpoint que usa este middleware de Multer para manejar la subida de archivos
exports.uploadProductImage = upload.single('image');

const createProduct = async (req, res, next) => {
    try {
        // Subir imagen a Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path);

        // Recoger otros datos del producto
        const { name, price } = req.body;
        const imageUrl = result.secure_url; // URL de la imagen subida

        // Crear producto con la URL de la imagen
        const createdProduct = await ProductModel.create({ name, price, imageUrl });
        
        res.status(201).json({ message: 'Producto creado', createdProduct });
    } catch (error) {
        next(error);
    }
};

const updateProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        const { name, price } = req.body;
        await ProductModel.update(productId, { name, price });
        res.status(200).json({ message: 'Producto actualizado', updatedProduct: { id: productId, name, price } });
    } catch (error) {
        next(error);
    }
};

const deleteProduct = async (req, res, next) => {
    try {
        const { productId } = req.params;
        await ProductModel.delete(productId);
        res.status(200).json({ message: 'Producto eliminado', productId });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct
};
