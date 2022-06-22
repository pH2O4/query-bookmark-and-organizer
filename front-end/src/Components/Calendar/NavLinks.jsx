import { React, Component, useState, useRef } from "react";
import { Navbar, Nav, Container, Overlay, Tooltip } from 'react-bootstrap'
import { faTooth, faArrowRightFromBracket, faCalendarCheck, faHouse, faHome } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavLinks() {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [show2, setShow2] = useState(false);
    const target2 = useRef(null);
    const [show3, setShow3] = useState(false);
    const target3 = useRef(null);

    const Logout = () => {
        localStorage.setItem('authorization', '')
    }

    return(
        <div className="NAVLINKS">
            <Navbar collapsenselect='true' fixed='top' expand='sm'>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>
                        <Nav.Link ref={target3} onMouseEnter={() => setShow3(!show3)} onMouseLeave={() => setShow3(!show3)} className="NAVLINK" href="/Home"><FontAwesomeIcon icon={faHome} /></Nav.Link>
                        <Overlay target={target3.current} show={show3} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Home
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Nav.Link ref={target} onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)} className="NAVLINK" href="/RegisterOperationsAndDentist"><FontAwesomeIcon icon={faTooth} /></Nav.Link>
                            <Overlay target={target.current} show={show} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Configurar Operações <br />
                                        Registrar Dentistas
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Nav.Link ref={target2} onMouseEnter={() => setShow2(!show2)} onMouseLeave={() => setShow2(!show2)} className="NAVLINK" href="/Calendar"><FontAwesomeIcon icon={faCalendarCheck} /></Nav.Link>
                            <Overlay target={target2.current} show={show2} placement="right">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Calendário
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Nav.Link onClick={() => Logout()} className="NAVLINK" href="/"><FontAwesomeIcon icon={faArrowRightFromBracket} /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavLinks