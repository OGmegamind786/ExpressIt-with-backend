const express = require("express");
const bodyParser = require("body-parser");
const userRouter = require("./routers/userRouter");
const commonRouter = require("./routers/commonRouter");
var cors = require("cors");

const port = process.env.PORT;
require("./db/db");

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(userRouter);
app.use(commonRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
