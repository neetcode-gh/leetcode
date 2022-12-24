public class Solution
{
    public int CarFleet(int target, int[] position, int[] speed)
    {
        var pair = new (int, int)[position.Length];
        for (var i = 0; i < position.Length; i++)
        {
            pair[i] = (position[i], speed[i]);
        }

        var stack = new Stack<double>();
        foreach (var (p, s) in pair.OrderByDescending(i => i.Item1))
        {
            stack.Push((target - p) / (double)s);
            if (stack.Count >= 2 && stack.Peek() <= stack.Skip(1).First())
            {
                stack.Pop();
            }
        }

        return stack.Count;
    }
}