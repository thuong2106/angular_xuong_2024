import express from 'express';
import { createProduct, deleteProduct, getAll, getById, getProductByCateId, updateProduct } from '../controllers/product.controller.js';

const router = express.Router()

router.get('/:id', getById)
router.get('', getAll)
router.post('', createProduct)
router.put('/:id', updateProduct)
router.delete('/:id', deleteProduct)
router.get('/category/:id', getProductByCateId)

export default router;