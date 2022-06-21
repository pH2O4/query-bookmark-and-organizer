import { React, Component } from "react"
import Axios from 'axios'
import './Home.css'
import NavLinks from '../Calendar/NavLinks'
import CheckAuth from '../UserJoin/CheckAuthAllPags'
import axios from "axios"

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ConsultObj: [],
    };
  }

  async componentDidMount() {
    CheckAuth()
    axios.get('http://localhost:8080/SeeAllConsuts', {
      headers: {
        Authorization: localStorage.getItem('authorization')
      }
    }).then((response) => {
      let arrayForSaveState = []
      let data = new Date();
      let dia = String(data.getDate()).padStart(2, '0');
      let mes = String(data.getMonth() + 1).padStart(2, '0');
      let ano = data.getFullYear();
      let dataAtual = ano + '-' + mes + '-' + dia;
      for (let indexX = 0; indexX < response.data.length; indexX++) {
        const ConsultObJs = response.data[indexX]
        if (ConsultObJs.Dentist == localStorage.getItem('UserName') & ConsultObJs.Day == dataAtual) {
          arrayForSaveState.push(ConsultObJs)
        }
      }
      this.setState({
        ConsultObj: arrayForSaveState
      })
    })
  }
  render() {
    const { ConsultObj } = this.state
    return (
      <div className="Home">
        <div className="Header">
          <NavLinks />
        </div>
        <div className="Content">
          {ConsultObj.map(Consult => (
            <div className="DivConsultsS" key={Consult.id}>
              <div className = "textDivConsultContent"> <b>Operação:</b> {Consult.Operation}</div>
              <div className = "textDivConsultContent"> <b>Dentista:</b> {Consult.Dentist}</div> 
              <div className = "textDivConsultContent"><b>Time:</b> {Consult.Time}</div>  
              <div className = "textDivConsultContent"> <b>Cliente:</b> {Consult.Client}</div>  
            </div>
          ))}
        </div>
        <div className="Footer">

        </div>
      </div>
    )
  }
}

export default Home