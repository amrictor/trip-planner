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
import Calculator from '../src/components/Application/Calculator'

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

test('Test function toggleItin', () => {
    const wrapper = mount((
        <Calculator config={startProps.config} trip={startProps.trip}/>
    ));
    wrapper.instance().toggleItin();
});

test('Test function removePlace', () => {
    const updatePlacesMock = jest.fn();
    const planRequestMock = jest.fn();
    const wrapper = mount((
        <Itinerary config={startProps.config}  trip={newTrip} updatePlaces={updatePlacesMock} planRequest={planRequestMock} realTime={true}/>
    ));
    wrapper.instance().removePlace(1029,'testPlace',100,200);
    const wrapper2 = mount((
        <Itinerary config={startProps.config}  trip={startProps.trip} updatePlaces={updatePlacesMock} planRequest={planRequestMock} />
    ));
    wrapper2.instance().removePlace(1029,'testPlace',100,200);
});

test('Test function putData', () => {
    const updatePlacesMock = jest.fn();
    const planRequestMock = jest.fn();
    const wrapper = mount((
        <Itinerary config={startProps.config}  trip={newTrip} updatePlaces={updatePlacesMock} planRequest={planRequestMock} />
    ));
    wrapper.instance().putData();
    const wrapper2 = mount((
        <Itinerary config={startProps.config}  trip={startProps.trip} updatePlaces={updatePlacesMock} planRequest={planRequestMock} />
    ));
    wrapper2.instance().putData();
    const wrapper3 = mount((
        <Itinerary config={startProps.config}  trip={newTripWDist} updatePlaces={updatePlacesMock} planRequest={planRequestMock} />
    ));
    wrapper3.instance().putData();
});

test('Test function updateCheckbox', () => {
    const event = {target: {name: "testPlace"}};
    const event2 = {target: {name: "testPlace"}};
    const updatePlacesMock = jest.fn();
    const planRequestMock = jest.fn();
    const updateTripMock = jest.fn();
    const wrapper = mount((
        <Itinerary config={startProps.config}  trip={newTrip} updatePlaces={updatePlacesMock} planRequest={planRequestMock} updateTrip={updateTripMock}/>
    ));
    wrapper.instance().updateCheckbox(event);
    wrapper.instance().updateCheckbox(event2);

    const event3 = {target: {value: "nextPlace"}};
    wrapper.find('#trip_title').at(0).simulate('change', event3);
    wrapper.find('#options_submit_field').at(0).simulate('click');
    wrapper.find('#options_hide_itin_field').at(0).simulate('click');
});
