import React, {Component} from 'react';
import {Container} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink, Col } from 'reactstrap';
import classnames from 'classnames';
import Info from './Info'
import Options from './Options';
import Plan from './Plan';
import {IconContext} from 'react-icons';
import {IoIosCalculator} from 'react-icons/io';
import {MdPeople, MdFlightTakeoff} from 'react-icons/md';
import {GoGear} from 'react-icons/go';

import Calculator from './Calculator';
import {get_config} from '../../api/api';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: null,
            distance: {
                type: "distance",
                version: 4,
                origin: {
                    latitude: 0,
                    longitude: 0
                },
                destination: {
                    latitude: 0,
                    longitude: 0
                },
                units: "miles",
                distance: 0
            },
            trip: {
                type: "trip",
                version: 4,
                title: "My Trip",
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
            },
            port: window.location.port,
            host: window.location.host,
            activeTab: '1'
        };
        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateHostAndPort = this.updateHostAndPort.bind(this);
        this.updatePlaces = this.updatePlaces.bind(this);
        this.updateOriginAndDestination = this.updateOriginAndDestination.bind(this);
        this.updateDistanceBasedOnResponse = this.updateDistanceBasedOnResponse.bind(this);
        this.toggleTab = this.toggleTab.bind(this);
    }

    componentWillMount() {

        get_config().then(
            config => {
                this.setState({
                    config: config
                })
            }
        );
    }

    updateHostAndPort(host, port) {
        port = port ? port : 0;
        this.port = port;
        host = host ? host : "black-bottle.cs.colostate.edu";
        this.host = host;

        get_config(this.port, this.host).then(
            config => {
                this.setState({
                    config: config
                })
            }
        );
    }

    updateDistanceBasedOnResponse(value) {
        this.setState({'distance': value});
    }

    updateOriginAndDestination(lat_f, long_f, lat_t, long_t) {
        let distance = this.state.distance;
        distance.origin = {latitude: lat_f, longtitude: long_f};
        distance.destination = {latitude: lat_t, longtitude: long_t};
        this.setState(distance);
    }

    updateTrip(field, value) {
        let trip = this.state.trip;
        trip[field] = value;
        this.setState(trip);
    }

    updateBasedOnResponse(value) {
        if(JSON.stringify(value)!=='{}') this.setState({'trip': value});
        else console.log("Error on server")
    }

    updateOptions(option, value) {
        let trip = this.state.trip;
        trip.options[option] = value;
        this.setState(trip);
    }

    //key can only be {"add", "remove", "reverse", "origin"}, and perform accordingly
    updatePlaces(value, key) {
        if (key === "add") {
            this.addPlace(value);
        }
        else if (key === "remove") {
            this.removePlace(value);
        }
        else if  (key === "reverse") {
            this.reversePlaces();
        }
        else if  (key === "origin") {
            this.setFirstPlace(value);
        }
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    addPlace(value) {
        if (typeof this.state.trip.places === 'undefined') {
            this.state.trip.places = [value];
        }
        else {
            const place = JSON.stringify(value);
            let found = this.state.trip.places.findIndex(function(ele){
                return JSON.stringify(ele) === place;
            });
            if (found === -1)  {
                this.state.trip.places.push(value);
            }
        }
    }

    removePlace(value){
        const place = JSON.stringify(value);
        let trip = this.state.trip;
        if (typeof this.state.trip.places !== 'undefined') {
            trip["places"] = trip["places"].filter(function(ele){
                return JSON.stringify(ele) !== place;
            });
        }
        this.setState(trip);
    }

    reversePlaces() {
        let trip = this.state.trip;
        trip.places.reverse();
        this.setState(trip);
    }

    setFirstPlace(index) {

        let places = [];
        for (let i = 0; i < this.state.trip.places.length; i++) {
            places.push(this.state.trip.places[index]);
            index = (index + 1) % this.state.trip.places.length;
        }
        let trip = this.state.trip;
        trip.places = places;
        this.setState(trip);
    }

    render() {
        if (!this.state.config) {
            return <div/>
        }
        const style ={textDecoration: 'none'};
        const aStyle ={color: '#255f35', textDecoration: 'none'};
        return (
            <React.Fragment>
                <IconContext.Provider value={{ size: '2.7em' }}>
                <Container>
                    <Nav tabs>
                        <Col><h4 style={{'position': 'absolute', 'bottom':'0px'}}><b>Team Dave</b></h4></Col>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1');}}
                                style={(this.state.activeTab === '1')? aStyle : style}
                            >
                                <MdFlightTakeoff/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                                style={(this.state.activeTab === '2')? aStyle : style}
                            >
                                <IoIosCalculator/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggleTab('3'); }}
                                style={(this.state.activeTab === '3')? aStyle : style}
                            >
                                <GoGear/>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggleTab('4'); }}
                                style={(this.state.activeTab === '4')? aStyle : style}
                            >
                                <MdPeople/>
                            </NavLink>
                        </NavItem>
                    </Nav>
                </Container>
            </IconContext.Provider>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Plan
                            updateBasedOnResponse={this.updateBasedOnResponse}
                            updatePlaces={this.updatePlaces}
                            updateTrip={this.updateTrip}
                            config={this.state.config}
                            trip={this.state.trip}
                            places={this.state.places}
                            port={this.port}
                            host={this.host}
                        />
                    </TabPane>
                    <TabPane tabId="2">
                        <Calculator
                            updateDistanceBasedOnResponse={this.updateDistanceBasedOnResponse}
                            updateOriginAndDestination={this.updateOriginAndDestination}
                            distance={this.state.distance}
                        />
                    </TabPane>
                    <TabPane tabId="3">
                        <Options
                            options={this.state.trip.options}
                            config={this.state.config}
                            updateOptions={this.updateOptions}
                            updateHostAndPort={this.updateHostAndPort}
                        />
                    </TabPane>
                    <TabPane tabId="4">
                        <Info/>
                    </TabPane>
                </TabContent>
            </React.Fragment>
        )
    }
}

export default Application;
