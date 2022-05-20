import { React, Component, useState } from "react";
import Axios from 'axios'
import { } from 'react-bootstrap'
import './Login.css'

const RecoveryPassPage = () => {
    const [valuesRecoveryPass, setValuesRecoveryPass] = useState();
     const ChangingValueRecoveryPass = (valueRecoveryPass) => {
       setValuesRecoveryPass((prevValueRecoveryPass) => ({
         ...prevValueRecoveryPass,
         [valueRecoveryPass.target.name]: valueRecoveryPass.target.value,
       }));
     };
   
     const RecoveringPass = () => {
       Axios.post( 'http://localhost:8080/Recovery',{
        PassRepeat: valuesRecoveryPass.PassRepeat,
           Pass: valuesRecoveryPass.Pass
       } ).then((response) => {
         console.log(response.data)
       })
     }
           return (
               <div className="LoginPage">
                   <form>
   
                       <h3>Seja Bem Vindo A Equipe Passos!</h3>
   
                       <div className="form-group">
                           <label>Email</label>
                           <input type="Pass" onChange={() => ChangingValueRecoveryPass } name="Email" className="form-control" placeholder="Enter email" />
                       </div>
   
                       <div className="form-group">
                           <label>Password</label>
                           <input type="PassRepeat" onChange={() => ChangingValueRecoveryPass } name="Pass" className="form-control" placeholder="Enter password" />
                       </div>
   
   
                       <button onClick={() => RecoveringPass()} className="btn btn-dark btn-lg btn-block">Sign in</button>
                   <p id="forgetPass">Esqueceu sua senha? <a href="/Recovery">Recuperar</a></p>
                   </form>
               </div>
           )
       
   }
   export default RecoveryPassPage