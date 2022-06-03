import { React, Component, useState } from "react";
import Axios from 'axios'
import './CalendarFormandConsult.css'
import { Form, Button } from 'react-bootstrap'
import Calendar from './Calendar'
import NavBarCalendar from './NavLinks'
import CheckAuth from "../UserJoin/CheckAuthAllPags";

class CalendarForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      didClick: true,
      Operations: '',
      Dentist: '',
      Date: '',
      Time: '',
      Client: '',
    };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
  }

 handleButtonClicked(){
    this.setState({
      didClick: !this.state.didClick
    });
    if(this.state.didClick == true){
      console.log(this.state.didClick)
      document.getElementById('FirtTitleCharged').style.display = 'none'
      document.getElementById('FORMX').style.display = 'block'
      document.getElementById('FirtButton').style.display = 'none'
    }else{
      console.log(this.state.didClick)
      document.getElementById('FirtTitleCharged').style.display = 'block'
      document.getElementById('FORMX').style.display = 'none'
      document.getElementById('FirtButton').style.display = 'block'
      console.log('kaskas')
    }
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
    console.log(this.state.didClick)
  }
  render() {
    const Consult = () => {
    if( this.state.Operations || this.state.Client || this.state.Date || this.state.Time || this.state.Client){
      window.alert('Algum campo ficou faltando, por favor verfique seu formulário')
    }else{ 
    const DoingConsultRequest = () => {
      Axios.post('http://localhost:8080/RegisterConsult',{
        headers: {
        Authorization: localStorage.getItem('authorization')
      },
        Operations: this.state.Operations,
        Dentist:this.state.Dentist,
        Date: this.state.Date,
        Time: this.state.Time,
        Client: this.state.Client,
      } ).then((response) => {
       if(response.data){
       window.alert(response.data)
       }else{
         window.alert('Please, chek your login informations')
       }
      })
      DoingConsultRequest()
    }}}
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
            <div >
              <div  id="FirtDivCharged">
               <h1 id="FirtTitleCharged"> Clique Em Alguma Data Para Ver Detalhes Sobre As Consultas Nesse Dia! </h1>
              <Button id="FirtButton" className="primary" onClick={this.handleButtonClicked}>Marcar Uma Consulta</Button>

              </div>
              <Form id="FORMX">
                <Form.Group id="OptionDoctor" >
                  <Form.Label> <b> Qual Será o Dentista à Realizar a Operação?</b></Form.Label>
                  <select  onChange={this.handleInputChange}  value={this.state.Operations} name="Operations" className="border border-primary  form-select form-select">
                    <option>Selecione o Dentista</option>
                  </select>
                </Form.Group>
                <Form.Group className="mt-2" id="OptionDoctor" >
                  <Form.Label> <b>Qual Será o Procedimento Realizado Pelo Dentista?</b> </Form.Label>
                  <select name="Dentist" onChange={this.handleInputChange}  value={this.state.Dentist} className="border border-primary form-select form-select">
                    <option>  Selecione o Procedimento</option>
                  </select>
                </Form.Group>
                <Form.Group className="mt-2" id="ConsultDay" >
                  <Form.Label> <b> Em Que Dia Será Realizado O Procedimento?</b></Form.Label>
                  <Form.Control
                     onChange={this.handleInputChange}  value={this.state.Date} 
                    className="border border-primary"
                    type="date"
                    name="Date"
                    placeholder=""
                  />
                </Form.Group>
                <Form.Group className="mt-2" id="ConsultHour" >
                  <Form.Label> <b>Em Que Horas Será Realizado O Procedimento?</b> </Form.Label>
                  <Form.Control
                   onChange={this.handleInputChange}  value={this.state.Time} 
                    className="border border-primary"
                    type="time"
                    name="Time"
                    placeholder="Due date"
                  />
                </Form.Group>
                <Form.Group  className="mb-3 mt-2 " controlId="formBasicEmail">
                  <Form.Label> <b>Qual O Nome Do Cliente a Realizar o Procedimento?</b> </Form.Label>
                  <Form.Control  onChange={this.handleInputChange}  value={this.state.Client}  name="Client" className="border border-primary" type="text" placeholder="Insira o Nome" />
                </Form.Group>
                <Button id="BackButton" onClick={this.handleButtonClicked}  className="primary"> <b> Voltar</b></Button>
                <Button onClick={() => Consult()} className="primary"> <b>Confirmar Marcação da Consulta!</b> </Button>
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