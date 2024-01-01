class Solution {
    public int kthGrammar(int n, int k) {
        int left = 1;
        int right = (int)Math.pow(2,n-1);
        int cur = 0;

        for(int i = 0; i < n-1; i++){
            int mid = (left + right)/2;
            if(k <= mid)
                right = mid;
            else{
                left = mid + 1;
                cur = (cur == 1)? 0: 1;
            }    
        }
        return cur;
    }
}
