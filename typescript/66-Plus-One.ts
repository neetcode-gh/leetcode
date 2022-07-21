function plusOne(digits: number[]): number[] {
  return (BigInt(digits.join('')) + BigInt(1))
    .toString()
    .split('')
    .map((item) => Number(item));
}
