const express = require("express");



const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");


const errorMiddleware = require("./middleware/error");
const dotenv =require("dotenv");
const cors = require("cors");


//config
//dotenv.config({path:"/config/config.env"});
const allowedOrigins = ['https://aquamarine-melba-ef5820.netlify.app', 'http://localhost:3000', 'https://origin3.com'];

const app= express();
app.use(cors({
    origin: allowedOrigins, // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent
  }));
app.use(express.json());


app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());

//route
// Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);


//middle ware
app.use(errorMiddleware);

module.exports=app;
