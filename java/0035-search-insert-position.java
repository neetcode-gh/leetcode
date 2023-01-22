class Solution {
    public int searchInsert(int[] nums, int target) {
        //o(log n) and o(1)
        int low = 0, high = nums.length;
        while(low < high) {
            int mid = low + (high - low)/2;
            if(target > nums[mid])
                low = mid + 1;
            else
                high = mid;
        }
        return low;
    }
}
