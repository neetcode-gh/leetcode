function hammingWeight(n: number): number {
  let base2 = n.toString(2).split('');
  let count = 0;

  base2.forEach((item) => {
    if (item === '1') {
      count += 1;
    }
  });

  return count;
}
