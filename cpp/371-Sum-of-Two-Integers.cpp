class Solution {
public:
    int getSum(int a, int b) {
        while(b!=0)
        {
            int c = a;
            a = a^b;
            b = (unsigned) (c&b)<<1;
        }
        return a;
    }
};
