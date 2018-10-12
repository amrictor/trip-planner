import React, {Component} from 'react'
import { InputGroup, Input } from 'reactstrap'
import { ButtonGroup, Button, Card, CardBody, CardHeader, CardTitle, Form, FormGroup, Label } from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
    this.state = {isUserDef: false};
  }

  checkButton(event){
      const unit = event.target.value;
      if(unit == 'user defined'){
          this.setState({isUserDef: true});
          this.props.updateOptions('units', event.target.value)
      }
      else {
          this.setState({isUserDef: false});
          this.props.updateOptions('units', event.target.value)
      }
  }

  userDefValues(name,radius){
      this.props.updateOptions('unitName',name)
      this.props.updateOptions('unitRadius',radius)
  }

  render() {
    const isUserDef = this.state.isUserDef;
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

    let userdeffield;
    if(isUserDef){
        userdeffield =
            <InputGroup id="userdef" isUserDef={isUserDef}>
                <Input type="text" name="name" placeholder="Unit name"/>
                <Input type="float" name="radius" placeholder="Earth radius"/>
                <input type="button" onclick="userDefValues(name,radius)" value="Submit"/>
            </InputGroup>
    }

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
