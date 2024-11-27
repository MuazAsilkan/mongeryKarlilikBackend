const app = require("express")();
const express = require("express");
const http = require("http").createServer(app);
const cors = require('cors');
require('dotenv').config();

const orderRooter = require('./routers/orderRouter');
const authRouter = require('./routers/authRouter');



app.use(cors());
app.use(express.json());


app.use('/api/auth', authRouter);
app.use('/api/order', orderRooter);



http.listen(8000, function () {
    console.log("listening on 4000");
}) 