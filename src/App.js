import React from "react";
import "./App.css";
import MeteoriteTable from "./components/meteorite-table";
import MakeMap from "./components/map";
import DoDoughnut from "./components/doughnut";

class App extends React.Component {
  state = {
    meteorites: [],
    largestMeteorites: [],
    isLoading: true,
    chartData: {
      labels: [
        "50kg or less",
        "51kg-100kg",
        "101kg - 200kg",
        "201kg-300kg",
        ">300kg"
      ],
      datasets: [
        {
          label: "Meteorite Landings",
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#001cac",
            "#29ac00"
          ],
          hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#29ac00"],
          borderColor: "rgb(255, 255, 255)"
        }
      ]
    },
    showLargest100: false,
    doughnutDataVal: "sizeRange"
  };

  fetchData = () => {
    fetch(
      `https://data.nasa.gov/resource/gh4g-9sfh.json?$order=mass DESC&$where=mass > 0`
    )
      .then(response => {
        return response.json();
      })
      .then(data => {
        const meteoriteData = data.map(meteorite => {
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
        const slicedMeteorites = [...meteoriteData].slice(0, 100);
        this.setState({
          isLoading: false,
          meteorites: meteoriteData,
          largestMeteorites: slicedMeteorites
        });
      });
  };

  getLargest100 = () => {
    this.setState(currentState => {
      return {
        showLargest100: !currentState.showLargest100
      };
    });
  };

  changeDropdown = event => {
    if (event.target.value !== this.state.doughnutDataVal) {
      this.setState({ doughnutDataVal: event.target.value });
    }
  };

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate() {}

  render() {
    const {
      meteorites,
      largestMeteorites,
      doughnutDataVal,
      isLoading,
      showLargest100
    } = this.state;
    let selectedMeteorites;
    if (showLargest100 === true) {
      selectedMeteorites = largestMeteorites;
    } else {
      selectedMeteorites = meteorites;
    }
    return (
      <div className="App">
        <div className="mapHeadings">
          <h1>Meteorite Landings</h1>
          <button className="heatButton">Toggle Heat Map</button>
        </div>
        {isLoading === false ? (
          <MakeMap meteorites={selectedMeteorites} />
        ) : (
          <p>...loading...</p>
        )}
        <div className="dataControls">
          <div className="largest100Button">
            <button onClick={this.getLargest100}>
              Toggle Largest 100 Only
            </button>
          </div>
          <label>
            Doughnut Data:{" "}
            <select id="" onChange={this.changeDropdown}>
              <option value="sizeRange">Size Range</option>
              <option value="hemisphere">Hemisphere</option>
              <option value="century">Century</option>
            </select>
          </label>
        </div>
        <div className="tableChart">
          {isLoading === false ? (
            <MeteoriteTable meteorites={selectedMeteorites} />
          ) : (
            <p>...loading...</p>
          )}
          <DoDoughnut
            meteorites={selectedMeteorites}
            dropdownVal={doughnutDataVal}
            isLoading={isLoading}
          />
        </div>
      </div>
    );
  }
}

export default App;
