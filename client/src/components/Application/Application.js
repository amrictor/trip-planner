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
                    optimization: "none",
                    map: "svg"
                },
                places: [],
                distances: [],
                map: null
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

    //key can only be {"add", "remove"}, perform accordingly
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
            this.setState(trip)
        }
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
