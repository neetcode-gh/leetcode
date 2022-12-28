//We can use xor operation as it cancel out itself (i.e. only when values are different in binary representation then give output). See how xor operation works if confused.
class Solution {

    public int singleNumber(int[] nums) {
        int ans = nums[0];
        for (int i = 1; i < nums.length; i++) ans ^= nums[i];
        return ans;
    }
}
