class Solution {
  List<List<int>> generate(int numRows) {
      if (numRows == 1) {
          return [[1]];
      }

      List<List<int>> res = [[1], [1, 1]];
      for (int i=2; i<numRows; i++) {
          List<int> tmp = [];
          for (int j=0; j<i+1; j++) {
              if (j == 0 || j == i) {
                  tmp.add(1);
              } else {
                  tmp.add(res[i - 1][j - 1] + res[i - 1][j]);
              }
          }
          res.add(tmp);
      }
      return res;
  }
}