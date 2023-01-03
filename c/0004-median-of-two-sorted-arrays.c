/*
    Time: log(min(n, m))
    Space: O(1)
*/

#define min(x, y) ((x < y) ? (x) : (y))
#define max(x, y) ((x > y) ? (x) : (y))

double findMedianSortedArrays(int* nums1, int nums1Size, int* nums2, int nums2Size){
        int* A = nums1;
        int* B = nums2;
        int ASize = nums1Size;
        int BSize = nums2Size;
    
        int total = nums1Size + nums2Size;
        int half = total / 2;
        
        if(nums2Size < nums1Size)
        {
            A = nums2;
            B = nums1;
            ASize = nums2Size;
            BSize = nums1Size;
        }
        
        int l = 0;
        int r = ASize - 1;
        
        while(true)
        {
            int i = l + ((r - l - 2 + 1) / 2); // A Mid, round down instead of rounding towards 0
            int j = half - i - 2;      // B Mid
            
            
            int Aleft = i >= 0 ? A[i] : INT_MIN;
            int Aright = (i + 1) < ASize ? A[i + 1] : INT_MAX;
            int Bleft = j >= 0 ? B[j] : INT_MIN;
            int Bright = (j + 1) < BSize ? B[j + 1] : INT_MAX;
            
            // partition is correct
            if(Aleft <= Bright && Bleft <= Aright)
            {
                // Odd
                if(total % 2)
                {
                    return min(Aright, Bright);
                }
                
                // Even
                return (max(Aleft, Bleft) + min(Aright, Bright)) / 2.0;
            }
            else if(Aleft > Bright)
            {
                r = i - 1;
            }
            else
            {
                l = i + 1;
            }
        }
        
}
