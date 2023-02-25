/*
Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.
Time: O(n^2)
Space: O(1)
*/

int countSubstrings(char * s){
    int cpt=0;
    int x,y;
    
    for (int i=0; s[i]!='\0'; i++){
        cpt++; // s[i] is a palindrom
        x=i-1;
        y=i+1;
        while (x>=0 && s[y]!='\0' && s[x]==s[y]){ // Odd length palindromic substring
            cpt++;
            x--;
            y++;
        }
        x=i;
        y=i+1;
        while (x>=0 && s[y]!='\0' && s[x]==s[y]){ // Even length palindromic substring
            cpt++;
            x--;
            y++;
        }
    }
    return cpt;
}
