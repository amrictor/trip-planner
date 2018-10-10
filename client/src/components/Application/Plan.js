import React, {Component} from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardImg } from 'reactstrap'
import { ButtonGroup, Button } from 'reactstrap'

class Plan extends Component {
    constructor(props) {
        super(props);
        this.getFile = this.getFile.bind(this);
    }

    getFile(event){
        let reader = new FileReader();
        reader.onload = function(event) {
            let fileContent = event.target.result;
            let contents = JSON.parse(fileContent);
            console.log(contents);
            this.props.updateBasedOnResponse(contents);
        }.bind(this);
        reader.readAsText(event.target.files[0]);
    }


    render() {
        return (
            <Card>
                <CardBody>
                    <CardTitle>Plan</CardTitle>
                    <p><b>Upload your trip file: </b></p>
                    <form>
                        <input type="file" name="myFile" id="example" onChange={(event) =>this.getFile(event)}/>
                    </form>
                </CardBody>
            </Card>
        )
    }
}

export default Plan;