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

       
        return (
            <div className="LoginPage">
                <form>

                    <h3>Seja Bem Vindo A Equipe Passos!</h3>

                    <div className="form-group">
                        <label>Email</label>
                        <input type="email" onChange={() => ChangingValueLogin } name="Email" className="form-control" placeholder="Enter email" />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" onChange={() => ChangingValueLogin } name="Pass" className="form-control" placeholder="Enter password" />
                    </div>


                    <button type="submit" className="btn btn-dark btn-lg btn-block">Sign in</button>
                <p id="forgetPass">Esqueceu sua senha? <a href="">Recuperar</a></p>
                </form>
            </div>
        )
    
}
export default LoginPage