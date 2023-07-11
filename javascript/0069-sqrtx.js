/**
 * Binary Search 
 * https://leetcode.com/problems/sqrtx/
 * 
 * Time O(log(n)) | Space O(1)
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    let left = 1;
    let right = x;
 
    while(left <= right) {
        const mid = (left + right) >> 1;
        if(mid * mid <= x && (mid+1) * (mid+1) > x) return mid;
        if(mid * mid < x) {
            left = mid + 1;
        } else {
            right = mid -1;
        }
    } 
 
    return 0;
 };
