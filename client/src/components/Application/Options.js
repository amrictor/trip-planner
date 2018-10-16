import React, {Component} from 'react'
import { ButtonGroup, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Input, Label } from 'reactstrap'
/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
    constructor(props) {
        super(props);
        this.state = {isuserdef: false};
    }

    checkButton(event){
        const unit = event.target.value;
        if(unit == 'user defined'){
            this.setState({isuserdef: true});
            this.props.updateOptions('units', event.target.value)
        }
        else {
            this.setState({isuserdef: false});
            this.props.updateOptions('units', event.target.value)
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
                <FormGroup>
                    <Input
                        type="text"
                        name="host"
                        id="host_field"
                        placeholder="black-bottle.cs.colostate.edu"
                        disabled
                    />
                </FormGroup>
                <FormGroup>
                    <Label>&nbsp;:&nbsp;</Label>
                    <Input
                        type="number"
                        name="port"
                        id="port_field"
                        placeholder="port"
                    />

                </FormGroup> &nbsp;
                <Button
                    key={'options_submit'}
                    className='btn-outline-dark unit-button'
                    onClick={() => this.props.updateHostAndPort(port_field.value)}
                >
                    Submit
                </Button>
            </Form>
        const isuserdef = this.state.isuserdef;
        let userdeffield;
        if(isuserdef){
            userdeffield =
                <div>Hello
                </div>
        }

        return(
            <Card>
                <CardBody>
                    <CardTitle>Options</CardTitle>
                    <p><b>Select the units you wish to use:</b></p>

                    <ButtonGroup>
                        {buttons}
                    </ButtonGroup>
                    <div>{userdeffield}</div>
                </CardBody>
                <CardBody>
                    <p><b>Enter your server host and port:</b></p>
                    {portForm}


                </CardBody>
            </Card>
        )
    }
}

export default Options;
