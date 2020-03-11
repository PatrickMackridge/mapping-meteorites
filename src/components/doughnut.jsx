import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";
import { formatSizeData } from "../utils/utils";

class DoDoughnut extends Component {
  state = {
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
    // if (meteorites.length === 100) {
    //const formattedData = formatLargeSizeData(meteorites)
    // const newLabels = [Appropriate labels here]
    // } else {
    const formattedData = formatSizeData(meteorites);
    const newLabels = [...chartData.labels];
    // }
    const newData = { ...chartData };
    newData.datasets[0].data = formattedData;
    newData.labels = newLabels;
    console.log(newData);
    this.setState({ chartData: newData, chartCreated: true });
  };

  componentDidUpdate(prevProps, prevState) {
    const { dropdownVal, meteorites } = this.props;
    console.log("Dough dat update!");
    if (
      prevProps.dropdownVal !== dropdownVal ||
      this.state.chartCreated === false ||
      prevProps.meteorites.length !== meteorites.length
    ) {
      this.formatData(dropdownVal);
    }
  }

  componentDidMount() {}

  render() {
    // this.formatData();
    return (
      <div>
        <Doughnut data={this.state.chartData} width={100} height={100} />
      </div>
    );
  }
}

export default DoDoughnut;
