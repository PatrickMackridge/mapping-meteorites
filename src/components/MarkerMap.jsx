import React, { Component } from "react";
import { Marker, Popup } from "react-leaflet";

class MarkerMap extends Component {
  state = {
    meteorites: this.props.meteorites,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.meteorites !== this.props.meteorites) {
      this.setState({ meteorites: this.props.meteorites });
    }
  }

  render() {
    const { meteorites } = this.state;
    return (
      <>
        {" "}
        {meteorites.map((meteorite) => {
          return meteorite.geolocation.latitude !== "Unknown" ? (
            <Marker
              key={meteorite.id}
              position={[
                meteorite.geolocation.latitude,
                meteorite.geolocation.longitude,
              ]}
            >
              <Popup style={{ height: 0, width: 0 }}>
                <div id="popup-info">
                  <h3>{meteorite.name}</h3>
                  <p id="popup-info">Mass: {meteorite.mass / 1000 + " kg"}</p>
                  <p id="popup-info">
                    Geolocation: {meteorite.geolocation.latitude} lat.,{" "}
                    {meteorite.geolocation.longitude} long.
                  </p>
                  <p id="popup-info">Year: {meteorite.year}</p>
                </div>
              </Popup>
            </Marker>
          ) : null;
        })}
      </>
    );
  }
}

export default MarkerMap;
