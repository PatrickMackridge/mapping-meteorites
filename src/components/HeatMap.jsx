import React, { Component } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";

class HeatMap extends Component {
  state = {
    meteorites: this.props.meteorites
  };

  render() {
    return (
      <div className="heatMap">
        <p>Heat Map goes here...</p>
        <Map center={[20.0, 20.0]} zoom={2}>
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'
          />
        </Map>
      </div>
    );
  }
}

export default HeatMap;
