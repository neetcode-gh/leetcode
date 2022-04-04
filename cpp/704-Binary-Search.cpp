class Solution {
public:
    int search(vector<int>& nums, int target) {
        int n = nums.size();
        if (nums[0] == target) return 0;
        if (nums[n-1] == target) return n-1;
        
        int start = 0, end = n-1;
        
        while (start < end) {
            int mid = start + (end-start)/2;
            if (nums[mid] == target) return mid;
            if (nums[mid] > target) {
                end = mid;
            }
            else {
                start = mid + 1;
            }
        }
        
        return -1;
    }
};