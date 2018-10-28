import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap'
import { Col, Container, Row, Table } from 'reactstrap';
import { Button } from 'reactstrap'
import { Modal } from 'reactstrap'

class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
        this.putData = this.putData.bind(this);
        this.createTable = this.createTable.bind(this);
        this.toggleItin = this.toggleItin.bind(this);
    }
    toggleItin() {
        this.setState({
            modal: !this.state.modal
        });
    }

    removePlace(id, name, lat, long){
        const place = {'id': id, 'name': name, 'latitude': lat, 'longitude': long};
        this.props.updatePlaces(place,"remove");
        if(this.props.trip.places.length>0) this.props.planRequest();
        else this.props.trip.map="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/USA_Colorado_location_map.svg/800px-USA_Colorado_location_map.svg.png";
    }

    putData(){

        let data = [];
        if (typeof this.props.trip.places !== "undefined") {
            let size = this.props.trip.places.length;
            let total = 0;
            if (typeof this.props.trip.distances !== "undefined") {
                for (let i = 0; i < size; i++) {
                    data.push(
                        <React.Fragment key={this.props.trip.places[i].id}>
                            <Row>
                                <Col xs="4" key='origin'>{this.props.trip.places[i].name +" ("+ (i+1) +")"}</Col>
                                <Col xs="4" key='destination'>{this.props.trip.places[(i + 1) % size].name + " ("+ (((i+1) % size) + 1) + ")"}</Col>
                                <Col xs="2" key='distance'>{this.props.trip.distances[i]}</Col>
                                <Col xs="2">
                                    <Button
                                        key={'add_submit'}
                                        className='btn-outline-dark unit-button'
                                        onClick={() => this.removePlace(this.props.trip.places[i].id, this.props.trip.places[i].name, this.props.trip.places[i].latitude, this.props.trip.places[i].longitude)}
                                    >
                                        &#x2796;
                                    </Button>

                                </Col>
                            </Row>
                            <hr/>
                        </React.Fragment>
                    );
                    total += this.props.trip.distances[i];
                }
                data.push(<React.Fragment key="Total">
                            <Row>Total Distance: {total}</Row>
                        </React.Fragment>);
            }
        }
        return data;
    }

    createTable(){
        if(typeof this.props.trip.options.units !== "undefined") {
            let units = this.props.trip.options.units;
            /*if (units === "user defined"){
                console.log(this.props.trip.options.unitName)
                units = this.props.trip.options.unitName;
            }*/
            return (
            <React.Fragment>
                <Container>
                    <Row>
                        <Col xs="4" key='Origin'>Origin</Col>
                        <Col xs="4" key='Destination'>Destination</Col>
                        <Col xs="4" key='Distance'>{"Distance ("+units+")"} </Col>
                    </Row>
                    <hr/>
                    {this.putData()}
                </Container>
            </React.Fragment>
            );
        }
    }


    render() {
        return (
            <React.Fragment>
                <CardBody>
                    <CardTitle> Itinerary : {this.props.trip.title}</CardTitle>
                    {this.createTable()}
                </CardBody>
            </React.Fragment>
        )
    }
}

export default Itinerary;