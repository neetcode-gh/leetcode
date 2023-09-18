/**
 * @param {number} n
 * @return {number}
 */
var sumOfMultiples = function (n) {
    let arr = []; // initilialize an empty array
    for (let i = 1; i <= n; i++) { // loop through the 1 to n
        if ((i % 3 === 0) || (i % 5 === 0) || (i % 7 === 0)) { // if i is divisible by 3 or 5 or 7 then push i into arr
            arr.push(i);
        }
    }
    let result = arr.reduce((a, b) => a + b, 0); // find sum of all element of arr and store into result
    return result; // return the result
};