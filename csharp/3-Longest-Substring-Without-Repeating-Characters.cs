public class Solution {
    public int LengthOfLongestSubstring(string s) {
        int leftPointer = 0, rightPointer = 0, maxLength = 0;
        HashSet<int> chars = new HashSet<int>();

        while (rightPointer < s.Length) {
            char currChar = s[rightPointer];
            if (chars.Contains(currChar)) { // Move left pointer until all duplicate chars removed
                chars.Remove(s[leftPointer]);
                leftPointer++;
            } else {
                chars.Add(currChar);
                maxLength = Math.Max(maxLength, rightPointer - leftPointer + 1);
                rightPointer++;
            }
        }
        return maxLength;
    }
}