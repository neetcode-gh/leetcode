public class Solution
{
    private Queue<(int, int)> queue = new Queue<(int, int)>();
    private int rows;
    private int cols;


    public void WallsAndGates(int[][] rooms)
    {
        rows = rooms.Length;
        cols = rooms[0].Length;
        var visited = new int[rows, cols];


        void addRoom(int row, int col)
        {
            if (row < 0 || col < 0 || row == rows || col == cols || rooms[row][col] == -1 || visited[row, col] == 1)
                return;

            visited[row, col] = 1;
            queue.Enqueue((row, col));
        }

        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j < cols; j++)
            {
                if (rooms[i][j] == 0)
                {
                    queue.Enqueue((i, j));
                    visited[i, j] = 1;
                }
            }
        }

        var currentDistance = 0;
        while (queue.Count > 0)
        {
            var count = queue.Count;
            for (var i = 0; i < count; i++)
            {
                var (row, col) = queue.Dequeue();
                rooms[row][col] = currentDistance;
                addRoom(row + 1, col);
                addRoom(row - 1, col);
                addRoom(row, col + 1);
                addRoom(row, col - 1);

            }

            currentDistance++;
        }

    }

}