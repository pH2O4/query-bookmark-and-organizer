import { React, useState } from "react";
import Axios from 'axios'
import { } from 'react-bootstrap'
import './Login.css'
import CheckAuth from '../UserJoin/CheckAuthAllPags'


const LoginPage = () => {
 const [valuesLogin, setValuesLogin] = useState();
  const ChangingValueLogin = (valueLogin) => {
    setValuesLogin((prevValueLogin) => ({
      ...prevValueLogin,
      [valueLogin.target.name]: valueLogin.target.value,
    }))
  }

  const DoingLogin = async () => {
    Axios.post('http://localhost:8080/Login',{
        Email: valuesLogin.Email,
        Pass: valuesLogin.Pass
    } ).then((response) => {
     if(response.data){
      console.log(response.data)
      localStorage.setItem('authorization', response.data  )
      window.location.href ='http://localhost:3000/Home'
     }else{
       window.alert('Please, chek your login informations')
     }
    })
  }
        return (
            <div className="LoginPage">
                <div className="form" >

                    <h3>Seja Bem Vindo A Equipe Passos!</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="Email" onChange={ ChangingValueLogin} name="Email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={ChangingValueLogin} name="Pass" className="form-control" placeholder="Enter password" />
                    </div>


                    <button onClick={() => DoingLogin()} className=" btn-dark btn-lg btn-block">Sign in</button>
                </div>
            </div>
        )
    
}
export default LoginPage