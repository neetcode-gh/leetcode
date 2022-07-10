var getSum = function (a, b) {
  while (b) {
    let temp = a & b;
    a ^= b;
    b = temp << 1;
  }
  return a;
};