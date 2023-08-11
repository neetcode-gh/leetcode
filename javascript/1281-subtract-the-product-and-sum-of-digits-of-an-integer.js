/**
 * @param {number} n
 * @return {number}
 */
var subtractProductAndSum = function (n) {
    let arr = String(n).split("").map(num => +num); // initialize arr and convert n to array using String(), split() and map()
    let mul = arr.reduce((a, b) => a * b); // initialize mul and find multiplication using reduce method
    let sum = arr.reduce((a, b) => a + b); // initialize sum and find sum using reduce method

    return mul - sum; // return mul and sum
};