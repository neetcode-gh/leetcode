/**
 * Given a string s which consists of lowercase or uppercase letters, return the
 * length of the longest palindrome that can be built with those letters.
 *
 * Letters are case sensitive, for example, "Aa" is not considered a palindrome
 * here.
 *
 * Constraints:
 *
 * 1 <= s.length <= 2000
 * s consists of lowercase and/or uppercase English letters only.
 *
 * Space: O(1)
 * Time: O(n)
 */

int longestPalindrome(char *s) {
    int chars_seen[128] = { 0 };

    for (char *s_char = s; *s_char; ++s_char)
        ++chars_seen[*s_char];

    int odd = 0;
    int sum = 0;
    for (int i = 'A'; i <= 'z'; ++i) {
        if (chars_seen[i] % 2) {
            odd = 1;
            sum += chars_seen[i] - 1;
        } else {
            sum += chars_seen[i];
        }
    }

    sum += odd;

    return sum;
}
