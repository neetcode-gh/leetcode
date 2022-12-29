class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
       unordered_map<int,int>m;
       stack<int>stk;
       for(auto x : nums2)
       {
           while(!stk.empty()&&stk.top()<x)
           {
               m[stk.top()]=x;
               stk.pop();
           }
           stk.push(x);
       }
       for(auto &x: nums1)
       {
           x=m.count(x) ? m[x]:-1; 
       }
       return nums1;
    }
};
