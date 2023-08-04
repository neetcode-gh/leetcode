/*
  Given a string s and an integer k, return the maximum number of vowel letters in any substring of s with length k.
  Vowel letters in English are 'a', 'e', 'i', 'o', and 'u'.

  Ex.
  Input: s = "abciiidef", k = 3
  Output: 3
  Explanation: The substring "iii" contains 3 vowel letters.

  Approach : Sliding Window

  Time  : O(N)
  Space : O(1)
*/


class Solution {
public:
    bool isVowel(char ch) {
        if(ch == 'a' || ch == 'e' || ch == 'i' || ch == 'o' || ch == 'u') 
            return true;
        return false;
    }
    int maxVowels(string s, int k) {
        int ptr1 = 0, ptr2 = 0, count = 0, maxi = INT_MIN;
        while(ptr2 < s.size()) {
            if(ptr2 - ptr1 == k) {
                maxi = max(count, maxi);
                if(maxi == k)
                    return count;
                if(isVowel(s[ptr1++]))
                    count--;
                if(isVowel(s[ptr2++]))
                    count++;

            } else {
                if(isVowel(s[ptr2]))
                    count++;
                ptr2++;
            }
        }
        maxi = max(count, maxi);
        return maxi;
    }
};
