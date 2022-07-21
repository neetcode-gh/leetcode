//Solution taken from Leetcode's solution section
//The answer is simple the only tricky thing is the ans+=right-left+1; because of which I got stuck
//Here's an amazing explanation for that | taken form https://leetcode.com/problems/subarray-product-less-than-k/solution/348324
//Say, if we have an array nums = [10,5,2,6] and k = 100
//At first, we have window with 10 so ans = 0+1 and product will be 10
//After that we will move the window since product<k so ans+=right-left+1 tells us the total number of possible outcomes
//How?? See we have 5 as the new value. So, the new possible subarrays are [5] and [10,5] which is right-left+1 (1-0+1 == 2)
//Similarly you can see this pattern further (try it yourself or see the linked comment for more details)
class Solution {

  public int numSubarrayProductLessThanK(int[] nums, int k) {
    if (k <= 1) return 0;
    int left = 0;
    int product = 1;
    int ans = 0;
    for (int right = 0; right < nums.length; right++) {
      product *= nums[right];
      while (product >= k) product /= nums[left++];
      ans += right - left + 1;
    }
    return ans;
  }
}
