import React, {Component} from 'react'
import {Card, CardHeader, CardBody, CardTitle, Container} from 'reactstrap'
import teamPhoto from '/public/teamphoto.jpg'


export default class Info extends Component {
    render() {
        return (
            <Container>
              <CardBody>
                <CardTitle>Want to travel far and wide?</CardTitle>
                <hr/>
                <ol >
                  <li>
                    Choose options for trip planning, information to display about locations,
                    and how the trip map and itinerary should be saved.</li>
                  <li>
                    Choose your destinations by loading existing sets of destinations or
                    find more in an extensive database of locations worldwide.</li>
                  <li>
                    Plan the trip with the options you selected.
                    Review and revise the trip origin and order.
                    Save the trip map and itinerary for future reference.</li>
                </ol>
              </CardBody>
                <CardBody>
                    <CardTitle>Meet the devs</CardTitle>
                    <hr/>
                    <ol >
                        <img src={teamPhoto}/>
                        Application developers: Khanh Nguyen Le, Josette Grinslade, Abigail Rictor, Sam Westra
                    </ol>
                </CardBody>
            </Container>
        )
    }
}