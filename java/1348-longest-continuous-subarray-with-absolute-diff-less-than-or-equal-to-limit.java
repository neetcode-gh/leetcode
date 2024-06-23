 // Longest subarray with abs difference <= limit
class Solution {

    public int longestSubarray(int[] nums, int limit) {
        TreeMap<Integer, Integer> window = new TreeMap<>();
        int left = 0, right = 0, maxLength = 0;
        while (right < nums.length) {
            window.put(nums[right], window.getOrDefault(nums[right], 0) + 1);
            while (window.lastKey() - window.firstKey() > limit) {
                window.put(nums[left], window.get(nums[left]) - 1);
                if (window.get(nums[left]) == 0) {
                    window.remove(nums[left]);
                }
                ++left;
            }
            // Update maxLength with the length of the current valid window
            maxLength = Math.max(maxLength, right - left + 1);
            right++;
        }return maxLength;
    }
}
