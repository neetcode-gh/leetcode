//Use binary search
class Solution {

    public int peakIndexInMountainArray(int[] arr) {
        int start = 0;
        int end = arr.length;
        int n = arr.length;
        while (start <= end) {
            int mid = start + (end - start) / 2;
            if (
                mid != 0 &&
                mid != n - 1 &&
                arr[mid - 1] < arr[mid] &&
                arr[mid + 1] < arr[mid]
            ) return mid; else if (
                mid != n - 1 && arr[mid + 1] > arr[mid]
            ) start = mid + 1; else if (
                mid != 0 && arr[mid - 1] > arr[mid]
            ) end = mid - 1;
        }
        return end;
    }
}
