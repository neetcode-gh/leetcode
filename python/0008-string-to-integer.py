'''
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
'''

class Solution:
    def myAtoi(self, s: str) -> int:
        s=s.strip()
        sign=1
        if len(s)==0:
            return 0
        
        if s[0]=="-" or s[0]=="+" :
            sign=-1 if s[0]=="-" else 1
            s=s[1:]
            
        l=0 
        for c in s:
            k=ord(c)-48
            if k in range(0,10):
                l=l*10
                l=l+k
            else:
                break
                
        n=sign*l
        if n>=(2**31):
            return (2**31)-1
        elif n<(-(2**31)):
            return -(2**31)
        return n