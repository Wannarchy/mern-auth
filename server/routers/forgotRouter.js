const router = require("express").Router();
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const sendMail = require("../controllers/sendMail");


const {CLIENT_URL} = process.env;
router.post("/", async (req, res)=>{
   
    try{
        const {email} = req.body;

        if(!email)
        return res.status(400)
        .json({errorMessage:"S'il-vous-plaît remplissez tous les champs requis" });

        const user = await User.findOne({email}); 
        if(!user)
        return res.status(400)
        .json({errorMessage:"Aucun compte trouver associé a ce mail" });

        const token = jwt.sign(
            {
             user_id: user._id,
            },
            process.env.RESET_PASSWORD,
            {
                expiresIn:'30m'
            }
         );

      
     await user.updateOne({
        resetPasswordToken: token,
      });

      const url = `${CLIENT_URL}/reset/${token}`

      sendMail(email, url, "Réinitialisation mot de passe")
      res.json({msg: "Mot de passe envoyé, merci de bien vouloir vérifier votre boîte mail."})
    
     
        
    }catch(err){
        console.error(err)
        res.status(500).send();
      
    }
});


module.exports = router;