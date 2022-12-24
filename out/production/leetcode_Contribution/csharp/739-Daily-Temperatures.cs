public class Solution
{
    public int[] DailyTemperatures(int[] temperatures)
    {
        var result = new int[temperatures.Length];
        Array.Fill(result, 0);
        var stack = new Stack<int>();

        for (var i = 0; i < temperatures.Length; i++)
        {
            var t = temperatures[i];
            while (stack.Any() && temperatures[stack.Peek()] < t)
            {
                var prev = stack.Pop();
                result[prev] = i - prev;
            }
            stack.Push(i);
        }

        return result;
    }
}