import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Axios from 'axios';
function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());

  const ChekingConultsOnThisDay = () => {
   Axios.get('http://localhost:8080/SeeDayConsult', {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }}).then((response) => {
         
      })
  } 
  return (
    <div>
      <Calendar  onClickDay={ChekingConultsOnThisDay()} onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarComponent