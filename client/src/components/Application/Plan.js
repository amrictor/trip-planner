import React, {Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { ButtonGroup, Button } from 'reactstrap';
import { request, get_config } from '../../api/api';
import Itinerary from './Itinerary';
import {Collapse} from 'reactstrap'
import {Form} from 'reactstrap'
import {Input} from 'reactstrap'

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
        this.planRequest = this.planRequest.bind(this);
        this.state = {
            showComponent: false,
            isload: false,
            isloaded: false,
            issearch: false,
            isadd: false
        };
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
        request(this.props.trip, 'plan', this.props.port, this.props.host).then(response => this.props.updateBasedOnResponse(response));
        this.setState({
            showComponent: true,
        });
    }

    showSearchResult(){
        //WRITE FUNCTION TO SHOW RESULT WITH ADD OPTION
    }

    addPlace(id, name, lat, long){
        //WRITE FUNCTION TO UPDATE PLACE
        const place = {id: id, name: name, latitude: lat, longitude: long};
        //console.log(place);
        this.props.updatePlaces(place);

    }

    clearFileUploader(){
        const defaultState = {
            type: "trip",
            title: "",
            options : {
                units: "miles",
                unitName: "",
                unitRadius: 0,
                optimization: "none"
            }
        };
        this.props.updateBasedOnResponse(defaultState);
        this.state.isloaded = false;
    }

    toggleLoad() {
        this.setState({ isload: !this.state.isload });
    }
    toggleSearch() {
        this.setState({ issearch: !this.state.issearch });
    }
    toggleAdd() {
        this.setState({ isadd: !this.state.isadd });
    }

    render() {
        const fileuploader =
            <Collapse isOpen={this.state.isload}>
                <p><b>Upload your trip file: </b></p>
                <form>
                    <input type="file" name="myFile" id="example" onChange={(event) => {this.getFile(event);this.setState({isloaded: true})}}/>
                </form>
            </Collapse>;

        const searchquery =
            <Collapse isOpen={this.state.issearch}>
                <Form inline>
                    <Input
                        type="text"
                        name="query"
                        id="query_field"
                        placeholder="Query"
                    />
                    <Button
                        key={'options_submit'}
                        className='btn-outline-dark unit-button'
                        onClick={()=> this.showSearchResult()}
                    >
                        Search
                    </Button>
                </Form>
            </Collapse>;

        const addbody =
            <Collapse isOpen={this.state.isadd}>
                <Input
                    type="text"
                    name="id"
                    id="id_field"
                    placeholder="id"
                />
                <Input
                    type="text"
                    name="name"
                    id="name_field"
                    placeholder="name"
                />
                <Input
                    type="number"
                    name="latitude"
                    id="latitude_field"
                    placeholder="latitude"
                />
                <Input
                    type="number"
                    name="longitude"
                    id="longitude_field"
                    placeholder="longitude"
                />
                <Button
                    key={'options_submit'}
                    className='btn-outline-dark unit-button'
                    onClick={()=> this.addPlace(id_field.value, name_field.value, latitude_field.value, longitude_field.value)}
                >
                    Add
                </Button>
            </Collapse>;

        return (
            <Card>
                <CardBody id="Plan">
                    <CardTitle>Plan</CardTitle>


                    <Button
                        key={'load'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={()=> this.toggleLoad()}
                        active={this.state.isload === true}
                    >
                        Load
                    </Button>
                    {fileuploader}


                    <Button
                        key={'clear'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={()=> this.clearFileUploader()}
                        disabled={this.state.isloaded === false}
                    >
                        Clear
                    </Button>

                    <Button
                        key={'plan'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.planRequest()}
                        disabled={this.state.isloaded === false}
                    >
                        Plan
                    </Button>
                    {this.state.showComponent ?
                        <Itinerary trip={this.props.trip}/> :
                        null
                    }

                    <Button
                        key={'save'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        disabled={this.state.isloaded === false}
                    >
                        Save
                    </Button>


                </CardBody>

                <CardBody id="search">
                    <Button
                        key={'search'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={()=> this.toggleSearch()}
                    >
                        Search
                    </Button>
                    {searchquery}
                </CardBody>

                <CardBody id="add">
                    <Button
                        key={'add'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={()=> this.toggleAdd()}
                    >
                        Add
                    </Button>
                    {addbody}
                </CardBody>
            </Card>
        )
    }
}

export default Plan;