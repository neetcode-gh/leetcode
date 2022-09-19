public class Solution {
    public int UniquePaths(int m, int n) {
         var row = new int[n];
            Array.Fill(row, 1);
            foreach (var i in Enumerable.Range(0, m - 1))
            {
                var newRow = new int[n];
                Array.Fill(newRow, 1);
              for (int j = n - 2; j >=0; j--)
                { 
                    newRow[j] = newRow[j + 1] + row[j];
                }
                row = newRow;
            }
            return row[0];
    }
}
