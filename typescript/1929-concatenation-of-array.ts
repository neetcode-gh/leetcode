function getConcatenation(nums: number[]): number[] {
  let result: number[] = [];

  for(let i = 0; i < 2; i++) {
    nums.forEach(num => result.push(num));
  };

  return result;
};
