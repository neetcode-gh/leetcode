class Solution {

  public int maxProfit(int[] prices) {
    int min = Integer.MAX_VALUE;
    int ans = Integer.MIN_VALUE;
    for (int val : prices) {
      min = Math.min(min, val);
      ans = Math.max(ans, val - min);
    }
    return ans;
  }
}
