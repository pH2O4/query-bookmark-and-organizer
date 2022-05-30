import { React, Component} from "react";
import Axios from 'axios'
import './Home.css'
import NavLinks from '../Calendar/NavLinks'
import CheckAuth from '../UserJoin/CheckAuthAllPags'
class Home extends Component{

   async componentDidMount(){
    CheckAuth()
    
   }
    render(){
        return(
            <div className="Home">
                <div className="Header">
                <NavLinks/>
                </div>
                <div className="Content">

                </div>
                <div className="Footer">

                </div>
            </div>
        )
    }
}

export default Home