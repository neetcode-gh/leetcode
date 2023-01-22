public class Solution
{
    public int MinEatingSpeed(int[] piles, int h)
    {
        int left = 1, right = piles.Max();
        var result = right;

        while (left <= right)
        {
            var mid = left + (right - left) / 2;
            long hours = 0;
            foreach (var pile in piles)
            {
                hours += (int)Math.Ceiling(pile / (double)mid);
            }

            if (hours <= h)
            {
                result = Math.Min(result, mid);
                right = mid - 1;
            }
            else
            {
                left = mid + 1;
            }
        }

        return result;
    }
}