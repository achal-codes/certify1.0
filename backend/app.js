require('dotenv').config(); // TO include .env file in the root
const mongoose = require('mongoose');

const express = require('express');
const app = express();

//Importing middlewares
const bodyParser = require('body-parser');

const cookieParser = require('cookie-parser');

const cors = require('cors');
//My Routes

const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const categoryRoutes = require("./routes/category.js");
const productRoutes = require("./routes/product.js");
const orderRoutes = require("./routes/order.js");
// Db connection
mongoose.connect(process.env.DATABASE , {  //To abstract the db link we place the link in different file called .env
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useCreateIndex: true})
    .then(()=>{
        console.log("DB CONNECTED")
    });

//Using Middleware
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//My routes

app.use("/api", authRoutes);
app.use("/api",userRoutes);
app.use("/api",categoryRoutes);
app.use("/api",productRoutes);
app.use("/api", orderRoutes);


//PORT
const port = process.env.PORT || 8000; // here PORT is referred to ENV variable so even if the port changes this is dynamically updated

//Starting a server
app.listen(port, () => {
    console.log('App is running at '+port);
});
