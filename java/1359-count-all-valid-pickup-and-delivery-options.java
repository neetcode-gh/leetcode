class Solution {
    public int countOrders(int n) {
        int MOD = (int) 1e9 + 7;
        int slots = 2*n;
        long res = 1;

        while(slots > 0){
            int valid_choices = slots*(slots - 1)/2;
            res = (res * valid_choices) % MOD;
            slots -= 2;
        }
        return (int)res;
    }
}
