public class Solution
{
    public bool IsValidSudoku(char[][] board)
    {
        HashSet<int>[] rows = InitializeHashSet(board.Length);
        HashSet<int>[] cols = InitializeHashSet(board.Length);
        HashSet<int>[][] squares = InitializeSquaresHashSet(board.Length / 3);

        for (var row = 0; row < board.Length; row++)
        {
            for (var col = 0; col < board.Length; col++)
            {
                var value = board[row][col];
                if (value == '.')
                {
                    continue;
                }

                var intValue = value - '0';
                if (rows[row].Contains(intValue)
                    || cols[col].Contains(intValue)
                    || squares[row / 3][col / 3].Contains(intValue))
                {
                    return false;
                }
                else
                {
                    rows[row].Add(intValue);
                    cols[col].Add(intValue);
                    squares[row / 3][col / 3].Add(intValue);
                }
            }
        }
        return true;
    }

    private HashSet<int>[] InitializeHashSet(int length)
    {
        var collection = new HashSet<int>[length];
        for (var i = 0; i < length; i++)
        {
            collection[i] = new HashSet<int>();
        }
        return collection;
    }

    private HashSet<int>[][] InitializeSquaresHashSet(int length)
    {
        var collection = new HashSet<int>[length][];
        for (var col = 0; col < length; col++)
        {
            var row = new HashSet<int>[length];
            for (var i = 0; i < length; i++)
            {
                row[i] = new HashSet<int>();
            }
            collection[col] = row;

        }
        return collection;
    }
}