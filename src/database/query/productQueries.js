export const ProductQueries = {
  getAllProducts: 'SELECT * FROM Products',
  createProduct: 'INSERT INTO Products VALUES ( @product_name, @product_price)',
  getProduct: 'SELECT * FROM Products WHERE product_id = @product_id',
  deleteProduct: 'DELETE FROM Products WHERE product_id = @product_id',
  updateProduct:
    'UPDATE Products SET product_name = @product_name, product_price = @product_price WHERE product_id = @product_id',
};
