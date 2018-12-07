import React, {Component} from 'react'
import {Card, CardImg, CardBody, CardTitle, Container} from 'reactstrap'
//import teamPhoto from './public/teamphoto.jpg'

let teamPhoto = require('../../public/teamphoto.jpg');
export default class Info extends Component {
    render() {
        return (
            <Container>
                <CardImg src={teamPhoto}/>
                <CardBody>
                    <CardTitle>Meet the devs</CardTitle>
                    <hr/>
                    <p><i>(from left to right)</i> Sam Westra, Abigail Rictor, Josette Grinslade, Khanh Nguyen Le</p>
                </CardBody>
            </Container>
        )
    }
}