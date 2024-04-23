const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
    try {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success, error: result.array() });
        }
        success = true;
        // res.status(200).json({success, message: "Input is valid"});
        next();
        console.log("Hello")
    } catch (error) {
        console.log(error);
        return res.status(400).json({success: false, error: "Something went wrong"});
    }
}

module.exports = {validate};