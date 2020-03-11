import React from "react";
import "./App.css";
import MeteoriteTable from "./components/meteorite-table";
import { Doughnut } from "react-chartjs-2";
import { formatDataFromSizes } from "./utils/utils";
import MakeMap from "./components/map";

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
    showLargest100: false
  };

  fetchData = () => {
    fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=mass DESC&$where=mass > 0`
    )
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

  getLargest100 = () => {
    this.setState(currentState => {
      const slicedMeteorites = [...currentState.meteorites].slice(0, 100);
      return {
        meteorites: slicedMeteorites,
        showLargest100: !currentState.showLargest100
      };
    });
  };

  componentDidUpdate(prevState) {
    console.log(this.state.showLargest100);
    if (
      this.state.showLargest100 === false &&
      this.state.meteorites.length === 100
    ) {
      this.fetchData();
    }
  }

  render() {
    const { meteorites, chartData, isLoading } = this.state;
    return (
      <div className="App">
        <div className="mapHeadings">
          <h1>Meteorite Landings</h1>
          <button className="heatButton">Toggle Heat Map</button>
        </div>
        {isLoading === false ? (
          <MakeMap meteorites={meteorites} />
        ) : (
          <p>...loading...</p>
        )}
        <div className="dataControls">
          <div className="largest100Button">
            <button onClick={this.getLargest100}>
              Toggle Largest 100 Only
            </button>
          </div>
          <label htmlFor="">
            Doughnut Data:
            <select id="">
              <option value="sizeRange">Size Range</option>
              <option value="hemisphere">Hemisphere</option>
              <option value="century">Century</option>
            </select>
          </label>
        </div>
        <div className="tableChart">
          {isLoading === false ? (
            <MeteoriteTable meteorites={meteorites} />
          ) : (
            <p>...loading...</p>
          )}
          <Doughnut data={chartData} width="100%" height="100%" />
        </div>
      </div>
    );
  }
}

export default App;
