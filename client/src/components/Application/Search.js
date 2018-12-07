import React, { Component } from 'react';
import { CardTitle } from 'reactstrap';
import { Col, Container, Row } from 'reactstrap';
import { Button } from 'reactstrap';
import { Collapse } from 'reactstrap';
import { Input, InputGroup, InputGroupAddon } from 'reactstrap'
import { request } from '../../api/api';
import {Dropdown, DropdownToggle, DropdownMenu, DropdownItem} from 'reactstrap'

import {IconContext} from 'react-icons';
import { MdSearch, MdClear, MdAdd } from 'react-icons/md'

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: {
                version: 4,
                type: "search",
                match: "",
                filters: JSON.parse(JSON.stringify(this.props.config.filters.slice())),
                limit: 15,
                found: 0,
                places: []
            },

            isSearch: false,
            attributes: JSON.parse(JSON.stringify(this.props.config.attributes)),
            numFilters: this.props.config.filters.reduce((total, filter) =>  total + filter.values.length, 0),
            dropdownOpen: false

        };
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.showSearchResult = this.showSearchResult.bind(this);
        this.updateCheckbox = this.updateCheckbox.bind(this);
        this.updateAttributes = this.updateAttributes.bind(this);
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            dropdownOpen: !prevState.dropdownOpen
        }));
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
        if(this.state.numFilters < 1) {
            alert('You cannot conduct a search with no filters!');
            return;
        }
        if(this.state.search.match === "") return;

        request(this.state.search, 'search', this.props.port, this.props.host).then(response => {
            this.updateBasedOnResponse(response)
        });

        this.setState({ isSearch: true });
    }
    closeSearch() {
        query_field.value = "";
        this.updateSearch();
        this.setState({ isSearch: false });
    }
    addPlace(id, name, lat, long){
        const place = {'id': id, 'name': name, 'latitude': lat, 'longitude': long};
        this.props.updatePlaces(place,"add");
        if (this.props.realTime) this.props.planRequest();
    }
    putData(){
        let data = [];
        for (let i = 0; i < this.state.search.places.length; i++){
            let rowData = [];
            for (let j = 0; j < this.state.attributes.length; j++) {
                let attribute = this.state.attributes[j];
                let size = !this.state.attributes.includes('name')
                    ? Math.floor(12/(this.state.attributes.length))
                    : (attribute==='name')
                        ? 4
                        : Math.floor(8/(this.state.attributes.length-1));
                rowData.push(
                    <Col md={size} key={this.state.attributes[i]+'_'+i+'_'+j}>
                        {
                            (typeof this.state.search.places[i][attribute] === 'number')
                                ? String(Math.round((this.state.search.places[i][attribute]+ 0.00001) * 100)/100)
                                : this.state.search.places[i][attribute]
                        }
                    </Col>
                );
            }

            data.push(
                <React.Fragment key={this.state.search.places[i].id}>
                <Row>
                    <Col xs={'10'}>
                        <Row>
                            {rowData}
                        </Row>
                    </Col>
                    <Col xs={'2'}>
                        <Button
                            key={'add_submit'}
                            className='btn-outline-dark unit-button float-right'
                            onClick={() => this.addPlace(this.state.search.places[i].id, this.state.search.places[i].name, this.state.search.places[i].latitude, this.state.search.places[i].longitude)}
                        >
                            <MdAdd/>
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
    putHeader() {
        let data = [];
        for (let i = 0; i < this.state.attributes.length; i++) {
            let attribute = this.state.attributes[i];
            let size = !this.state.attributes.includes('name')
                ? Math.floor(12/(this.state.attributes.length))
                : (attribute==='name')
                    ? 4
                    : Math.floor(8/(this.state.attributes.length-1));
            data.push(
                <Col md={size} key={attribute}>
                    {(attribute==='id') ? 'ID' : attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                </Col>
            );
        }
        return data;
    }

    searchResults() {
        const style = {
            maxHeight: 400,
            overflowY: "scroll"
        };
        if (typeof this.state.search !== "undefined" && typeof this.state.search.places !== "undefined") {
            if (this.state.search.places.length > 0) {
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
                        <div key = 'total'>
                            <h6>
                                <br/>
                                <strong>
                                    Showing&nbsp;
                                    <font color="green">{(this.state.search.limit < this.state.search.found)
                                        ? this.state.search.limit
                                        : this.state.search.found}</font>
                                    &nbsp;of&nbsp;
                                    <font color="green">{this.state.search.found}</font>
                                    &nbsp;results found.
                                </strong>
                            </h6>
                        </div>
                    </React.Fragment>
                );
            }
        }
        return "No results available."
    }
    updateCheckbox(event, filter){
        let index = this.state.search.filters.indexOf(this.state.search.filters.find(filt => filt.name === filter));
        let valIndex = this.state.search.filters[index].values.indexOf(event.target.name);

        if(valIndex === -1) {
            this.state.search.filters[index].values.push(event.target.name);
            this.state.numFilters++;
        }
        else {
            this.state.search.filters[index].values.splice(valIndex, 1);
            this.state.numFilters--;
        }

        this.forceUpdate();
    }

    updateAttributes(event){
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

    contains(value, filter){
        if(typeof this.state.search.filters === 'undefined') this.state.search.filters = [];
        let obj = this.state.search.filters.find(filt => filt.name === filter);
        if (typeof obj === 'undefined') return false;
        return (obj["values"].indexOf(value) !== -1);
    }

    listenForEnter(event) {
        if (event.keyCode === 13)
            this.showSearchResult();
    }

    render() {
        const filters = this.props.config.filters.map((filter) =>
            filter.values.map((value) =>
                <Row className={'float-right'} key={'row_'+value}>
                    <label key={'checkbox_'+filter.name+'_'+value}>
                        <input
                            name={value}
                            type="checkbox"
                            checked={this.contains(value, filter.name)}
                            onChange={(event) => this.updateCheckbox(event, filter.name)}
                        />
                        {value.charAt(0).toUpperCase() + value.slice(1) + " "}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </label>
                </Row>
                )
        );
        const searchquery=
            <React.Fragment>
                    <InputGroup>
                        <Input
                            type="text"
                            name="query"
                            id="query_field"
                            placeholder="Search"
                            onChange={()=>this.updateSearch()}
                            onKeyDown={(event)=>this.listenForEnter(event)}
                        />
                        &nbsp;
                        <InputGroupAddon addonType="append">
                            <Button
                                key={'show_search_submit'}
                                className='btn-outline-dark unit-button'
                                onClick={()=> this.showSearchResult()}
                            >
                                <MdSearch/>
                            </Button>
                        </InputGroupAddon>

                        <InputGroupAddon addonType="append">
                            <Button
                                key={'close_search_submit'}
                                className='btn-outline-dark unit-button'
                                onClick={()=> this.closeSearch()}
                            >
                                <MdClear/>
                            </Button>
                        </InputGroupAddon>
                    </InputGroup>
            </React.Fragment>;

        const attributes = this.props.config.attributes.slice().reverse().map((attribute) =>
            <label className={'float-right'} key={'search_' + attribute}>
                <input
                    key={"attribute_"+attribute}
                    name={attribute}
                    type="checkbox"
                    checked={this.state.attributes.includes(attribute)}
                    onChange={this.updateAttributes}
                />
                {(attribute==='id') ? 'ID' : attribute.charAt(0).toUpperCase() + attribute.slice(1)}
                &nbsp;&nbsp;
            </label>
        );
        const{list} = this.props
        const{listOpen, headerTitle} = this.state
        return (
            <IconContext.Provider value={{ size: '1.5em' }}>
                <CardTitle>Don't know your stop?</CardTitle>
                {filters}
                <Dropdown isOpen={this.state.dropdownOpen} size="sm" toggle={this.toggle}>
                    <DropdownToggle caret color="green">
                        Countries
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem>Costa Rica</DropdownItem>
                        <DropdownItem>Japan</DropdownItem>
                        <DropdownItem>Kenya</DropdownItem>
                        <DropdownItem>Spain</DropdownItem>
                        <DropdownItem>United States</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                &nbsp;&nbsp;
                {searchquery}
                <Collapse isOpen={this.state.isSearch}>
                    <br/>
                    <Container>
                        {attributes}
                    </Container>
                    <br/>
                    <hr/>
                    {this.searchResults()}
                </Collapse>
            </IconContext.Provider>
        )
    }
}

export default Search;
