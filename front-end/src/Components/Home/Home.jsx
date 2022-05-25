import { React, Component, useState } from "react";
import Axios from 'axios'
import {  Navbar, Nav, Container} from 'react-bootstrap'
import './Home.css'

class Home extends Component{

   async componentDidMount(){

        Axios.get('http://localhost:8080/AuthStatus', {
            headers: {
              Authorization: localStorage.getItem('authorization')
            }
          })
        .then((response) => {
            response.data.Pass = ''
            console.log(response.data)
            const takingUserId = response.data.id
            console.log(localStorage)
            localStorage.setItem('UserInformation', takingUserId)
        })
   }
    render(){
        return(
            <div className="Home">
                <div className="Header">
                <Navbar collapsenselect='true' fixed='top' expand='sm'>
                    <Container>
                        <Navbar.Toggle aria-controls="responsive-navbar-nav"/>
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav>
                                <Nav.Link className="NAVLINK" href="/">KKK</Nav.Link>
                                <Nav.Link className="NAVLINK" href="/"></Nav.Link>
                                <Nav.Link className="NAVLINK" href="/"></Nav.Link>
                                <Nav.Link className="NAVLINK" href="/"></Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
                
                </div>
                <div className="SideBar">

                </div>
                <div className="Content">

                </div>
            </div>
        )
    }
}

export default Home