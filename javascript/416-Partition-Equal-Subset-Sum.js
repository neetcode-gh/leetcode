/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
    const sum = nums.reduce((a, b) => a + b, 0);
    if (sum % 2) {
        return false;
    }

    let dp = new Set();
    dp.add(0);
    const target = sum / 2;

    for (const num of nums) {
        const nextDP = new Set();

        for (const t of dp) {
            if (t + num === target) {
                return true;
            }
            nextDP.add(t + num);
            nextDP.add(t);
        }
        dp = nextDP;
    }

    return false;
};
