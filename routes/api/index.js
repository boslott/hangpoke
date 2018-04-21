const router = require('express').Router();
const userRoutes = require('./userRoutes');
const authRoutes = require('./authRoutes');
const dataRoutes = require('./dataRoutes');

// User Routes
router.use('/user', userRoutes);

// Auth routes
router.use('/auth', authRoutes);

// Data routes
router.use('/data', dataRoutes);

// Chore routes
// router.use('/chore', choreRoutes);

// .get(articleController.findAll)
// .post(articleController.create);

// Matches with "/api/books/:id"
// router
// .route("/:id")
// .get(articleController.findById)
// .delete(articleController.remove);

module.exports = router;
