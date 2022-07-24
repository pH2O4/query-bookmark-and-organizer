import React, { useState } from 'react';
import Calendar from 'react-calendar';
import { Form, Col, Row, FormLabel, Button } from 'react-bootstrap'
import Axios from 'axios';
import { faFeatherPointed, faTeeth, faClock, faUser, faPenToSquare, faCircleXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function CalendarComponent(props) {
  const [value, onChange] = useState(new Date());
  const [ConsultsArray, onChangeConsults] = useState([])
  const [visualViewport, setview] = useState(false)
  const [FormDates, setFormDates] = useState([])

  const FormUpdtadeIsVsible = (e) => {
    Axios.post('http://localhost:8080/GetConsultById', {
      idConsult: e,
    }, {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {console.log(response.data) })
    setview(!visualViewport)
    if(visualViewport == false){
      document.getElementById("FormUpdateDatasConsults").style.display = "none";
    }else if(visualViewport == true){
      document.getElementById("FormUpdateDatasConsults").style.display = "block";
    }
  }

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
        <div id='FormUpdateDatasConsults'>
          <p id='TitleFormUpdateDatasConsults'><Button id='CloseFormUpdateDataConsults'><FontAwesomeIcon icon={faCircleXmark } onClick={() =>  FormUpdtadeIsVsible()}/></Button> Altere os dados aqui:</p>
          <Form>
            <Row>
              <Col>
                <Form.Label>Alterar Dentista:</Form.Label>
                <Form.Control placeholder="Dentista" />
              </Col>
              <Col>
                <Form.Label>Alterar Operação:</Form.Label>
                <Form.Control placeholder="Operação" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Label> Alterar Hora:</Form.Label>
                <Form.Control placeholder="Hora" />
              </Col>
              <Col>
                <Form.Label> Alterar Paciente:</Form.Label>
                <Form.Control placeholder="Paciente" />
              </Col>
            </Row>
            <Button id='ButtonFormUpdateDatasConsults'>Alterar Consulta</Button>
          </Form></div>
        <div className='ConsultsOnThisDay'>
          <div id='SomeConsult'> <b> Nenhuma consulta encontrada</b></div>
          {ConsultsArray.map((Consult) =>
            <div  key={Consult.id} className='cssRowConsults'>
              <Button onClick={(e) =>  FormUpdtadeIsVsible(Consult.id)} id='EditButtonConsults'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
              <div className="AllConsultsOnDay">  <div> <b><FontAwesomeIcon icon={faFeatherPointed} /> Dentista:</b> {Consult.Dentist} <b> <br /> <FontAwesomeIcon icon={faTeeth} /> Operação:</b> {Consult.Operation} <b> <br /> <FontAwesomeIcon icon={faClock} /> Hora:</b> {Consult.Time}   <b><br /><FontAwesomeIcon icon={faUser} /> Paciente:</b> {Consult.Client}</div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent