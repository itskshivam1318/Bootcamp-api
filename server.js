const express = require("express");
const dotenv = require("dotenv");

//load enc vars
dotenv.config({ path: "./config/config.env" });

const app = express();

const PORT = process.env.PORT || 5000;

app.listen(
  PORT,
  console.log(`server is running in ${process.env.NODE_ENV} at port ${PORT}`)
);
