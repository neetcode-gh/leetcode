public class Solution {
    public bool IsValid(string s) {
        var stack = new Stack<char>();
        var pairs = new Dictionary<char, char>() {
            [')'] = '(',
            [']'] = '[',
            ['}'] = '{'
        };

        foreach (char c in s) {
            if (!pairs.ContainsKey(c)) {
                stack.Push(c);
            } else if (stack.Count == 0 || stack.Pop() != pairs[c]) {
                return false;
            }
        }

        return stack.Count == 0;
    }
}