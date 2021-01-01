const mongoose = require("mongoose");
const validator = require("validator");

const ContactFormSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    validate: (value) => {
      if (!validator.isEmail(value)) {
        throw new Error({ error: "Invalid Email address" });
      }
    },
  },
  message: {
    type: String,
    required: true,
  },
});

const ContactForm = mongoose.model("ContactForm", ContactFormSchema);
module.exports = ContactForm;
