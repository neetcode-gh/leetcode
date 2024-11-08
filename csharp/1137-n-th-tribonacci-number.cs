// iterative with no array
public class Solution 
{
    public int Tribonacci(int n)
    {
        int seq1 = 0;
        int seq2 = 0;
        int seq3 = 1;

        for (int i = 0; i < n; i++)
        {
            int seq2_temp = seq2;
            seq2 += seq3;
            seq3 = seq2_temp;

            int seq1_temp = seq1;
            seq1 += seq2;
            seq2 = seq1_temp;
        }

        return seq1;
    }
}

// bottom up solution
public class Solution 
{
    public int Tribonacci(int n)
    {
        if (n <= 0) 
        { 
            return 0; 
        }
        else if (n <= 2) 
        { 
            return 1; 
        }
        var dp = new int[n];
        dp[0] = 1;
        dp[1] = 1;
        dp[2] = 2;

        for (int i = 3; i < n; i++)
        {
            dp[i] = dp[i - 3] + dp[i - 2] + dp[i - 1];
        }

        return dp[n - 1];
    }
}

// recursive + memo solution
public class Solution 
{
    public int Tribonacci(int n)
    {
        int[] mem = new int[n];
        return Recursive(n, mem);
    }

    private int Recursive(int n, int[] mem)
    {
        if (n <= 0)
        {
            return 0;
        }
        else if (n == 1)
        {
            return 1;
        }
        else if (mem[n - 1] == 0)
        {
            mem[n - 1] = Recursive(n - 1, mem) + Recursive(n - 2, mem) + Recursive(n - 3, mem);
        }

        return mem[n - 1];
    }
}