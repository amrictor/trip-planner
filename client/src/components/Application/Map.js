import React, {Component} from 'react'
import { CardImg } from 'reactstrap'



class Map extends Component {
    constructor(props) {
        super(props);
    }
    generateMap(){
        let source = (this.props.trip.options.map === 'kml')
            ? "https://i.imgur.com/VbgPZ1w.png"
            : (this.props.trip.map == null)
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/World_map_with_nations.svg/1600px-World_map_with_nations.svg.png"
                : "data:image/svg+xml;utf8," + this.props.trip.map;
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