//Explanation: https://leetcode.com/problems/k-th-symbol-in-grammar/discuss/2174956/Easy-java-solution-or-Imagine-a-binary-tree. (Upvote if you liked!!)
//Asked in: Google (lintcode)

class Solution {

    public int kthGrammar(int n, int k) {
        if (n == 1 || k == 1) return 0;
        int prevK = (int) Math.pow(2, n - 2);
        if (k <= prevK) return kthGrammar(n - 1, k); else {
            int presK = k % prevK;
            int val = kthGrammar(n - 1, presK == 0 ? k / 2 : k % prevK);
            return val == 1 ? 0 : 1;
        }
    }
}
