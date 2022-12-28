class Solution {
public:
  vector<vector<int>> res;
  
  vector<vector<int>> fourSum(vector<int>& nums, int target) {
    
      if(nums.size() < 4) return res;
    
      vector<int>quad;
      sort(nums.begin() , nums.end());
      kSum(0,4,target,nums,quad);
      return res;
    }
  
  
  void kSum (int index , int k , long long target, vector<int> nums , vector<int>&q)
  {
    
    if(k == 2)
    {
      twoSum(index , target, q , nums);
      return;
    }
 
    for(int i = index ; i < nums.size() - k + 1; i++)
    {
      if(i > index && nums[i] == nums[i-1]) continue;
      q.push_back(nums[i]);
      kSum(i+1 , k-1 , target-nums[i] , nums , q);
      q.pop_back();
    }      

  }
  
  void twoSum (int start,long long target,vector<int>&ans,vector<int>& nums)
  {
    int lo = start;
    int hi = nums.size()-1;
    
    while(lo < hi)
    {
      int sum = nums[lo]+nums[hi];
      if(sum > target) hi--;
      else if (sum < target) lo++;
      
      else 
      {
        ans.insert(ans.end() , {nums[lo] , nums[hi]});
        res.push_back(ans);
        
        ans.pop_back();
        ans.pop_back();
        
        lo++;
        while (lo < hi && nums[lo] == nums[lo - 1]) lo++;
      }
    }    
  }
};
