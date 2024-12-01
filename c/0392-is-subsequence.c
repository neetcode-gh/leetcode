/**
 * Given two strings s and t, return true if s is a subsequence of t, or false
 * otherwise. A subsequence of a string is a new string that is formed from the
 * original string by deleting some (can be none) of the characters without
 * disturbing the relative positions of the remaining characters. (i.e., "ace"
 * is a subsequence of "abcde" while "aec" is not).
 *
 * Example 1:

 * Input: s = "abc", t = "ahbgdc"
 * Output: true
 *
 * Example 2:
 *
 * Input: s = "axc", t = "ahbgdc"
 * Output: false
 *
 * Constraints:
 *
 * 0 <= s.length <= 100
 * 0 <= t.length <= 104
 * s and t consist only of lowercase English letters.
 *
 * Space: O(1)
 * Time: O(n)
 */

bool isSubsequence(char * s, char * t){
    char *s_char = s;
    char *t_char = t;

    while (*s_char != 0) {
        if (*t_char == 0) {
            return false;
        }
        else if (*s_char == *t_char) {
            ++s_char;
        }

        ++t_char;
    }

    return true;
}
