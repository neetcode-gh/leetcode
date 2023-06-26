class Solution {
public:
//Easy and Efficient Approach , 4ms time Complexity
    int arraySign(vector<int>& nums) {
        int neg = 0;
        int zero = 0;
        
        for(int i=0;i<nums.size();i++){
            if(nums[i] < 0){
                neg++;
            }
            if(nums[i] == 0){
                zero++;
            }
        }
        
        if(zero > 0){
            return 0;
        }
        else{
            if(neg%2 == 0){
                return 1;
            }
            else{
                return -1;
            }
        }
        return 0;
    }
};
