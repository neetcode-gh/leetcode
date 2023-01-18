/**
 * @param {string} s
 * @return {number}
 */
var minFlipsMonoIncr = function (s) {
    let [res, countOne] = [0, 0];

    for (ch of s) {
        if (ch == '1') {
            countOne++;
        } else {
            res = Math.min(res + 1, countOne);
        }
    }

    return res;
};
