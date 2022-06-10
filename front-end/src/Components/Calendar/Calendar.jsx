import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Axios from 'axios';
import { faFeatherPointed } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());
  const [ConsultsArray, onChangeConsults] = useState([])
  let ConsultsOnThisDay = []
  const ChekingConultsOnThisDay = (e) => {

    Axios.post('http://localhost:8080/SeeDayConsult', {
      Day: e,
    }, {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {
      console.log(response.data)
      onChangeConsults(response.data)
    })
  }
  return (
    <div>
      <Calendar onClickDay={(target) => ChekingConultsOnThisDay(target)} onChange={onChange} value={value} />
      <div className="ReciveDays">
        <h3>Consultas encontradas no dia selecionado:</h3>
        <div>
          {ConsultsArray.map((Consult) =>
            <div key={Consult.id}>
              {Consult.Dentist}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent