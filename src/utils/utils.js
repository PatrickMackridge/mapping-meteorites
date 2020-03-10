const formatDataFromSizes = arrayOfMeteorites => {
  //foreach meteroite add property size-range based on size
  // 1-1000
  // 1001 - 10000
  // 10000 +

  let result = [0, 0, 0];

  arrayOfMeteorites.forEach(meteorite => {
    if (meteorite.mass <= 1000) {
      result[0] += 1;
    } else if (meteorite.mass <= 10000) {
      result[1] += 1;
    } else {
      result[2] += 1;
    }
  });

  return result;
};

module.exports = { formatDataFromSizes };
