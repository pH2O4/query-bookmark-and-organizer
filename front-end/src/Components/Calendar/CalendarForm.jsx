import { React, Component, useState} from "react";
import Axios from 'axios'
import './CalendarForm.css'
import Calendar from './Calendar'
import  NavBarCalendar from './NavLinks'

class CalendarForm extends Component{

   async componentDidMount(){

        Axios.get('http://localhost:8080/AuthStatus', {
            headers: {
              Authorization: localStorage.getItem('authorization')
            }
          })
        .then((response) => {
            if(response.data === 'MissToken'){
                document.body.style.display = 'none';
           window.location.href ='http://localhost:3000'
                window.alert('You are not authenticated')
            }
            response.data.Pass = ''
            const takingUserId = response.data.id
            console.log(localStorage)
            localStorage.setItem('UserInformation', takingUserId)
        })
   }
    render(){

        return(
            <div className="CalendarForm">
                <div className="Header">
              <NavBarCalendar/>
                
                </div>
                <div className="Content">
                <div className="Calendar">
                <Calendar id="CalendarDays"/>
                </div>
                </div>
                <div className="Footer">

                </div>
            </div>
        )
    }
}

export default CalendarForm