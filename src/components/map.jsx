import React from "react";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";

class MakeMap extends React.Component {
  state = {
    meteorites: this.props.meteorites,
    activeMeteorite: null
  };

  showMeteoriteData = meteorite => {
    this.setState({ activeMeteorite: meteorite });
  };

  render() {
    const { meteorites, activeMeteorite } = this.state;
    return (
      <Map center={[20.0, 20.0]} zoom={2}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://osm.org.copyright">OpenStreetMap</a> contributors'
        />
        {meteorites.map(meteorite => {
          return meteorite.geolocation.latitude !== "unknown" ? (
            <Marker
              key={meteorite.id}
              position={[
                meteorite.geolocation.latitude,
                meteorite.geolocation.longitude
              ]}
              onClick={() => {
                this.showMeteoriteData(meteorite);
              }}
            ></Marker>
          ) : null;
        })}
        {activeMeteorite && (
          <Popup
            position={[
              activeMeteorite.geolocation.latitude,
              activeMeteorite.geolocation.longitude
            ]}
            onClose={() => {
              this.showMeteoriteData(null);
            }}
          >
            <div id="popup-info">
              <h3>{activeMeteorite.name}</h3>
              <p id="popup-info">
                Mass:{" "}
                {activeMeteorite.mass < 1000
                  ? activeMeteorite.mass + " g"
                  : activeMeteorite.mass / 1000 + " kg"}
              </p>
              <p id="popup-info">
                Geolocation: {activeMeteorite.geolocation.latitude},{" "}
                {activeMeteorite.geolocation.longitude}
              </p>
              <p id="popup-info">Year: {activeMeteorite.year}</p>
            </div>
          </Popup>
        )}
      </Map>
    );
  }
}

export default MakeMap;
