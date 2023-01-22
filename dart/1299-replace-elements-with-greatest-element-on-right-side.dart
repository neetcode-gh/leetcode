class Solution {
  List<int> replaceElements(List<int> arr) {
      var curMax = -1;
      for (int i = arr.length - 1; i > -1; i--) {
          int newMax = max(curMax, arr[i]);
          arr[i] = curMax;
          curMax = newMax;
      }
      return arr;
  }
}