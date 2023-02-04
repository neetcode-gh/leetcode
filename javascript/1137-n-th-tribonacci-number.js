/**
 * @param {number} n
 * @return {number}
 */
var tribonacci = function (n) {
    let t = [0, 1, 1];

    if (n < 3) return t[n];

    for (let i = 3; i < n + 1; i++) {
        [t[0], t[1], t[2]] = [t[1], t[2], sum(t)];
    }

    return t[2];
};

function sum(arr) {
    return arr.reduce((a, b) => a + b);
}
