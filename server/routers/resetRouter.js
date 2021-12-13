const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


router.get("/reset", async (req, res)=>{ 
  try {
    token = req.query.ResetPasswordToken;
    
 
    const user = await User.findOne({
        resetPasswordToken: token,
    });

    jwt.verify(token, process.env.RESET_PASSWORD, function(err) {
      if (err) {
        
          err = {
            name: 'TokenExpiredError',
            message: 'Le lien que vous avez suivi à expiré'
          }
          console.log(err);
          
      }

      if(!user || err)
      return res.status(400)
      .json({errorMessage:"Le lien que vous avez suivi à expiré ou est invalide" });

      if(user && !err)
      return res.status(200)
      .json({message:"GOOD" });
      

    });

   

      
  }catch(err) {
    console.error(err)
    res.status(500).send();
    
  }

});


router.post("/reset/:token", async (req, res)=>{ 

  try {
    token = req.params.token;
    const { newPassword, newPasswordVerify} = req.body;


    const user = await User.findOne({
        resetPasswordToken: token,
    });
    

 jwt.verify(token, process.env.RESET_PASSWORD, function(err) {
  if (err) {
    
      err = {
        name: 'TokenExpiredError',
        message: 'Le lien que vous avez suivi à expiré'
      }

  }

  if(!user || err)
  return res.status(400)
  .json({errorMessage:"Le lien que vous avez suivi à expiré ou est invalide" });
  

});

    if(newPassword.length < 6)
    return res.status(400).json({errorMessage:"veuillez entrer un mot de passe avec au moins 6 caractères" });

    if(newPassword !== newPasswordVerify)
    return res.status(400)
    .json({errorMessage:"Veuillez entrer le même mot de passe" });

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(newPassword, salt);

    await user.updateOne({
      passwordHash: passwordHash,
      resetPasswordToken: '',
    });


    
      
      res.send(true);
      
  }catch(err) {
    console.error(err)
    res.status(500).send();
  }
  

});






module.exports = router;