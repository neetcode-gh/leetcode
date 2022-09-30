public class Solution
{
    public IList<IList<int>> Permute(int[] nums)
    {
        var result = new List<IList<int>>();
        PermuteRecurse(result, nums, 0);
        return result;
    }

    private void PermuteRecurse(List<IList<int>> res, int[] arr, int start)
    {
        if (start == arr.Length)
        {
            var list = arr.Select(t => (t)).ToList();
            res.Add(list);
            return;
        }

        for (var i = start; i < arr.Length; i++)
        {
            (arr[start], arr[i]) = (arr[i], arr[start]);
            PermuteRecurse(res, arr, start + 1);
            (arr[start], arr[i]) = (arr[i], arr[start]);
        }
    }
}