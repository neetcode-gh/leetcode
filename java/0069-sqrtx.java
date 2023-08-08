class Solution {
    public int mySqrt(int x) {
        
        // Linear search way -> loop through for all nums till x
        // then see if their square <= x

        // Binary Search way -> we can optimise our approach by observing
        // that nums till x are sorted

        int left = 0;
        int right = x;
        int mid = 0;
        int probableAns = 0;

        while(left <= right){
            mid = left + (right-left)/2;
            if((long)mid*mid <= (long)x){
                probableAns = mid;
                // let's see if we can find a bigger num
                left = mid+1;
            }
            else if((long)mid*mid > (long)x){
                right = mid-1;
            }
        }

        return probableAns;
    }
}
