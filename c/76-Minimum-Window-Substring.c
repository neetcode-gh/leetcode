/*
Given two strings s and t of lengths m and n respectively, return the minimum window substring of s such that every 
character in t (including duplicates) is included in the window. If there is no such substring, return the empty string "".
Space: O(1)
Time: O(n+m) where n is the length of s and m the length of t
*/

char * minWindow(char * s, char * t){
    int alpha[59] = {0};
    int need = 0;
    for (int i=0; t[i]!='\0'; i++) { // Initialise the alphabet
        if (alpha[t[i]-'A']==0)
            need++;
        alpha[t[i]-'A']--;
    }
    int maxLen = 100001;
    int pos=0;
    int i=0, j=0;
    while (s[j]!='\0') {
        alpha[s[j]-'A']++;
        if (alpha[s[j]-'A']==0) {
            need--;
            if (need==0) {
                while (alpha[s[i]-'A']>0) {
                    alpha[s[i]-'A']--;
                    i++;
                }
                if ((j-i+1)<maxLen) {
                    pos = i;
                    maxLen = j-i+1;
                }
                alpha[s[i]-'A']--;
                need++;
                i++;
            }
        }
        j++;
    }
    
    if (maxLen==100001) { // No substring found
        char* ans = malloc(sizeof(char));
        ans[0] = '\0';
        return ans;
    } else {
        char* ans = malloc(sizeof(char)*(maxLen+1));
        for (int i=0; i<maxLen; i++)
            ans[i] = s[i+pos];
        ans[maxLen] = '\0';
        return ans;
    }
}
