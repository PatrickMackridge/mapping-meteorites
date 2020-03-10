import React from "react";
import "./App.css";
import MeteoriteTable from "./meteorite-table";
import { Doughnut } from "react-chartjs-2";
import { formatDataFromSizes } from "./utils/utils";
import MakeMap from "./map";

class App extends React.Component {
  state = {
    meteorites: [],
    isLoading: true,
    chartData: {
      labels: ["<1kg", "1kg - 10kg", ">10kg"],
      datasets: [
        {
          label: "Meteorite Landings",
          data: [300, 50, 100],
          backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
          borderColor: "rgb(255, 255, 255)"
        }
      ]
    },
    activeMeteorite: null,
    showLargest100: false
  };

  showMeteoriteData = meteorite => {
    this.setState({ activeMeteorite: meteorite });
  };

  fetchData = () => {
    let query = "";
    if (this.state.showLargest100 === true) {
      query = "?$order=mass DESC&$where=mass > 0";
    }
    fetch(`https://data.nasa.gov/resource/gh4g-9sfh.json${query}`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        if (this.state.showLargest100 === true) {
          data = data.slice(0, 100);
        }
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
        const sizeData = formatDataFromSizes(tableData);
        const dataset = { ...this.state.chartData };
        dataset.datasets[0].data = sizeData;
        this.setState({
          isLoading: false,
          meteorites: tableData,
          chartData: dataset
        });
      });
  };

  componentDidMount() {
    this.fetchData();
  }

  // getLargest100 = () => {
  //   if (!this.state.showLargest100 === true) {
  //     this.fetchData();
  //   }
  //   this.setState(currentState => {
  //     return { showLargest100: !currentState.showLargest100 };
  //   });
  // };

  componentDidUpdate() {}

  render() {
    const { meteorites, chartData, activeMeteorite, isLoading } = this.state;
    return (
      <div className="App">
        <div className="tableChart">
          <div className="dataHeadings">
            <h1>Meteorite Landings</h1>
          </div>
          <div>
            <button onClick={this.getLargest100}>Toggle Largest 100</button>
            <label htmlFor="">
              Doughnut Data:
              <select id="">
                <option value="sizeRange">Size Range</option>
                <option value="hemisphere">Hemisphere</option>
                <option value="century">Century</option>
              </select>
            </label>
          </div>
          {isLoading === false ? (
            <MeteoriteTable meteorites={meteorites} />
          ) : (
            <p>...loading...</p>
          )}
          <Doughnut data={chartData} width="100%" height="100%" />
        </div>
        <div className="mapHeadings">
          <button>Toggle Heat Map</button>
        </div>
        {isLoading === false ? (
          <MakeMap meteorites={meteorites} activeMeteorite={activeMeteorite} />
        ) : (
          <p>...loading...</p>
        )}
        <MakeMap meteorites={meteorites} activeMeteorite={activeMeteorite} />
      </div>
    );
  }
}

export default App;
