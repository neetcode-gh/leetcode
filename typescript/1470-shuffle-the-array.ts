function shuffle(nums: number[], n: number): number[] {
    for (let i = 0; i < n; i++) {
        nums[i] = nums[i] << 10;
        nums[i] = nums[i] | nums[i + n];
    }

    let j = 2 * n - 1;

    for (let i = n - 1; i > -1; i--) {
        let y = nums[i] & (2 ** 10 - 1);
        let x = nums[i] >> 10;
        nums[j] = y;
        nums[j - 1] = x;
        j -= 2;
    }

    return nums;
}
