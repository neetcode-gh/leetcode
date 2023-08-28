public class Solution {
    /// <summary>
    /// Given an array of integers nums and an integer k, return the total number
    /// of continuous subarrays whose sum equals to k.
    /// </summary>
    /// <param name="nums">The input array of integers.</param>
    /// <param name="k">The target sum.</param>
    /// <returns>The total number of subarrays with sum equal to k.</returns>
    public int SubarraySum(int[] nums, int k) {
        int result = 0;
        int sum = 0;

        // Create a dictionary to store the frequency of prefix sums
        // The key is the prefix sum, and the value is the frequency
        Dictionary<int, int> prefixSumFreq = new Dictionary<int, int>() { { 0, 1 }};

        // Iterate through the array to calculate prefix sums and count subarrays
        for (int i = 0; i < nums.Length; i++) {
            sum += nums[i];

            // If a prefix sum (sum - k) is present in the dictionary, it means there's a subarray with sum k
            if (prefixSumFreq.ContainsKey(sum - k)) {
                result += prefixSumFreq[sum - k];
            }

            // Update the prefix sum frequency dictionary
            if (prefixSumFreq.ContainsKey(sum)) {
                prefixSumFreq[sum]++;
            }
            else {
                prefixSumFreq.Add(sum, 1);
            }
        }

        return result;
    }
}
