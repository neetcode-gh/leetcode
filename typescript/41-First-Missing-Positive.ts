function firstMissingPositive(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) {
        if (nums[i] < 0) {
            nums[i] = 0;
        }
    }

    for (let i = 0; i < nums.length; i++) {
        let val = Math.abs(nums[i]);
        if (1 <= val && val <= nums.length) {
            if (nums[val - 1] > 0) {
                nums[val - 1] *= -1;
            } else if (nums[val - 1] === 0) {
                nums[val - 1] = -1 * (nums.length + 1);
            }
        }
    }

    for (let i = 1; i < nums.length + 1; i++) {
        if (nums[i - 1] >= 0) {
            return i;
        }
    }

    return nums.length + 1;
}
