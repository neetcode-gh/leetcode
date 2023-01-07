function minimumDifference(nums: number[], k: number): number {
    nums.sort((a, b) => a - b);
    let left: number = 0;
    let right: number = k - 1;
    let result: number = Number.MAX_VALUE;

    while (right < nums.length) {
        result = Math.min(result, nums[right] - nums[left]);
        left++;
        right++;
    }
    return result;
}
