import React, {Component} from 'react';
import { CardBody, CardTitle } from 'reactstrap';
import { Col, Container, Row } from 'reactstrap';
import { ButtonGroup, Button } from 'reactstrap';
import { request } from '../../api/api';
import Itinerary from './Itinerary';
import Map from './Map';
import Search from './Search';
import { Collapse } from 'reactstrap';
import { Form } from 'reactstrap';
import { IconContext } from 'react-icons'
import { MdAdd } from 'react-icons/md'
import { Input, InputGroup } from 'reactstrap'

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
        this.planRequest = this.planRequest.bind(this);
        this.state = {
            isLoad: false,
            isSearch: false
        };
    }

    getFile(event){
        let reader = new FileReader();
        console.log(event);
        reader.onload = function(event) {
            let fileContent = event.target.result;
            let contents = JSON.parse(fileContent);
            this.props.updateBasedOnResponse(contents);
        }.bind(this);
        reader.readAsText(event.target.files[0]);
    }

    planRequest(){
        if (this.props.trip.places.length !== 0) {
            request(this.props.trip, 'plan', this.props.port, this.props.host).then(response => this.props.updateBasedOnResponse(response));
            this.setState({
                showComponent: true,
            });
        }
    }

    showSearchResult(){
        request(this.state.search, 'search', this.props.port, this.props.host).then(response => {
            this.props.updateBasedOnResponse(response)
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
        if(this.props.realTime) this.planRequest();
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

    saveToFile(fileType){
        let source = (fileType ==='json') ? JSON.stringify(this.props.trip) : this.props.trip.map;
        let filename = this.props.trip.title.replace(' ', '_') + '.' + fileType;
        let contentType = "application/" + fileType + ";charset=utf-8;";

        if (window.navigator && window.navigator.msSaveOrOpenBlob) {
            let blob = new Blob([decodeURIComponent(encodeURI(source))], { type: contentType });
            navigator.msSaveOrOpenBlob(blob, filename);
        } else {
            let a = document.createElement('a');
            a.download = filename;
            a.href = 'data:' + contentType + ',' + encodeURIComponent(source);
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
            <React.Fragment>
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
                </ButtonGroup>
                &nbsp;&nbsp;
                <ButtonGroup>
                    <Button
                        key={'save_trip'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.saveToFile('json')}
                    >
                        Export Trip
                    </Button>
                    <Button
                        key={'save_map'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.saveToFile(this.props.trip.options.map)}
                    >
                        Export Map
                    </Button>
                </ButtonGroup>
            </React.Fragment>;

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
                    <MdAdd/>
                </Button>
            </React.Fragment>;


        return (
            <IconContext.Provider value={{ size: '1.8em' }}>
                <Container>
                    <CardBody id="Plan">
                        <CardTitle>Plan a trip around the world!</CardTitle>
                        <hr/>
                        <Row>
                            <Col lg="5">
                                {functions}
                                {fileuploader}
                                <CardTitle>Add stops to your trip!</CardTitle>
                                {addBody}
                                <hr/>
                            </Col>
                            <Col lg="7">
                                <Map
                                    trip={this.props.trip}
                                />
                            </Col>
                          </Row>
                          <hr/>
                          <Search
                              config={this.props.config}
                              updatePlaces={this.props.updatePlaces}
                              planRequest={this.planRequest}
                              addPlace={this.addPlace}
                              places={this.state.places}
                              port={this.port}
                              host={this.host}
                              realTime = {this.props.realTime}
                          />
                            <br/>

                          <Itinerary
                              config={this.props.config}
                              trip={this.props.trip}
                              updatePlaces={this.props.updatePlaces}
                              planRequest={this.planRequest}
                              updateTrip={this.props.updateTrip}
                              realTime = {this.props.realTime}
                          />
                  </CardBody>
              </Container>
            </IconContext.Provider>
        )
    }
}

export default Plan;
