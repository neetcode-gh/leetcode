/*
    Given elevation map array, compute trapped water
    Ex. height = [0,1,0,2,1,0,1,3,2,1,2,1] -> 6

    Keep two arrays which store the largest bar uptil that point in both 
    forward (0 -> n) and reverse (n -> 0) directions. Maximum trappable water 
    depends on the smaller of the left and right maximums. 

    Time: O(n)
    Space: O(n)
*/

int trap(int* height, int heightSize) {
    
    // Initialize leftMax to store the largest height present to the left of every bar
    int leftMax[heightSize];

    leftMax[0] = height[0];
    for (int i = 1; i < heightSize; ++i) {
        leftMax[i] = fmax(height[i], leftMax[i-1]);
    }

    // Initialize rightMax similar to leftMax but for largest height to the right
    int rightMax[heightSize];

    rightMax[heightSize-1] = height[heightSize-1];
    for (int i = heightSize-2; i >= 0; --i) {
        rightMax[i] = fmax(height[i], rightMax[i+1]);
    }

    int waterTrapped = 0;

    for (int i = 0; i < heightSize; ++i) {
        // The minimum of both side decides how much water can be trapped
        int minHeight = fmin(leftMax[i], rightMax[i]);
        
        // If the minHeight is more the current height at a point, water is present there
        if (minHeight > height[i]) {
            waterTrapped += minHeight - height[i];
        }
    }

    return waterTrapped;
}
