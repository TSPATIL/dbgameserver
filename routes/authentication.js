const express = require('express');
const { createUser, loginUser, getUserDetails } = require('../controllers/authenticationController');
const { validate } = require('../middlewares/validationMiddelware');
const router = express.Router();
const {body} = require('express-validator')

module.exports = router;

const validationRules = [
    body('name', 'Enter a valid name').trim().exists(),
    body('email', 'Enter a valid email address').trim().isEmail(),
    body('providerType', 'Specify provider type').exists(),
    body('firebaseUserId', 'Specify user id of firebase').exists(),
    body('creationTime', 'Specify creation time').exists()
];

router.route("/signup").post(validationRules, validate, createUser);
router.route("/login").post(loginUser);
router.route("/getuser").get(getUserDetails);