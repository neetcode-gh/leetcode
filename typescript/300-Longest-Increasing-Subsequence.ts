function lengthOfLIS(nums: number[]): number {
    const lis = Array(nums.length).fill(1);

    for (let i = nums.length - 1; i > -1; i--) {
        for (let j = i + 1; j < nums.length; j++) {
            if (nums[i] < nums[j]) {
                lis[i] = Math.max(lis[i], 1 + lis[j]);
            }
        }
    }

    return Math.max(...lis);
}
