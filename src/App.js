import React from "react";
import "./App.css";
import MeteoriteTable from "./meteorite-table";

class App extends React.Component {
  state = {
    meteorites: [],
    isLoading: true
  };

  componentDidMount() {
    fetch("https://data.nasa.gov/resource/gh4g-9sfh.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        const tableData = data.slice(0, 20);
        this.setState({ isLoading: false, meteorites: tableData });
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
      </div>
    );
  }
}

export default App;
