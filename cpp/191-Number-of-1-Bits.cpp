class Solution {
public:
    int hammingWeight(uint32_t n) {
        int i=32,count=0;

        while(i>0){
            if((n&1)==1)count++;    //AND operation with 1, 1&1=1, 1&0=1, 0&0=0
            n=n>>1;                 //shifting n 1 bit to the left
            i--;                    //decrementing the counter
        }
        return count;               
    }
};