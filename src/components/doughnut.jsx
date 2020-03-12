import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { formatSizeData, formatLargeSizeData } from "../utils/utils";
import "../App.css";

class DoDoughnut extends Component {
  state = {
    chartData: {
      labels: [
        "50kg or less",
        "51kg-100kg",
        "101kg - 200kg",
        "201kg-300kg",
        "More than 300kg"
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
          hoverBackgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#001cac",
            "#29ac00"
          ],
          borderColor: "rgb(255, 255, 255)"
        }
      ]
    },
    chartCreated: false
  };

  formatData = dropdownVal => {
    if (dropdownVal === "sizeRange") {
      this.formatSizes();
      // Format chart data here depending on dropdown menu - Pass dropdown value as props - create separate funcs!
    } else {
      console.log("Awaiting utils functions...");
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
        "More than 5000kg"
      ];
    } else {
      formattedData = formatSizeData(meteorites);
      newLabels = [
        "50kg or less",
        "51kg-100kg",
        "101kg - 200kg",
        "201kg-300kg",
        "More than 300kg"
      ];
    }
    const newData = { ...chartData };
    newData.datasets[0].data = formattedData;
    newData.labels = newLabels;
    this.setState({ chartData: newData, chartCreated: true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { dropdownVal, meteorites } = this.props;
    if (
      prevProps.dropdownVal !== dropdownVal ||
      // this.state.chartCreated === false || // Did mount?
      prevProps.meteorites.length !== meteorites.length
    ) {
      this.formatData(dropdownVal);
    }
  }

  componentDidMount() {}

  render() {
    const { chartData } = this.state;
    return (
      <div className="doughnutArea">
        <Doughnut data={chartData} height={100} width={100} />
      </div>
    );
  }
}

export default DoDoughnut;
