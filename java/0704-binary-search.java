class Solution {

    public int search(int[] nums, int target) {
        int i = 0;
        int j = nums.length - 1;

        while (i <= j) {
            // mid is calculated this way to prevent integer overflow.
            // See: https://blog.research.google/2006/06/extra-extra-read-all-about-it-nearly.html
            int mid = i + (j - i) / 2;

            if (nums[mid] == target) return mid; else if (
                nums[mid] < target
            ) i = mid + 1; else j = mid - 1;
        }

        return -1;
    }
}
