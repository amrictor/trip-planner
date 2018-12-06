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
import Itinerary from '../src/components/Application/Itinerary'

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
        <Itinerary config={startProps.config} trip={startProps.trip}/>
    ));
    wrapper.instance().toggleItin();
});

test('Test function removePlace', () => {
    const wrapper = mount((
        <Itinerary config={startProps.config} />
    ));
    wrapper.instance().removePlace('0391','testPlace',100,200);
});

test('Check to see if real time debug modes are chosen correctly onclick', () => {
    const wrapper = mount((
        <Itinerary config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    options.find('Button').map((element) => actual.push(element.prop('value')));  // (2)
    let realTime = actual.slice(0, 2);

    expect(realTime).toEqual([true,false]);  // (3)
});

test('Test for small line of codes', () => {
    const updateOptionsMock = jest.fn();
    const updateHostAndPortMock = jest.fn();
    const updateRealTimeMock = jest.fn();
    const component = mount((
        <Options config={startProps.config} options={startProps.options} updateOptions={updateOptionsMock} updateHostAndPort={updateHostAndPortMock} updateRealTime={updateRealTimeMock}/>
    ));
    component.find('#options_submit_opts_field').at(0).simulate('click');
    component.find('#options_submit_maps_field').at(0).simulate('click');
    component.find('#options_submit_rT_field').at(0).simulate('click');
    component.find('#options_submit_hostport_field').at(0).simulate('click');
    component.find('#host_field').at(0).simulate('change');
    component.find('#port_field').at(0).simulate('change');
    component.find('#unit_name_field').at(0).simulate('change');
    component.find('#unit_radius_field').at(0).simulate('change');
});


