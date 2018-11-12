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
        this.state = {isuserdef: false};
    }

    checkButton(event) {
        const unit = event.target.value;
        this.props.updateOptions('units', event.target.value);
        if (unit === 'user defined') {
            this.setState({isuserdef: true});
        }
        else {
            this.setState({isuserdef: false});
        }
    }

    userDefValues(name, radius) {
        this.props.updateOptions('unitName', name);
        this.props.updateOptions('unitRadius', radius);
    }

    handleKeyDotPress(event) {
        if(event.key === '.'){
            event.preventDefault();
            alert('Please enter an integer.');
        }
    }

    render() {
        const buttons = this.props.config.units.map((units) =>
            <Button
                key={'distance_button_' + units}
                className='btn-outline-dark unit-button'
                active={this.props.options.units === units}
                value={units}
                onClick={(event) => this.checkButton(event)}
            >
                {units.charAt(0).toUpperCase() + units.slice(1)}
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
                    />
                    <InputGroupAddon addonType="append">
                        &nbsp;
                        <Button
                            key={'options_submit_hostport'}
                            className='btn-outline-dark unit-button'
                            onClick={() => this.props.updateHostAndPort(host_field.value, port_field.value)}
                        >
                            Submit
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
            </Form>;
        const userdeffield =
            <Collapse isOpen={this.state.isuserdef}>
                <Form inline>
                    <Input
                        type="text"
                        name="unitname"
                        id="unit_name_field"
                        placeholder="Unit name"
                    />
                    <Input
                        type="number"
                        name="unitradius"
                        id="unit_radius_field"
                        placeholder="Earth radius"
                    />
                    <Button
                        key={'options_submit_userdefunits'}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.userDefValues(unit_name_field.value, unit_radius_field.value)
                        }
                    >
                        Submit
                    </Button>
                </Form>
            </Collapse>;
        const optimiOpt =
            <ButtonGroup>
                <Button
                    key={'none'}
                    className='btn-outline-dark unit-button'
                    onClick={(event) => this.props.updateOptions('optimization', 'none')}
                    active={this.props.options.optimization === 'none'}
                >
                    None
                </Button>
                <Button
                    key={'short'}
                    className='btn-outline-dark unit-button'
                    onClick={(event) => this.props.updateOptions('optimization', 'short')}
                    active={this.props.options.optimization === 'short'}
                >
                    Short
                </Button>
                <Button
                    key={'shorter'}
                    className='btn-outline-dark unit-button'
                    onClick={(event) => this.props.updateOptions('optimization', 'shorter')}
                    active={this.props.options.optimization === 'shorter'}
                >
                    Shorter
                </Button>
            </ButtonGroup>;

        const mapChoices =
            <ButtonGroup>
                <Button
                    key={'svg'}
                    className='btn-outline-dark unit-button'
                    onClick={(event) => this.props.updateOptions('map', 'svg')}
                    active={this.props.options.map === 'svg'}
                >
                    Static
                </Button>
                <Button
                    key={'kml'}
                    className='btn-outline-dark unit-button'
                    onClick={(event) => this.props.updateOptions('map', 'kml')}
                    active={this.props.options.map === 'kml'}
                >
                    Interactive
                </Button>
            </ButtonGroup>;

        return (

            <React.Fragment>
                <Container id={"Options"}>
                    <CardBody>
                        <CardTitle>Options</CardTitle>
                        <hr/>

                        <p><b>Select the units you wish to use:</b></p>

                        <ButtonGroup>
                            {buttons}
                        </ButtonGroup>
                        {userdeffield}
                    </CardBody>
                    <CardBody>
                        <p><b>Select your desired map output:</b></p>
                        {mapChoices}
                    </CardBody>

                    <CardBody>
                        <p><b>Select your preferred optimization:</b></p>
                        {optimiOpt}
                    </CardBody>

                    <CardBody>
                        <p><b>Use a different server and/or port:</b></p>
                        {portForm}
                    </CardBody>
                </Container>
            </React.Fragment>
        )
    }
}

export default Options;