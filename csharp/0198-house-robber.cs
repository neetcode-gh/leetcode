public class Solution {
    public int Rob(int[] nums) {
        int rob1 = 0, rob2 = 0;
        
        foreach(var num in nums) {
            var temp = Math.Max(num + rob1, rob2);
            rob1 = rob2;
            rob2 = temp;
        }
        
        return rob2;
    }
}