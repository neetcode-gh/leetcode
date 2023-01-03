<<<<<<< HEAD
class Solution {
    public int pivotIndex(int[] nums) {
        int leftSum = 0;
        int rightSum = 0;

        int i;
        for (i = 1; i < nums.length; i++) {
            rightSum += nums[i];
        }

        if (leftSum == rightSum) {
            return 0;
        }

        for (i = 1; i < nums.length; i++ ){
            leftSum += nums[i-1];
            rightSum -= nums[i];
            if (leftSum== rightSum) {
                return i;
            }
        }
        return -1;        
    }
=======
class Solution {
    public int pivotIndex(int[] nums) {
        int leftSum = 0;
        int rightSum = 0;

        int i;
        for (i = 1; i < nums.length; i++) {
            rightSum += nums[i];
        }

        if (leftSum == rightSum) {
            return 0;
        }

        for (i = 1; i < nums.length; i++ ){
            leftSum += nums[i-1];
            rightSum -= nums[i];
            if (leftSum== rightSum) {
                return i;
            }
        }
        return -1;        
    }
>>>>>>> ee7a3bcd934aa34bbe7308028fc96d087d88b922
}