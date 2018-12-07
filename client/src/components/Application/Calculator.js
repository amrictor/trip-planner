import React, {Component} from 'react'
import {ButtonGroup, Button, Card, CardBody, CardHeader, CardTitle, Container, Form, FormGroup, Label} from 'reactstrap'
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
import {Collapse} from 'reactstrap'
import {request} from '../../api/api';

class Calculator extends Component {
    constructor(props) {
        super(props);
        this.state = {
            iscalculated: false,
            latf : 0,
            longf : 0,
            latt : 0,
            longt : 0
        };
        this.handleChangelatf = this.handleChangelatf.bind(this);
        this.handleChangelongf = this.handleChangelongf.bind(this);
        this.handleChangelatt = this.handleChangelatt.bind(this);
        this.handleChangelongt = this.handleChangelongt.bind(this);
    }

    handleChangelatf(event) {
        this.setState({latf: event.target.value});
    }


    handleChangelongf(event) {
        this.setState({longf: event.target.value});
    }

    handleChangelatt(event) {
        this.setState({name: event.target.value});
    }


    handleChangelongt(event) {
        this.setState({radius: event.target.value});
    }

    calc() {
        if (latf === 0 && longf === 0 && latt === 0 && longt === 0) return;
        this.props.updateOriginAndDestination(latf, longf, latt, longt);
        this.setState({iscalculated: true});
        request(this.props.distance, 'distance', this.props.port, this.props.host).then(response => {
            this.props.updateDistanceBasedOnResponse(response)
        });

    }

    render() {
        const fromto_field =
            <FormGroup>
                <Form inline id="From">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"> From
                        </InputGroupAddon>
                        <Input
                            type="number"
                            name="latitude_f"
                            id="latitude_f_field"
                            placeholder="Latitude"
                            step="0.00000001"
                            onChange= {this.handleChangelatf}
                        />
                        <Input
                            type="number"
                            name="longitude_f"
                            id="longitude_f_field"
                            placeholder="Longitude"
                            step="0.00000001"
                            onChange= {this.handleChangelongf}
                        />
                    </InputGroup>
                </Form>
                <Form inline id="To">
                    <InputGroup>
                        <InputGroupAddon addonType="prepend"> &nbsp;&nbsp;&nbsp;&nbsp;To&nbsp;
                        </InputGroupAddon>
                        <Input
                            type="number"
                            name="latitude_t"
                            id="latitude_t_field"
                            placeholder="Latitude"
                            step="0.00000001"
                            onChange= {this.handleChangelatt}
                        />
                        <Input
                            type="number"
                            name="longitude_t"
                            id="longitude_t_field"
                            placeholder="Longitude"
                            step="0.00000001"
                            onChange= {this.handleChangelongt}
                        />
                        &nbsp;
                        <InputGroupAddon addonType="append">
                            <Button
                                key={'options_submit'}
                                className='btn-outline-dark unit-button'
                                onClick={() => this.calc(latitude_f_field.value, longitude_f_field.value, latitude_t_field.value, longitude_t_field.value)
                                }
                            >
                                Calculate
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>


                <Collapse isOpen={this.state.iscalculated}>
                    <Label>Calculated distance
                        is {this.props.distance.distance} {this.props.distance.units}.</Label>
                </Collapse>
            </FormGroup>;


        return (
            <Container>
                <CardBody>
                    <CardTitle>Calculate the distance between two places:</CardTitle>
                    <hr/>
                    {fromto_field}

                </CardBody>
            </Container>

        )
    }
}

export default Calculator;