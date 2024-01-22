/**
 * 
 */

import { body } from 'express-validator';

export const validationSchema = {
  login: [
    body("email")
      .notEmpty()
      .withMessage("Email required")
      .isEmail()
      .withMessage("Email must be valid"),

    body("password")
      .notEmpty()
      .withMessage("Password required")
      .isString()
      .isLength({ min: 6, max: 200 })
      .withMessage("Password is 6-20 character"),
  ],

  register: [
    body("name.givenName")
      .isString()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("name is min 3 character"),

    body("name.familyName")
      .isString()
      .notEmpty()
      .withMessage("name is required")
      .isLength({ min: 3, max: 20 })
      .withMessage("surname is min 3 character"),

    body("email.value")
      .isEmail()
      .withMessage("email must be valid")
      .notEmpty()
      .withMessage("email required"),

    body("token")
      .isString()
      .notEmpty()
      .withMessage("Password required")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password is 6-20 character"),
  ],

  updateUser: [
    body("name.givenName")
      .optional()
      .isString()
      .isLength({ min: 2, max: 20 })
      .withMessage("name must be required"),

    body("name.familyName")
      .optional()
      .isString()
      .isLength({ min: 2, max: 20 })
      .withMessage("surname must be required"),

    body("email.value").optional().isEmail().withMessage("email required"),

    body("token").isString().optional().withMessage("Password required"),
  ],

  changePassword: [
    body("password")
      .isString()
      .notEmpty()
      .isLength({ min: 6, max: 20 })
      .withMessage("Password required"),
  ],
};