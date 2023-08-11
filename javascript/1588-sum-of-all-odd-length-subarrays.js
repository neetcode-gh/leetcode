/**
 * @param {number[]} arr
 * @return {number}
 */
var sumOddLengthSubarrays = function (arr) {
    let sum = 0, len = arr.length;
    for (let i = 0; i < arr.length; i++) {
        let total = i * (len - i) + (len - i);
        sum += Math.ceil(total / 2) * arr[i];
    }
    return sum;
};