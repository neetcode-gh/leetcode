public class Solution 
{
    public IList<IList<int>> Combine(int n, int k)
    {
        var output = new List<IList<int>>();
        Backtrack(output, [], n, k, 1);
        return output;
    }

    private void Backtrack(List<IList<int>> output, List<int> current, int n, int k, int index) 
    {
        if (current.Count == k)
        {
            output.Add(new List<int>(current));
        }
        else 
        {
            for (int i = index; i <= n; i++)
            {
                current.Add(i);
                Backtrack(output, current, n, k, i + 1);
                current.RemoveAt(current.Count - 1);
            }
        }
    }
}