const Order = require('../models/Order');

const getOrders = async (req, res, next) => {
  try {
    const { dateRange } = req.query;
    let filter = {};
    if (dateRange && dateRange !== 'all') {
      const now = new Date();
      const startDate = new Date();
      if (dateRange === 'today') startDate.setHours(0, 0, 0, 0);
      else if (dateRange === 'last7')  startDate.setDate(now.getDate() - 7);
      else if (dateRange === 'last30') startDate.setDate(now.getDate() - 30);
      else if (dateRange === 'last90') startDate.setDate(now.getDate() - 90);
      filter.createdAt = { $gte: startDate };
    }
    const orders = await Order.find(filter).sort({ createdAt: -1 });
    res.json({ success: true, data: orders, count: orders.length });
  } catch (error) { next(error); }
};

const createOrder = async (req, res, next) => {
  try {
    const data = req.validatedData;
    data.totalAmount = data.quantity * data.unitPrice;
    const order = await Order.create(data);
    res.status(201).json({ success: true, data: order });
  } catch (error) { next(error); }
};

const updateOrder = async (req, res, next) => {
  try {
    const data = req.validatedData;
    data.totalAmount = data.quantity * data.unitPrice;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      data,
      { new: true, runValidators: true }
    );
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, data: order });
  } catch (error) { next(error); }
};

const deleteOrder = async (req, res, next) => {
  try {
    const order = await Order.findByIdAndDelete(req.params.id);
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.json({ success: true, message: 'Order deleted successfully' });
  } catch (error) { next(error); }
};

module.exports = { getOrders, createOrder, updateOrder, deleteOrder };