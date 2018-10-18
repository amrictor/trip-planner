import React, {Component} from 'react'
import {ButtonGroup, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label} from 'reactstrap'
import {Collapse} from 'reactstrap'
import {request, get_config} from '../../api/api';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {iscalculated: false};
    }

    calc(lat_f, long_f, lat_t, long_t) {
        lat_f = lat_f ? lat_f : 0;
        long_f = long_f ? long_f : 0;
        lat_t = lat_t ? lat_t : 0;
        long_t = long_t ? long_t : 0;
        this.props.updateOriginAndDestination(lat_f, long_f, lat_t, long_t);
        this.setState({iscalculated: true});
        request(this.props.distance, 'distance', this.props.port, this.props.host).then(response => {
            this.props.updateDistanceBasedOnResponse(response)
        });

    }

    render() {
        const fromto_field =
            <FormGroup>
                <Form inline id="From">
                    <Label>&nbsp;From&nbsp;</Label>
                    <Input
                        type="number"
                        name="latitude_f"
                        id="latitude_f_field"
                        placeholder="Latitude"
                    />
                    <Input
                        type="number"
                        name="longitude_f"
                        id="longitude_f_field"
                        placeholder="Longitude"
                    />
                </Form>
                <Form inline id="To">
                    <Label>&nbsp;To&nbsp;</Label>
                    <Input
                        type="number"
                        name="latitude_t"
                        id="latitude_t_field"
                        placeholder="Latitude"
                    />
                    <Input
                        type="number"
                        name="longitude_t"
                        id="longitude_t_field"
                        placeholder="Longitude"
                    />
                </Form>
                <Button
                    key={'options_submit'}
                    className='btn-outline-dark unit-button'
                    onClick={() => this.calc(latitude_f_field.value, longitude_f_field.value, latitude_t_field.value, longitude_t_field.value)
                    }
                >
                    Calculate
                </Button>
                <Collapse isOpen={this.state.iscalculated}>
                    <Label>&nbsp;Calculated distance
                        is {this.props.distance.distance} {this.props.distance.units}&nbsp;</Label>
                </Collapse>
            </FormGroup>;


        return (
            <Card>
                <CardBody>
                    <CardTitle>Calculator</CardTitle>
                    {fromto_field}

                </CardBody>
            </Card>
        )
    }
}

export default Calculator;