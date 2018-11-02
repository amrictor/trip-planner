import React, {Component} from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Col, Container, Row, Table } from 'reactstrap';
import { ButtonGroup, Button } from 'reactstrap';
import { request } from '../../api/api';
import Itinerary from './Itinerary';
import Map from './Map';
import Search from './Search';
import {Collapse} from 'reactstrap';
import {Form} from 'reactstrap';

import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
        this.planRequest = this.planRequest.bind(this);
        this.state = {
            isLoad: false,
            isSearch: false
        };
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
    }
    updateBasedOnResponse(value) {
        this.setState({'search': value});
    }

    getFile(event){
        let reader = new FileReader();
        reader.onload = function(event) {
            let fileContent = event.target.result;
            let contents = JSON.parse(fileContent);
            this.props.updateBasedOnResponse(contents);
        }.bind(this);
        reader.readAsText(event.target.files[0]);
    }

    planRequest(){
        if (typeof this.props.trip !== "undefined") {
            request(this.props.trip, 'plan', this.props.port, this.props.host).then(response => this.props.updateBasedOnResponse(response));
            this.setState({
                showComponent: true,
            });
        }
    }

    showSearchResult(){
        request(this.state.search, 'search', this.props.port, this.props.host).then(response => {
            this.updateBasedOnResponse(response)
        });
        this.toggleSearch();
    }

    addPlace(id, name, lat, long){
        id = id ? id : "";
        name = name ? name : "";
        lat = lat ? lat : 0;
        long = long ? long : 0;
        if(id.length===0 || name.length===0 || lat ===0 || long ===0) return;
        const place = {'id': id, 'name': name, 'latitude': lat, 'longitude': long};
        this.props.updatePlaces(place,"add");
        this.planRequest();
    }

    clearFileUploader(){
        const defaultState = {
            type: "trip",
                version: 4,
                title: "",
                options: {
                    units: "miles",
                    unitName: "",
                    unitRadius: 0,
                    optimization: "none",
                    map: "svg"
                },
                places: [],
                distances: [],
                map: null
        };
        this.props.updateBasedOnResponse(defaultState);
    }

    saveToFile(){
        let filename = "export.json";
        let contentType = "application/json;charset=utf-8;";
        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(JSON.stringify(this.props.trip)))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(JSON.stringify(this.props.trip));
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
    }
    toggleLoad() {
        this.setState({ isLoad: !this.state.isLoad });
    }

    render() {
        const fileuploader =
            <Collapse isOpen={this.state.isLoad}>
                <p>Upload your trip file:</p>
                <form>
                    <input type="file" name="myFile" id="example" onChange={(event) => {this.getFile(event)}}/>
                </form>
            </Collapse>;

        const functions =
            <ButtonGroup>
                <Button
                    key={'load'}
                    color= "primary" style={{ marginBottom: '1rem' }}
                    className='btn-outline-dark unit-button'
                    onClick={()=> this.toggleLoad()}
                    active={this.state.isLoad}
                >
                    Load
                </Button>
                <Button
                    key={'clear'}
                    color= "primary" style={{ marginBottom: '1rem' }}
                    className='btn-outline-dark unit-button'
                    onClick={()=> this.clearFileUploader()}
                >
                    Clear
                </Button>
                <Button
                    key={'plan'}
                    color= "primary" style={{ marginBottom: '1rem' }}
                    className='btn-outline-dark unit-button'
                    onClick={() => this.planRequest()}
                >
                    Plan
                </Button>
                <Button
                    key={'save'}
                    color= "primary" style={{ marginBottom: '1rem' }}
                    className='btn-outline-dark unit-button'
                    onClick={() => this.saveToFile()}
                >
                    Save
                </Button>

            </ButtonGroup>
            ;

        const addBody =

            <React.Fragment>
                <Form>
                    <InputGroup>
                        <Input
                            type="text"
                            name="id"
                            id="id_field"
                            placeholder="ID"
                        />
                        <Input
                            type="text"
                            name="name"
                            id="name_field"
                            placeholder="Name"
                        />
                    </InputGroup>
                </Form>
                <Form>
                    <InputGroup>
                        <Input
                            type="number"
                            name="latitude"
                            id="latitude_field"
                            placeholder="Latitude"
                            step="0.00000001"
                        />
                        <Input
                            type="number"
                            name="longitude"
                            id="longitude_field"
                            placeholder="Longitude"
                            step="0.00000001"
                        />
                    </InputGroup>
                </Form>
                <Button
                    key={'options_submit'}
                    className='btn-outline-dark unit-button'
                    onClick={()=> this.addPlace(id_field.value, name_field.value, latitude_field.value, longitude_field.value)}
                    block
                >
                    &#x2795;
                </Button>
            </React.Fragment>;


        return (
            <React.Fragment>
                <Card>
                    <CardBody id="Plan">
                        <CardTitle>Plan a trip around Colorado!</CardTitle>
                        <hr/>
                        <Container>
                            <Row>
                                <Col md="5">
                                    {functions}
                                    {fileuploader}
                                    <CardTitle>Add stops to your trip!</CardTitle>
                                    {addBody}
                                    <hr/>
                                </Col>

                                <Col md="7">
                                    <Map
                                        trip={this.props.trip}
                                    />
                                </Col>
                            </Row>
                            <hr/>
                            <Search
                                updatePlaces={this.props.updatePlaces}
                                planRequest={this.planRequest}
                                addPlace={this.addPlace}
                                places={this.state.places}
                                port={this.port}
                                host={this.host}/>
                        </Container>
                        <Itinerary
                            trip={this.props.trip}
                            updatePlaces={this.props.updatePlaces}
                            planRequest={this.planRequest}
                        />
                    </CardBody>
                </Card>
            </React.Fragment>
        )
    }
}

export default Plan;
