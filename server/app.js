const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const app = express();
const PORT = process.env.PORT || 5000;
// ======================================dotenv ==================================
dotenv.config({ path: "./config.env" });
require("./db/conn");
// const User = require("./models/userschema");

//====================================== express middleware (link router file) ==============================
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/routes.js"));
// ==================================== variable use =====================================
// STEP 2 OF HOSTING
const port = process.env.PORT;
// STEP 3 OF HOSTING
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
