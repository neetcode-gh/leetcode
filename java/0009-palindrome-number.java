class Solution {
    public boolean isPalindrome(int x) {
        if(x < 0) return false;
        
        long div = 1;
        while(x >= 10 * div)
            div *= 10;
        
        while(x > 0) {
            if(x / div != x % 10) return false;
            x = (int)((x % div) / 10);
            div = div / 100;
        }
        return true;
    }
}
