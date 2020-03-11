import React from "react";

const MeteoriteTable = props => {
  return (
    <div className="tableContainer">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Mass (grams)</th>
            <th>Geolocation</th>
            <th>Year</th>
          </tr>
        </thead>
        {props.meteorites.map(meteorite => {
          return (
            <tbody key={meteorite.id}>
              <tr>
                <td>{meteorite.name}</td>
                <td>{meteorite.mass}</td>
                <td>
                  ({meteorite.geolocation.latitude}
                  °, {meteorite.geolocation.longitude}
                  °)
                </td>
                <td>{meteorite.year}</td>
              </tr>
            </tbody>
          );
        })}
      </table>
    </div>
  );
};

export default MeteoriteTable;
