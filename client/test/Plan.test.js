// Note the name of this file has X.test.js. Jest looks for any files with this pattern.

/*  First we import our Enzyme configuration (1), this is defined in a different
 *    file and is require to use Enzyme for components. In addition to the standard
 *    imports you've seen before, we are using Enzyme.shallow (2), this "renders"
 *    your component but only for the first layer in the DOM (ie. <Itinerary/> will
 *    just render <Itinerary/> even though it may have more components under it.).
 *    Shallow rendering prevents problems with lower components from showing up in
 *    the tests of parent components.
*/

import './enzyme.config.js'                   // (1)
import React from 'react'
import { mount, shallow } from 'enzyme'              // (2)
import Plan from '../src/components/Application/Plan'

const startProps = {
    'config': {
        "type"          : "config",
        "version"       : 4,
        "units"         : ["kilometers", "miles", "nautical miles", "user defined"],
        "optimization"  : [{"label":"none", "description":"The trip is not optimized."},
            {"label":"short", "description":"Nearest neighbor."},
            {"label":"shorter", "description":"2-opt."},
            {"label":"shortest", "description":"3-opt."}
        ],
        "attributes"    : ["name", "id", "latitude", "longitude"],
        "filters"       : [{"name":"type",
            "values":["balloonport", "heliport", "airport", "seaplane base"]}
        ],
        "maps"          : ["svg", "kml"]
    },
    "options" : {
        "units"        : "miles",
        "optimization" : "none",
        "map"          : "svg"
    },
    'distance': {
        "type"          : "distance",
        "version"       : 4,
        "origin"        : {"latitude":  40.5853, "longitude": -105.0844, "name":"Fort Collins, Colorado, USA"},
        "destination"   : {"latitude": -33.8688, "longitude":  151.2093, "name":"Sydney, New South Wales, Australia"},
        "units"         : "miles",
        "distance"      : 0
    },
    'trip': {
        "version"   : 4,
        "type"      : "trip",
        "title"     : "",
        "options"   : {},
        "places"    : [],
        "distances" : [],
        "map"       : ""
    }
};

test('Test function getFile', () => {

    const updateBasedOnResponseMock = jest.fn();
    const componentWrapper   = mount((
        <Plan config={startProps.config} options={startProps.options} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));
    const component          = componentWrapper.get(0);
    const fileContents       = '{"type":"trip","title":"Shoppingloop","options":{"units":"userdefined","unitName":"","unitRadius":3958.7613,"optimization":"none"},"places":[{"id":"dnvr","name":"Denver","latitude":39.7392,"longitude":-104.9903},{"id":"bldr","name":"Boulder","latitude":40.01499,"longitude":-105.27055},{"id":"foco","name":"FortCollins","latitude":40.585258,"longitude":-105.084419}],"distances":[],"map":"kml"}';
    const file               = new Blob([fileContents], {type : 'text/plain'});
    componentWrapper.find('#example').simulate('change', {target: {files: [file]}});
});

test('Test function planRequest', () => {
    const newTrip ={
        "version"   : 4,
        "type"      : "trip",
        "title"     : "",
        "options"   : {},
        "places"    : [{'id': 1029, 'name': "testPlace", 'latitude': 100, 'longitude': 200},{'id': 1049, 'name': "testPlace2", 'latitude': 130, 'longitude': 250}],
        "distances" : [],
        "map"       : ""};
    const updateBasedOnResponseMock = jest.fn();
    const wrapper = mount((
        <Plan config={startProps.config} options={startProps.options} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));

    wrapper.instance().planRequest();
    const wrapper2 = mount((
        <Plan config={startProps.config} options={startProps.options} trip={newTrip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));

    wrapper2.instance().planRequest();
});

test('Test function addPlace', () => {
    const updatePlacesMock = jest.fn();
    const updateBasedOnResponseMock = jest.fn();
    const wrapper = mount((
        <Plan config={startProps.config} options={startProps.options} trip={startProps.trip} updatePlaces ={updatePlacesMock} realTime={true} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));

    wrapper.instance().addPlace();
    wrapper.setState({ name: 'super miles' });
    wrapper.instance().addPlace();

    wrapper.find('#id_field').at(0).simulate('change');
    wrapper.find('#name_field').at(0).simulate('change');
    wrapper.find('#latitude_field').at(0).simulate('change');
    wrapper.find('#longitude_field').at(0).simulate('change');
    const wrapper2 = mount((
        <Plan config={startProps.config} options={startProps.options} trip={startProps.trip} updatePlaces ={updatePlacesMock} realTime={false}/>
    ));
    wrapper2.setState({ name: 'super miles2' });
    wrapper2.instance().addPlace();

    wrapper.instance().clearFileUploader();
    wrapper.instance().toggleLoad();
});

test('Test function calc', () => {
    const updateBasedOnResponseMock = jest.fn();
    const wrapper = mount((
        <Plan config={startProps.config} options={startProps.options} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));

    wrapper.instance().calc();
    wrapper.find('Button').simulate('click');
    wrapper.setState({ latf: 100 });
    wrapper.setState({ longf: 200 });
    wrapper.setState({ latt: 400 });
    wrapper.setState({ longt: 300 });
    wrapper.find('Button').simulate('click');

    wrapper.find('#latitude_f_field').at(0).simulate('change');
    wrapper.find('#longitude_f_field').at(0).simulate('change');
    wrapper.find('#latitude_t_field').at(0).simulate('change');
    wrapper.find('#longitude_t_field').at(0).simulate('change');
});