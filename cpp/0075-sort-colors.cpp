class Solution {
public:
    void sortColors(vector<int>& nums) {
        int p1=0,p2=nums.size()-1;
        for(int i=p1;i<=p2;i++)
        {
            if(nums[i]==0)
            {
                swap(nums[i],nums[p1]);
                p1++;
            }
            if(nums[i]==2)
            {
                swap(nums[i],nums[p2]);
                p2--;
                i--;
            }
        }
        
        
    }
};
