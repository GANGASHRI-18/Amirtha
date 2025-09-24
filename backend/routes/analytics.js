const router = require('express').Router();
const auth = require('../middleware/auth');
const checkRole = require('../middleware/check-role');
const Report = require('../models/report.model');

// @route   GET /api/analytics/summary
// @desc    Get a summary of report analytics
// @access  Private (official)
router.get('/summary', [auth, checkRole('official')], async (req, res) => {
  try {
    const reportsByStatus = await Report.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    const reportsByCategory = await Report.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    const analytics = {
      byStatus: reportsByStatus.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      byCategory: reportsByCategory.reduce((acc, item) => {
        acc[item._id] = item.count;
        return acc;
      }, {}),
      totalReports: await Report.countDocuments(),
    };

    res.json(analytics);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;