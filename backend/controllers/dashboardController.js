const Dashboard = require('../models/Dashboard');

const getDashboard = async (req, res, next) => {
  try {
    let dashboard = await Dashboard.findOne();
    if (!dashboard) {
      return res.json({
        success: true,
        data: { layouts: { lg: [], md: [], sm: [] }, widgets: [] },
      });
    }
    res.json({ success: true, data: dashboard });
  } catch (error) { next(error); }
};

const saveDashboard = async (req, res, next) => {
  try {
    const { layouts, widgets } = req.validatedData;
    const dashboard = await Dashboard.findOneAndUpdate(
      {},
      { layouts, widgets },
      { upsert: true, new: true, runValidators: true }
    );
    res.json({ success: true, message: 'Dashboard saved successfully', data: dashboard });
  } catch (error) { next(error); }
};

module.exports = { getDashboard, saveDashboard };