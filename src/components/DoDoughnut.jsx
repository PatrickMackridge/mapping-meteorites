import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import {
  formatSizeData,
  formatLargeSizeData,
  formatHemisphereData,
  formatCenturyData,
} from "../utils/utils";
import "../App.css";

class DoDoughnut extends Component {
  state = {
    chartData: {
      labels: [],
      datasets: [
        {
          label: "Meteorite Landings",
          data: [],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#001cac",
            "#29ac00",
          ],
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#001cac",
            "#29ac00",
          ],
          borderColor: "rgb(255, 255, 255)",
        },
      ],
    },
    chartCreated: false,
  };

  formatData = (dropdownVal) => {
    if (dropdownVal === "sizeRange") {
      this.formatSizes();
    } else if (dropdownVal === "hemisphere") {
      this.formatHemispheres();
    } else if (dropdownVal === "century") {
      this.formatCenturies();
    }
  };

  formatSizes = () => {
    const { chartData } = this.state;
    const { meteorites } = this.props;
    let formattedData;
    let newLabels;
    if (meteorites.length === 100) {
      formattedData = formatLargeSizeData(meteorites);
      newLabels = [
        "500kg or less",
        "501kg-1000kg",
        "1001kg - 2000kg",
        "2001kg-5000kg",
        "More than 5000kg",
      ];
    } else {
      formattedData = formatSizeData(meteorites);
      newLabels = [
        "50kg or less",
        "51kg-100kg",
        "101kg - 200kg",
        "201kg-300kg",
        "More than 300kg",
      ];
    }
    const newData = { ...chartData };
    newData.datasets[0].data = formattedData;
    newData.labels = newLabels;
    this.setState({ chartData: newData, chartCreated: true });
  };

  formatHemispheres = () => {
    const { chartData } = this.state;
    const { meteorites } = this.props;
    const formattedData = formatHemisphereData(meteorites);
    const newLabels = [
      "NE Hem",
      "SE Hem",
      "SW Hem",
      "NW Hem",
      "Unknown Location",
    ];
    const newData = { ...chartData };
    newData.datasets[0].data = formattedData;
    newData.labels = newLabels;
    this.setState({ chartData: newData, chartCreated: true });
  };

  formatCenturies = () => {
    const { chartData } = this.state;
    const { meteorites } = this.props;
    const formattedData = formatCenturyData(meteorites);
    const newLabels = [
      "Pre 1700",
      "1700-1799",
      "1800-1899",
      "1900-1999",
      "200s",
    ];
    const newData = { ...chartData };
    newData.datasets[0].data = formattedData;
    newData.labels = newLabels;
    this.setState({ chartData: newData, chartCreated: true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { dropdownVal, meteorites } = this.props;
    if (
      prevProps.dropdownVal !== dropdownVal ||
      prevProps.meteorites.length !== meteorites.length
    ) {
      this.formatData(dropdownVal);
    }
  }

  componentDidMount() {}

  render() {
    const { chartData } = this.state;
    const options = { maintainAspectRatio: false };
    return (
      <div className="doughnutContainer">
        <Doughnut data={chartData} options={options} />
      </div>
    );
  }
}

export default DoDoughnut;
