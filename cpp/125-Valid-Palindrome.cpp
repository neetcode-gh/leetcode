class Solution {
public:
    bool isPalindrome(string s) {
        int start = 0, end = s.length()-1;
        
        while (start < end) {
            char a = s[start], b = s[end];
            
            // Convert to caps
            if (a >= 'a' && a <= 'z') a = a-'a'+'A';
            if (b >= 'a' && b <= 'z') b = b - 'a' + 'A';
                
            // Logic
            if ( (a < 'A' || a > 'Z') && (a < '0' || a > '9') ) {
                start ++;
                continue;
            }
            if ( (b < 'A' || b > 'Z') && (b < '0' || b > '9') ) {
                end --;
                continue;
            }            
            if(a != b) return false;
            start ++;
            end --; 
        }
        
       return true;  
    }
};