class NumArray {
  
    prefixSums: number[] = [];

    constructor(nums: number[]) {
        this.prefixSums.push(nums[0]);

        for(let i=1; i<nums.length; i++)
            this.prefixSums.push(this.prefixSums[i-1] + nums[i])
    }

    sumRange(left: number, right: number): number {
        if(left === 0) return this.prefixSums[right];
        return this.prefixSums[right] - this.prefixSums[left-1];
    }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
