/**
 * Time O(N) | Space O(1)
 * 
 * @param {number[]} arr
 * @return {number[]}
 */
function replaceElements(arr) {
    let max = -1;

    for (let i = arr.length - 1; i >= 0; i--) {
        const temp = arr[i];
        arr[i] = max;
        max = Math.max(max, temp);
    }

    return arr;
};
