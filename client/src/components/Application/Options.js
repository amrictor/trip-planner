import React, {Component} from 'react'
import {ButtonGroup, Button, Card, CardBody, CardHeader, CardTitle, Container, Form, FormGroup, Label} from 'reactstrap'
import { Input, InputGroup, InputGroupAddon, InputGroupText } from 'reactstrap'
import {Collapse} from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userDef: false,
            name : "",
            radius : 0,
            host : "",
            port : 0
        };
        this.handleChangeHost = this.handleChangeHost.bind(this);
        this.handleChangePort = this.handleChangePort.bind(this);
        this.handleChangeName = this.handleChangeName.bind(this);
        this.handleChangeRadius = this.handleChangeRadius.bind(this);
    }

    updateUnits(event) {
        const unit = event.target.value;
        this.props.updateOptions('units', event.target.value);
        this.setState({userDef:(unit === 'user defined')});
    }

    userDefValues() {
        if (this.state.name === "" && this.state.radius === 0) return;
        this.props.updateOptions('unitName', this.state.name);
        this.props.updateOptions('unitRadius', this.state.radius);
    }

    handleKeyDotPress(event) {
        if(event.key === '.'){
            event.preventDefault();
            alert('Please enter an integer.');
        }
    }

    handleChangeHost(event) {
        this.setState({'host': event.target.value});
    }


    handleChangePort(event) {
        this.setState({port: event.target.value});
    }

    handleChangeName(event) {
        this.setState({name: event.target.value});
    }


    handleChangeRadius(event) {
        this.setState({radius: event.target.value});
    }

    render() {
        const unitButtons = this.props.config.units.map((units) =>
            <Button
                key={'distance_button_' + units}
                id='options_submit_units_field'
                className='btn-outline-dark unit-button'
                active={this.props.options.units === units}
                value={units}
                onClick={(event) => this.updateUnits(event)}
            >
                {units.charAt(0).toUpperCase() + units.slice(1)}
            </Button>
        );
        const optButtons = this.props.config.optimization.map((opt) =>
            <Button
                key={opt['label']}
                id='options_submit_opts_field'
                className='btn-outline-dark unit-button'
                active={this.props.options.optimization === opt['label']}
                value={opt['label']}
                onClick={(event) => this.props.updateOptions('optimization', event.target.value)}
            >
                {opt['label'].charAt(0).toUpperCase() + opt['label'].slice(1)}
            </Button>
        );
        const mapButtons = this.props.config.maps.map((map) =>
            <Button
                key={map}
                id='options_submit_maps_field'
                className='btn-outline-dark unit-button'
                active={this.props.options.map === map}
                value={map}
                onClick={(event) => this.props.updateOptions('map', event.target.value)}
            >
                {(map==='svg' ? "Static" : "Interactive")}
            </Button>
        );
        const truefalse = [true, false];
        const realTimeButtons = truefalse.map((rT) =>
            <Button
                key={rT}
                id='options_submit_rT_field'
                className='btn-outline-dark unit-button'
                active={this.props.realTime === rT}
                value={rT}
                onClick={(event) => this.props.updateRealTime(event.target.value)}
            >
                {(rT===true ? "True" : "False")}
            </Button>
        );

        const portForm =
            <Form inline>
                <InputGroup>
                    <Input
                        type="text"
                        name="host"
                        id="host_field"
                        placeholder="(Optional) black-bottle.cs.colostate.edu"
                        onChange= {this.handleChangeHost}
                    />
                    <InputGroupAddon addonType="prepend">
                        <InputGroupText>:</InputGroupText>
                    </InputGroupAddon>
                    <Input
                        type="number"
                        name="port"
                        id="port_field"
                        placeholder="port"
                        onKeyPress={this.handleKeyDotPress}
                        onChange= {this.handleChangePort}
                    />
                    <InputGroupAddon addonType="append">
                        &nbsp;
                        <Button
                            key={'options_submit_hostport'}
                            id={'options_submit_hostport_field'}
                            className='btn-outline-dark unit-button'
                            onClick={() => this.props.updateHostAndPort(this.state.host, this.state.port)}
                        >
                            Submit
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>;

        const userdeffield =
            <Collapse isOpen={this.state.userDef}>
                <br/>
                <Form inline>
                    <InputGroup>
                        <Input
                            type="text"
                            name="unitname"
                            id="unit_name_field"
                            placeholder="Unit name"
                            onChange= {this.handleChangeName}
                        />
                        <Input
                            type="number"
                            name="unitradius"
                            id="unit_radius_field"
                            placeholder="Earth radius"
                            onChange= {this.handleChangeRadius}
                        />
                        <InputGroupAddon addonType="append">
                            &nbsp;
                            <Button
                                key={'options_submit_userdefunits'}
                                id='options_submit_userdefunits_field'
                                className='btn-outline-dark unit-button'
                                onClick={() => this.userDefValues()}
                            >
                                Submit
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
                </Form>
            </Collapse>;

        return (
                <Container id={"Options"}>
                    <CardBody>
                        <CardTitle>Options</CardTitle>
                        <hr/>
                    </CardBody>
                    <CardBody>
                        <p><b>Real time trip editing:</b></p>
                        <ButtonGroup>{realTimeButtons}</ButtonGroup>
                    </CardBody>
                    <CardBody>
                        <p><b>Select the units you wish to use:</b></p>
                        <ButtonGroup>{unitButtons}</ButtonGroup>
                        {userdeffield}
                    </CardBody>
                    <CardBody>
                        <p><b>Select your desired map output:</b></p>
                        <ButtonGroup>{mapButtons}</ButtonGroup>
                    </CardBody>
                    <CardBody>
                        <p><b>Select your preferred optimization:</b></p>
                        <ButtonGroup>{optButtons}</ButtonGroup>
                    </CardBody>
                    <CardBody>
                        <p><b>Use a different server and/or port:</b></p>
                        {portForm}
                    </CardBody>
                </Container>
        )
    }
}

export default Options;