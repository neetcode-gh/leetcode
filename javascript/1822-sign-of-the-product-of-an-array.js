const arraySign = function (nums) {
    let sign = 1;

    for (const num of nums) {
        if (num == 0) return 0;
        if (num < 0) sign = -1 * sign;
    }

    return sign;
};
