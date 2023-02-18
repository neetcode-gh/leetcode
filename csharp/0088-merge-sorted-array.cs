public class Solution {
    public void Merge(int[] nums1, int m, int[] nums2, int n) {
        int mp = m - 1, np = n - 1, curr = m + n - 1;
        while (mp >= 0 && np >= 0) {
            nums1[curr--] = nums1[mp] > nums2[np] ? nums1[mp--] : nums2[np--];
        }
        while (np >= 0 && curr >= 0) {
            nums1[curr--] = nums2[np--];
        }
    }
}
