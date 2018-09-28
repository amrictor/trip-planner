import React, {Component} from 'react'
import { Card, CardHeader, CardBody } from 'reactstrap'
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
          <p>Select the options you wish to use.</p>
          <ButtonGroup>
            {buttons}
          </ButtonGroup>
        </CardBody>
        <CardBody>
          <p>Upload your trip file</p>
          <ButtonGroup>
            {<form enctype="multipart/form-data" action="Resources/userupload" method="post">
                <input id="image-file" type="file" />
            </form>}
          </ButtonGroup>
        </CardBody>
        <CardBody>
          <p>Choose your port</p>
          <ButtonGroup>
            {<input type="text" name="inputbox" value="">
             <input type="button" name="button" value="Enter" onclick="showData(this.form)">}
          </ButtonGroup>
        </CardBody>
      </Card>
    )
  }
}

export default Options;
