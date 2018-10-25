import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'
import { Modal } from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    generateMap(){
        let source = (this.props.trip.map == null)
            ? "https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/USA_Colorado_location_map.svg/800px-USA_Colorado_location_map.svg.png"
            : "data:image/svg+xml;utf8," + this.props.trip.map
        return (
          <CardImg
              top width="100%"
              src={source}
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