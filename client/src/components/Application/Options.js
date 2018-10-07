import React, {Component} from 'react'
import { Card, CardHeader, CardTitle, CardBody } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'

/* Options allows the user to change the parameters for planning
 * and rendering the trip map and itinerary.
 * The options reside in the parent object so they may be shared with the Trip object.
 * Allows the user to set the options used by the application via a set of buttons.
 */
class Options extends Component{
  constructor(props) {
    super(props);
  }

  render() {
    const buttons = this.props.config.units.map((units) =>
      <Button
        key={'distance_button_' + units}
        className='btn-outline-dark unit-button'
        active={this.props.options.units === units}
        value={units}
        onClick={(event) => this.props.updateOptions('units', event.target.value)}
      >
        {units.charAt(0).toUpperCase() + units.slice(1)}
      </Button>
    );

    return(
      <Card>
        <CardBody>
            <CardTitle>Options</CardTitle>
            <p><b>Select the units you wish to use:</b></p>

          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </CardBody>
        <CardBody>
            <p><b>Enter your server port:</b></p>
          <ButtonGroup>
            {<form name="myform" action="" method="get">
              <input type="text" name="inputbox" value=""/>
              <input type="button" name="button" value="Enter" onclick="showData(this.form)"/>
           </form>}
          </ButtonGroup>
        </CardBody>
      </Card>
    )
  }
}

export default Options;
