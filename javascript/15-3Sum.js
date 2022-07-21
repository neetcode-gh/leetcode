/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let res = [];
    let left = 0;
    let right = nums.length - 1;
    nums.sort((a, b) => {
        return a - b;
    });

    for (let i = 0; i < nums.length - 1; i++) {
        if (nums[i] > 0) return res;
        if (nums[i] === nums[i - 1]) continue;

        left = i + 1;
        right = nums.length - 1;
        let temp = 0;

        while (left < right) {
            temp = nums[left] + nums[right] + nums[i];
            if (temp === 0) {
                res.push([nums[i], nums[left], nums[right]]);
                left++;
                right--;

                while (nums[left] == nums[left - 1]) {
                    left++;
                }

                while (nums[right] == nums[right + 1]) {
                    right--;
                }
            } else if (temp > 0) {
                right--;
            } else if (temp < 0) {
                left++;
            }
        }
    }
    return res;
};
