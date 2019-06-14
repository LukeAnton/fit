import React from "react";

import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
const API_KEY = "AIzaSyBxyJt8dy8SEFNe1u-0g3LmV6uoL7LOe5g";
const iconMarker = "../../img/find.svg";
const WrappedMap = withScriptjs(
  withGoogleMap(props => {
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: -33.8304, lng: 151.205 }}
        clickableIcons={true}
      >
        {props.trainers.map(trainer => (
          <Marker
            key={trainer._id}
            position={{
              lat: trainer.geometry.coordinates[1],
              lng: trainer.geometry.coordinates[0]
            }}
          />
        ))}
      </GoogleMap>
    );
  })
);
// items={this.props.location.state.trainers}
class MapConfig extends React.Component {
  // set this to state: this.props.location.state.trainers
  render() {
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <WrappedMap
          trainers={this.props.location.props.trainers}
          googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${API_KEY}`}
          loadingElement={<div style={{ height: "100%" }} />}
          containerElement={<div style={{ height: "91%" }} />}
          mapElement={<div style={{ height: "100%" }} />}
        />
        <div className="find-trainers btn btn-light">
          <span className="findt">Find Trainers</span>
        </div>
      </div>
    );
  }
}

export default MapConfig;
