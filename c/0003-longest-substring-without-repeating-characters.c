/*
Given a string s, find the length of the longest substring without repeating characters.
Time: O(n)
Space: O(1)
*/

int max(int a, int b) {
    return a>b?a:b;
}

int lengthOfLongestSubstring(char * s){
    int alpha[128] = {0};
    int i=0;
    int j=0;
    int ans=0;
    while (s[j]!='\0') {
        alpha[s[j]]++;
        if (alpha[s[j]]>1) {
            while (alpha[s[j]]>1) {
                alpha[s[i]]--;
                i++;
            }
        }
        ans = max(ans, j-i+1);
        j++;
    }
    return ans;
}
