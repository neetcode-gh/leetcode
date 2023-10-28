class NumArray {
    prefix: number[] = [];

    constructor(nums: number[]) {
        let cur = 0;
        for (const n of nums) {
            cur += n;
            this.prefix.push(cur);
        }
    }

    sumRange(left: number, right: number): number {
        const rightSum = this.prefix[right],
            leftSum = (left > 0) ? this.prefix[left - 1] : 0;
        
        return rightSum - leftSum;
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
