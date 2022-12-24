public class Solution
{
    //T: O(2^T), where T is target
    public IList<IList<int>> CombinationSum2(int[] candidates, int target)
    {

        var result = new List<IList<int>>();
        Array.Sort(candidates);

        void dfs(int pos, Stack<int> current, int target)
        {
            if (target == 0)
            {
                result.Add(current.ToList());
            }
            if (target <= 0)
            {
                return;
            }

            var prev = -1;

            for (var i = pos; i < candidates.Length; i++)
            {
                if (candidates[i] == prev)
                    continue;

                current.Push(candidates[i]);
                dfs(i + 1, current, target - candidates[i]);
                current.Pop();
                prev = candidates[i];
            }

        }

        dfs(0, new Stack<int>(), target);
        return result;
    }
}