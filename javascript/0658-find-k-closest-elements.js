/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (arr, k, x) {
    let [leftPtr, rightPtr] = [0, arr.length - k];
    while (leftPtr < rightPtr) {
        /*  This is basically rightPtr+leftPtr/2 written differently to
            avoid any overflow incase it happens.
        */
        let mid = parseInt(rightPtr + (leftPtr - rightPtr) / 2);

        if (x - arr[mid] > arr[mid + k] - x) {
            leftPtr = mid + 1;
        } else {
            rightPtr = mid;
        }
    }
    return arr.slice(leftPtr, leftPtr + k);
};
