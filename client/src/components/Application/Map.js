import React, {Component} from 'react'



import { Modal, Container, Row } from 'reactstrap'

class Map extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapClick: false,
            mapHover: false,
            scroll: 1,
            mouseX: 50,
            mouseY: 50
        };
        this.openMap = this.openMap.bind(this);
    }
    openMap(){
        this.setState({scroll: 1});
        this.setState({mapClick : !this.state.mapClick});
    }
    generateMap(source){
        return (

              <img
                  style={{'cursor':'zoom-in'}}
                  width="100%"
                  src={source}
                  alt={"Visual Itinerary Not Available"}
                  onClick={this.openMap}
              />
        );
    }

    render() {
        //document.img.style.cursor = "crosshair";
        let source = (this.props.trip.options.map === 'kml')
            ? "https://i.imgur.com/VbgPZ1w.png"
            : (this.props.trip.map == null) //why ==
                ? "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/World_map_with_nations.svg/1600px-World_map_with_nations.svg.png"
                : "data:image/svg+xml;utf8," + this.props.trip.map;
        const externalCloseBtn = <button className="close" style={{ position: 'absolute', top: '15px', right: '15px' }} onClick={this.openMap}>&times;</button>;
        let map =
            <img
                height="400px"
                width="800px"
                src={source}
                alt={"Visual Itinerary Not Available"}
                style={{
                    'min-width' : '800px',
                    'margin':'0px',
                    'white-space':'nowrap',
                    'float': 'none'
                }}
                // onMouseOver={() => this.setState({mapHover : false})}
                // onMouseOut={() => this.setState({mapHover : true})}
                onWheel={(e) => {

                    if(e.deltaY < 1)
                        this.state.scroll++;
                    else if (e.deltaY > -1)
                        this.state.scroll--;
                    if(this.state.scroll<1) this.state.scroll = 1;
                    this.forceUpdate()
                }}
            />;
        return (
            <React.Fragment>
                <Modal isOpen={this.state.mapClick} toggle={this.openMap} external={externalCloseBtn} size='lg' centered={true} style={{'min-width' : '400px'}}>
                    <Container
                        style={{'min-width': '400px', 'max-height': '400px', 'overflow' : 'hidden'}}
                        onMouseMove={(e) => {
                            this.setState(
                                {
                                    mouseX: 100 * (e.pageX  / window.innerWidth),
                                    mouseY: 100 * (e.pageY  / window.innerHeight) //find OUT HOW TO MAKE CURSOR RELATIVE TO CONTAINER
                                });
                        }}
                    >
                        <Row style={
                            {'transition': 'transform .3s',
                            'transform': (this.state.mapHover) ? 'scale(1)' : 'scale('+ this.state.scroll + ')',
                            'transform-origin': this.state.mouseX + '% '+this.state.mouseY+'%',
                            'overflow': 'hidden',
                            'float': 'none'}
                        }>
                            {map}
                        </Row>

                    </Container>
                </Modal>

                {this.generateMap(source)}
            </React.Fragment>
        )
    }
}

export default Map;