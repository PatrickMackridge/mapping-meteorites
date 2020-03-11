import React, { Component } from "react";
import { Doughnut } from "react-chartjs-2";

class DoDoughnut extends Component {
  state = {
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
  };

  formatData = () => {
    // Format chart data here depending on dropdown menu - Pass dropdown value as props!
  };

  componentDidUpdate() {
    console.log("Dough dat update!");
  }

  render() {
    return (
      <div>
        <Doughnut />
      </div>
    );
  }
}

export default DoDoughnut;
