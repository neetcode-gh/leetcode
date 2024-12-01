
/*
    Time: O(nlogn)
    Space: O(1)
*/
class Solution {
public:
    int maxFrequency(vector<int>& nums, long long k) {
        sort(nums.begin(),nums.end());
        int l=0;
        int r=0;
        int res=0;
        long long total=0;
        int n=nums.size();
        while(r<n){
            total+=nums[r];
            //invalid window

            while((long)(r-l+1)*nums[r] > total+k){
                total-=nums[l];
                l++;
            }
            
            res=max(res,r-l+1);
            r++;
        }
        return res;
    }
};