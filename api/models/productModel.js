// api/models/productModel.js
const pool = require('../../config/database');

const findAll = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

const findById = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows.length ? rows[0] : null;
};

const create = async ({ name, price }) => {
    const [result] = await pool.query('INSERT INTO products (name, price) VALUES (?, ?)', [name, price]);
    return { id: result.insertId, name, price };
};

const update = async (id, { name, price }) => {
    await pool.query('UPDATE products SET name = ?, price = ? WHERE id = ?', [name, price, id]);
    return { id, name, price };
};

const deleteProduct = async (id) => {
    await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return id;
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    delete: deleteProduct
};
