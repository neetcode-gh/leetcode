class Solution {
    public int search(int[] nums, int target) {
        int l = 0; //left pointer
        int r = nums.length - 1; //right pointer

        while(l <= r) {
            int mid = (l + r)/2;

            if(target > nums[mid]) l = mid + 1;
            else if(target < nums[mid]) r = mid - 1;
            else return mid;
        }
        return -1;
    }
}
