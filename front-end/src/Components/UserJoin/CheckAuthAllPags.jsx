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
        const takingUserId = response.data.id
        console.log(localStorage)
        localStorage.setItem('UserInformation', takingUserId)
    })
}

export default CheckAuth