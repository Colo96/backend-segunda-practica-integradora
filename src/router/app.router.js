const Router = require('express');
const userRoutes = require('./user/user.router');
const viewsRoutes = require('./views/views.router');

const router = Router();

router.use('/', viewsRoutes);
router.use('/users', userRoutes);

module.exports = router;