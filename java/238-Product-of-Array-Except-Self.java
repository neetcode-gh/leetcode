//Just store the left and right product (Try doing this with extra space first)
//This one is constant space because we are returning the array we created
//In first pass calculate the left product except self and in second calculate the right 

class Solution {
	public int[] productExceptSelf(int[] nums) {
		int[] arr = new int[nums.length];
		int right = 1, left = 1;
		for (int i = 0; i < nums.length; i++) {
			arr[i] = left;
			left *= nums[i];
		}
		for (int i = nums.length - 1; i >= 0; i--) {
			arr[i] *= right;
			right *= nums[i];
		}
		return arr;
	}

	// using nums[] as the prefix calculation table
	public int[] productExceptSelfNumsAsPrefix(int[] nums) {
		int[] output = new int[nums.length];
		output[0] = 1; // default prefix is 1.

		// prefix
		for (int i = 0; i < nums.length - 1; i++)
			output[i + 1] = output[i] * nums[i];

		// postfix
		// we start at nums.length - 2 because multiplying by 1 is silly.
		for (int i = nums.length - 2; i >= 0; i--) {
			output[i] = nums[i + 1] * output[i];
			nums[i] = nums[i] * nums[i + 1];
		}
		return output;
	}
}
