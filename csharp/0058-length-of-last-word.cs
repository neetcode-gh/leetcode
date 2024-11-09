public class Solution {
    public int LengthOfLastWord(string s) {
        s = s.TrimEnd();
        string[] arr = s.Split(' ');
        return arr[arr.Length - 1].Length;
    }
}

public class NeetCodeSolution {
    public int LengthOfLastWord(string s) {
        var result = 0;
        var i = s.Length - 1;
        while (s[i] == ' ') --i;
        for (; i >= 0; --i) {
            if (s[i] == ' ') {
                return result;
            }
            ++result;
        }
        return result;
    }
}
