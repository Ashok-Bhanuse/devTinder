const validator = require("validator");

const validationSignupData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;

  if (!firstName || !lastName) {
    throw new Error("Name is not valid");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Password is not strong");
  }
};

const validateProfileData = (req) => {
  const allowedFields = [
    "firstName",
    "lastName",
    "age",
    "aboutus",
    "gender",
    "skills",
  ];
  return Object.keys(req.body).every((field) => allowedFields.includes(field));
};

const validatePasswordChangeData = (req) => {
  const { newPassword, oldPassword } = req.body;

  if (newPassword === oldPassword) {
    throw new Error("Old password and new password should not be same!");
  } else if (!validator.isStrongPassword(req.body.newPassword)) {
    throw new Error("Password is not strong");
  }
};

module.exports = {
  validationSignupData,
  validateProfileData,
  validatePasswordChangeData,
};
