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
  const [valueData, setValuesData] = useState([])
  const ChangingValueData = (valueData) => {
    setValuesData((prevValueData) => ({
      ...prevValueData,
      [valueData.target.name]: valueData.target.value,
    }))
  }
  const OpenForJoinData = (e) => {
    if (e == 'DentistT') {
      document.getElementById('DentistT').disabled = false;
    } else if (e == 'OperationN') {
      document.getElementById('OperationN').disabled = false;
    } else if (e == 'TimeE') {
      document.getElementById('TimeE').disabled = false;
    } else if (e == 'FPacientT') {
      document.getElementById('FPacientT').disabled = false;
    } else if (e == 'DayY') {
      document.getElementById('DayY').disabled = false;
    }
    console.log(e)
  }

  const UpdtadeDatasConsult = () => {
    Axios.post('http://localhost:8080/UpdateConsultDatas', {
      DentistT: valueData.Dentista,
      OperationN: valueData.Operação,
      TimeE: valueData.Time,
      ClientT: valueData.Paciente,
      DayY: valueData.Dia,
      IdD: valueData.id
    }, {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {
      window.alert(`${response.data}`)
      window.location.reload()
    })
  }

  const FormUpdtadeIsVsible = (e) => {
    Axios.post('http://localhost:8080/GetConsultById', {
      idConsult: e,
    }, {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {
      console.log(response.data)
      valueData.Dentista = response.data.Dentist
      valueData.Operação = response.data.Operation
      valueData.Time = response.data.Time
      valueData.Paciente = response.data.Client
      valueData.Dia = response.data.Day
      valueData.id = response.data.id
      console.log(valueData)
    })
    setview(!visualViewport)
    if (visualViewport == false) {
      document.getElementById("FormUpdateDatasConsults").style.display = "none";
    } else if (visualViewport == true) {
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
          <p id='TitleFormUpdateDatasConsults'><Button id='CloseFormUpdateDataConsults'><FontAwesomeIcon icon={faCircleXmark} onClick={() => FormUpdtadeIsVsible()} /></Button> Altere os dados aqui:</p>
          <Form>
            <Row>
              <Col>
                <Button onClick={() => OpenForJoinData('DentistT')} id='EditJustRigthData'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Form.Label>Alterar Dentista:</Form.Label>
                <Form.Control name="Dentista" onChange={ChangingValueData} value={valueData.Dentista} disabled={true} id='DentistT' placeholder="Dentista" />
              </Col>
              <Col>
                <Button onClick={() => OpenForJoinData('OperationN')} id='EditJustRigthData'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Form.Label>Alterar Operação:</Form.Label>
                <Form.Control name="Operação" onChange={ChangingValueData} value={valueData.Operação} id='OperationN' disabled={true} placeholder="Operação" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={() => OpenForJoinData('DayY')} id='EditJustRigthData'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Form.Label>Alterar Data:</Form.Label>
                <Form.Control name="Dia" onChange={ChangingValueData} id='DayY' value={valueData.Dia} disabled={true} placeholder="Data" />
              </Col>
            </Row>
            <Row>
              <Col>
                <Button onClick={() => OpenForJoinData('TimeE')} id='EditJustRigthData'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Form.Label> Alterar Hora:</Form.Label>
                <Form.Control onChange={ChangingValueData} name="Time" id='TimeE' type='time' value={valueData.Time} disabled={true} placeholder="Hora" />
              </Col>
              <Col>
                <Button onClick={() => OpenForJoinData('FPacientT')} id='EditJustRigthData'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
                <Form.Label> Alterar Paciente:</Form.Label>
                <Form.Control onChange={ChangingValueData} name="Paciente" id='FPacientT' value={valueData.Paciente} disabled={true} placeholder="Paciente" />
              </Col>
            </Row>
            <Button onClick={() => UpdtadeDatasConsult()} id='ButtonFormUpdateDatasConsults'>Alterar Consulta</Button>
          </Form></div>
        <div className='ConsultsOnThisDay'>
          <div id='SomeConsult'> <b> Nenhuma consulta encontrada</b></div>
          {ConsultsArray.map((Consult) =>
            <div key={Consult.id} className='cssRowConsults'>
              <Button onClick={(e) => FormUpdtadeIsVsible(Consult.id)} id='EditButtonConsults'> <FontAwesomeIcon icon={faPenToSquare} /></Button>
              <div className="AllConsultsOnDay">  <div> <b><FontAwesomeIcon icon={faFeatherPointed} /> Dentista:</b> {Consult.Dentist} <b> <br /> <FontAwesomeIcon icon={faTeeth} /> Operação:</b> {Consult.Operation} <b> <br /> <FontAwesomeIcon icon={faClock} />
                Hora:</b> {Consult.Time}   <b><br /><FontAwesomeIcon icon={faUser} /> Paciente:</b> {Consult.Client} <b><br /><FontAwesomeIcon icon={faUser} /> Data: </b>{Consult.Day}</div>
              </div>
            </div>

          )}
        </div>
      </div>
    </div>
  );
}

export default CalendarComponent