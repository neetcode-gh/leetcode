public class Solution 
{
    public int TotalNQueens(int n) 
    {
        List<int> col = new List<int>(n);    
        List<int> diag1 = new List<int>(n);  
        List<int> diag2 = new List<int>(n);  
        int output = 0;
        Backtrack(ref output, col, diag1, diag2, n, 0, n);
        return output;
    }

    private void Backtrack(ref int output, List<int> col, List<int> diag1, List<int> diag2, int grid_size, int row, int queens_left)
    {
        if(queens_left == 0)
        {
            output++;
        }
        else
        {
            for(int c = 0; c < grid_size; c++)
            {
                if(CanPlace(col, diag1, diag2, row, c))
                {
                    Place(col, diag1, diag2, row, c);
                    Backtrack(ref output, col, diag1, diag2, grid_size, row + 1, queens_left - 1);
                    Remove(col, diag1, diag2, row, c);
                }
            }
        }
    }
    private bool CanPlace(List<int> col, List<int> diag1, List<int> diag2, int r, int c)
    {
        return !col.Contains(c) && !diag1.Contains(r + c) && !diag2.Contains(r - c);
    }
    private void Place(List<int> col, List<int> diag1, List<int> diag2, int r, int c)
    {
        col.Add(c);
        diag1.Add(r + c);
        diag2.Add(r - c);
    }
    private void Remove(List<int> col, List<int> diag1, List<int> diag2, int r, int c)
    {
        col.Remove(c);
        diag1.Remove(r + c);
        diag2.Remove(r - c);
    }
}