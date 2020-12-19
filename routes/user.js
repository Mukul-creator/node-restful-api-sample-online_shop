const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const checkAuth = require('../middleware/check-auth')


// const db = require("../models");
const userController = require('../controllers/user')


//******************************************************
router.post("/signup", userController.user_signup); 

router.post("/login", userController.user_login);

router.delete("/:userId", checkAuth, userController.user_delete);
//********************************************************


module.exports = router;