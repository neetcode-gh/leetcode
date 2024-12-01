class SummaryRanges {
    numSet: Set<number>;

    constructor() {
        this.numSet = new Set();
    }

    addNum(value: number): void {
        this.numSet.add(value);
    }

    getIntervals(): number[][] {
        let nums = Array.from(this.numSet.keys());
        nums.sort((a, b) => a - b);
        let res: number[][] = [];

        let i = 0;

        while (i < nums.length) {
            const start = nums[i];

            while (i + 1 < nums.length && nums[i] + 1 == nums[i + 1]) {
                i++;
            }

            res.push([start, nums[i]]);
            i++;
        }

        return res;
    }
}
