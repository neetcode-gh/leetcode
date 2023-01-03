/*
Given a string s containing only digits, return the number 
of ways to decode it.

Space: O(n)
Time: O(n)
*/

int numDecodings(char * s){
    int n = strlen(s);
    if (n==1)
        return s[0]!='0'; // if s is '0' then it's invalid
    int* dp = malloc(sizeof(int)*(n+1));
    dp[n] = 1; // Initialise the empty string
    dp[n-1] = s[n-1]=='0'?0:1; // If it begins with a '0' it's invalid
    for (int i=n-2; i>=0; i--) {
        if (s[i]=='0') { // Begin with a zero
            dp[i] = 0;
        } else if (s[i]=='1' || s[i]=='2') {
            if (s[i]=='2' && s[i+1]>='7')
                dp[i] = dp[i+2]; // Only one way to decode
            else
                dp[i] = dp[i+1] + dp[i+2]; // Two way to decode
        } else {
            dp[i] = dp[i+1]; // One way to decode
        }
    }
    return dp[0];
}
