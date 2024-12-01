/**
 * Given an integer n, return an array ans of length n + 1 such that for each i
 * (0 <= i <= n), ans[i] is the number of 1's in the binary representation of i.
 *
 * Constraints:
 *
 * 0 <= n <= 10^5
 *
 * Note: The returned array must be malloced, assume caller calls free().
 *
 * Space: O(1)
 * Time: O(n)
 */

int *countBits(int n, int *returnSize) {
    int *ret = calloc(n + 1, sizeof(int));
    *returnSize = n + 1;

    for (int i = 1; i <= n; ++i)
        ret[i] = ret[i >> 1] + (i & 1);

    return ret;
}
