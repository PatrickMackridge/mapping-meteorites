import React from "react";

const MeteoriteTable = props => {
  return (
    <div className="tableContainer">
      <table>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Continent</th>
          <th>Date</th>
        </tr>
        {props.meteorites.map(meteorite => {
          return (
            <tr key={meteorite.id}>
              <td>{meteorite.name}</td>
              <td>{meteorite.mass}</td>
              <td>CONTINENT</td>
              <td>{meteorite.year.slice(0, 4)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default MeteoriteTable;
