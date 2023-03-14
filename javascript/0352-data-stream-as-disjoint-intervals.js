class SummaryRanges {
  constructor() {
    this.numSet = new Set();
  }

  addNum(value) {
    this.numSet.add(value);
  }

  getIntervals() {
    let nums = Array.from(this.numSet.keys());
    nums.sort((a, b) => a - b);

    let res = [];

    let i = 0;

    while (i < nums.length) {
      let start = nums[i];

      while (i + 1 < nums.length && nums[i] + 1 == nums[i + 1]) {
        i++;
      }

      res.push([start, nums[i]]);
      i++;
    }

    return res;
  }
}
