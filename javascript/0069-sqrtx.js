/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let [l, r] = [0, x];
    let mid = null;
    while (l <= r) {
        mid = (l + r) >> 1;
        if (mid * mid == x) return mid;
        if (mid * mid < x)  l = mid + 1;
        else r = mid - 1;
    }
    return r
};
