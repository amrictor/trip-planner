import React, {Component} from 'react'
import { Card, CardBody, CardImg, CardTitle  } from 'reactstrap'
import { Col, Container, Row, Table } from 'reactstrap';
import { Button } from 'reactstrap'
import { Collapse } from 'reactstrap'

class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itin: true,
            Name: false,
            Id: false,
            Latitude: false,
            Longitude: false,
        }
        this.putData = this.putData.bind(this);
        this.createTable = this.createTable.bind(this);
        this.toggleItin = this.toggleItin.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
    }
    toggleItin() {
        this.setState({
            itin: !this.state.itin
        });
    }

    removePlace(id, name, lat, long){
        const place = {'id': id, 'name': name, 'latitude': lat, 'longitude': long};
        this.props.updatePlaces(place,"remove");
        if(this.props.trip.places.length>0) this.props.planRequest();
        else this.props.trip.map=null;
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
                                <Col xs="4" key='stop'>{this.props.trip.places[i].name}</Col>
                                <Col xs="2" key='leg'>{this.props.trip.distances[i]}</Col>
                                <Col xs="3" key='cumulative'>{total}</Col>
                                <Col>
                                    <Button
                                        key={'add_submit'}
                                        className='btn-outline-dark unit-button float-right'
                                        onClick={() => this.removePlace(this.props.trip.places[i].id, this.props.trip.places[i].name, this.props.trip.places[i].latitude, this.props.trip.places[i].longitude)}
                                    >
                                        &#x2796;
                                    </Button>

                                    <Button
                                        key={'make_first'}
                                        className='btn-outline-dark unit-button float-right'
                                        onClick={() => this.props.setFirstPlace(i)}
                                    >
                                        &#x21a5;
                                    </Button>
                                </Col>
                            </Row>
                            <hr/>
                        </React.Fragment>
                    );
                    total += this.props.trip.distances[i];
                }
                data.push(
                    <Row key="Total">
                        <Col sm="12" md={{ size:2, offset: 5 }}>
                            <b>Total: {total}</b>
                        </Col>
                    </Row>
                );
            }
        }
        return data;
    }

    createTable(){
        const style = {
            maxHeight: 400,
            overflowY: "scroll"
        }
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
                            <Col xs="4" key='stop'>Stop</Col>
                            <Col xs="3" key='leg'>{"Distance to Next Stop ("+units+")"}</Col>
                            <Col xs="3" key='cumulative'>{"Length of Trip ("+units+")"} </Col>
                        </Row>
                        <hr/>
                    </Container>

                    <Container style={style}>
                        {this.putData()}
                    </Container>
                </React.Fragment>
            );
        }
    }
    updateCheckbox(event){
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        console.log(value);
        this.setState({
            [name] : value
        });
    }
    render() {
        let toggle = this.state.itin ? "Hide Itinerary" : "Show Itinerary";
        return (

                <React.Fragment>
                        <label>
                            Name:
                            <input
                                name="Name"
                                type="checkbox"
                                checked={this.state.Name}
                                onChange={this.updateCheckbox}
                            />
                        </label>
                        <label>
                            &nbsp;&nbsp;
                            Id:
                            <input
                                name="Id"
                                type="checkbox"
                                checked={this.state.Id}
                                onChange={this.updateCheckbox}
                            />
                        </label>
                        <label>
                            &nbsp;&nbsp;
                            Latitude:
                            <input
                                name="Latitude"
                                type="checkbox"
                                checked={this.state.Latitude}
                                onChange={this.updateCheckbox}
                            />
                        </label>
                        <label>
                            &nbsp;&nbsp;
                            Longitude:
                            <input
                                name="Longitude"
                                type="checkbox"
                                checked={this.state.Longitude}
                                onChange={this.updateCheckbox}
                            />
                        </label>
                    <CardTitle>
                        <Row>
                            <Col xs="5">
                                Itinerary : {this.props.trip.title}
                            </Col>
                            <Col >
                                <Button
                                    key='hide_itin'
                                    className='btn-outline-dark unit-button float-right'
                                    onClick={() => this.toggleItin()}
                                >
                                    {toggle}
                                </Button>
                            </Col>
                        </Row></CardTitle>
                    <hr/>
                    <Collapse isOpen={this.state.itin}>
                        {this.createTable()}
                    </Collapse>
                </React.Fragment>
        )
    }
}

export default Itinerary;