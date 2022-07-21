var reverseBits = function (n) {
  let result = 0b0;
  let curr = n;

  for (let i = 0; i < 32; i++) {
    const lastBit = curr & 0b1;
    result = result << 1;
    result = result | lastBit;
    curr = curr >> 1;
  }

  return result >>> 0;
};
