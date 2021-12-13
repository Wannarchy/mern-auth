const nodemailer = require('nodemailer');



const sendEmail = (to, url, txt) => {
    const smtpTransport = nodemailer.createTransport({
          
        service:'gmail',
        auth: {
            user: `${process.env.EMAIL_ADRESSE}`,
            pass: `${process.env.EMAIL_PASSWORD}`,
        },
        tls: {
         
          rejectUnauthorized: false,
        },
    });


    const mailOptions = {
        from: 'dev.crashtest@gmail.com',
        to: to,
        subject: 'MERN-AUTH',
        html: `
        <div style="max-width: 700px; margin:auto; border: 10px solid #ddd; padding: 50px 20px; font-size: 110%;">
        <h2 style="text-align: center; text-transform: uppercase;color: teal;">Bienvenue sur MERN-AUTH.</h2>
        <p>
              Cliquez simplement sur le bouton ci-dessous pour réinitialiser ton mot de passe.
        </p>
        
        <a href=${url} style="background: crimson; text-decoration: none; color: white; padding: 10px 20px; margin: 10px 0; display: inline-block;">${txt}</a>
      
        <p>Si le bouton ne fonctionne pas pour une raison quelconque, vous pouvez également cliquer sur le lien ci-dessous:</p>
      
        <div>${url}</div>
        </div>
      `
      };
      
      
      smtpTransport.sendMail(mailOptions, function(err, response) {
      if(err){
          console.error('Une erreur es arrivé', err);
      }else{
          //console.log('resultat :',response )
         // res.status(200).json('EMAIL envoyer')
      }
      });
      
}




module.exports = sendEmail;



