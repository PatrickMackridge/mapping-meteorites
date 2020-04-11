import React, { Component } from "react";
import HeatMapLayer from "react-leaflet-heatmap-layer";
import { formatHeatMapData } from "../utils/utils.js";

class HeatMap extends Component {
  state = {
    meteorites: this.props.meteorites,
    locationData: [],
  };

  componentDidMount() {
    this.setState((currentState) => {
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
    return (
      <HeatMapLayer
        points={locationData}
        longitudeExtractor={(geolocation) => geolocation.longitude}
        latitudeExtractor={(geolocation) => geolocation.latitude}
        intensityExtractor={(marker) => marker.intensity}
        radius={25}
        blur={10}
      />
    );
  }
}

export default HeatMap;
