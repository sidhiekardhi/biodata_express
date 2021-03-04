const express= require('express');
const { createRegister } = require('../controller/auth');

const router = express.Router();

//create-> post
router.post('/register', createRegister);

// router.get('/biodata', getBiodata);


module.exports = router;