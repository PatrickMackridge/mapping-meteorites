import React from "react";
import "./App.css";
import MeteoriteTable from "./meteorite-table";
import { Doughnut } from "react-chartjs-2";
import { formatDataFromSizes } from "./utils/utils";

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
    }
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
    return (
      <div className="App">
        <h1>Meteorite Landings</h1>
        {this.state.isLoading === false ? (
          <MeteoriteTable meteorites={this.state.meteorites} />
        ) : (
          <p>...loading...</p>
        )}
        <Doughnut data={this.state.testDataset} />
      </div>
    );
  }
}

export default App;
