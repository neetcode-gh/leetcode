class Solution {
    public int minimumOneBitOperations(int n) {
        if(n == 0)
            return 0;

        int k = 0;
        while((int)Math.pow(2,k) <= n)
            k += 1;
        k -= 1;
        return (int)Math.pow(2,k+1) - 1 - minimumOneBitOperations((int)Math.pow(2,k) ^ n);        
    }
}
