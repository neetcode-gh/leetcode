/**
 * @param {number} n
 * @return {number}
 */
var pivotInteger = function (n) {

    // initialize function sum with parameter start and end to find sum between start and end and return num
    function sum(start, end) {
        let num = 0;
        for (let i = start; i <= end; i++) {
            num += i;
        }
        return num;
    }

    // loop through the 1 to n
    for (let i = 1; i <= n; i++) {

        // if sum of 1 to i and sum of i to n is equal then return i
        if (sum(1, i) == sum(i, n)) {
            return i;
        }
    }

    return -1; // otherwise return -1
};