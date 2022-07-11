//Just store the left and right product (Try doing this with extra space first)
//This one is constant space because we are returning the array we created

class Solution {
    public int[] productExceptSelf(int[] nums) {
        int[] arr = new int[nums.length];
        arr[0] = 1;
        for (int i = 1; i<nums.length; i++) {
            arr[i] = arr[i-1]*nums[i-1];
        }
        int prod = nums[nums.length-1];
        nums[nums.length-1] = 1;
        for (int i = nums.length-2; i>=0; i--) {
            int store = nums[i];
            nums[i] = nums[i+1]*prod;
            prod = store;
        }
        for (int i = 0; i<nums.length; i++) {
            arr[i] = arr[i]*nums[i];
        }
        return arr;
    }
}
