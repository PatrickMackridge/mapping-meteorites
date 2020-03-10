import React from "react";
import "./App.css";
import MeteoriteTable from "./meteorite-table";
import { Doughnut } from "react-chartjs-2";
import { formatDataFromSizes } from "./utils/utils";
import { Map, Marker, Popup, TileLayer } from "react-leaflet";
import { Icon } from "leaflet";

class App extends React.Component {
  state = {
    meteorites: [],
    isLoading: true,
    testDataset: {
      labels: ["<1kg", "1kg - 10kg", ">10kg"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
        }
      ]
    },
    activeMeteorite: null
  };

  showMeteoriteData = meteorite => {
    this.setState({ activeMeteorite: meteorite });
  };

  componentDidMount() {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const tableData = data.map(meteorite => {
          const meteoriteCopy = { ...meteorite };
          if (meteoriteCopy.geolocation === undefined) {
            meteoriteCopy.geolocation = {
              latitude: "unknown",
              longitude: "unknown"
            };
          }
          if (meteoriteCopy.year) {
            meteoriteCopy.year = meteoriteCopy.year.slice(0, 4);
          } else if (!meteoriteCopy.year) {
            meteoriteCopy.year = "unknown";
          }

          if (!meteoriteCopy.mass) {
            meteoriteCopy.mass = "unknown";
          }
          return meteoriteCopy;
        });
        // .slice(0, 100);
        const sizeData = formatDataFromSizes(tableData);
        const dataset = { ...this.state.testDataset };
        dataset.datasets[0].data = sizeData;
        this.setState({
          isLoading: false,
          meteorites: tableData,
          testDataset: dataset
        });
      });
  }

  render() {
    const { meteorites, testDataset, activeMeteorite, isLoading } = this.state;
    return (
      <div className="App">
        <div>
          <h1>Meteorite Landings</h1>
          {isLoading === false ? (
            <MeteoriteTable meteorites={meteorites} />
          ) : (
            <p>...loading...</p>
          )}
          <Doughnut data={testDataset} />
        </div>
        <Map center={[0.0, 0.0]} zoom={2}>
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
                <p id="popup-info">Mass: {activeMeteorite.mass} grams</p>
                <p id="popup-info">
                  Geolocation: {activeMeteorite.geolocation.latitude},{" "}
                  {activeMeteorite.geolocation.longitude}
                </p>
                <p id="popup-info">Year: {activeMeteorite.year}</p>
              </div>
            </Popup>
          )}
        </Map>
      </div>
    );
  }
}

export default App;
