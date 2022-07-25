function containsDuplicate(nums: number[]): boolean {
    const set = new Set();

    for (let i = 0; i < nums.length; i++) {
        if (set.has(nums[i])) return true;
        else set.add(nums[i]);
    }

    return false;
}
