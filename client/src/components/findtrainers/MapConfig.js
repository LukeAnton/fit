import React from "react";
import fitlogo from "./mark.svg";
import {
  GoogleMap,
  withScriptjs,
  withGoogleMap,
  Marker
} from "react-google-maps";
const API_KEY = "AIzaSyCFzbD_10mMJU7AC7lStxIKSddM4yEAVwE";
const WrappedMap = withScriptjs(
  withGoogleMap(props => {
    const mark = { url: fitlogo, scaledSize: { width: 45, height: 45 } };
    return (
      <GoogleMap
        defaultZoom={12}
        defaultCenter={{ lat: -33.8304, lng: 151.205 }}
        clickableIcons={true}
      >
        {props.trainers.map(trainer => (
          <Marker
            options={{ icon: mark }}
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
class MapConfig extends React.Component {
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
