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
    }
};


test('Test function updateHostAndPort', () => {
    const updateHostAndPortMock = jest.fn();
    const wrapper = mount((
        <Application config={startProps.config} updateHostAndPort={updateHostAndPortMock}/>
    ));
    wrapper.instance().updateHostAndPort("localhost", 8088);
    wrapper.update();
    expect(wrapper.state('hostname')).toEqual("localhost");
});

test('Test function updateOriginAndDestination', () => {
    let o = new Application({});
    o.updateOriginAndDestination({lat_f: 100, long_f: 280, lat_t: 400, long_t: 380});
});

test('Test for small line of codes', () => {

});


