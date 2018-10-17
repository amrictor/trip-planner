import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'
import { request, get_config } from '../../api/api';
import Itinerary from './Itinerary';
import {Collapse} from 'reactstrap'

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
        this.planRequest = this.planRequest.bind(this);
        this.state = {
            showComponent: false,
            isload: false
        };
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
        request(this.props.trip, 'plan', this.props.port, this.props.host).then(response => this.props.updateBasedOnResponse(response));
        this.setState({
            showComponent: true,
        });
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
                        key={'load'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                    >
                        Load
                    </Button>

                    <Button
                        key={'clear'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                    >
                        Clear
                    </Button>

                    <Button
                        key={'plan'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                        onClick={() => this.planRequest()}
                    >
                        Plan
                    </Button>
                    {this.state.showComponent ?
                        <Itinerary trip={this.props.trip}/> :
                        null
                    }

                    <Button
                        key={'save'}
                        color= "primary" style={{ marginBottom: '1rem' }}
                        className='btn-outline-dark unit-button'
                    >
                        Save
                    </Button>


                </CardBody>
            </Card>
        )
    }
}

export default Plan;
