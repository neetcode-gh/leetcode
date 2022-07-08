/*Brute-force solution (Linear)*/
/*
// Runtime: O(m+n)
// Extra Space: O(m+n)
// 
class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        int[] nums = new int[m+n];
        int i = 0, j = 0;
        int k = 0;
        while (i<m && j<n) {
            if (nums1[i]<nums2[j]) nums[k++] = nums1[i++];
            else nums[k++] = nums2[j++];
        }
        for (; i<m; i++) nums[k++] = nums1[i];
        for (; j<n; j++) nums[k++] = nums2[j];
        if ((m+n)%2 == 0) {
            return ((float)nums[(m+n-1)/2]+(float)nums[(m+n)/2])/(float)2;
        } else return (float)nums[(m+n-1)/2];
    }
}
*/
/* Optimized solution (Logarithmic) */

// Runtime: O(log(min(m,n)))
// Extra Space: O(1)

class Solution {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;
        
        if(m > n){
            return findMedianSortedArrays(nums2, nums1);
        }
        
        int total = m + n;
        int half = (total+1)/2;
        
        int left = 0;
        int right = m;
        
        var result = 0.0;
        
        while(left <= right){
            int i = left + (right - left)/2;
            int j = half - i;
            
            // get the four points around possible median
            int left1 = (i > 0) ? nums1[i - 1] : Integer.MIN_VALUE;
            int right1 = (i < m) ? nums1[i] : Integer.MAX_VALUE;
            int left2 = (j > 0) ? nums2[j - 1] : Integer.MIN_VALUE;
            int right2 = (j < n) ? nums2[j] : Integer.MAX_VALUE;
            
            // partition is correct
            if (left1 <= right2 && left2 <= right1) {
                // even
                if (total % 2 == 0) {
                    result = (Math.max(left1, left2) + Math.min(right1, right2)) / 2.0;
                // odd
                } else {
                    result = Math.max(left1, left2);
                }
                break;
            } 
            // partition is wrong (update left/right pointers)
            else if (left1 > right2) {
                right = i - 1;
            } else {
                left = i + 1;
            }
        }
        
        return result;
    }
}
