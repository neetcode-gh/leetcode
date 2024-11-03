/*-------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
-------------------------------*/
class Solution {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int res = 0;
        int[] extendedArr = new int[arr.length + 2];

        for (int i = 0; i < arr.length; i++) {
            extendedArr[i + 1] = arr[i];
        }
        extendedArr[0] = Integer.MIN_VALUE;
        extendedArr[extendedArr.length - 1] = Integer.MIN_VALUE;

        Stack<int[]> stack = new Stack<>(); // (index, num)

        for (int i = 0; i < extendedArr.length; i++) {
            while (!stack.isEmpty() && extendedArr[i] < stack.peek()[1]) {
                int[] popped = stack.pop();
                int j = popped[0];
                int m = popped[1];
                int left = j - (stack.isEmpty() ? -1 : stack.peek()[0]);
                int right = i - j;
                res = (int) ((res + (long) m * left * right) % MOD);
            }
            stack.push(new int[] { i, extendedArr[i] });
        }

        return res;
    }
}
