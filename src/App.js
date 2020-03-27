import React from "react";
import "./App.css";
import MeteoriteTable from "./components/MeteoriteTable";
import MakeMap from "./components/MakeMap";
import DoDoughnut from "./components/DoDoughnut";

class App extends React.Component {
  state = {
    meteorites: [],
    largestMeteorites: [],
    isLoading: true,
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
              latitude: "Unknown",
              longitude: "Unknown"
            };
          }
          if (meteoriteCopy.year) {
            meteoriteCopy.year = meteoriteCopy.year.slice(0, 4);
          } else if (!meteoriteCopy.year) {
            meteoriteCopy.year = "Unknown";
          }
          if (!meteoriteCopy.mass) {
            meteoriteCopy.mass = "Unknown";
          }

          meteoriteCopy.mass = parseFloat(meteoriteCopy.mass).toFixed(0);

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
        <h1>Meteorite Landings</h1>
        <button className="heatButton">Toggle Heat Map</button>
        {isLoading === true ? (
          <p>...loading...</p>
        ) : (
          <MakeMap meteorites={selectedMeteorites} />
        )}
        <div className="tableChart">
          <div className="table-area">
            <button className="largest100Button" onClick={this.getLargest100}>
              {showLargest100 ? "Show Largest 1000" : "Show Largest 100 Only"}
            </button>
            {isLoading === false ? (
              <MeteoriteTable meteorites={selectedMeteorites} />
            ) : (
              <p>...loading...</p>
            )}
          </div>
          <div className="doughnutArea">
            <label>
              Doughnut Data:{" "}
              <select id="" onChange={this.changeDropdown}>
                <option value="sizeRange">Size Range</option>
                <option value="hemisphere">Hemisphere</option>
                <option value="century">Century</option>
              </select>
            </label>
            <DoDoughnut
              meteorites={selectedMeteorites}
              dropdownVal={doughnutDataVal}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
