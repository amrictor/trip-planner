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
import Application from '../src/components/Application/Application'
import { NavLink } from 'react-router-dom'

/* Both of these tests are functionally identical although the standard way
 *  of writing tests uses lambda or anonymous functions. These are useful
 *  for defining functions that will only be in your code once but may be
 *  called multiple times by whatever they are passed to.
*/

/* A test response for our client to use;
 * this object represents the props that would be passed to the Options
 * component on construction.
 */
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


test('Test function updateHostAndPort', () => {
    const wrapper = mount((
        <Application config={startProps.config} />
    ));
    wrapper.instance().updateHostAndPort("localhost", 8088);
    expect(wrapper.state('host')).toEqual("localhost");
    expect(wrapper.state('port')).toEqual(8088);
});

test('Test function updateOriginAndDestination', () => {
    const wrapper = mount((
        <Application config={startProps.config} distance={startProps.distance}/>
    ));
    wrapper.instance().updateOriginAndDestination(100,200,400,300);
    expect(wrapper.state('origin')).toEqual({"latitude": 100, "longtitude": 200});
    expect(wrapper.state('destination')).toEqual({"latitude": 400, "longtitude": 300});
});

test('Test function updateDistanceBasedOnResponse', () => {
    const wrapper = mount((
        <Application config={startProps.config}/>
    ));
    wrapper.instance().updateDistanceBasedOnResponse(1000);
    expect(wrapper.state('distance')).toEqual(1000);
});

test('Test function updateTrip', () => {
    const wrapper = mount((
        <Application config={startProps.config}/>
    ));
    wrapper.instance().updateTrip('units','miles');
    expect(wrapper.state('units')).toEqual('miles');
});

test('Test function updateBasedOnResponse', () => {
    const wrapper = mount((
        <Application config={startProps.config} trip={startProps.trip}/>
    ));
    wrapper.instance().updateBasedOnResponse({distances: [], map: "", options: {}, places: [], title: "", type: "trip", version: 4});
    expect(wrapper.state('trip')).toEqual(startProps.trip);
});

test('Test function updateOptions', () => {
    const wrapper = mount((
        <Application config={startProps.config} options={startProps.options}/>
    ));
    wrapper.instance().updateOptions('units','miles');
    expect(wrapper.state('options')).toEqual({"map": "svg", "optimization": "none", "unitName": "", "unitRadius": 0, "units": "miles"});
});

test('Test function updatePlaces', () => {
    const wrapper = mount((
        <Application config={startProps.config} trip={startProps.trip}/>
    ));
    const place = {'id': 1029, 'name': "testPlace", 'latitude': 100, 'longitude': 200};
    const place2 = {'id': 1049, 'name': "testPlace2", 'latitude': 130, 'longitude': 250};
    wrapper.instance().updatePlaces(place,'add');
    wrapper.instance().updatePlaces(place,'add');
    wrapper.instance().updatePlaces(place,'remove');
    wrapper.instance().updatePlaces(place,'remove');
    wrapper.instance().updatePlaces(place,'add');
    wrapper.instance().updatePlaces(place2,'add');
    wrapper.instance().updatePlaces('','reverse');
    wrapper.instance().updatePlaces(place,'origin');
    wrapper.instance().updatePlaces(place,'');
});

test('Test function updateRealTime', () => {
    const wrapper = mount((
        <Application config={startProps.config} />
    ));
    wrapper.instance().updateRealTime('true');
    wrapper.instance().updateRealTime('false');
});

test('Test function toggleTab', () => {
    const wrapper = mount((
        <Application config={startProps.config} />
    ));
    wrapper.instance().toggleTab(2);
    wrapper.instance().toggleTab(2);


    let actual = [];
    expect(wrapper.find('.float-right').prop('className')).toEqual('/home');
    //expect(actual).toEqual(startProps.config.units);
});

test('Test for small line of codes', () => {
    const wrapper = mount((
        <Application config={startProps.config} trip={startProps.trip}/>
    ));
    wrapper.setState({ config: startProps.config });
});


