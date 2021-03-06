import React from "react";
import Axios from 'axios'

function CheckAuth () {

    Axios.get('http://localhost:8080/AuthStatus', {
        headers: {
          Authorization: localStorage.getItem('authorization')
        }
      })
    .then((response) => {
        if(response.data === 'MissToken'){
       window.location.href ='http://localhost:3000/Error'
     console.log(response.data)
        }
        response.data.Pass = ''
        const takingUserName = response.data.Name
        const takingFunction = response.data.Function 
        const takingUserID = response.data.id
        const takingAdminOrNot = response.data.Admin
        const takingSituasionPassowrd = response.data.IsHeSheNeedTradePass
        console.log(localStorage)
        localStorage.setItem('Admin',  takingAdminOrNot)
        localStorage.setItem('Function', takingFunction)
        localStorage.setItem('passSituation', takingSituasionPassowrd)
        localStorage.setItem('id', takingUserID)
        localStorage.setItem('UserName', takingUserName)
    })
}

export default CheckAuth