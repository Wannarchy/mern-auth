import React,{useContext, useState} from 'react';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import { useHistory } from 'react-router';
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";


function Register() {
    const initialState = {
      
        email : '',
        password : '',
        passwordVerify : '',
    }
    const [isSignup, setIsSignup] = useState(false);
    const [form , setForm] = useState(initialState);
    const [errorMgs, setErrorMgs] = useState('');

    const {getLoggedIn} = useContext(AuthContext);
    const history = useHistory();

    const handleChange = (e) => {
        setForm({... form, [e.target.name]: e.target.value});
        

        
    }

    async function handleSubmit(e){
        e.preventDefault();

        try {
 
            const { email, password, passwordVerify} = form;

            const URL = 'http://localhost:5000/auth';

        await axios.post(`${URL}${isSignup ? ''  : '/login'}`, {
                email, password, passwordVerify,
                
            }) .then(res => {
                history.push("/profil")
              getLoggedIn()
        })
        .catch(err => {
            if (err.response) {
           
              console.log(err.response.data.errorMessage);
              setErrorMgs(err.response.data.errorMessage);
            } else if (err.request) {
             
            } else {
            
            }
        });


          
          
          
           
        } catch (err) {
            console.log(err);
            
        }
    }
    

    const switchMode = () => {
        setIsSignup((previIsSignup) => !previIsSignup);
        setErrorMgs('');
     }
     

    return (

      <div className='container'>
        <div className="form-container">
          
            <form onSubmit={handleSubmit} className="register-form" >
            <h1 className="title-form">{isSignup ? "S'inscrire" : 'Se Connecter'}</h1>
           
            <span className="error-form">{errorMgs}</span>
          
            <input type="email" placeholder="Email"
                        onChange={handleChange}
                        name="email" />
                        
                        <input type="password" placeholder="mot de passe"
                      onChange={handleChange}
                       name="password" />
            {isSignup && (
                <>
                    <input type="password" placeholder="mot de passe confirmation"
                onChange={handleChange}
                name="passwordVerify"
             />
                </>

                  )}
                  <div className="forgot-link">
                  {isSignup ? "" :<Link to="/forgot"> Mot de passe oublié ?</Link>}
                  </div>
          
                <button type="submit" className="form-button"> {isSignup ? "S'inscrire" : " Se connecter"}</button>
              <div className="register-switch">
                {isSignup ? "Vous avez déjà un compte ? " : "Vous n'avez pas encore de compte ? "}
                            <span onClick={switchMode} className="switch-style">
                            {isSignup ? "Se Connecter" : "S'inscrire "}
                            </span>
               </div>
            </form>
        </div>
        </div>
    )
}

export default Register;
