public class Solution 
{
    public int MySqrt(int x) 
    {
        int left = 0, right = x;
        while (left <= right)
        {
            int mid = (left + right) >> 1;
            long pow = (long)mid * mid;
            if (pow <= x)
            {
                left = mid + 1;
            }
            else 
            {
                right = mid - 1;
            }
        }
        return left - 1;
    }
}
