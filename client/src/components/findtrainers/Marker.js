import React, { Component } from "react";
import { Marker } from "react-google-maps";

/* Now we render the markers on the page. Spread this out into three components just for clarity. */

class MapMarker extends Component {
  render() {
    return <Marker position={this.props.location} />;
  }
}

export default MapMarker;
