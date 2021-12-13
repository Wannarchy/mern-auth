const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.post("/", async (req, res)=>{
   
    try{
        const {email,password, passwordVerify} = req.body;


        //validation

        if(!email || !password || !passwordVerify )
        return res.status(400)
        .json({errorMessage:"S'il-vous-plaît remplissez tous les champs requis" });

        if(password.length < 6)
        return res.status(400)
        .json({errorMessage:"veuillez entrer un mot de passe avec au moins 6 caractères" });

        if(password !== passwordVerify)
        return res.status(400)
        .json({errorMessage:"Veuillez entrer le même mot de passe" });

        const existingUser = await User.findOne({email}); 
        if(existingUser)
        return res.status(400)
        .json({errorMessage:"Un compte avec cet email existe déjà" });

        
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password, salt);

        const newUser = new User({
            email, passwordHash
        });

        const savedUser = await newUser.save();


        const token = jwt.sign(
           {
            user: savedUser._id,
           },
           process.env.JWT_SECRET
        );

        
        res
        .cookie("token", token, {
            httpOnly: true,
            
        })
        .send();
        
    }catch(err){
        console.error(err)
        res.status(500).send();
    }
});


router.post("/login", async (req, res) => {
    try {
        const {email,password} = req.body;

        if(!email || !password  )
        return res.status(400)
        .json({errorMessage:"S'il-vous-plaît remplissez tous les champs requis" });

        const existingUser = await User.findOne({email});
        if(!existingUser)
        return res.status(401)
        .json({errorMessage:"email et/ou mot de passe incorrect(s)" });

        const passwordCorrect = await bcrypt.compare(password, existingUser.passwordHash);
        if(!passwordCorrect)
        return res.status(401)
        .json({errorMessage:"email et/ou mot de passe incorrect(s)" });


        const token = jwt.sign(
            {
             user: existingUser._id,
            },
            process.env.JWT_SECRET
         );
 
         
         res
         .cookie("token", token, {
             httpOnly: true,     
         })
         .send();

       
    } catch(err){
        console.error(err)
        res.status(500).send();
    }
});

router.get("/logout", (req, res) =>{
    res.cookie("token", "",{
        httpOnly: true,
        expires: new Date(0)     
    })
    .send();
})

router.get("/loggedIn", (req, res)=>{

    try {
        const token = req.cookies.token;
        if(!token)
        return res.json(false);
 
      jwt.verify(token, process.env.JWT_SECRET);

      res.send(true)
     } catch (err) {
       
     res.json(false);
     }
});




module.exports = router;