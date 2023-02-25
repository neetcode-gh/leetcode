function findDisappearedNumbers(nums: number[]): number[] {
    for (const n of nums) {
        let i = Math.abs(n) - 1;
        nums[i] = -1 * Math.abs(nums[i]);
    }

    let res: number[] = [];

    for (let [i, n] of nums.entries()) {
        if (n > 0) {
            res.push(i + 1);
        }
    }

    return res;
}
