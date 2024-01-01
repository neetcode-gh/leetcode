/**
 * // This is MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * interface MountainArray {
 *     public int get(int index) {}
 *     public int length() {}
 * }
 */
 
class Solution {
    public int findInMountainArray(int target, MountainArray mountainArr) {
        int maxIndex = findMax(mountainArr);
        int leftResult = binarySearchLeft(mountainArr, target, maxIndex);
        int rightResult = binarySearchRight(mountainArr, target, maxIndex);

        return (leftResult == -1 && rightResult == -1) ? -1 : leftResult == -1 ? rightResult : leftResult;
    }

    public int findMax(MountainArray array) {
        int left = 0;
        int right = array.length() - 1;

        while (left<=right) {
            int mid = left + (right - left)/2;
            if (array.get(mid) < array.get(mid + 1)) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return left;
    }

    public int binarySearchLeft(MountainArray array, int target, int right) {
        int left = 0;

        while (left<=right) {
            int mid = left + (right - left)/2;
            int midValue = array.get(mid);
            if (midValue < target) {
                left = mid + 1;
            } else if (midValue > target) {
                right = mid - 1;
            } else {
                return mid;
            }
        }
        return -1;
    }

    public int binarySearchRight(MountainArray array, int target, int left) {
        int right = array.length() - 1;

        while (left <= right) {
            int mid = left + (right - left)/2;
            int midValue = array.get(mid);

            if (midValue < target) {
                right = mid - 1;
            } else if (midValue > target) {
                left = mid + 1;
            } else {
                return mid;
            }
        }
        return -1;
    }
}