import { React, Component, useState } from "react";
import Axios from 'axios'
import './OperationsAndDentists.css'
import { Form, Button } from 'react-bootstrap'
import NavBarCalendar from '../Calendar/NavLinks'
import CheckAuth from "../UserJoin/CheckAuthAllPags";

class ROAD extends Component {
  constructor(props) {
    super(props);
    this.state = {

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
    const RegisterOperation = () => {
      if (this.state.Operations || this.state.Client || this.state.Date || this.state.Time || this.state.Client) {
        window.alert('Algum campo ficou faltando, por favor verfique seu formulário')
      } else {
        const DoingRegisterOperation = () => {
          Axios.post('http://localhost:8080/RegisterConsult', {
          }).then((response) => {
            if (response.data) {
              console.log(response.data)
            } else {
              window.alert('Please, chek your login informations')
            }
          })
          DoingRegisterOperation()
        }
      }
    }


    return (
      <div className="ROADForm">
        <div className="HeaderROAD">
          <NavBarCalendar />
        </div>
        <div className="ContentROAD">
          <div id="RegisterButtons">
             <Button className="ButtonInd"> <b>Cadastro de Funcionários</b> </Button>
             <Button className="ButtonInd"> <b>Cadastro de Operações</b> </Button>
          </div>
       
          <div className="FormOperations">

          </div>
          <div id="FormsForRegisters">
            <Form id="FormDentist">
              <Form.Group className="mb-3" name="Dentist">
                <Form.Label> <b>aFunção do Funcionário</b> </Form.Label>
                <Form.Control type="text" placeholder="Insira o Nome do Novo Dentista" />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="number" placeholder="Password" />
              </Form.Group>
              <Button variant="primary" >
                Submit
              </Button>
            </Form>
          </div>

        </div>
        <div className="FooterROAD">

        </div>
      </div>
    )
  }
}

export default ROAD