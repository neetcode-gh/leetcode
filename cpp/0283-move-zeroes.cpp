class Solution {
public:
    void moveZeroes(vector<int>& nums) {
        int left = 0;

        for(int i = 0; i < nums.size(); i++){
            if(nums[i] != 0){
                nums[left++] = nums[i];
            }
        }

        for(left; left < nums.size(); left ++){
            nums[left] = 0;
        }
    }
};
