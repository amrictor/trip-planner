import React, {Component} from 'react';
import {Container} from 'reactstrap';
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
                version: 3,
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
                version: 3,
                title: "",
                options: {
                    units: "miles",
                    unitName: "",
                    unitRadius: 0,
                    optimization: "none"
                },
                places: [],
                distances: [],
                map: '<svg width="1920" height="20" xmlns="http://www.w3.org/2000/svg" xmlns:svg="http://www.w3.org/2000/svg"><g></g></svg>'
            },
            port: window.location.port,
            host: window.location.host
        };
        this.updateTrip = this.updateTrip.bind(this);
        this.updateBasedOnResponse = this.updateBasedOnResponse.bind(this);
        this.updateOptions = this.updateOptions.bind(this);
        this.updateHostAndPort = this.updateHostAndPort.bind(this);
        this.updatePlaces = this.updatePlaces.bind(this);
        this.updateOriginAndDestination = this.updateOriginAndDestination.bind(this);
        this.updateDistanceBasedOnResponse = this.updateDistanceBasedOnResponse.bind(this);

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
        this.port = port;
        if (host !== "") {
            this.host = host;
        } else this.host = "black-bottle.cs.colostate.edu";
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
        this.setState({'trip': value});
    }

    updateOptions(option, value) {
        let trip = this.state.trip;
        trip.options[option] = value;
        this.setState(trip);
    }

    updatePlaces(value) {
        if (typeof this.state.places === 'undefined') {
            this.state.places = [value];
        }
        else {
            this.state.places.push(value);
        }

        console.log(this.state.places);
    }

    render() {
        if (!this.state.config) {
            return <div/>
        }
        return (
            <Container id="Application">
                <Info/>
                <Plan
                    updateBasedOnResponse={this.updateBasedOnResponse}
                    updatePlaces={this.updatePlaces}
                    trip={this.state.trip}
                    places={this.state.places}
                    port={this.port}
                    host={this.host}
                />
                <Calculator
                    updateDistanceBasedOnResponse={this.updateDistanceBasedOnResponse}
                    updateOriginAndDestination={this.updateOriginAndDestination}
                    distance={this.state.distance}
                />
                <Options
                    options={this.state.trip.options}
                    config={this.state.config}
                    updateOptions={this.updateOptions}
                    updateHostAndPort={this.updateHostAndPort}
                />
            </Container>
        )
    }
}

export default Application;
