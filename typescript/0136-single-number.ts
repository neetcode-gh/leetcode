function singleNumber(nums: number[]): number {
    let res = 0;

    for (let i = 0; i < nums.length; i++) {
        res = nums[i] ^ res;
    }

    return res;
}
