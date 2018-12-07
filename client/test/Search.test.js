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
import Search from '../src/components/Application/Search'

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
    },
    'search': {
        'version': 4,
        'type': "search",
        'match': "",
        'filters': [],
        'limit': 15,
        'found': 0,
        'places': []
    }
};

test('Test function showSearchResult', () => {
    const newSearch ={
        'version': 4,
        'type': "search",
        'match': "hahaha",
        'filters': ["sad","ohoh"],
        'limit': 15,
        'found': 0,
        'places': []};
    const updateBasedOnResponseMock = jest.fn();
    const wrapper = mount((
        <Search config={startProps.config} search={startProps.search} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));
    wrapper.instance().showSearchResult();

    const wrapper2 = mount((
        <Search config={startProps.config} search={startProps.search} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));
    wrapper2.setState({ numFilters: 0 });
    wrapper2.instance().showSearchResult();

    const wrapper3 = mount((
        <Search config={startProps.config} search={newSearch} trip={startProps.trip} updateBasedOnResponse={updateBasedOnResponseMock}/>
    ));
    wrapper3.instance().showSearchResult();
});
