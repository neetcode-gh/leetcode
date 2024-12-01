class Solution {
public:
    vector<int> nextGreaterElement(vector<int>& nums1, vector<int>& nums2) {
        // O (n + m)
        map<int, int> nums1Idx; {
            int idx = 0;
            for(int n: nums1)
                nums1Idx[n] = idx++;
        }
        vector<int> res;
        for(int i = 0; i < nums1.size(); i++)
            res.push_back(-1);
        
        stack<int> stack;
        for(int i = 0; i < nums2.size(); i++) {
            int cur = nums2[i];
            
            // while stack has elements and current is greater than the top of the stack
            while(stack.size() && cur > stack.top()) {
                int val = stack.top(); // take top val
                stack.pop();
                int idx = nums1Idx[val];
                res[idx] = cur;
            }
            
            if(nums1Idx.count(cur))
                stack.push(cur);
        }
        
        return res;
    }
};
