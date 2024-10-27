public class NumArray {
    private int[] nums;
    public NumArray(int[] nums) {
        this.nums = nums;
    }
    
    public int SumRange(int left, int right) {
        int sum = 0;
        for (int i = left; i <= right; i++)
        {
            sum += this.nums[i];
        }
        return sum;
    }
}
