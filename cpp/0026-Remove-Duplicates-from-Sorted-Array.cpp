class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        int left = 1;

        for(int right = 1; right < nums.size(); right++){
            if(nums[right] != nums[right - 1]){
                nums[left] = nums[right];
                left++;
            }
        }

        return left;
    }
};
