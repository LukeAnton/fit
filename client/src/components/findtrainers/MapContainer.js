import React, { Component } from "react";
import MapConfig from "./MapConfig";

const google_API = "AIzaSyBxyJt8dy8SEFNe1u-0g3LmV6uoL7LOe5g";

const google_URL = `https://maps.googleapis.com/maps/api/js?key=${google_API}&callback=initMap`;

class MapContainer extends Component {
  constructor() {
    super();
  }
  render() {
    return (
      <MapConfig
        isMarkerShown
        items={this.props.items}
        googleMapURL={google_URL}
        loadingElement={<div style={{ height: `100vh` }} />}
        containerElement={<div style={{ height: "400px" }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    );
  }
}

export default MapContainer;
