import React, {Component} from 'react';
import { Container } from 'reactstrap';
import Info from './Info'
import Options from './Options';
import Map from './Map';
import Plan from './Plan';
import Itinerary from './Itinerary';
import Calculator from './Calculator';
import { get_config } from '../../api/api';

/* Renders the application.
 * Holds the destinations and options state shared with the trip.
 */
class Application extends Component {
    constructor(props){
        super(props);
        this.state = {
            config: null,
            trip: {
                type: "trip",
                title: "",
                options : {
                    units: "miles",
                    unitName: "",
                    unitRadius: 0
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

    }

    componentWillMount() {
        get_config().then(
            config => {
                this.setState({
                    config:config
                })
            }
        );
    }

    updateHostAndPort(value){
        this.port = value;
        this.host = "black-bottle.cs.colostate.edu";
    }

    updateTrip(field, value){
        let trip = this.state.trip;
        trip[field] = value;
        this.setState(trip);
    }

    updateBasedOnResponse(value) {
        this.setState({'trip': value});
    }

    updateOptions(option, value){
        let trip = this.state.trip;
        trip.options[option] = value;
        this.setState(trip);
    }

    render() {
        if(!this.state.config) { return <div/> }

        return(
            <Container id="Application">
              <Info/>
              <Plan
                  updateBasedOnResponse={this.updateBasedOnResponse}
                  trip={this.state.trip}
                  port={this.port}
                  host={this.host}
              />
              <Itinerary
                  trip={this.state.trip}
              />
              <Map
                  svg={this.state.trip.map}
              />
              <Calculator/>
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
