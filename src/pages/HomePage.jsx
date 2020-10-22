import React, { Component } from 'react'
import Cookies from "js-cookie"
import { withRouter } from "react-router-dom"

import Inside from '../components/Homepage/Inside'
import {Row,Col,Container} from 'react-bootstrap'

 class HomePage extends Component {
     render(){
         return(
    <>
<Inside  />
</>
                 
            
        )
    }
}



export default withRouter(HomePage)