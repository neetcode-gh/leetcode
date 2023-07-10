function arraySign(nums: number[]): number {
    let sign = 1;

    for (const num of nums) {
        if (num == 0) return 0;
        else if (num < 0) sign = -1 * sign;
    }

    return sign;
}
