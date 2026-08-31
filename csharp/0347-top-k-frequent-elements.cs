public class Solution
{
    public int[] TopKFrequent(int[] nums, int k)
    {
        Dictionary<int, int> numCount = new Dictionary<int, int>();
        for (int i = 0; i < nums.Length; i++)
        {
            if (numCount.ContainsKey(nums[i]))
                numCount[nums[i]] += 1;
            else
                numCount[nums[i]] = 1;
        }

        List<int>[] bucketSort = new List<int>[nums.Length + 1];

        for (int i = 0; i < bucketSort.Length; i++)
            bucketSort[i] = new List<int>();

        foreach (var i in numCount)
            bucketSort[i.Value].Add(i.Key);

        int[] result = new int[k];
        int resultCount = 0;

        for (int i = bucketSort.Length - 1; i >= 1; i--)
        {
            if (bucketSort[i].Count == 0)
                continue;

            foreach (int item in bucketSort[i])
            {
                result[resultCount] = item;
                resultCount++;
            }
            if (resultCount == k)
                break;
        }
        return result;
    }
}