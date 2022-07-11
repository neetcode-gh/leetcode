/*Brute-force solution (Linear time)*/

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
