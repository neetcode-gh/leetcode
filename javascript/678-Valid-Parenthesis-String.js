/**
 * @param {string} s
 * @return {boolean}
 */
var checkValidString = function (s) {
    var leftMin = 0;
    var leftMax = 0;

    for (var c of s) {
        if (c === '(') {
            leftMin++;
            leftMax++;
        } else if (c === ')') {
            leftMin--;
            leftMax--;
        } else {
            leftMin--;
            leftMax++;
        }

        if (leftMax < 0) {
            return false;
        }

        if (leftMin < 0) {
            leftMin = 0;
        }
    }

    return leftMin === 0;
};
