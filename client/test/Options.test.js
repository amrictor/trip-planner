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
import Options from '../src/components/Application/Options'
//import Application from '../src/components/Application/Application'

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

test('Check to see if real time debug modes are chosen correctly onclick', () => {
    const options = mount((
        <Options config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    options.find('Button').map((element) => actual.push(element.prop('value')));  // (2)
    let realTime = actual.slice(0, 2);

    expect(realTime).toEqual([true,false]);  // (3)
});

test('Check to see if units are chosen correctly onclick', () => {
    const options = mount((
        <Options config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    options.find('Button').map((element) => actual.push(element.prop('value')));  // (2)
    let realTime = actual.slice(2, 6);

    expect(realTime).toEqual(startProps.config.units);  // (3)
});

test('Check to see if maps are chosen correctly onclick', () => {
    const options = mount((
        <Options config={startProps.config} options={startProps.options}/>
    ));

    let actual = [];
    options.find('Button').map((element) => actual.push(element.prop('value')));  // (2)
    let poppedsubmitbuttons = actual.slice(7, 9);

    expect(poppedsubmitbuttons).toEqual(["svg", "kml"]);  // (3)
});

test('Check to see if optimizations are chosen correctly onclick', () => {
  const options = mount((
      <Options config={startProps.config} options={startProps.options}/>
    ));

  let actual = [];
  options.find('Button').map((element) => actual.push(element.prop('value')));  // (2)
    let poppedsubmitbuttons = actual.slice(9, 13);

  expect(poppedsubmitbuttons).toEqual(["none", "short", "shorter", "shortest"]);  // (3)
});

test('Test function updateUnits', () => {
    const updateUnitsMock = jest.fn();
    const updateOptionsMock = jest.fn();
    const component = mount((
        <Options config={startProps.config} options={startProps.options} updateUnits={updateUnitsMock} updateOptions={updateOptionsMock}/>
    ));
    component.find('#options_submit_units_field').at(0).simulate('click');
});

test('Test function userDefValues', () => {
    const userDefValuesMock = jest.fn();
    const updateOptionsMock = jest.fn();
    const component = mount((
        <Options config={startProps.config} options={startProps.options} userDefValues={userDefValuesMock} updateOptions={updateOptionsMock}/>
    ));
    component.find('#options_submit_userdefunits_field').at(0).simulate('click');
    component.setState({ name: 'super miles' });
    component.setState({ radius: 4000 });
    component.find('#options_submit_userdefunits_field').at(0).simulate('click');
});

test('Test function handleKeyDotPress', () => {
    const handleKeyDotPressMock = jest.fn();
    const component = mount((
        <Options config={startProps.config} options={startProps.options} handleKeyDotPress={handleKeyDotPressMock}/>
    ));
    window.alert = jest.fn();
    component.find('#port_field').at(0).simulate('keyPress', { preventDefault(){}, alert(){}, key: '.' });
    component.find('#port_field').at(0).simulate('keyPress', { preventDefault(){}, alert(){}, key: '+' });
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


