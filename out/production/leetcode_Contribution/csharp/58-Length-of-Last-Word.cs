public class Solution {
    public int LengthOfLastWord(string s) {
        s = s.TrimEnd();
        string[] arr = s.Split(' ');
        return arr[arr.Length - 1].Length;
    }
}

