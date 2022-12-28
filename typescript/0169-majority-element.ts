function majorityElement(nums: number[]): number {
    let count = 0;
    let res = 0;

    for (let i = 0; i < nums.length; i++) {
        if (count === 0) {
            res = nums[i];
        }

        if (nums[i] === res) {
            count += 1;
        } else {
            count -= 1;
        }
    }

    return res;
}
