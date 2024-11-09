public class Solution
{
    public IList<IList<int>> FindDifference(int[] nums1, int[] nums2)
    {
        HashSet<int> set1 = new HashSet<int>(nums1);
        HashSet<int> set2 = new HashSet<int>(nums2);

        IList<IList<int>> res = new List<IList<int>>() { new List<int>(), new List<int>() };

        foreach (var el in set1)
        {
            if (set2.Contains(el)) continue;

            res[0].Add(el);
        }

        foreach (var el in set2)
        {
            if (set1.Contains(el)) continue;

            res[1].Add(el);
        }

        return res;
    }
}