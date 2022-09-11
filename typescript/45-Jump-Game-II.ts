function jump(nums: number[]): number {
    let left = 0;
    let right = 0;
    let res = 0;

    while (right < nums.length - 1) {
        let maxJump = 0;
        for (let i = left; i <= right; i++) {
            maxJump = Math.max(maxJump, i + nums[i]);
        }
        left = right + 1;
        right = maxJump;
        res += 1;
    }
    return res;
}
