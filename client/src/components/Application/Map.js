import React, {Component} from 'react'
import Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { Map as LMap, TileLayer, Polyline, Marker, Popup } from 'react-leaflet';


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
        let bounds = Leaflet.latLngBounds(L.latLng(90, -180), L.latLng(-90, 180));
        let position = [15, -15];
        return (
            (this.props.trip.options.map === 'kml')
                ? <LMap ref="map" center={position} zoom={1} style={{height: 300, maxWidth: 800}} minZoom={1} maxBounds={bounds}>
                    <TileLayer
                        attribution='&amp;copy <a href=https://wikimediafoundation.org/wiki/Maps_Terms_of_Use;>Wikimedia Maps</a>'
                        url='https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png'
                    />
                    {this.lines()}
                    </LMap>
                : <img
                  style={{'cursor':'zoom-in'}}
                  width="100%"
                  src={source}
                  alt={"Visual Itinerary Not Available"}
                  onClick={this.openMap}
                    />
        );
    }
    wrapLine(first, second) {
        return(
            <React.Fragment>
                {this.line(second, first, 360, 0)}
                {this.line(second, first, 0, -360)}
                {this.marker(second, 360)}
                {this.marker(first, -360)}
            </React.Fragment>
        )

    }
    line(first, second, firstOffset=0, secondOffset=0) {
        return (
        <Polyline positions={[new Leaflet.LatLng(first.latitude, first.longitude+firstOffset),
            new Leaflet.LatLng(second.latitude, second.longitude+secondOffset)]}/>
        )
    }
    marker(place, offset=0) {
        let LeafIcon = L.Icon.extend({
            options: {
                iconSize:     [25, 41],
                shadowSize:  [41, 41],
                iconAnchor:   [12, 41],
                popupAnchor:  [1, -34]
            }
        });
        let greenIcon = new LeafIcon({
            iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png'
        });
        return(
            <Marker position={new Leaflet.LatLng(place.latitude, place.longitude + offset)} icon={greenIcon}>
                <Popup><b>{place.name}</b></Popup>
            </Marker>
        )
    }
    lines() {
        let data = [];
        let size = this.props.trip.places.length;
        for(let i=0; i<size; i++) {
            let first = this.props.trip.places[(((i-1) % size + size) % size)];
            let second = this.props.trip.places[i % size];
            data.push(
                <React.Fragment key={'place_'+i}>
                    {this.marker(first)}
                    {
                        ((first.longitude-second.longitude)<-180.0)
                        ? this.wrapLine(second, first)
                        : ((first.longitude-second.longitude)>180.0)
                        ? this.wrapLine(first, second)
                        : this.line(first, second)
                    }
                </React.Fragment>
            );
        }
        return data;
    }

    render() {
        let source = (this.props.trip.map == null)
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
                    'minWidth' : '800px',
                    'margin':'0px',
                    'whiteSpace':'nowrap',
                    'float': 'none'
                }}
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
                <Modal isOpen={this.state.mapClick} toggle={this.openMap} external={externalCloseBtn} size='lg' centered={true} style={{'minWidth' : '400px'}}>
                    <Container
                        style={{'minWidth': '400px', 'maxHeight': '400px', 'overflow' : 'hidden'}}
                        onMouseMove={(e) => {
                            this.setState(
                                {
                                    mouseX: 100 * (e.pageX  / window.innerWidth),
                                    mouseY: 100 * (e.pageY  / window.innerHeight)
                                });
                        }}
                    >
                        <Row style={
                            {'transition': 'transform .3s',
                            'transform': (this.state.mapHover) ? 'scale(1)' : 'scale('+ this.state.scroll + ')',
                            'transformOrigin': this.state.mouseX + '% '+this.state.mouseY+'%',
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