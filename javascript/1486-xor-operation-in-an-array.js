/**
 * @param {number} n
 * @param {number} start
 * @return {number}
 */
var xorOperation = function(n, start) {
    let nums = new Array(n).fill(0); // initialize a nums which is the length of n elements with 0 value of Array using Array() nad fill()

    for(let i=0; i<n; i++){ // loop through the 0 to n
        nums[i] = start + (2 * i); // current element of nums is equal to sum of start and twice the i
    }
    
    return nums.reduce((a,b) => a^b); // return the bitwise XOR of all elements of nums using reduce()
};
