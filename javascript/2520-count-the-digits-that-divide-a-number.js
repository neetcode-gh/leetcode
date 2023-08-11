/**
 * @param {number} num
 * @return {number}
 */
var countDigits = function (num) {
    let count = 0; // initialize count to zero
    let arr = num.toString().split(''); // make array arr from num using toSting() and split()

    for (let i = 0; i < arr.length; i++) { // loop through the every element of array
        if (num % arr[i] == 0) { // if num is divisable by current element of array arr then increment count
            count++;
        }
    }
    return count; // return count
};