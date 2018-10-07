import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'

class Calculator extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Calculator</CardTitle>
                </CardBody>
            </Card>
        )
    }
}

export default Calculator;