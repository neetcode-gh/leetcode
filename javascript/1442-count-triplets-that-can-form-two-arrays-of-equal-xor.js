/**
 * Bit Manipulation
 * Time O(n^3) | Space O(n^2)
 * https://leetcode.com/problems/count-triplets-that-can-form-two-arrays-of-equal-xor/
 * @param {number[]} arr
 * @return {number}
 */
var countTriplets = function(arr) {
    
    const prefix2D = [];

    for(let i = 0; i < arr.length; i++) {
        prefix2D.push([]);
    }

    for(let i = 0; i < arr.length; i++) {
        let curr = arr[i];
        for(let j = i+1; j < arr.length; j++) {
            curr ^= arr[j];
            prefix2D[i][j] = curr;
        }
    }

    for(let i = 0; i < arr.length; i++) {
        prefix2D[i][i] = arr[i];
    }

    let count = 0;
    for(let i = 0; i < arr.length; i++) {
        for(let j = i+1; j < arr.length; j++) {
            for(let k = j; k < arr.length; k++) {
                if(prefix2D[i][j-1] === prefix2D[j][k]) count++;
            }
        }
    }

    return count;
};
