const { body, validationResult } = require('express-validator');

const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path,
        message: err.msg
      }))
    });
  }
  next();
};

const validateRegister = [
  body('username')
    .trim()
    .notEmpty().withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters')
    .isAlphanumeric().withMessage('Username must contain only letters and numbers'),

  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required')
    .isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),

  handleValidationErrors
];

const validateLogin = [
  body('email')
    .trim()
    .notEmpty().withMessage('Email is required')
    .isEmail().withMessage('Please provide a valid email'),

  body('password')
    .notEmpty().withMessage('Password is required'),

  handleValidationErrors
];

const validateSubmit = [
  body('answers')
    .notEmpty().withMessage('Answers are required')
    .isArray().withMessage('Answers must be an array'),

  body('answers.*.question_id')
    .notEmpty().withMessage('Each answer must have a question_id')
    .isInt().withMessage('question_id must be a number'),

  body('answers.*.selected_answer')
    .notEmpty().withMessage('Each answer must have a selected_answer')
    .isIn(['a', 'b', 'c', 'd']).withMessage('Answer must be a, b, c, or d'),

  handleValidationErrors
];

module.exports = { validateRegister, validateLogin, validateSubmit };