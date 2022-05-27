import { React, Component, useState, useRef } from "react";
import { Navbar, Nav, Container, Overlay, Tooltip } from 'react-bootstrap'
import { faTooth, faArrowRightFromBracket, faCalendarCheck } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function NavLinks() {
    const [show, setShow] = useState(false);
    const target = useRef(null);
    const [show2, setShow2] = useState(false);
    const target2 = useRef(null);
    
    return(
        <div className="NAVLINKS">
            <Navbar collapsenselect='true' fixed='top' expand='sm'>
                <Container>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <Navbar.Collapse id="responsive-navbar-nav">
                        <Nav>

                            <Nav.Link ref={target} onMouseEnter={() => setShow(!show)} onMouseLeave={() => setShow(!show)} className="NAVLINK" href="/"><FontAwesomeIcon icon={faTooth} /></Nav.Link>
                            <Overlay target={target.current} show={show} placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Configurar operações
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Nav.Link ref={target2} onMouseEnter={() => setShow2(!show2)} onMouseLeave={() => setShow2(!show2)} className="NAVLINK" href="/"><FontAwesomeIcon icon={faCalendarCheck} /></Nav.Link>
                            <Overlay target={target2.current} show={show2} placement="bottom">
                                {(props) => (
                                    <Tooltip id="overlay-example" {...props}>
                                        Calendario
                                    </Tooltip>
                                )}
                            </Overlay>
                            <Nav.Link className="NAVLINK" href="/"><FontAwesomeIcon icon={faArrowRightFromBracket} /></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavLinks