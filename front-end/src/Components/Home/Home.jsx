import { React, Component } from "react"
import './Home.css'
import NavLinks from '../Calendar/NavLinks'
import axios from "axios"
import CheckAuth from '../UserJoin/CheckAuthAllPags'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ConsultObj: [],
    };
  }

  async componentDidMount() {
    CheckAuth()
    if(localStorage.getItem('passSituation') == 'true') {
      window.alert('Provavelmente esse é seu primeiro acesso, você precisa criar uma nova senha, você está sendo redirecionado')
      window.location.href = 'http://localhost:3000/Recovery'
    } else {
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
          if(ConsultObJs.Dentist == localStorage.getItem('Function') != 'Dentist' & ConsultObJs.Day == dataAtual){
            arrayForSaveState.push(ConsultObJs)
          }
          else if(ConsultObJs.Dentist == localStorage.getItem('UserName') & ConsultObJs.Day == dataAtual & localStorage.getItem('Function') == 'Dentista') {
            arrayForSaveState.push(ConsultObJs)
          }
        }
        this.setState({
          ConsultObj: arrayForSaveState
        })
      })
    }

  }
  render() {

    const { ConsultObj } = this.state
    return (
      <div className="Home">
        <div className="Header">
          <NavLinks />
        </div>
        <div className="ContentHOME">
          {ConsultObj.map(Consult => (
            <div className="DivConsultsSX" key={Consult.id}>
              <div className="textDivConsultContent"> <b>Operação:</b> {Consult.Operation}</div>
              <div className="textDivConsultContent"> <b>Dentista:</b> {Consult.Dentist}</div>
              <div className="textDivConsultContent"><b>Time:</b> {Consult.Time}</div>
              <div className="textDivConsultContent"> <b>Cliente:</b> {Consult.Client}</div>
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