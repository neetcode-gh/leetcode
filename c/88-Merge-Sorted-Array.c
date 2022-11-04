/*
Merge nums1 and nums2 into a single array sorted in non-decreasing order.

Space: O(1)
Time: O(n+m)
*/

void merge(int* nums1, int nums1Size, int m, int* nums2, int nums2Size, int n){
    int i=m-1;
    int j=n-1;
    while (i>=0 || j>=0) {
        if (j<0){ // Only numbers from nums1 remain
            return;
        } else if (i<0) { // Only numbers from nums2 remain
            nums1[j] = nums2[j];
            j--;
        } else {
            if (nums1[i]>nums2[j]) {
                nums1[i+j+1] = nums1[i];
                i--;
            } else {
                nums1[i+j+1] = nums2[j];
                j--;
            }
        }
    }
}
