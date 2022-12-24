public class Solution {
    public int[] TwoSum(int[] numbers, int target) {
        // Using 2 pointers. Since sorted, if l+r > target, decrease r.
        // Else if l+r < target, increase l. Else, result is found.
        int left = 0, right = numbers.Length - 1;

        while (left < right) {
            int sum = numbers[left] + numbers[right];
            if (sum > target) {
                right--;
            } else if (sum < target) {
                left++;
            } else {
                return new int[] {left + 1, right + 1};
            }
        }

        return new int[0];
    }
}