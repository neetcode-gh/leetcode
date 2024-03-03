class Solution {
    public int[] rearrangeArray(int[] nums) {
       
        Arrays.sort(nums);
        int n = nums.length;
        int[] result = new int[n];
        
        int median = 0;
        if (n % 2 == 0) {
            median = (nums[n / 2 - 1] + nums[n / 2]) / 2; 
        } else {
            median = nums[n / 2]; 
        }

        int j = 0;
        for (int i = 0; i < n; i += 2) {
            result[i] = nums[j++];
        }

        for (int i = 1; i < n; i += 2) {
            result[i] = nums[j++];
        }

        return result;
    }
}
