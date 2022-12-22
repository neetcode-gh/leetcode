// Solution: Expanding Around Center

// Time Complexity: O(n^2)
// Extra Space Complexity: O(1)

class Solution {
    // Global variables
    String ans = "";
    int maxLen=0;
    
    // helper function
    public void extendPalindrome(String s, int left, int right){       
            while(left>=0 && right<s.length() && s.charAt(left)==s.charAt(right)){
                int len = right-left+1;
                if(len>maxLen){
                    ans = s.substring(left, right+1);
                    maxLen = len;
                }
                left--; 
                right++;
            } 
    }
    
    // main function
    public String longestPalindrome(String s) {
        int n = s.length();
        if(n==1) return s;
        for(int i=0; i<n; i++){
            // odd                                             
            extendPalindrome(s,i,i);
            // even  
            extendPalindrome(s,i,i+1);  
      
        }
        return ans;
    }
}

// Solution: A more Optimized Expand Around Center

// TIme Complexity: O(n^2)
// Extra Space Complexity: O(1)

class Solution2 {

    public String longestPalindrome(String s) {
        int best = 0;
        int start = 0, end = 0;

        for (int i = 0; i < s.length(); i++) {
            int left = i - 1;
            while (i < s.length() - 1 && s.charAt(i) == s.charAt(i + 1)) {
                ++i;
            }

            int right = i + 1;
            while (
                left >= 0 &&
                right < s.length() &&
                s.charAt(left) == s.charAt(right)
            ) {
                --left;
                ++right;
            }

            if (right - left > best) {
                best = right - left;
                start = left + 1;
                end = right;
            }
        }

        return s.substring(start, end);
    }
}

// Solution: Dynamic Programming

// Time Complexity: O(n^2)
// Extra Spce Complexity: O(n^2)

class Solution3 {

    public String longestPalindrome(String s) {
        int len = s.length();
        int left = 0, right = 1, max = 0;

        var isPalindrome = new boolean[len][len];

        for (int i = len - 1; i >= 0; i--) {
            for (int j = i; j < len; j++) {
                if (i == j) {
                    isPalindrome[i][j] = true;
                } else if (s.charAt(i) == s.charAt(j)) {
                    if (j - i == 1) {
                        isPalindrome[i][j] = true;
                    } else {
                        isPalindrome[i][j] = isPalindrome[i + 1][j - 1];
                    }
                }

                if (isPalindrome[i][j] && j - i + 1 > max) {
                    max = j - i + 1;
                    left = i;
                    right = j + 1;
                }
            }
        }

        return s.substring(left, right);
    }
}
