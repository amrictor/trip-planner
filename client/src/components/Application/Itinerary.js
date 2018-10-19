import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Button } from 'reactstrap'

class Itinerary extends Component {
    constructor(props) {
        super(props);
        this.putData = this.putData.bind(this);
        this.createTable = this.createTable.bind(this);
        this.generateMap = this.generateMap.bind(this);
    }

    putData(){
        let data = [];
        if (typeof this.props.trip.places !== "undefined") {
            let size = this.props.trip.places.length;
            if (typeof this.props.trip.distances !== "undefined") {
                for (let i = 0; i < size; i++) {
                    data.push(<tr key={this.props.trip.places[i].name}>
                        <td>{this.props.trip.places[i].name}</td>
                        <td>{this.props.trip.places[(i + 1) % size].name}</td>
                        <td>{this.props.trip.distances[i]}</td>
                    </tr>);
                }
            }
        }
        return data;
    }

    createTable(){
        return (
            <table className={"table"}>
                <thead>
                    <tr>
                        <th>Origin</th><th>Destination</th><th>Distance</th>
                    </tr>
                    {this.putData()}
                </thead>
            </table>
        );
    }

    generateMap(){
        if (typeof this.props.trip.places !== "undefined"){
            return (
            <CardImg top width="100%" src={"data:image/svg+xml;utf8," + this.props.trip.map} alt={"Visual Itinerary Not Available"}/>
            );
        }
        return;
    }

    render() {
        return (
            <Card>
                {this.generateMap()}
                <CardBody>
                    <CardTitle> Itinerary : {this.props.trip.title}</CardTitle>
                    {this.createTable()}
                </CardBody>
            </Card>
        )
    }
}

export default Itinerary;