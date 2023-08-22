class Solution {
    public int[] searchRange(int[] nums, int target) {
        int left = 0;
        int right = nums.length - 1;
        int[] result = {-1, -1};

        while (left <= right) {
            int mid = left  + ((right - left) / 2);

            if (nums[mid] == target) {
                result = findEdges(mid, nums, target);
                break;
            }

            else if (target < nums[mid]) {
                right = mid - 1;
            }

            else if (target > nums[mid]) {
                left = mid + 1;
            }
        }

        return result;
    }

    public int[] findEdges(int mid, int[] nums, int target) {
        int left = mid;
        int right = mid;
        int[] result = {left, right};

        while (left >= 0 && nums[left] == target) {
            result[0] = left;
            left --;
        }

        while (right <= nums.length - 1 && nums[right] == target) {
            result[1] = right;
            right ++;
        }

        return result;
    }
}