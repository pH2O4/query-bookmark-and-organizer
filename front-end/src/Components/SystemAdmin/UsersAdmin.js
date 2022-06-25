import { Component, React } from 'react'
import './UserAdmin.css'
import NavLinks from '../Calendar/NavLinks'
import { Table } from 'react-bootstrap'
import { Axios } from 'axios'

class UserAdmin extends Component {

   async componentDidMount(){
    Axios.get('http://localhost:8080/SeeAllUsers', {
        headers: {
          Authorization: localStorage.getItem('authorization')
        }
      }).then((response) => {

      })
   }
    render() {

        return (
            <div className='UserAdmin'>
                <NavLinks />
                <div className='RecivingAllUsers'>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Celular</th>
                                <th>Admin</th>
                                <th>Função</th>
                                <th>Alterar Senha</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Mark</td>
                                <td>Otto</td>
                                <td>@mdo</td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>
        )
    }
}

export default UserAdmin