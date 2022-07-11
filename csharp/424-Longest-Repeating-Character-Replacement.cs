public class Solution {
    public int CharacterReplacement(string s, int k) {
        int left = 0, maxLength = 0;
        int mostFrequentLetterCount = 0; // Count of most frequent letter in the window
        int[] charCounts = new int[26]; // Counts per letter

        for (int right = 0; right < s.Length; right++) {
            charCounts[s[right] - 'A']++;
            mostFrequentLetterCount = Math.Max(mostFrequentLetterCount, charCounts[s[right] - 'A']);

            int lettersToChange = (right - left + 1) - mostFrequentLetterCount;
            if (lettersToChange > k) { // Window is invalid, decrease char count and move left pointer
                charCounts[s[left] - 'A']--;
                left++;
            }

            maxLength = Math.Max(maxLength, (right - left + 1));
        }
        return maxLength;
    }
}