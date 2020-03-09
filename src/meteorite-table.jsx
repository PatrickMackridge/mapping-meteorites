import React from "react";

const MeteoriteTable = props => {
  return (
    <div className="tableContainer">
      <table>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Geolocation</th>
          <th>Year</th>
        </tr>
        {props.meteorites.map(meteorite => {
          return (
            <tr key={meteorite.id}>
              <td>{meteorite.name}</td>
              <td>{meteorite.mass}</td>
              <td>
                ({meteorite.geolocation.latitude}°,{" "}
                {meteorite.geolocation.longitude}°)
              </td>
              <td>{meteorite.year.slice(0, 4)}</td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};

export default MeteoriteTable;
