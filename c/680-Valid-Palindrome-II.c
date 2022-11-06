/*
Given a string s, return true if the s can be palindrome after deleting
at most one character from it.

Time: O(n) (where n is the size of the string)
Space: O(1)
*/

bool is_palindrome(char* s, int i, int j) {
    /* Return if s[i::j] is a palindrom */
    while (i<j) {
        if (s[i] != s[j])
            return false;
        i++;
        j--;
    }
    return true;
}

bool validPalindrome(char * s){
    int i=0;
    int j = strlen(s)-1;
    while (i<j) {
        if (s[i] != s[j]) { // Isn't a palindrome with both s[i] and s[j]
            return is_palindrome(s, i+1, j) || is_palindrome(s, i, j-1);
        }
        i++;
        j--;
    }
    return true;
}
