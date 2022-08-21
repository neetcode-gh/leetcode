class Solution {
    public int peakIndexInMountainArray(int[] arr) {
        int left = 0, right = arr.length-1;
        int res = -1;

        while (left <= right) {
            int mid = left + (right - left+1)/2;

            if (arr[mid-1] <= arr[mid]) {
                left = mid+1;
                res = mid;
            } else {
                right = mid-1;
            }
        }

        return res;
    }
}