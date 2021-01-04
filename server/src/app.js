require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/userRouter");
const commonRouter = require("./routers/commonRouter");
const path = require("path");
var cors = require("cors");

const port = process.env.PORT;
require("./db/db");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(commonRouter);

app.use(express.static("ExpressIt/build"));

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "ExpressIt", "build", "index.html"));
});
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(__dirname);
});
