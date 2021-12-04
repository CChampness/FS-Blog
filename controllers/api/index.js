const router = require('express').Router();

const userRoutes = require('./user-routes');

//  /api/users/<endpoint>
router.use('/users', userRoutes);

module.exports = router;
