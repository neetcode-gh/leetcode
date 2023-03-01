/*
Given an integer n, our task is to count how many strings of length n can be formed under the following rules:

Each character is a lower case vowel ('a', 'e', 'i', 'o', 'u')
Each vowel 'a' may only be followed by an 'e'.
Each vowel 'e' may only be followed by an 'a' or an 'i'.
Each vowel 'i' may not be followed by another 'i'.
Each vowel 'o' may only be followed by an 'i' or a 'u'.
Each vowel 'u' may only be followed by an 'a'.
Since the answer may be too large, we have to return it modulo 10^9 + 7.

Example. For n = 2, Output = 10
	 
	Explanation: All possible strings of length 2 that can be formed as per the given rules are: "ae", "ea", "ei", "ia", "ie", "io", "iu",
	"oi", "ou" and "ua".
	So we return 10 as our answer. 


Time: O(n)
Space: O(1)

*/


class Solution {
const unsigned int mod = 1e9+7;
public:
    int countVowelPermutation(int n) {
        vector<int> prev(5,1), curr(5, 0);
        for(int i=1; i<n; i++) {
            curr[0] = prev[1] % mod;
            curr[1] = (prev[0] + prev[2]) % mod;
            curr[2] = ((prev[0] % mod) + (prev[1] % mod) + (prev[3] % mod) + (prev[4] % mod)) % mod;
            curr[3] = (prev[4] + prev[2]) % mod;
            curr[4] = prev[0] % mod;
            prev = curr;
        }
        int ans = 0;
        for(auto &a:prev) ans = (ans + a) % mod;
        return ans;
    }
};