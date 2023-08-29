class Solution {
    public int bestClosingTime(String cust) {
        int n = cust.length();
        int[] pre_n = new int[n+1];
        int[] post_y = new int[n+1];

        for(int i = 1; i <= n; i++){
            pre_n[i] = pre_n[i-1];
            if(cust.charAt(i-1) == 'N')
                pre_n[i]++;
        }
        for(int i = n-1; i >= 0; i--){
            post_y[i] = post_y[i+1];
            if(cust.charAt(i) == 'Y')
                post_y[i]++;
        }

        int min_penalty = Integer.MAX_VALUE, idx = 0;

        for(int i = 0; i <= n; i++){
            int penalty = pre_n[i] + post_y[i];
            if(penalty < min_penalty){
                min_penalty = penalty;
                idx = i;
            }
        }
        return idx;
    }
}
