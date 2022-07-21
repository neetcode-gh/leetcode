const reverse = (x: number): number => {
  const max: number = 2 ** 31 - 1;
  const min: number = -(2 ** 31);

  let result: number = 0;
  while (x !== 0) {
    const digit = x % 10;
    x = Math.trunc(x / 10);

    if (result > max / 10 || (result === max / 10 && digit >= max % 10)) {
      return 0;
    } else if (
      result < min / 10 ||
      (result === max / 10 && digit <= min % 10)
    ) {
      return 0;
    } else {
      result = result * 10 + digit;
    }
  }

  return result;
};
