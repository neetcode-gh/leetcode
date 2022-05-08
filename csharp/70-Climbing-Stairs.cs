public class Solution
{
    public int ClimbStairs(int n)
    {
        var oneStep = 1;
        var twoStep = 1;

        for (var i = 0; i < n - 1; i++)
        {
            var temp = oneStep;
            oneStep = oneStep + twoStep;
            twoStep = temp;
        }
        return oneStep;
    }
}