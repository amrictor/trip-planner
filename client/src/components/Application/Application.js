import React, {Component} from 'react';
import {Container} from 'reactstrap';
import { TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import classnames from 'classnames';
import Info from './Info'
import Options from './Options';
import Plan from './Plan';
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
        else if (key === "remove") {
            const place = JSON.stringify(value);
            let trip = this.state.trip;
            if (typeof this.state.trip.places !== 'undefined') {
                trip["places"] = trip["places"].filter(function(ele){
                    return JSON.stringify(ele) !== place;
                });
            }
            this.setState(trip);
        }
        else if  (key === "reverse") {
            let trip = this.state.trip;
            trip["places"] = trip["places"].reverse();
            this.setState(trip);
        }
        else if  (key === "origin") {
            const place = JSON.stringify(value);
            let found = this.state.trip.places.findIndex(function(ele){
                return JSON.stringify(ele) === place;
            });
            let trip = this.state.trip;
            trip["places"] = trip["places"].slice(found);
            this.state.trip.places
            const arrayLength = this.state.trip.places.length;
            for (let i = 0; i < arrayLength; i++) {
                
            }
        }
    }
    toggleTab(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    render() {
        if (!this.state.config) {
            return <div/>
        }
        return (
            <React.Fragment>

                <Container>

                    <Nav tabs>

                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '1' })}
                                onClick={() => { this.toggleTab('1'); }}
                            >
                                <img src="https://cdn2.iconfinder.com/data/icons/web-mobile-app-basics/100/TiNY2_BASICS_Information-512.png" height="30"></img>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '2' })}
                                onClick={() => { this.toggleTab('2'); }}
                            >
                                <img src="https://cdn3.iconfinder.com/data/icons/airport-collection/100/23-512.png" height="30"></img>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '3' })}
                                onClick={() => { this.toggleTab('3'); }}
                            >
                                <img src="https://images.vexels.com/media/users/3/135553/isolated/preview/fe1680d9e81708fd79fc27b791401673-flat-calculator-icon-by-vexels.png" height="30"></img>
                            </NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink
                                className={classnames({ active: this.state.activeTab === '4' })}
                                onClick={() => { this.toggleTab('4'); }}
                            >
                                <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-gear-512.png" height="30"></img>
                            </NavLink>
                        </NavItem>

                    </Nav>
                </Container>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <Info/>
                    </TabPane>
                    <TabPane tabId="2">
                        <Plan
                            updateBasedOnResponse={this.updateBasedOnResponse}
                            updatePlaces={this.updatePlaces}
                            trip={this.state.trip}
                            places={this.state.places}
                            port={this.port}
                            host={this.host}
                        />
                    </TabPane>
                    <TabPane tabId="3">
                        <Calculator
                            updateDistanceBasedOnResponse={this.updateDistanceBasedOnResponse}
                            updateOriginAndDestination={this.updateOriginAndDestination}
                            distance={this.state.distance}
                        />
                    </TabPane>
                    <TabPane tabId="4">
                        <Options
                            options={this.state.trip.options}
                            config={this.state.config}
                            updateOptions={this.updateOptions}
                            updateHostAndPort={this.updateHostAndPort}
                        />
                    </TabPane>
                </TabContent>

            </React.Fragment>





        )
    }
}

export default Application;
