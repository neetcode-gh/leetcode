/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} threshold
 * @return {number}
 */
var numOfSubarrays = function (arr, k, threshold) {
    let [leftPtr, rightPtr, result, windowSum] = [0, 0, 0, 0];
    while (rightPtr < arr.length) {
        windowSum += arr[rightPtr];
        if (rightPtr - leftPtr >= k - 1) {
            if (rightPtr - leftPtr > k - 1) {
                windowSum -= arr[leftPtr];
                leftPtr++;
            }
            if (windowSum / k >= threshold) {
                result++;
            }
        }
        rightPtr++;
    }
    return result;
};
