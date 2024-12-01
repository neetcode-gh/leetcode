/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var commonFactors = function (a, b) {
    let arr = []; // initialize empty array arr
    let min = Math.min(a, b); // store minimum number from a and b into min using Math.min()

    // loop thorugh every number from 1 to min
    for (let i = 1; i <= min; i++) {

        // if a anf b both divisable by i then push i into array arr
        if (a % i == 0 && b % i == 0) {
            arr.push(i);
        }
    }

    // return length of array arr
    return arr.length;
};