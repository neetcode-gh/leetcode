public class Solution {
    public int ClimbStairs(int n) {
        if(n <= 3) return n;
        int one = 2, two = 3;
        
        for(var  i = 2; i < n - 1; i++) {
            (one, two) = (two, one + two);
        }
        
        return two;
    }
}