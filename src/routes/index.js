const { Router } = require('express');
const authRoutes = require('./auth.route');
const imageRouter = require('./image.route');

const router = Router();

router.use('/auth', authRoutes);
router.use('/images', imageRouter);

module.exports = router;
