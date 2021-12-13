import React,{ useState, useEffect} from 'react';
import axios from 'axios';
import { useHistory, useParams } from 'react-router';

function ResetPassword() {

    const initialState = {
      
       
       newPassword : '',
       newPasswordVerify : '',
    }
    const {token} = useParams();


    const [form , setForm] = useState(initialState);
    const [errorMgs, setErrorMgs] = useState('');
    const [isValide, setIsValide] = useState()
    const [send, setSend] = useState(false)

    const history = useHistory();
    const redirection = ()=>{
        history.push("/")
    }

    const handleChange = (e) => {
        setForm({... form, [e.target.name]: e.target.value});
        console.log(form);

        
    }

  

    const tokenValid = async () =>{
        await  axios.get("http://localhost:5000/reset",{ params : {ResetPasswordToken: token},
      }).then(
             (response) => {
                
                 console.log(response);
                 setIsValide(true);
                
             },
             (error) => {
                 setIsValide(false)
                 console.log(error.response);
                 setErrorMgs(error.response.data.errorMessage);
                
             }
         );
     }
     console.log(isValide);

     
     async function handleSubmitReset(e){
        e.preventDefault();

        try {
 
            const {  newPassword,  newPasswordVerify} = form;

            const URL = 'http://localhost:5000/reset/';

            await  axios.post(`${URL}${token}`, {
                newPassword,  newPasswordVerify,
                
            }).then(
               (response) => {
                  
                   console.log(response);
                 setSend(response.data)
                  
               },
               (error) => {
                  
                   console.log(error.response);
                   setErrorMgs(error.response.data.errorMessage);
                  
               }
           );
  
        } catch (err) {
            console.log(err);
            
        }
    }
 

    useEffect(() => {
       
        tokenValid();
    }, []);




    if(isValide){

        if(send){
            setTimeout(redirection,4000);
            return (
                <div className='container'>
                <div className="send-container">
                 
                 <span className="no-error">Votre mot de passe a été changé, Vous allez être redirigé automatiquement.</span>
               
                </div>
                </div>
            )
        }else{
            return (
                <div className='container'>
  
                <div className="form-container">
                       
                        <form onSubmit={handleSubmitReset} className="register-form" >
                        <h1 className="title-form">Nouveau mot de passe</h1>
                       
                        <span className="error-form">{errorMgs}</span>
                      
                                    
                                    <input type="password" placeholder=" nouveau mot de passe"
                                  onChange={handleChange}
                                   name="newPassword" />
                        
                                <input type="password" placeholder=" nouveau mot de passe confirmation"
                            onChange={handleChange}
                            name="newPasswordVerify"
                         />
              
                            <button type="submit" className="form-button"> Confirmer</button>
                         
                        </form>
                    
                        
                    </div>
                    </div>
                )
        }
       
    }else {
        return(
            <div className='container'>
            <div className='container-error-msg'>
                <p className='error-msg-style'>{errorMgs}</p>
            </div>
            </div>
        )
    }
   
}

export default ResetPassword;
