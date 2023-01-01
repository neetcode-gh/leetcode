class Solution {
    public boolean isUgly(int n) {
        if(n <= 0)
            return false;
        
        for(int p: new int[] {2, 3, 5})
            while(n % p == 0)
                n = n / p;
        return n == 1;
    }
}
