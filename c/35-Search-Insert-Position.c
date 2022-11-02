/*

Space: O(1)
Time: O(log(n))
*/

int searchInsert(int* nums, int numsSize, int target){
    int i=0;
    int j=numsSize-1;
    int m;
    while (i<=j) {
        m = (i+j)/2;
        if (nums[m]==target) {
            return m;
        } else if (nums[m]<target) {
            i = m+1;
        } else {
            j = m-1;
        }
    }
    return i;
}
