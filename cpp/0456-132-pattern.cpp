/*
    Given nums, return true if there is a 132 pattern where
    num[i] < nums[k] < nums[j] for i < j < k

    Use a monotonically decreasing stack to store a pair
    {candidate nums[j], candidate nums[i]} where 
    candidate nums[i] is the minimum number in nums before j

    Traverse nums.
    Pop the stack while n >= candidate nums[j] at the top of the stack (n is a better candidate than those)
    Then, if stack not empty, check if 132 patter if found --> return True
    Else, add the current num as a candidate nums[j] with the current min as the candidate nums[i] then update current min
*/
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        stack<pair<int, int>> s;
        int curMin = nums[0];

        for(auto & n : nums){
            // pop all values in stack that have nums[j] candidate <= n
            while(!s.empty() && s.top().first <= n){
                s.pop();
            }
            // if stack not empty, check if we found 132 pattern
            if(!s.empty() && s.top().second < n) return true;
            else{
                // add n to stack and update curMin
                s.push({n, curMin});
                curMin = min(curMin, n);
            }
        }
        return false;
    }
};
