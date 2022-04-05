//***Area = Math.min(height1, height2)*(rightPointer-leftPointer)***

//Brute-force approach, Time Complexity - O(N^2)
//Find area for all possible containers

class Solution {
    public int maxArea(int[] height) {
        int area = 0;
        int n = height.length;
        for (int i = 0; i<n-1; i++) {
            for (int j = i+1; j<n; j++) {
                area = Math.max(Math.min(height[i], height[j])*(j-i), area);
            }
        }
        return area;
    }
}

//Optimal Approach
//Time Complexity - O(N)
//Approach - Find the area for the corner edges first then keep shrinking from the side which has smaller height

class Solution {
  public int maxArea(int[] height) {
      int area = 0;
      int right = height.length-1;
      int left = 0;
      while (left<right) {
          area = Math.max(area, Math.min(height[left], height[right])*(right-left));
          if (height[left]<height[right]) left++;
          else right--;
      }
      return area;
  }
}
