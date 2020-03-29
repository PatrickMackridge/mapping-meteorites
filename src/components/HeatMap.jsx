import React, { Component } from "react";
import { TileLayer, Map } from "react-leaflet";
import HeatMapLayer from "react-leaflet-heatmap-layer";
import { formatHeatMapData } from "../utils/utils.js";

class HeatMap extends Component {
  state = {
    meteorites: this.props.meteorites,
    locationData: []
  };

  componentDidMount() {
    this.setState(currentState => {
      const newLocationData = formatHeatMapData(currentState.meteorites);
      return { locationData: newLocationData };
    });
  }

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.meteorites !== this.props.meteorites) {
      this.setState({ locationData: formatHeatMapData(this.props.meteorites) });
    }
  };

  render() {
    const { locationData } = this.state;
    // console.log(locationData);
    return (
      <Map center={[20.0, 20.0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'
        />
        <HeatMapLayer
          points={locationData}
          longitudeExtractor={geolocation => geolocation.longitude}
          latitudeExtractor={geolocation => geolocation.latitude}
          intensityExtractor={marker => marker.intensity}
        />
      </Map>
    );
  }
}

export default HeatMap;
