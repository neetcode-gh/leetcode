public class Solution {
    public void ReverseString(char[] s) {
        int l = 0, r = s.Length - 1;
        while (l < r) {
            var temp = s[l];
            s[l++] = s[r];
            s[r--] = temp;
        }
    }
}
