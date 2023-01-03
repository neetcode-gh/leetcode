class Solution {
private:
    bool validPalindromeUtil(string s, int i, int j) {
        while(i < j)
            if(s[i] == s[j]) {
                i += 1;
                j -= 1;
            } else
                return false;
        return true;
    }
public:
    bool validPalindrome(string s) {
        int i = 0, j = s.length() - 1;
        
        while(i < j)
            if(s[i] == s[j]) {
                i += 1;
                j -= 1;
            } else
                return validPalindromeUtil(s, i + 1, j) || validPalindromeUtil(s, i, j - 1);
        return true;
    }
};
