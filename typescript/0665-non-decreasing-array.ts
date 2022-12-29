function checkPossibility(nums: number[]): boolean {
    let changed = false;

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] <= nums[i + 1]) continue;
        if (changed) return false;

        if (i === 0 || nums[i + 1] >= nums[i - 1]) {
            nums[i] = nums[i + 1];
        } else {
            nums[i + 1] = nums[i];
        }

        changed = true;
    }

    return true;
}
