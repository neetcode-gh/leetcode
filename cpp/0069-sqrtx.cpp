class Solution {
public:
    int mySqrt(int x) {

        int l = 0;
        int r = x;

        while(l <= r){
            long int m = (l + r) / 2;
            if(m * m == x){
                return m;
            }
            else if(m * m > x){
                r = m - 1;
            }
            else{
                l = m + 1;
            }
        }
        return r;
    }
};