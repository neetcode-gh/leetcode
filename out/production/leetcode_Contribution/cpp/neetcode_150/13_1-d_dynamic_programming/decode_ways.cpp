/*
    Given a string w/ only digits, return # ways to decode it (letter -> digit)
    Ex. s = "12" -> 2 (AB 1 2 or L 12), s = "226" -> 3 (2 26 or 22 6 or 2 2 6)

    DP: Bottom-up approach: check if zero and assign the i+1 value to the current;
    otherwise, check if the current char is a '1' and thus admits any i+1 char,
    or a '2', which admits only 0 <= x <= 6 as characters at i+1.

    Time: O(n)
    Space: O(1)
*/
class Solution {
public:
    int numDecodings(string s) {   
        int n = s.size();     
        int prev = 0;
        int curr = 1;

        for (int i = n - 1; i >= 0; --i){
            int newCurr;
            if (s[i] == '0')
                newCurr = 0;
            else
                newCurr = curr;
            
            if (i + 1 < n && (s[i] == '1' || s[i] == '2' 
                && s[i+1] <= '6'))
                newCurr += prev;
            
            prev = curr;
            curr = newCurr;
        }

        return curr;
    }
};

/*
    Given a string w/ only digits, return # ways to decode it (letter -> digit)
    Ex. s = "12" -> 2 (AB 1 2 or L 12), s = "226" -> 3 (2 26 or 22 6 or 2 2 6)

    DP: At each digit, check validity of ones & tens, if valid add to # ways
    Recurrence relation: dp[i] += dp[i-1] (if valid) + dp[i-2] (if valid)

    Time: O(n)
    Space: O(n)
*/
class Solution2 {
public:
    int numDecodings(string s) {
        if (s[0] == '0') {
            return 0;
        }
        
        int n = s.size();
        
        vector<int> dp(n + 1);
        dp[0] = 1;
        dp[1] = 1;
        
        for (int i = 2; i <= n; i++) {
            int ones = stoi(s.substr(i - 1, 1));
            if (ones >= 1 && ones <= 9) {
                dp[i] += dp[i - 1];
            }
            int tens = stoi(s.substr(i - 2, 2));
            if (tens >= 10 && tens <= 26) {
                dp[i] += dp[i - 2];
            }
        }
        
        return dp[n];
    }
};
