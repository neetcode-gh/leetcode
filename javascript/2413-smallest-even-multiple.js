/**
 * @param {number} n
 * @return {number}
 */
var smallestEvenMultiple = function (n) {
    if (n % 2 === 0) { // if n is even then return n
        return n;
    } else { // else return n multiply by 2
        return n * 2;
    }
};