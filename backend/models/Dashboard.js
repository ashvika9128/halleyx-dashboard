const mongoose = require('mongoose');

const widgetSchema = new mongoose.Schema(
  {
    i:      { type: String, required: true },
    type:   { type: String, required: true },
    title:  { type: String, default: 'Untitled' },
    config: { type: mongoose.Schema.Types.Mixed, default: {} },
    size:   { w: { type: Number, default: 4 }, h: { type: Number, default: 4 } },
  },
  { _id: false }
);

const dashboardSchema = new mongoose.Schema(
  {
    layouts: {
      lg: { type: mongoose.Schema.Types.Mixed, default: [] },
      md: { type: mongoose.Schema.Types.Mixed, default: [] },
      sm: { type: mongoose.Schema.Types.Mixed, default: [] },
    },
    widgets: [widgetSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('Dashboard', dashboardSchema);