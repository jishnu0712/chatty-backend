const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/is-auth');

// /chat/
router.get('/', isAuth, (req, res, next) => {
    res.json({message: 'Hello from private route!'});
})


module.exports = router;