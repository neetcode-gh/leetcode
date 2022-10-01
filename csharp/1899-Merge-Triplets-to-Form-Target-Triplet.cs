public class Solution
{
    //T: O(N)
    public bool MergeTriplets(int[][] triplets, int[] target)
    {
        var hashSet = new HashSet<(int, int)>();

        foreach (var t in triplets)
        {
            if (t[0] > target[0] || t[1] > target[1] || t[2] > target[2])
                continue;

            for (var i = 0; i < t.Length; i++)
            {
                if (t[i] == target[i])
                    hashSet.Add((i, t[i]));
            }
        }

        return hashSet.Count == 3;
    }

}