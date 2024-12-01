/**
 * Time O(log(N)) | Space O(1)
 * @param {number[]} nums
 * @return {number}
 */
var findPeakElement = function(nums) {
    let [l, r] = [0, nums.length - 1];
    let mid = null;
    while (l <= r){
        mid = (l + r) >> 1;
        if (mid < nums.length - 1 && nums[mid] < nums[mid+1]){
            l = mid + 1;
        }
        else if (mid > 0 && nums[mid] < nums[mid-1]) {
            r = mid - 1;
        } 
        else {
            break;
        }
    }
    return mid;
};
