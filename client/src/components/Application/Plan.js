import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'
import { request, get_config } from '../../api/api';

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
        this.planRequest = this.planRequest.bind(this);
    }

    getFile(event){
        let reader = new FileReader();
        reader.onload = function(event) {
            let fileContent = event.target.result;
            let contents = JSON.parse(fileContent);
            this.props.updateBasedOnResponse(contents);
        }.bind(this);
        reader.readAsText(event.target.files[0]);
    }
    planRequest(){
        request(this.props.trip, 'plan', 8088, 'localhost').then(response => this.props.updateBasedOnResponse(response));
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Plan</CardTitle>
                    <p><b>Upload your trip file: </b></p>
                    <form>
                        <input type="file" name="myFile" id="example" onChange={(event) => this.getFile(event)}/>
                    </form>

                    <Button
                        key={'plan'}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.planRequest()}
                    >
                        Plan
                    </Button>
                </CardBody>
            </Card>
        )
    }
}

export default Plan;