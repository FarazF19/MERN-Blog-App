const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const authRouter = require("./routes/authRouter.js")
dotenv.config();

mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log("Database connected!");

    }).catch((err) => {
        console.log(err);

    })

const app = express();

//middlewares
app.use(express.json());
//routes
app.use("/api/auth", authRouter)

app.listen(3000, () => {
    console.log("Server started at port 3000 ");

})