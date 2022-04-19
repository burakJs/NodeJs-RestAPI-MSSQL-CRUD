import { Router } from 'express';
import {
  getProducts,
  createProducts,
  getProductById,
  deleteProductById,
  updateProductById,
} from '../controller/products.controller.js';

const router = Router();

router.get('/products', getProducts);
router.post('/products', createProducts);
router.get('/product/:id', getProductById);
router.delete('/product/:id', deleteProductById);
router.put('/product/:id', updateProductById);

export default router;
