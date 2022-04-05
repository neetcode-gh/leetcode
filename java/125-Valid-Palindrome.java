class Solution {
    public boolean isPalindrome(String s) {
        int a_pointer = 0;
        int b_pointer = s.length() - 1;
        char left, right;
        
        while(a_pointer < b_pointer) {
            left = s.charAt(a_pointer);
            right = s.charAt(b_pointer);
            
            if(!Character.isDigit(left) && !Character.isLetter(left)) {
                a_pointer++;
                continue;
            }
            
            if(!Character.isDigit(right) && !Character.isLetter(right)) {
                b_pointer--;
                continue;
            }
            
            if(Character.toLowerCase(left) != Character.toLowerCase(right)) return false; 
            
            a_pointer++;
            b_pointer--;
        }
        
        return true;
    }
}
