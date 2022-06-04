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
      didClick: '',
      Nomedaoperação: '',
      TempoOperação: '',
      FunçãodoFuncionário: '',
      Nome: '',
      Email: '',
      Celular: '',
    };
    this.handleButtonClicked = this.handleButtonClicked.bind(this)
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
  handleButtonClicked(e) {
    this.setState({
      didClick: e
    });
    if (this.state.didClick == 1) {
      console.log(e)
      document.getElementById("FormDentist").style.display = 'block'
      document.getElementById("FormOperations").style.display = 'none'
    } else if (this.state.didClick == 2) {
      console.log(e)
      document.getElementById("FormDentist").style.display = 'none'
      document.getElementById("FormOperations").style.display = 'block'
    }
  }
  async componentDidMount() {
    CheckAuth()
  }
  render() {
    const RegisterOperation = () => {
      if (this.state.Nomedaoperação == '' || this.state.TempoOperação == '') {
        window.alert('Algum campo ficou faltando, por favor verfique seu formulário')
      } else {
        const DoingRegisterOperation = () => {
          Axios.post('http://localhost:8080/RegisterOperations', {
            headers: {
              Authorization: localStorage.getItem('authorization')
            },
            Nomedaoperação: this.state.Nomedaoperação,
            TempoOperação: this.state.TempoOperação
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

    const RegisterWorker = () => {
      if (this.state.FunçãodoFuncionário == '' || this.state.Nome == ''
        || this.state.Email == '' || this.state.Celular == '') {
        window.alert('Algum campo ficou faltando, por favor verfique seu formulário')
      } else {
        const DoingRegisterWorker = () => {
          Axios.post('http://localhost:8080/RegisteroWokers', {
            FunçãodoFuncionário: this.state.FunçãodoFuncionário,
            Nome: this.state.Nome,
            Email: this.state.Email,
            Celular: this.state.Celular,
          }).then((response) => {
            if (response.data) {
              console.log(response.data)
            } else {
              window.alert('Please, chek your login informations')
            }
          })
          DoingRegisterWorker()
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
            <Button onClick={(e) => this.handleButtonClicked(1, e)} className="ButtonInd"> <b>Cadastro de Funcionários</b> </Button>
            <Button onClick={(e) => this.handleButtonClicked(2, e)} className="ButtonInd"> <b>Cadastro de Operações</b> </Button>
          </div>

          <div className="DivOperations">
            <Form id="FormOperations">
              <Form.Group className="mb-3" name="Dentist">
                <Form.Label> <b>Nome da Operação</b> </Form.Label>
                <Form.Control name="Nomedaoperação" onChange={this.handleInputChange} value={this.state.Nomedaoperação} type="text" placeholder="Insira o Nome da Nova Operação" />
              </Form.Group>
              <Form.Group className="mb-3" name="Dentist">
                <Form.Label> <b>Tempo da Operação Em Média</b> </Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.TempoOperação} name="TempoOperação" type="Number" placeholder="Insira o Tempo Média da Operação" />
              </Form.Group>
              <Button onClick={() => RegisterOperation}  variant="primary" >
                <b>Registrar</b>
              </Button>
            </Form>
          </div>
          <div id="FormsForRegisters">
            <Form id="FormDentist">
              <Form.Group className="mb-3" name="Dentist">
                <Form.Label> <b>Função do Funcionário</b> </Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.FunçãodoFuncionário} name="FunçãodoFuncionário" type="text" placeholder="Muito Importante Verificar A Ortográfia" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> <b> Nome</b></Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.Nome} name="Nome" type="text" placeholder="Nome do Funcionário" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> <b>Email</b> </Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.Email} name="Email" type="email" placeholder="Email do Funcionário" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label> <b> Celular</b></Form.Label>
                <Form.Control onChange={this.handleInputChange} value={this.state.Celular} name="Celular" type="text" placeholder="Celular do funcionário" />
              </Form.Group>
              <Button variant="primary" >
                <b>Registrar</b>
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