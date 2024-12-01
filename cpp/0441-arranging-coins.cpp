class Solution {
public:
    int arrangeCoins(int n) {
        int l=1,r = n,answer=1;
        long long sum,m;

        // binary search the values
        while(l<=r){
            m = l + (r-l)/2;

            sum = m * (m+1)/2;

            if(sum==n){
                return (int)m;
            }
            else if(n<sum){
                r = m -1;
            }
            else{
                answer = (int)m;
                l = m + 1;
            }
        }

        return answer;
    }
};