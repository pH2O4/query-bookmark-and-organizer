import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Axios from 'axios';
function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());

  const ChekingConultsOnThisDay = (e) => {
    console.log(e)
   Axios.post('http://localhost:8080/SeeDayConsult', {
    Day: e,
  }, {
    headers: {
      Authorization: localStorage.getItem('authorization')
    }
  }).then((response) => {
         console.log(response.data)
      })
  } 
  return (
    <div>
      <Calendar  onClickDay={(target) => ChekingConultsOnThisDay( target)} onChange={onChange} value={value} />
    </div>
  );
}

export default CalendarComponent