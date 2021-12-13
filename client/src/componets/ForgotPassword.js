import React,{ useState} from 'react';
import axios from 'axios';
import { useHistory } from 'react-router';

function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [errorMgs, setErrorMgs] = useState('');
    const [send, setSend] = useState(false);

    const history = useHistory();

    const redirection = ()=>{
        history.push("/")
    }

console.log(email)
    async function handleSubmitForgot(e){
        e.preventDefault();

        try {
            const forgotFormData = {
                email,
            }
            const URL = 'http://localhost:5000/forgot-password';

            await axios.post(`${URL}`, forgotFormData, {
        
                
            }) .then(res => {
                console.log(res)
                if(res){
                    setSend(true);
                    setErrorMgs(res.data.msg+' Vous allez être redirigé automatiquement.');
                    setTimeout(redirection,5000);
                }
        })
        .catch(err => {
            if (err.response) {
              // client received an error response (5xx, 4xx)
              setSend(false);
              console.log(err.response.data.errorMessage);
              setErrorMgs(err.response.data.errorMessage);
            } else if (err.request) {
              // client never received a response, or request never left
            } else {
              // anything else
            }
        });
        
            
        } catch (error) {
            
        }
    }

    if(send === false){
        return (
            <div className='container'>
            <div className="form-container">
             <form onSubmit={handleSubmitForgot} className="register-form">
                 
             <h2 className="title-form">Mot de passe oublié ?</h2>
             
             <span className="error-form">{errorMgs}</span>
             <input type="email" placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                />
    
            <button type="submit" className="forgot-form-button"> Envoyer</button>
             </form>
            </div>
            </div>
        )

    }else{

        return (
            <div className='container'>
            <div className="send-container">
             
             <span className="no-error">{errorMgs}</span>
           
            </div>
            </div>
        )
    }
    
    
}

export default ForgotPassword;
