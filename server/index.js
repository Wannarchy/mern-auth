const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

dotenv.config();



// serveur
const app = express();

const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log(`Serveur tourne sur le port : ${PORT}`));

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: [
        "http://localhost:3000",
      ],
    credentials : true,
}));

//connection mongoDB

mongoose.connect(process.env.MDB_CONNECT,{
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if(err) return console.error(err)
    console.log("Connecter à MongoDB")
})


//import routes
const auth = require("./routers/userRouter");
const forgot_password = require("./routers/forgotRouter");
const reset = require("./routers/resetRouter");


//middlewares
app.use("/auth", auth);
app.use("/forgot-password", forgot_password);
app.use("/", reset);