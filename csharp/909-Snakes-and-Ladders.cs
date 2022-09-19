public class Solution {
 
     public int SnakesAndLadders(int[][] board)
        {
            int n = board.Length;
            bool[,] visits = new bool[n, n];
            Queue<int> q = new Queue<int>();
            q.Enqueue(1);
            int res = 0;

            while (q.Count > 0)
            {
                int cnt = q.Count;

                for (int i = 0; i < cnt; i++)
                {
                    int cur = q.Dequeue();
                    if (cur == n * n)
                        return res;

                    for (int j = 1; j <= 6; j++)
                    {
                        int newVal = cur + j;

                        if (newVal > n * n)
                            break;
                        var pos = GetPositionForInt(newVal, n);
                        if (visits[pos.r, pos.c] == true)
                            continue;
                        if (board[pos.r][pos.c] == -1)
                            q.Enqueue(newVal);
                        else
                            q.Enqueue(board[pos.r][pos.c]);

                        visits[pos.r, pos.c] = true;
                    }
                }
                res++;
            }

            return -1;
        }
        private (int r, int c) GetPositionForInt(int x, int n)
        {
            int r = n - (x - 1) / n - 1;
            int c = (x - 1) % n;
            if (r % 2 == n % 2)
                return (r, n - c - 1);
            return (r, c);
        }
}
