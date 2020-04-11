import React from "react";
import { Map, TileLayer } from "react-leaflet";
import HeatMap from "./HeatMap";
import MarkerMap from "./MarkerMap";

class MakeMap extends React.Component {
  state = {
    meteorites: this.props.meteorites,
    heatMap: this.props.heatMap,
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.props.meteorites !== prevProps.meteorites) {
      this.setState({ meteorites: this.props.meteorites });
    }
    if (this.props.heatMap !== prevProps.heatMap) {
      this.setState({ heatMap: this.props.heatMap });
    }
  }

  render() {
    const { meteorites, heatMap } = this.state;
    return (
      <Map center={[20.0, 20.0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'
        />
        {heatMap === true ? (
          <HeatMap meteorites={this.props.meteorites} />
        ) : (
          <MarkerMap meteorites={meteorites} />
        )}
      </Map>
    );
  }
}

export default MakeMap;
