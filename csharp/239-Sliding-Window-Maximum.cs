public class Solution
{
    public int[] MaxSlidingWindow(int[] nums, int k)
    {

        var output = new List<int>();
        LinkedList<int> queue = new();
        int left = 0, right = 0;

        while (right < nums.Length)
        {
            // pop smaller values from queue
            while (queue.Count > 0 && nums[queue.Last.Value] < nums[right])
                queue.RemoveLast();
            queue.AddLast(right);

            // remove left val from the window
            if (left > queue.First.Value)
                queue.RemoveFirst();

            if (right + 1 >= k)
            {
                output.Add(nums[queue.First.Value]);
                left++;
            }

            right++;
        }

        return output.ToArray();
    }
}