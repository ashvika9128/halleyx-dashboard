const express = require('express');
const router = express.Router();
const validate = require('../middleware/validate');
const orderValidator = require('../validators/orderValidator');
const { getOrders, createOrder, updateOrder, deleteOrder } = require('../controllers/orderController');

router.get('/', getOrders);
router.post('/', validate(orderValidator), createOrder);
router.put('/:id', validate(orderValidator), updateOrder);
router.delete('/:id', deleteOrder);

module.exports = router;