public class Solution 
{
    public int[][] GenerateMatrix(int n)
    {
        var grid = new int[n][];
        for (int i = 0; i < n; i++)
        {
            grid[i] = new int[n];
        }

        int top = 0, bottom = n - 1;
        int left = 0, right = n - 1;
        int value = 1;

        while (top <= bottom && left <= right)
        {
            for (int col = left; col <= right; col++)
            {
                grid[top][col] = value++;
            }
            top++;

            for (int row = top; row <= bottom; row++)
            {
                grid[row][right] = value++;
            }
            right--;

            if (top <= bottom)
            {
                for (int col = right; col >= left; col--)
                {
                    grid[bottom][col] = value++;
                }
                bottom--;
            }

            if (left <= right)
            {
                for (int row = bottom; row >= top; row--)
                {
                    grid[row][left] = value++;
                }
                left++;
            }
        }

        return grid;
    }
}