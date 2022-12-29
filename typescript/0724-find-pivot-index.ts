function pivotIndex(nums: number[]): number {
    let total = nums.reduce((a, b) => a + b);
    let leftSum = 0;

    for (let i = 0; i < nums.length; i++) {
        const rightSum = total - nums[i] - leftSum;

        if (leftSum === rightSum) return i;
        leftSum += nums[i];
    }

    return -1;
}
