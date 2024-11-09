class Solution {

    // Helper function to calculate gcd using Euclidean algorithm
    public int gcd(int a, int b){
        if(b == 0){
            return a;
        }
        return gcd(b, a%b);
    }

    /* 
    Approach: If the string have a GCD, then str1 will be of the form m*GCD and str2 will be of the form n*GCD.
    So, str1 + str2 = m*GCD + n*GCD = (m+n)*GCD, hence str1 + str2 should be equal to str2 + str1.
    If the above condition is satisfied, then we can find the GCD of the lengths of the strings and return the substring of str1 of length GCD.
    Else, return empty string.
    */ 

    public String gcdOfStrings(String str1, String str2) {
        if((str1 + str2).equals(str2 + str1)){
            int len1 = str1.length();
            int len2 = str2.length();
            int gcd = gcd(len1, len2);
            return str1.substring(0, gcd);
        }
        return  "";
    }
}