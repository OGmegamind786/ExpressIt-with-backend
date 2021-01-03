const mongoose = require("mongoose");

const ExpressoSchema = mongoose.Schema({
  title: {
    type: String,
  },
  category: {
    type: String,
  },
  mainBlog: {
    type: String,
  },
  createdBy: {
    type: String,
  },
  image: {
    type: String,
  },
  image_mime_type: {
    type: String,
  },
});

const Expresso = mongoose.model("Expresso", ExpressoSchema);
module.exports = Expresso;
