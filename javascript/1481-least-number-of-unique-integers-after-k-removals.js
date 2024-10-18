/**
 * Sorting 
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals/
 * @param {number[]} arr
 * @param {number} k
 * @return {number}
 */
var findLeastNumOfUniqueInts = function(arr, k) {
    
    const frequencies = {}

    for (let i = 0; i < arr.length; i++) {
        frequencies[arr[i]] = (frequencies[arr[i]] && frequencies[arr[i]] + 1) || 1;
    }

    const frequenciesArr = Object.entries(frequencies);

    frequenciesArr.sort((a, b) => a[1] - b[1]);
    frequenciesArr.reverse();
    
    while (k) {
        const lastEl = frequenciesArr[frequenciesArr.length - 1];
        while (lastEl[1]) {
            if (!k) return frequenciesArr.length;
            lastEl[1] -= 1;
            k--;
        }
        frequenciesArr.pop();
    }

    return frequenciesArr.length;
};
