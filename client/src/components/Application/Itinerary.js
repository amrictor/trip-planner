import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'

class Itinerary extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Itinerary</CardTitle>
                </CardBody>
            </Card>
        )
    }
}

export default Itinerary;