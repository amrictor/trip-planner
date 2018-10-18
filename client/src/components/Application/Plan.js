import React, {Component} from 'react';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg, Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
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
            search: {
                version: 3,
                type: "search",
                match: "",
                limit: 0,
                places: []
            },
            showComponent: false,
            isload: false,
            isloaded: false,
            isSearch: false,
            isadd: false
        };
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.toggleSearch = this.toggleSearch.bind(this);
        this.showSearchResult = this.showSearchResult.bind(this);
    }
    updateSearch() {
        let search = this.state.search;
        search['match'] = query_field.value;
        this.setState(search)
        console.log(this.state.search)
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
        request(this.props.trip, 'plan', this.props.port, this.props.host).then(response => this.props.updateBasedOnResponse(response));
        this.setState({
            showComponent: true,
        });
    }

    showSearchResult(){
        this.updateSearch()
        request(this.state.search, 'search', this.props.port, this.props.host).then(response => {
            this.updateBasedOnResponse(response)
            console.log(this.state.search)
        });
        this.toggleSearch();
        //request(this.props.search, 'search', this.props.port, this.props.host).then(response => this.props.updateSearchBasedOnResponse(response));
        //NOW SEARCH STATE IS UPDATED. JUST SHOW THE RESULT, ADD BUTTON IS ALREADY IMPLEMENTED, WE ARE SETTING LIMIT TO 10 FOR NOW
    }

    addPlace(id, name, lat, long){
        const place = {id: id, name: name, latitude: lat, longitude: long};
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
        this.setState({ isload: !this.state.isload });
    }
    toggleSearch() {
        this.setState({ isSearch: !this.state.isSearch });
    }
    toggleAdd() {
        this.setState({ isadd: !this.state.isadd });
    }
    putData(){
        let data = [];
        for (let i = 0; i < 10; i++){
            data.push(<tr key={this.props.search.places[i].name}>
                <td>{this.props.search.places[i].id}</td>
                <td>{this.props.search.places[i].name}</td>
                <td>{this.props.search.places[i].latitude}</td>
                <td>{this.props.search.places[i].longitude}</td>
            </tr>);
        }
        return data;
    }
    searchPopUp(){
        if(this.state.search.places.size>0){
            return(
                        <table className={"table"}>
                            <thead>
                            <tr>
                                <th>ID</th><th>Name</th><th>Lat</th><th>Long</th>
                            </tr>
                            {this.putData()}
                            </thead>
                        </table>
            )
        }
        return "No search"
    }

    render() {
        const fileuploader =
            <Collapse isOpen={this.state.isload}>
                <p><b>Upload your trip file: </b></p>
                <form>
                    <input type="file" name="myFile" id="example" onChange={(event) => {this.getFile(event);this.setState({isloaded: true})}}/>
                </form>
            </Collapse>;

        const searchquery=
                <Form inline>
                        <Input
                            type="text"
                            name="query"
                            id="query_field"
                            placeholder="Query"
                        />&nbsp;
                        <Button
                            key={'options_submit'}
                            className='btn-outline-dark unit-button'
                            onClick={()=> this.showSearchResult()}
                        >
                            Search
                        </Button>
                </Form>;

        var searchPopUp=

            <Modal isOpen={this.state.isSearch} toggle={this.toggleSearch} className={this.props.className}>
                <ModalHeader toggle={this.toggleSearch}>Search Results</ModalHeader>
                    <ModalBody>
                        {this.searchPopUp()}
                    </ModalBody>
            </Modal>;

        const addbody =
            <Collapse isOpen={this.state.isadd}>
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
                <Input
                    type="number"
                    name="latitude"
                    id="latitude_field"
                    placeholder="Latitude"
                />
                <Input
                    type="number"
                    name="longitude"
                    id="longitude_field"
                    placeholder="Longitude"
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
            <plan>
            <Card>
                {searchPopUp}
                <CardBody id="Plan">
                    <CardTitle>Plan</CardTitle>
                        <ButtonGroup>
                            <Button
                                key={'load'}
                                color= "primary" style={{ marginBottom: '1rem' }}
                                className='btn-outline-dark unit-button'
                                onClick={()=> this.toggleLoad()}
                                active={this.state.isload === true}
                            >
                                Load
                            </Button>


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

                            <Button
                                key={'save'}
                                color= "primary" style={{ marginBottom: '1rem' }}
                                className='btn-outline-dark unit-button'
                                onClick={() => this.saveToFile()}
                                disabled={this.state.isloaded === false}
                            >
                                Save
                            </Button>
                        </ButtonGroup>
                    {fileuploader}

                    </CardBody>

                    <CardBody id="search">
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
                <Collapse isOpen={this.state.showComponent}>
                    {this.state.showComponent ?
                        <Itinerary
                            trip={this.props.trip}
                        /> :
                        null
                    }
                </Collapse>
            </plan>

        )
    }
}

export default Plan;