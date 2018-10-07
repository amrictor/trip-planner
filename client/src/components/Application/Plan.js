import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'

class Plan extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Card>

                <CardBody>
                    <CardTitle>Plan</CardTitle>
                    <p><b>Upload your trip file:</b></p>
                    <ButtonGroup>
                        {<form enctype="multipart/form-data" action="Resources/userupload" method="post">
                            <input id="image-file" type="file" />
                        </form>}
                    </ButtonGroup>
                </CardBody>
            </Card>
        )
    }
}

export default Plan;