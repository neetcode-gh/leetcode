class Solution {
  List<int> getConcatenation(List<int> nums) {
        List<int> ans = [];
        for (int i=0; i<2; i++){
            nums.forEach((int num) {ans.add(num);});
        }
        return ans;
  }
}