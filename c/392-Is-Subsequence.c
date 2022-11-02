/*
Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

Space: O(1)
Time: O(n)
*/

bool isSubsequence(char * s, char * t){
    if (s[0]=='\0'){
        return true;
    } else if (t[0]=='\0') {
        return false;
    } else if (t[0]==s[0]) {
        return isSubsequence(s+1, t+1);
    } else {
        return isSubsequence(s, t+1);
    }
}
