// Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

// If target is not found in the array, return [-1, -1].

// TC : O(log n) , SC : O(1)



class Solution {
    
    public:
  int f(vector<int>&arr,int start,int end,int x,int res){
      
      while(start<=end){
      int mid = start + (end-start)/2;
      
      if(arr[mid]==x){
          res = mid;
          end = mid-1;
      }
      else if(arr[mid]<x) start = mid+1;
      else end = mid-1;
      
      }
      return res;
      
  }
  
    
  public:
  int l(vector<int>&arr,int start,int end,int x,int res){
      
      while(start<=end){
      int mid = start + (end-start)/2;
      
      if(arr[mid]==x){
          res = mid;
          start = mid+1;
      }
      else if(arr[mid]<x) start = mid+1;
      else end = mid-1;
      
      }
      return res;
      
  }
 
    
public:
    vector<int> searchRange(vector<int>& nums, int target) {
      
        int start = 0;
        int end = nums.size()-1;
        int res = -1;
        
        vector<int>v;
        int first = f(nums,start,end,target,res);
        int last  = l(nums,start,end,target,res);

        v.push_back(first);
        v.push_back(last);
        
        return v;

        
    }
};
