import React, {Component} from 'react'
import { Card, CardBody, CardImg, CardTitle  } from 'reactstrap'
import { Col, Container, Row, Table } from 'reactstrap';
import { Button } from 'reactstrap'
import { ButtonGroup } from 'reactstrap';
import { Collapse } from 'reactstrap'
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import {Form} from 'reactstrap';

class Itinerary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            itin: true,
            attributes: JSON.parse(JSON.stringify(this.props.config.attributes)),
            total: 0
        };
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

    putData() {
        this.state.total=0;
        let data = [];
        if (typeof this.props.trip.places !== "undefined") {
            let size = this.props.trip.places.length;
            if (typeof this.props.trip.distances !== "undefined") {
                for (let i = 0; i < size; i++) {
                    let rowData = [];
                    for (let j = 0; j < this.state.attributes.length; j++) {
                        let attribute = this.state.attributes[j];
                        let size = !this.state.attributes.includes('name')
                            ? Math.floor(12/(this.state.attributes.length))
                            : (attribute==='name')
                                ? 4
                                : Math.floor(6/(this.state.attributes.length-1));
                        rowData.push(
                            <Col md={size} key={this.state.attributes[i]+'_'+i+'_'+j}>
                                {
                                    (typeof this.props.trip.places[i][attribute] === 'number')
                                    ? String(Math.round((this.props.trip.places[i][attribute]+ 0.00001) * 100)/100)
                                    : this.props.trip.places[i][attribute]
                                }
                            </Col>
                        );
                    }
                    data.push(
                        <React.Fragment key={this.props.trip.places[i].id}>
                            <Row>
                                <Col xs={'10'}>
                                    <Row>
                                        {rowData}
                                    </Row>
                                </Col>
                                <Col xs={'2'}>
                                    <ButtonGroup className='float-right'>
                                        <Button
                                            key={'add_submit_'+i}
                                            className='btn-outline-dark unit-button '
                                            onClick={() => this.removePlace(this.props.trip.places[i].id, this.props.trip.places[i].name, this.props.trip.places[i].latitude, this.props.trip.places[i].longitude)}
                                        >
                                            &#x2796;
                                        </Button>
                                        <Button
                                            key={'make_first_'+i}
                                            className='btn-outline-dark unit-button float-right'
                                            onClick={() => this.props.updatePlaces(i, "origin")}
                                        >
                                            &#x21a5;
                                        </Button>
                                    </ButtonGroup>
                                </Col>
                            </Row>
                            <Row>
                                <React.Fragment key={'distances_'+i}>
                                    <Col sm="12" md={{size: 6, offset: 3}}>
                                        <p>Leg Distance: <font color="#ff4500">{this.props.trip.distances[i]}</font>&nbsp;&nbsp;&nbsp;&nbsp;
                                        Cumulative Distance: <font color="#ff4500">{this.state.total}</font></p>
                                    </Col>
                                </React.Fragment>
                            </Row>
                            <hr/>
                        </React.Fragment>
                    );
                    this.state.total += this.props.trip.distances[i];


                }
                data.push(

                );
            }
            return data;
        }
    }

    putHeader() {
        let data = [];
        for (let i = 0; i < this.state.attributes.length; i++) {
            let attribute = this.state.attributes[i];
            let size = !this.state.attributes.includes('name')
                ? Math.floor(10/(this.state.attributes.length))
                : (attribute==='name')
                    ? 4
                    : Math.floor(6/(this.state.attributes.length-1));
            data.push(
                <Col md={size} key={attribute}>
                    {(attribute==='id') ? 'ID' : attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                </Col>
            );
        }
        return data;
    }


    createTable(){
        const style = {
            maxHeight: 400,
            overflowY: "scroll"
        };
        if(typeof this.props.trip.options.units !== "undefined") {
            return (
                <React.Fragment>
                    <Container>
                        <Row>
                            <Col xs={'10'}>
                                <Row>
                                    {this.putHeader()}
                                </Row>
                            </Col>
                            <Col xs={'2'}/>
                        </Row>
                        <hr/>
                    </Container>

                    <Container style={style}>
                        {this.putData()}
                    </Container>
                    <Container>
                        <Row key="Total">
                            <Col sm="12" md={{size: 4, offset: 4}}>
                                <b>Total Distance: <font color="green">{this.state.total}</font> {(this.props.trip.options.units==='user defined') ? this.props.trip.options.unitName : this.props.trip.options.units}</b>
                            </Col>
                        </Row>
                    </Container>
                </React.Fragment>
            );
        }
    }

    updateCheckbox(event){
        let index = this.state.attributes.indexOf(event.target.name);

        if(index === -1) {
            this.state.attributes.push(event.target.name);
        }
        else {
            this.state.attributes.splice(index, 1);
        }

        this.state.attributes.sort((a, b) =>
            this.props.config.attributes.indexOf(a) - this.props.config.attributes.indexOf(b)
        );

        this.forceUpdate();
    }

    render() {
        let toggle = this.state.itin ? "Hide Itinerary" : "Show Itinerary";
        const attributes = this.props.config.attributes.slice().reverse().map((attribute) =>
            <label className={'float-right'}>
                <input
                    key={"attribute_"+attribute}
                    name={attribute}
                    type="checkbox"
                    checked={this.state.attributes.includes(attribute)}
                    onChange={this.updateCheckbox}
                />
                {(attribute==='id') ? 'ID' : attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                &nbsp;&nbsp;
            </label>
        );
        return (

                <React.Fragment>
                    <CardTitle>
                        <Row>
                            <Col xs="5">

                                <Form inline>
                                    Itinerary :&nbsp;&nbsp;
                                    <InputGroup>
                                        <Input
                                            type="text"
                                            name="title"
                                            id="trip_title"
                                            placeholder="My Trip"
                                            onChange={() => this.props.updateTrip("title", trip_title.value)}
                                        />
                                    </InputGroup>
                                </Form>
                            </Col>
                            <Col>
                                <Button
                                    key='hide_itin'
                                    className='btn-outline-dark unit-button float-right'
                                    onClick={() => this.toggleItin()}
                                >
                                    {toggle}
                                </Button>
                            </Col>
                        </Row></CardTitle>

                    <Collapse isOpen={this.state.itin}>
                        {attributes}
                        <br/>
                        <hr/>
                        {this.createTable()}
                    </Collapse>
                </React.Fragment>
        )
    }
}

export default Itinerary;