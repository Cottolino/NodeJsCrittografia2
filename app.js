const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const cookieParser = require('cookie-parser');

const app = express();
app.use(cookieParser());

app.get("/login", (req,res)=> {
    const payload = { id: 1, isLogged: true };
    const options = { expiresIn: "100s" };
    const cookieSetting = {
        expires: new Date(Date.now() + 100000),
        httpOnly: true,
        secure: false
    };
    const token = jwt.sign(payload, process.env.JWT_KEY, options);
    res.cookie("token", token, cookieSetting).send();
})

app.get("/user/profile", (req,res)=> {
    const token = req.cookies.token;
    // var payload;
    if(!token) return res.status(401).send("Nessun Token fornito");
    try{
        var payload = jwt.verify(token, process.env.JWT_KEY);
    } catch(err){   
        return res.status(401).send("Il token non è valido oppure è scaduto..");
    }
    
    console.log(payload);
    res.send("Il token è valido");
});

app.listen(3000 , ()=> console.log("Server In Ascolto sulla porta 3000"));

