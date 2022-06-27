import { Component, React } from 'react'
import './UserAdmin.css'
import NavLinks from '../Calendar/NavLinks'
import { Table, Form, } from 'react-bootstrap'
import Axios from 'axios'
import  {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faUserPen} from '@fortawesome/free-solid-svg-icons'

class UserAdmin extends Component {
    constructor(props) {
        super(props);
        this.state = {
            AllUsers: [],
            ChangeUser: false,
        };
     //   this.handleButtonClickedAdmin = this.handleButtonClickedAdmin.bind(this)
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
                                        <td>< FontAwesomeIcon icon={faUserPen}  /></td>
                                        <td>{User.Name}</td>
                                        <td>{User.Email}</td>
                                        <td>{User.Cellphone}</td>
                                        <td>{User.Admin ? <Form.Check
                                            checked
                                            type="checkbox"
                                            id='checkbox'
                                        /> : <Form.Check
                                            type="checkbox"
                                            id='checkbox'
                                        />}</td>
                                        <td>{User.Function}</td>
                                        <td>{User.IsHeSheNeedTradePass ? <Form.Check
                                            checked
                                            type="checkbox"
                                            id='checkbox'
                                        /> : <Form.Check
                                            type="checkbox"
                                            id='checkbox'
                                        />}</td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserAdmin