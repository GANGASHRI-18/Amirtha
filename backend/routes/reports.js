const router = require('express').Router();
const auth = require('../middleware/auth');
let Report = require('../models/report.model');
let Department = require('../models/department.model'); // Import Department model
// const multer = require('multer');

// // Multer config for file uploads
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });
// const upload = multer({ storage: storage });


// @route   POST /api/reports
// @desc    Create a new report
// @access  Private
router.post(
  '/',
  auth,
  // upload.single('image'), // Middleware for image upload
  async (req, res) => {
    try {
      const { title, description, latitude, longitude } = req.body;
      let { category } = req.body;
      const { suggestCategory } = require('../helpers/ai-helper');

      // Basic validation
      if (!title || !description || !latitude || !longitude) {
        return res.status(400).json({ msg: 'Please enter all required fields' });
      }

      // If no category is provided, suggest one
      if (!category) {
        category = suggestCategory(description);
      }

      const newReport = new Report({
        title,
        description,
        category,
        location: {
          type: 'Point',
          coordinates: [parseFloat(longitude), parseFloat(latitude)]
        },
        user: req.user.id,
        // imageUrl: req.file ? req.file.path : null
      });

      const report = await newReport.save();

      // Auto-routing logic
      const department = await Department.findOne({ categories: report.category });
      if (department) {
        report.department = department._id;
        await report.save();
        console.log(`Report ${report._id} automatically assigned to department ${department.name}`);
      } else {
        console.log(`No department found for category: ${report.category}`);
      }

      res.status(201).json(report);

    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   GET /api/reports/my-reports
// @desc    Get all reports for the current user
// @access  Private
router.get('/my-reports', auth, async (req, res) => {
  try {
    const reports = await Report.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

const checkRole = require('../middleware/check-role');

// @route   GET /api/reports
// @desc    Get all reports (for officials)
// @access  Private (official)
router.get('/', [auth, checkRole('official')], async (req, res) => {
  try {
    const reports = await Report.find().populate('user', ['username', 'email']).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   PUT /api/reports/:id
// @desc    Update a report's status (for officials)
// @access  Private (official)
router.put('/:id', [auth, checkRole('official')], async (req, res) => {
  try {
    const { status } = req.body;
    const report = await Report.findById(req.params.id);

    if (!report) {
      return res.status(404).json({ msg: 'Report not found' });
    }

    report.status = status;
    await report.save();

    // Send notification to the user
    const { notifyOnStatusChange } = require('../helpers/notification-service');
    notifyOnStatusChange(report);

    res.json(report);

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;