const { body } = require("express-validator");

const signupValidator = () => {
    return [
        body('firstName')
            .trim()
            .notEmpty()
            .withMessage("firstName must not be empty"),
        body('lastName')
            .trim()
            .notEmpty()
            .withMessage("lastName must not be empty"),
        body('email')
            .trim()
            .notEmpty()
            .withMessage("email must not be empty")
            .isEmail()
            .withMessage("email is invalid"),
        body('password')
            .trim()
            .isLength({ min: 8 })
            .withMessage("password must have atleast 8 characters"),
    ];
};

const loginValidator = () => {
    return [
        body('email').trim().notEmpty().isEmail(),
        body('password').trim(),
    ];
};

module.exports = {
    signupValidator,
    loginValidator,
};
