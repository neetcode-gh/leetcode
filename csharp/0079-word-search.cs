public class Solution
{
    //T:O(N*M*4^LenOfWord), S: O(m+n+ L)
    //S: O(m+n) is for the visited array
    public bool Exist(char[][] board, string word)
    {
        var rows = board.Length;
        var cols = board[0].Length;
        var visited = new bool[rows, cols];

        for (var i = 0; i < rows; i++)
        {
            for (var j = 0; j < cols; j++)
            {
                if (board[i][j] == word[0] && search(i, j, 0, word, board, visited))
                    return true;
            }
        }

        return false;
    }

    public bool search(int r, int c, int index, string word, char[][] board, bool[,] visited)
    {
        var rows = board.Length;
        var cols = board[0].Length;

        if (index == word.Length)
            return true;
        if (r < 0 || c < 0 || r >= rows || c >= cols || word[index] != board[r][c] || visited[r, c])
            return false;

        visited[r, c] = true;
        var result = search(r + 1, c, index + 1, word, board, visited) ||
          search(r - 1, c, index + 1, word, board, visited) ||
          search(r, c + 1, index + 1, word, board, visited) ||
          search(r, c - 1, index + 1, word, board, visited);

        visited[r, c] = false;
        return result;

    }

}