
/**
 * Sorting
 * Time O(n*log(n)) | Space O(n)
 * https://leetcode.com/problems/maximum-element-after-decreasing-and-rearranging/
 * @param {number[]} arr
 * @return {number}
 */
var maximumElementAfterDecrementingAndRearranging = function(arr) {
    
    arr.sort((a, b) => a - b);
    let index = 1;
    arr[0] = 1;
  
    while (index < arr.length) {
        
        const pre = arr[index - 1];
        const curr = arr[index];
        if (Math.abs(curr - pre) > 1 && pre + 1 < curr) {
            arr[index] = pre + 1;
        }
        index++;
    }
    
    return Math.max(...arr);
};
