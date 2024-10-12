public class Solution : GuessGame 
{
    public int GuessNumber(int n) 
    {
        int left = 0, right = n - 1;

        while (left <= right)
        {
            int mid = left + ((right - left) >> 1);
            int result_guess = guess(mid);
            if (result_guess == 1)
            {
                left = mid + 1;
            }
            else if (result_guess == -1)
            {
                right = mid - 1;
            }
            else
            {
                return mid;
            }
        }

        return left;
    }
}
