class Solution {
  int climbStairs(int n) {
      int first=0;
      int second=1;
      int res=1;
      for(int i=0;i<n;i++){
        res=first+second;
        first=second;
        second=res;
      }
    return res;
  }
}