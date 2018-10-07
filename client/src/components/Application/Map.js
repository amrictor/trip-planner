import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Map</CardTitle>
                    <CardImg top width="100%" src={"data:image/svg+xml;utf8," + this.props.svg} alt={"Visual Itinerary Not Available"}/>
                </CardBody>
            </Card>
        )
    }
}

export default Map;

