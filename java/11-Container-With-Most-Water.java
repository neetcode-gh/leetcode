class Solution {
    public int maxArea(int[] height) {
        int left = 0;
        int right = height.length - 1;
        int res = 0;
        while (left < right) {
            int containerLength = right - left;
            int area = containerLength * Math.min(height[left], height[right]);
            res = Math.max(res, area);
            if (height[left] < height[right]) {
                left++;
            } else {
                right--;
            }
        }
        return res;
    }
}

/*
 * Using two pointers approach. The container length is the right pointer
 * subtract by the left pointer.
 * Then we take the container length and multiply it by the minimum value of the
 * height at left and the height at right, since the minimum value
 * determines how much water we can hold. If the height at left is smaller than
 * right, we move the left for a potential bigger height.
 * If the left point and the right pointer have equal value, we can move either
 * of them, it doesn't matter.
 * 
 * Time: O(n)
 * Space: O(1)
 */