 /*
    Approach: 
    Need to create all the disjoin subsequence and check if they are palindrome.
    keep track of maximum product 

    Time complexity : O(N*N^3)
    Space complexity: O(N)

    N is length of the string
*/


class Solution {
public:

    int answer = INT_MIN;

    // function to check if the string is a palindrome
    bool isPalindrome(string &s){
        int start = 0;
        int end = s.length() - 1;

        while(start<end){
            if(s[start]!=s[end]){
                return false;
            }
            start++;
            end--;
        }

        return true;
    }

    // function to generate all the disjoint subsequence
    void generateAll(int idx, string &s1, string &s2, string& s){

        if(idx >= s.length())
        {
            if(isPalindrome(s1)&&isPalindrome(s2)){
                int l = s1.length()*s2.length();
                answer = max(answer,l);
            }
            return;
        }
        
        char c = s[idx];

        /* 
        we have three options
        1. Add the char to the first string
        2. Add the char to the second string
        3. Add the char to none of the string
        */

        // add the character in the first string
        s1.push_back(c);
        generateAll(idx+1,s1,s2,s);
        s1.pop_back();

        // add the character in the second string
        s2.push_back(c);
        generateAll(idx+1,s1,s2,s);
        s2.pop_back();

        // add character in no string
        generateAll(idx+1,s1,s2,s);
    }

    int maxProduct(string s) {

        string s1 = "";
        string s2 = "";
        int idx = 0;

        generateAll(idx,s1,s2,s);

        return answer;
    }

    
};