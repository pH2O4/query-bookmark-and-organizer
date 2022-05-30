import { React, Component, useState } from "react";
import Axios from 'axios'
import './CalendarForm.css'
import { Form } from 'react-bootstrap'
import Calendar from './Calendar'
import NavBarCalendar from './NavLinks'
import CheckAuth from "../UserJoin/CheckAuthAllPags";

class CalendarForm extends Component {

  async componentDidMount() {
    CheckAuth()
  }
  render() {

    return (
      <div className="CalendarForm">
        <div className="Header">
          <NavBarCalendar />

        </div>
        <div className="Content">
          <div className="Calendar">
            <Calendar id="CalendarDays" />
          </div>
          <div className="FormPOST">
            <Form>
              <Form.Group id="OptionDoctor" >
                <Form.Label>Qual Será o Dentista à Realizar a Operação?</Form.Label>
                <select name="Operations" className="border border-primary  form-select form-select">
                  <option>Selecione o Dentista</option>
                </select>
              </Form.Group>
              <Form.Group className="mt-2" id="OptionDoctor" >
                <Form.Label>Qual Será o Procedimento Realizado Pelo Dentista?</Form.Label>
                <select name="Operations" className="border border-primary form-select form-select">
                  <option>Selecione o Procedimento</option>
                </select>
              </Form.Group>
              <Form.Group className="mt-2" id="ConsultDay" >
              <Form.Label>Em Que Dia Será Realizado O Procedimento?</Form.Label>
              <Form.Control
               className="border border-primary"
                type="date"
                name="duedate"
                placeholder="Due date"
              />
              </Form.Group>
              <Form.Group className="mt-2" id="ConsultHour" >
              <Form.Label>Em Que Horas Será Realizado O Procedimento?</Form.Label>
              <Form.Control
              className="border border-primary"
                type="time"
                name="duedate"
                placeholder="Due date"
              />
              </Form.Group>
            </Form>
          </div>
        </div>
        <div className="Footer">

        </div>
      </div>
    )
  }
}

export default CalendarForm