#include<bits/stdc++.h>
using namespace std;

/*
Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

Whitespace: Ignore any leading whitespace (" ").
Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity if neither present.
Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
Rounding: If the integer is out of the 32-bit signed integer range [-231, 231 - 1], then round the integer to remain in the range. Specifically, integers less than -231 should be rounded to -231, and integers greater than 231 - 1 should be rounded to 231 - 1.
Return the integer as the final result.
Example :

Input: s = " -042"

Output: -42

Explanation:

Step 1: "   -042" (leading whitespace is read and ignored)
            ^
Step 2: "   -042" ('-' is read, so the result should be negative)
             ^
Step 3: "   -042" ("042" is read in, leading zeros ignored in the result)
*/

class Solution {
    public:
        int myAtoi(string s) {
            int sign=1;
            bool tag=false;
            int j=0,ind;
            double ans=0;
            
            // trim the string till we get number
            for (int i=0;i<s.size();i++){
                if (s[i]==' ') {
                
                    continue;}
                else{ 
                if (s[i]=='-') {
                    sign =-1;
                    j=i+1;
                    break;
                }
                else if(s[i]=='+'){
                    sign=1;
                    j=i+1;
                    break;
                }
                else{
                    j=i;
                    break;
                }
                }
        }

        // convert string to integer

            for (int i=j;i<s.size();i++){
                 if (int(s[i])>47 && int(s[i])<58){
                    ans=ans*10;
                    ans=ans+int(s[i])-48;
                    
                }
                else {
                    break;
                }
            }
             ans=sign*ans;
            long long y=pow(2,31);
             if (ans <-1*y) return -1*y;
             else if (ans > y-1) return y-1;
            else return ans;
        }
    };