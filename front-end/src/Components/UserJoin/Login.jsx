import { React, Component, useState } from "react";
import Axios from 'axios'
import { } from 'react-bootstrap'
import './Login.css'

const LoginPage = () => {
 const [valuesLogin, setValuesLogin] = useState();
  const ChangingValueLogin = (valueLogin) => {
    setValuesLogin((prevValueLogin) => ({
      ...prevValueLogin,
      [valueLogin.target.name]: valueLogin.target.value,
    }));
  };

  const DoingLogin = () => {
    Axios.post( 'http://localhost:8080/Login',{
        Email: valuesLogin.Email,
        Pass: valuesLogin.Pass
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
                        <input type="Email" onChange={() => ChangingValueLogin } name="Email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="Pass" onChange={() => ChangingValueLogin } name="Pass" className="form-control" placeholder="Enter password" />
                    </div>


                    <button onClick={() => DoingLogin} className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p id="forgetPass">Esqueceu sua senha? <a href="/">Recuperar</a></p>
                </form>
            </div>
        )
    
}
export default LoginPage