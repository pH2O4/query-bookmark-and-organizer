import { Component, React } from 'react'
import './UserAdmin.css'
import NavLinks from '../Calendar/NavLinks'
import { Table, Form, Row, Col, Button } from 'react-bootstrap'
import Axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserPen, faPenToSquare } from '@fortawesome/free-solid-svg-icons'

class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllUsers: [],
            ChangeUser: false,
            Name: '',
            Email: '',
            Function: '',
            Cellphone: '',
            id: ''
        };
        this.UpdateUserDatas = this.UpdateUserDatas.bind(this);
        this.ChangingValueData = this.ChangingValueData.bind(this);
        this.OpenForJoinData = this.OpenForJoinData.bind(this);
        this.UpdateDataUsersS = this.UpdateDataUsersS.bind(this);
        this.ChangeAdminAndPassSituation = this.ChangeAdminAndPassSituation.bind(this);
        //   this.handleButtonClickedAdmin = this.handleButtonClickedAdmin.bind(this)
    }
    OpenForJoinData(e) {
        console.log(e)
        if (e == 'NameX') {
            document.getElementById('NameX').disabled = false;
        } else if (e == 'EmailX') {
            document.getElementById('EmailX').disabled = false;
        } else if (e == 'CelularX') {
            document.getElementById('CelularX').disabled = false;
        } else if (e == 'FunçãoX') {
            document.getElementById('FunçãoX').disabled = false;
        }
    }

    async UpdateDataUsersS() {
        console.log(localStorage.getItem('Admin'))
        if(localStorage.getItem('Admin') == 'false'){
            window.alert('Você não tem permissão para alterar')
            return
        }else {
            Axios.post('http://localhost:8080/UpdateUsersDatas', {
            Email: this.state.Email,
            Name: this.state.Name,
            Cellphone: this.state.Cellphone,
            Function: this.state.Function,
            id: this.state.id
        },
            {
                headers: {
                    Authorization: localStorage.getItem('authorization')
                }
            }).then((response) => {
                window.alert(`${response.data}`)
                window.location.reload()
            })
        }
    }

    async ChangeAdminAndPassSituation(description, User) {
        console.log(localStorage.getItem('Admin'))
        console.log(description, User)
        if(localStorage.getItem('Admin') == 'false'){
            window.alert('Você não tem permissão para alterar')
            return
        }else if(localStorage.getItem('id') == User.id){
            window.alert('Apenas outro administrador pode tirar sua permissão como adiministrador')
            return
        }
        else if (description == 'AdminX') {
            User.Admin = !User.Admin
        }else if(description == 'PassX'){
            User.IsHeSheNeedTradePass = !User.IsHeSheNeedTradePass
        }
        Axios.post('http://localhost:8080/TradeAdminAndPassStatus', {
            Admin: User.Admin,
            Pass: User.IsHeSheNeedTradePass,
            id: User.id
        },
            {
                headers: {
                    Authorization: localStorage.getItem('authorization')
                }
            }).then((response) => {
                window.alert(`${response.data}`)
                window.location.reload()
            })
    }

    async ChangingValueData(e) {
        const target = e.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async UpdateUserDatas(e) {
        this.setState({
            Name: e.Name,
            Email: e.Email,
            Function: e.Function,
            Cellphone: e.Cellphone,
            id: e.id

        })
        this.setState({ ChangeUser: true })
        if (this.state.ChangeUser == false) {
            document.getElementById('FormUpddateUsersInfo').style.display = "none";
        } else if (this.state.ChangeUser == true) {
            document.getElementById('FormUpddateUsersInfo').style.display = "block";
        }
    }

    async componentDidMount() {
        Axios.get('http://localhost:8080/SeeAllUsers', {
            headers: {
                Authorization: localStorage.getItem('authorization')
            }
        }).then((response) => {
            this.setState({
                AllUsers: response.data
            })

        })
    }
    render() {
        const { AllUsers } = this.state
        return (
            <div className='UserAdmin'>
                <NavLinks />
                <div className='RecivingAllUsers'>
                    <div id='FormUpddateUsersInfo'>
                        <p id='TitleForm'>Altere Os Dados Aqui:</p>
                        <Form>
                            <Row>
                                <Col>
                                    <Button className='ButtonOpenForJoinData border-0' onClick={() => this.OpenForJoinData('NameX')} > <FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Form.Label>Alterar Nome:</Form.Label>
                                    <Form.Control name="Dentista" onChange={this.ChangingValueData} disabled={true} Name="Name" value={this.state.Name} id='NameX' placeholder="Dentista" />
                                </Col>
                                <Col>
                                    <Button className='ButtonOpenForJoinData border-0' onClick={() => this.OpenForJoinData('EmailX')} > <FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Form.Label>Alterar Email:</Form.Label>
                                    <Form.Control name="Dentista" onChange={this.ChangingValueData} disabled={true} Name="Email" value={this.state.Email} id='EmailX' placeholder="Dentista" />
                                </Col>
                                <Col>
                                    <Button className='ButtonOpenForJoinData border-0' onClick={() => this.OpenForJoinData('CelularX')} > <FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Form.Label>Alterar Celular:</Form.Label>
                                    <Form.Control name="Dentista" onChange={this.ChangingValueData} disabled={true} Name="Cellphone" value={this.state.Cellphone} id='CelularX' placeholder="Dentista" />
                                </Col>
                                <Col>
                                    <Button className='ButtonOpenForJoinData' onClick={() => this.OpenForJoinData('FunçãoX')} > <FontAwesomeIcon icon={faPenToSquare} /></Button>
                                    <Form.Label>Alterar Função:</Form.Label>
                                    <Form.Control name="Dentista" onChange={this.ChangingValueData} disabled={true} id='FunçãoX' Name="Function" value={this.state.Function} placeholder="Dentista" />
                                </Col>
                            </Row>
                            <Button onClick={this.UpdateDataUsersS} id='AlterarDadosButton'>Alterar Dados</Button>
                        </Form>

                    </div>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Editar</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Admin</th>
                                <th>Função</th>
                                <th>Alterar Senha No Próximo Login</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                AllUsers.map(User => (
                                    <tr key={User.id}>
                                        <td ><button id="buttonList" onClick={() => this.UpdateUserDatas(User)}>< FontAwesomeIcon icon={faUserPen} /></button></td>
                                        <td>{User.Name}</td>
                                        <td>{User.Email}</td>
                                        <td>{User.Cellphone}</td>
                                        <td>{User.Admin ? <Form.Check
                                            defaultChecked={true}
                                            onClick={() => this.ChangeAdminAndPassSituation('AdminX', User)}
                                            type="checkbox"
                                            id='checkbox'
                                        /> : <Form.Check
                                            onClick={() => this.ChangeAdminAndPassSituation('AdminX', User)}
                                            type="checkbox"
                                            id='checkbox'
                                        />}</td>
                                        <td>{User.Function}</td>
                                        <td>{User.IsHeSheNeedTradePass ? <Form.Check
                                            onClick={() => this.ChangeAdminAndPassSituation('PassX', User)}
                                            defaultChecked={true}
                                            type="checkbox"
                                            id='checkbox'
                                        /> : <Form.Check
                                            onClick={() => this.ChangeAdminAndPassSituation('PassX', User)}
                                            type="checkbox"
                                            id='checkbox'
                                        />}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div >
        )
    }
}

export default UserAdmin