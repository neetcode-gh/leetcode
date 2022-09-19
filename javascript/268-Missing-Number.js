var missingNumberWithSums = function (nums) {
    let res = nums.length;

    for (let i = 0; i < nums.length; i++) {
        res += i - nums[i];
    }

    return res;
};

var missingNumberWithBit = function (nums) {
    let res = nums.length;

    for (let i = 0; i < nums.length; i++) {
        res = res ^ i ^ nums[i];
    }

    return res;
};
