public class Solution
{
    public enum Direction
    {
        Left,
        Right
    }

    public struct Pos
    {
        public int i;
        public int j;

        public Pos(int i, int j)
        {
            this.i = i;
            this.j = j;
        }
    }

    public static bool OutOfRange(int[][] mat, int i, int j)
    {
        if (mat.Length == 0 || mat[0].Length == 0) return true;

        if (i >= mat.Length || j >= mat[0].Length) return true;

        if (i < 0 || j < 0) return true;

        return false;
    }

    public static bool MoveForward(ref Pos pos, ref Direction direction, int[][] mat)
    {
        var i = pos.i;
        var j = pos.j;
        var maxI = mat.Length - 1;
        var maxJ = mat[0].Length - 1;

        if (direction == Direction.Left)
        {
            i += 1;
            j -= 1;
        }
        else
        {
            i -= 1;
            j += 1;
        }

        if (OutOfRange(mat, i, j))
        {
            direction = direction == Direction.Right ? Direction.Left : Direction.Right;

            i = pos.i;
            j = pos.j;

            if (direction == Direction.Left)
            {
                if (j < maxJ) j += 1;
                else i += 1;
            }
            else
            {
                if (i < maxI) i += 1;
                else j += 1;
            }
        }

        pos = new Pos(i, j);

        return !OutOfRange(mat, i, j);
    }

    public int[] FindDiagonalOrder(int[][] mat)
    {
        int[] result = new int[mat.Length * mat[0].Length];
        var pos = new Pos(0, 0);
        var direction = Direction.Right;
        var i = 0;

        do
        {
            result[i++] = mat[pos.i][pos.j];
        }
        while (MoveForward(ref pos, ref direction, mat));

        return result;
    }
}