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

module.exports = {
  validationSignupData,
  validateProfileData,
};
