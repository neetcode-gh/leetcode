var generate = function(num) {
    
  const outerArray = [];

  if (num >= 2) {
    outerArray.push([1]);
    outerArray.push([1, 1]);
  } else if (num <= 0) {
    return 'no array can be constructed with 0 or lesser input, try providing higher value';
  } else {
    outerArray.push([1]);
  }

  if (num > 2) {
    for (let i = 2; i < num; i++) {
      let subArray = [];
      for (let j = 0; j < outerArray[i - 1].length - 1; j++) {
        subArray.push(outerArray[i - 1][j] + outerArray[i - 1][j + 1]);
      }
      subArray.push(1);
      subArray.unshift(1);
      outerArray.push(subArray);
    }
  }

  return outerArray;
};
