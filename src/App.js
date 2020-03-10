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
    activeMeteorite: null
  };

  showMeteoriteData = meteorite => {
    this.setState({ activeMeteorite: meteorite });
  };

  fetchData = () => {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        console.log(data.slice(0, 5));
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

  render() {
    const { meteorites, chartData, activeMeteorite, isLoading } = this.state;
    return (
      <div className="App">
        <div className="tableChart">
          <div className="dataHeadings">
            <h1>Meteorite Landings</h1>
          </div>
          <div>
            <button>Some Data Controls</button>
            <label htmlFor="">
              <select id="">
                <option value="one">One</option>
                <option value="two">Two</option>
                <option value="three">Three</option>
                <option value="etc">etc.</option>
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
          <button>Some Map Controls</button>
          <label htmlFor="">
            <select id="">
              <option value="one">Map1</option>
              <option value="two">Map2</option>
              <option value="three">Map3</option>
              <option value="etc">etc.</option>
            </select>
          </label>
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
