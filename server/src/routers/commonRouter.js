const express = require("express");
const router = express.Router();
const ContactForm = require("../models/ContactForm");

router.get("/", (req, res) => {
  res.send("Landing Page");
});

router.post("/contactForm", async (req, res) => {
  //create contact form

  try {
    const contactForm = new ContactForm(req.body);
    await contactForm.save();

    res.status(201).send(contactForm);
  } catch (error) {
    res.status(400).send(error);
  }
});
module.exports = router;
