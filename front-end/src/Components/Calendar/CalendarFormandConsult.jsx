import { React, Component, useState } from "react";
import Axios from 'axios'
import './CalendarFormandConsult.css'
import { Form } from 'react-bootstrap'
import Calendar from './Calendar'
import NavBarCalendar from './NavLinks'
import CheckAuth from "../UserJoin/CheckAuthAllPags";

class CalendarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Operations: '',
      Dentist: '',
      Date: '',
      Time: '',
      Client: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  async componentDidMount() {
    CheckAuth()
  }
  render() {
    const DoingLogin = () => {
      Axios.post('http://localhost:8080/RegisterConsult',{
          Email: valuesLogin.Email,
          Pass: valuesLogin.Pass
      } ).then((response) => {
       if(response.data){
        localStorage.setItem('authorization', response.data  )
        window.location.href ='http://localhost:3000/Home'
      console.log(response.data)
       }else{
         window.alert('Please, chek your login informations')
       }
      })
    }
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
            <div id="DaySelected">

            </div>
            <div id="FORMX">
              <Form>
                <Form.Group id="OptionDoctor" >
                  <Form.Label>Qual Será o Dentista à Realizar a Operação?</Form.Label>
                  <select  onChange={this.handleInputChange}  value={this.state.Operations} name="Operations" className="border border-primary  form-select form-select">
                    <option>Selecione o Dentista</option>
                  </select>
                </Form.Group>
                <Form.Group className="mt-2" id="OptionDoctor" >
                  <Form.Label>Qual Será o Procedimento Realizado Pelo Dentista?</Form.Label>
                  <select name="Dentist" onChange={this.handleInputChange}  value={this.state.Dentist} className="border border-primary form-select form-select">
                    <option>Selecione o Procedimento</option>
                  </select>
                </Form.Group>
                <Form.Group className="mt-2" id="ConsultDay" >
                  <Form.Label>Em Que Dia Será Realizado O Procedimento?</Form.Label>
                  <Form.Control
                     onChange={this.handleInputChange}  value={this.state.Date} 
                    className="border border-primary"
                    type="date"
                    name="Date"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mt-2" id="ConsultHour" >
                  <Form.Label>Em Que Horas Será Realizado O Procedimento?</Form.Label>
                  <Form.Control
                   onChange={this.handleInputChange}  value={this.state.Time} 
                    className="border border-primary"
                    type="time"
                    name="Time"
                    placeholder="Due date"
                  />
                </Form.Group>
                <Form.Group  className="mb-3 mt-2 " controlId="formBasicEmail">
                  <Form.Label>Qual O Nome Do Cliente a Realizar o Procedimento?</Form.Label>
                  <Form.Control  onChange={this.handleInputChange}  value={this.state.Client}  Name="Client" className="border border-primary" type="text" placeholder="Insira o Nome" />
                </Form.Group>
              </Form>

            </div>

          </div>
        </div>
        <div className="Footer">

        </div>
      </div>
    )
  }
}

export default CalendarForm