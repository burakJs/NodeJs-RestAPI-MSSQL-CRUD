import { getConnection, sql, ProductQueries } from '../database/index.js';

const pool = await getConnection();

export const getProducts = async (req, res) => {
  try {
    const result = await pool.request().query(ProductQueries.getAllProducts);
    res.json({ data: result.recordset, isSuccess: true });
  } catch (error) {
    res.status(500);
    res.json({ error: error.message, isSuccess: false });
  }
};

export const createProducts = async (req, res) => {
  const { product_name, product_price } = req.body;

  if (product_name == null || product_price == null) {
    return res.status(400).json('Bad Request : Please fill all fields');
  }

  try {
    await pool
      .request()
      .input('product_name', sql.VarChar, product_name)
      .input('product_price', sql.Money, product_price)
      .query(ProductQueries.createProduct);
    return res.json({ data: { product_name, product_price }, isSuccess: true });
  } catch (error) {
    return res.json({ error: error.message, isSuccess: false });
  }
};

export const getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool
      .request()
      .input('product_id', sql.Int, id)
      .query(ProductQueries.getProduct);
    if (result['rowsAffected'][0] == 0) {
      throw { message: 'Data is not found' };
    }
    res.json({ data: result.recordset[0], isSuccess: true });
  } catch (error) {
    res.json({ data: error.message, isSuccess: false });
  }
};

export const deleteProductById = async (req, res) => {
  const { id } = req.params;
  try {
    await pool
      .request()
      .input('product_id', sql.Int, id)
      .query(ProductQueries.deleteProduct);
    if (result['rowsAffected'][0] == 0) {
      throw { message: 'Data is not found' };
    }
    res.json({ isSuccess: true });
  } catch (error) {
    res.json({ data: error.message, isSuccess: false });
  }
};

export const updateProductById = async (req, res) => {
  const { product_name, product_price } = req.body;
  const { id } = req.params;

  if (id == null || product_name == null || product_price == null) {
    return res.status(400).json('Bad Request : Please fill all fields');
  }

  try {
    const result = await pool
      .request()
      .input('product_name', sql.VarChar, product_name)
      .input('product_price', sql.Money, product_price)
      .input('product_id', sql.Money, id)
      .query(ProductQueries.updateProduct);
    if (result['rowsAffected'][0] == 0) {
      throw { message: 'Data is not found' };
    }
    return res.json({ data: { product_name, product_price }, isSuccess: true });
  } catch (error) {
    return res.json({ error: error.message, isSuccess: false });
  }
};
