public class Solution {
    public IList<IList<int>> Generate(int numRows) {
        int itr = 1;
        IList<IList<int>> triangle = new List<IList<int>>();
        while(itr <= numRows) {
            List<int> row = new List<int>();
            for (int i = 0; i < itr; ++i) {
                if (i == 0 || i == itr - 1) {
                    row.Add(1);
                }
                else {
                    row.Add(triangle[itr - 2][i - 1] + triangle[itr - 2][i]);
                }
            }
            triangle.Add(row);
            ++itr;
        }
        return triangle;
    }
}
