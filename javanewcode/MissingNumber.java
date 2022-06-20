package leetcode;

public class MissingNumber {
    public static void main(String[] args) {
        int [] nums = {9,6,4,2,3,5,7,0,1};
        System.out.println(missingNumber(nums));
    }
    public static int missingNumber(int[] nums) {
        int n = nums.length;

        int totalExpected = (n*(n+1))/2;
        int totalSum = 0;

        for(int i : nums){
            totalSum += i;
        }

        return totalExpected - totalSum;


    }
}
