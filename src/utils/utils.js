const formatDataFromSizes = arrayOfMeteorites => {
  let result = [0, 0, 0, 0, 0];

  arrayOfMeteorites.forEach(meteorite => {
    if (meteorite.mass <= 50000) {
      result[0] += 1;
    } else if (meteorite.mass <= 100000) {
      result[1] += 1;
    } else if (meteorite.mass <= 200000) {
      result[2] += 1;
    } else if (meteorite.mass <= 300000) {
      result[3] += 1;
    } else {
      result[4] += 1;
    }
  });
  return result;
};

module.exports = { formatDataFromSizes };
