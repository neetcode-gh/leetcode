function missingNumber(nums: number[]): number {
    let sum: number = 0;
    let total: number = (nums.length * (nums.length + 1)) / 2;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    return total - sum;
}
