import React, { useState } from 'react';
import Calendar from 'react-calendar';
import Axios from 'axios';
import { faFeatherPointed, faTeeth, faClock, faUser } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());
  const [ConsultsArray, onChangeConsults] = useState([])
  //const [ExisteSomeCOnsult, onChangeExisteSomeConsults] = useState(true)
  let ConsultsOnThisDay = []
  const ChekingConultsOnThisDay = (e) => {

    Axios.post('http://localhost:8080/SeeDayConsult', {
      Day: e,
    }, {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {
      if (response.data == 'Nenhuma Consulta Econtrada nesse dia') {
        document.getElementById('SomeConsult').style.display = 'block';
        onChangeConsults([])
      } else {
        onChangeConsults(response.data)
        document.getElementById('SomeConsult').style.display = 'none';
      }

    })
  }
  return (
    <div>
      <Calendar onClickDay={(target) => ChekingConultsOnThisDay(target)} onChange={onChange} value={value} />
      <div className="ReciveDays">
        <div id='TituloRecivD'>Consultas encontradas no dia selecionado:</div>
        <div className='ConsultsOnThisDay'>
          <div id='SomeConsult'> <b> Nenhuma consulta encontrada</b></div>
          {ConsultsArray.map((Consult) =>
            <div className="AllConsultsOnDay" key={Consult.id}> <b><FontAwesomeIcon icon={faFeatherPointed} /> Dentista:</b> {Consult.Dentist} <b><FontAwesomeIcon icon={faTeeth} /> Operação:</b> {Consult.Operation} <b><FontAwesomeIcon icon={faClock} /> Hora:</b> {Consult.Time}   <b><FontAwesomeIcon icon={faUser} /> Paciente:</b> {Consult.Client}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent