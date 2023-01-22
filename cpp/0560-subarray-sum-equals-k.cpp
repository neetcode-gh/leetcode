class Solution {
public:
    int subarraySum(vector<int>& nums, int target) {
        int i=0,j=0,count=0,n=size(nums),sum=0;
        unordered_map<int,int>mp;
        while(j<n){
           sum+=nums[j];
           if(sum==target)count++;
           if(mp.find(sum-target)!=mp.end())count+=mp[sum-target];
           mp[sum]++;
           j++;
       } 
       return count;
    }
};