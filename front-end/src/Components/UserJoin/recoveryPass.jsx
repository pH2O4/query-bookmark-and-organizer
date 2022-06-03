import { React, useState } from "react";
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
       document.getElementById("ButtonRecoveryPass").style.display = 'block';
     };
   
     const RecoveringPass = () => {
       Axios.post( 'http://localhost:8080/Recovery',{
        headers: {
          Authorization: localStorage.getItem('authorization')
        },
        Email: valuesRecoveryPass.Email,
           Pass: valuesRecoveryPass.Pass,
           PassRepeat: valuesRecoveryPass.PassRepeat
       } ).then((response) => {
         if(response.data === "Passwords don't check"){
          window.alert(`${response.data}`)
         }else{
        window.alert(`${response.data}`)
         window.location.href ='http://localhost:3000/'
         }
 
       })
     }
     const CheckPass = () => {
      if (valuesRecoveryPass.Pass === valuesRecoveryPass.PassRepeat) {
        RecoveringPass()
     }else{
      console.log(valuesRecoveryPass.Pass, valuesRecoveryPass.PassRepeat)
        document.getElementById("FirtPassInput").style.display = 'block';
        document.getElementById("ButtonRecoveryPass").style.display = 'none';
     }}

           return (
               <div className="LoginPage">
                   <div  id="RecoveryPage"  className="form">
   
                       <h3>Seja Bem Vindo A Equipe Passos!</h3>
   
                       <div className="form-group">
                           <label>Email</label>
                           <input type="Email" onChange={ChangingValueRecoveryPass } name="Email" className="form-control" placeholder="Enter email" />
                       </div>
   
                       <div className="form-group">
                           <label>Password</label>
                           <input type='password' onChange={ChangingValueRecoveryPass} name="Pass" className="form-control" placeholder="Enter New password" />
                            <h3 id="FirtPassInput"> The Password do not check</h3>
                       </div>
                       <div className="form-group">
                           <label> Repeat Password</label>
                           <input type='password' onChange={ChangingValueRecoveryPass} name="PassRepeat" className="form-control" placeholder="Repeat New password" />
                       </div>
   
                       <button id="ButtonRecoveryPass" onClick={() => CheckPass()} className="btn btn-dark btn-lg btn-block">Sign in</button>
                   </div>
               </div>
           )
       
   }
   export default RecoveryPassPage