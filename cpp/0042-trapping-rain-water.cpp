/*
    Given elevation map array, compute trapped water
    Ex. height = [0,1,0,2,1,0,1,3,2,1,2,1] -> 6

    2 pointers, outside in, track max left/right
    For lower max, curr only dependent on that one
    Compute height of these, iterate lower one

    Time: O(n)
    Space: O(1)
*/

class Solution {
public:
    int trap(vector<int>& height) {
        int i = 0;
        int j = height.size() - 1;
        
        int maxLeft = height[i];
        int maxRight = height[j];
        
        int result = 0;
        
        while (i < j) {
            if (maxLeft <= maxRight) {
                i++;
                maxLeft = max(maxLeft, height[i]);
                result += maxLeft - height[i];
            } else {
                j--;
                maxRight = max(maxRight, height[j]);
                result += maxRight - height[j];
            }
        }
        
        return result;
    }
};
