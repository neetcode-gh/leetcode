class Solution {
public:
    /*
    Approach: 
    Traverse from end to the first whitespace character and count the number of letters.
    Return the count as our pointer hits the whitespace character.
    
    Time complexity: O(n)
    Space complexity: O(1)
    */    
    int lengthOfLastWord(string s) {
        int n = s.length();
        
        int ptr = n-1;
        while(ptr >= 0 && s[ptr] == ' ') ptr--; /* Skip the trailing whitespaces */
        
        int len = 0;
        while(ptr >= 0 && s[ptr--] != ' ') len++; /* Counting the letters in the last word */
        return len;
    }
};