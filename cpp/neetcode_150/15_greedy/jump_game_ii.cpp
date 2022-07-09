/*
    Given int array, determine min jumps to reach last index
    Ex. nums = [2,3,1,1,4] -> 2, index 0 to 1 to last

    Greedy: At each point, determine furthest reachable, jump to it

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int jump(vector<int>& nums) {
        int n = nums.size();
        int result = 0;
        
        int i = 0;
        while (i < n - 1) {
            if (i + nums[i] >= n - 1) {
                result++;
                break;
            }
            int maxIndex = i + 1;
            int maxValue = 0;
            for (int j = i + 1; j < i + 1 + nums[i]; j++) {
                if (j + nums[j] > maxValue) {
                    maxIndex = j;
                    maxValue = j + nums[j];
                }
            }
            i = maxIndex;
            result++;
        }
        
        return result;
    }
};
