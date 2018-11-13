import React, {Component} from 'react';
import { Modal, ModalHeader, ModalFooter, ModalBody } from 'reactstrap';
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap';
import { Col, Container, Row, Table } from 'reactstrap';
import { ButtonGroup, Button } from 'reactstrap';
import {Collapse} from 'reactstrap';
import {Form, Label} from 'reactstrap';
import {Input, InputGroup, InputGroupAddon} from 'reactstrap'
import { request } from '../../api/api';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                version: 4,
                type: "search",
                match: "",
                filters: [],
                limit: 15,
                found: 0,
                places: []
            },
            isSearch: false,
            balloonport: true,
            heliport: true,
            airport: true,
            seaplane_base: true,
        };
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.showSearchResult = this.showSearchResult.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);

    }
    updateSearch() {
        let search = this.state.search;
        search['match'] = query_field.value;
        this.setState(search)
    }
    updateBasedOnResponse(value) {
        this.setState({'search': value});
    }
    showSearchResult(){
        this.state.search.filters = [];
        let filterType = [];
        if(this.state.balloonport){
            filterType.push("balloonport");
        }
        if(this.state.heliport){
            filterType.push("heliport");
        }
        if(this.state.airport){
            filterType.push("airport");
        }
        if(this.state.seaplane_base){
            filterType.push("seaplane base");
        }

        if (typeof filterType !== 'undefined'){
            this.addFilter("type", filterType);
        }

        if(this.state.search.match === "") return;

        request(this.state.search, 'search', this.props.port, this.props.host).then(response => {
            this.updateBasedOnResponse(response)
        });

        this.setState({ isSearch: true });
    }
    closeSearch() {
        query_field.value ="";
        this.updateSearch();
        this.setState({ isSearch: false });
    }
    addPlace(id, name, lat, long){
        const place = {'id': id, 'name': name, 'latitude': lat, 'longitude': long};
        this.props.updatePlaces(place,"add");
        this.props.planRequest();
    }
    addFilter(name, values){
        const filter = {'name': name, 'values': values};
        this.updateFilter(filter,"add");
    }
    updateFilter(value, key){
        if (key === "add") {
            if (typeof this.state.search.filters === 'undefined') {
                this.state.search.filters = [value];
            }
            else {
                const filter = JSON.stringify(value);
                let found = this.state.search.filters.findIndex(function(ele){
                    return JSON.stringify(ele) === filter;
                });
                if (found === -1)  {
                    this.state.search.filters.push(value);
                }
            }
        }
    }
    putData(){
        let data = [];
        for (let i = 0; i < this.state.search.places.length; i++){
            data.push(
                <React.Fragment key={this.state.search.places[i].id}>
                <Row>
                    <Col xs="2" key='id'>{this.state.search.places[i].id}</Col>
                    <Col xs="5" key='name'>{this.state.search.places[i].name}</Col>
                    <Col xs="2" key='lat'>{String(Math.round((this.state.search.places[i].latitude+ 0.00001) * 100)/100)}</Col>
                    <Col xs="2" key='lon'>{String(Math.round((this.state.search.places[i].longitude+ 0.00001) * 100)/100)}</Col>
                    <Col>
                        <Button
                            key={'add_submit'}
                            className='btn-outline-dark unit-button float-right'
                            onClick={() => this.addPlace(this.state.search.places[i].id, this.state.search.places[i].name, this.state.search.places[i].latitude, this.state.search.places[i].longitude)}
                        >
                            &#x2795;
                        </Button>
                    </Col>
                </Row>
                <hr/>
                </React.Fragment>
            );
            if(i===this.state.search.limit) break;
        }
        return data;
    }
    searchResults() {
        const style = {
            maxHeight: 400,
            overflowY: "scroll"
        }
        if (typeof this.state.search !== "undefined" && typeof this.state.search.places !== "undefined") {
            if (this.state.search.places.length > 0) {
                return (
                    <React.Fragment>
                        <Container>
                            <Row>
                                <Col xs="2" key='id'>ID</Col>
                                <Col xs="5" key='name'>Name</Col>
                                <Col xs="2" key='lat'>Lat</Col>
                                <Col xs="2" key='lon'>Lon</Col>
                            </Row>
                            <hr/>
                        </Container>
                        <Container style={style}>
                            {this.putData()}
                        </Container>
                        <div>
                            <h6>
                                <br></br><strong>Number of Search Results Found: </strong>
                                <font color="green">{this.state.search.found}</font>
                            </h6>
                        </div>
                    </React.Fragment>
                );
            }
        }
        return "No results available."
    }
    updateCheckbox(event){
        const target = event.target;
        const name = target.name;
        const value = target.type === 'checkbox' ? target.checked : target.value;

        this.setState({
            [name] : value
        });
    }
    listenForEnter(event) {
        if (event.keyCode == 13)
            this.showSearchResult();
    }

    render() {
        const searchquery=
        <React.Fragment>


                <InputGroup>
                    <label>
                        Airport:
                        <input
                            name="airport"
                            type="checkbox"
                            checked={this.state.airport}
                            onChange={this.updateCheckbox}
                        />
                    </label>
                    <label>
                        &nbsp;&nbsp;
                        Balloonport:
                        <input
                            name="balloonport"
                            type="checkbox"
                            checked={this.state.balloonport}
                            onChange={this.updateCheckbox}
                        />
                    </label>
                    <label>
                        &nbsp;&nbsp;
                        Heliport:
                        <input
                            name="heliport"
                            type="checkbox"
                            checked={this.state.heliport}
                            onChange={this.updateCheckbox}
                        />
                    </label>
                    <label>
                        &nbsp;&nbsp;
                        Seaplane base:
                        <input
                            name="seaplane_base"
                            type="checkbox"
                            checked={this.state.seaplane_base}
                            onChange={this.updateCheckbox}
                        />
                    </label>
                </InputGroup>
                <InputGroup>
                    <Input
                        type="text"
                        name="query"
                        id="query_field"
                        placeholder="Search"
                        onChange={()=>this.updateSearch()}
                        onKeyDown={(event)=>this.listenForEnter(event)}
                    />
                    <InputGroupAddon addonType="append">
                        <Button
                            key={'show_search_submit'}
                            className='btn-outline-dark unit-button'
                            onClick={()=> this.showSearchResult()}
                        >
                            &#x1f50d;
                        </Button>
                    </InputGroupAddon>
                    <InputGroupAddon addonType="append">
                        <Button
                            key={'close_search_submit'}
                            className='btn-outline-dark unit-button'
                            onClick={()=> this.closeSearch()}
                        >
                            &#x274c;
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
        </React.Fragment>;

        return (
            <React.Fragment>
                <CardTitle>Don't know your stop?</CardTitle>
                {searchquery}
                <Collapse isOpen={this.state.isSearch}>
                    <br/>
                    {this.searchResults()}
                </Collapse>
            </React.Fragment>
        )
    }
}

export default Search;
