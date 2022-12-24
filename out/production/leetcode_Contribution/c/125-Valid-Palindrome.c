/*
    Time: O(n)
    Space: O(1)
*/

bool isPalindrome(char * s){
    int n = strlen(s);
    if (n==1) return true;
    
    int left = 0;
    int right = n-1;
    
    while (left < right) {
        if (isalnum(s[left]) && isalnum(s[right])) {
            char leftChar = tolower(s[left]);
            char rightChar = tolower(s[right]);
            
            if (leftChar != rightChar) {
                return false;
            }
            left++;
            right--;
        }
        
        if (!isalnum(s[left])) left++;
        if (!isalnum(s[right])) right--;
    }
    
    return true;
}