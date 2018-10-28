import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'
import { Modal } from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    generateMap(){
        return (
          <CardImg
              top width="100%"
              src={this.props.trip.map}
              alt={"Visual Itinerary Not Available"}
          />
        );
    }

    render() {
        return (
            <React.Fragment>
                {this.generateMap()}
            </React.Fragment>
        )
    }
}

export default Map;