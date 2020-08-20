const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const bodyParser = require("body-parser");
const errorHandler = require("./middleware/error");

//Database
const connectDB = require("./config/db");

//load env vars
dotenv.config({ path: "./config/config.env" });

// connect to database
connectDB();

//middleware
const logger = require("./middleware/logger");

//Route files
const bootcamps = require("./routes/bootcamps");

const app = express();

app.use(logger);
// Body parser
// app.use(express.json());
app.use(express.json());

//Mount routers
app.use("/api/v1/bootcamps", bootcamps);

//error handler middleware
app.use(errorHandler);
const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `server is running in ${process.env.NODE_ENV} at port ${PORT}`.yellow.bold
  )
);

//handle unhandle rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`.red.bold);
  //close server and exit process
  server.close(() => process.exit(1));
});
