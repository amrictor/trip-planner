import React, {Component} from 'react'
import { Card, CardBody, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardImg top width="100%" src={"data:image/svg+xml;utf8," + this.props.svg} alt={"Visual Itinerary Not Available"}/>
            </Card>
        )
    }
}

export default Map;

