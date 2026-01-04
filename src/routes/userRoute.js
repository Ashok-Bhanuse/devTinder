const useExpress = require("express");
const router = useExpress.Router();

const { validationSignupData } = require("../utils/validation");
const User = require("../models/users");
const bcrypt = require("bcrypt");
