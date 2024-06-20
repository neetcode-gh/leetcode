class Solution {
    public int getSum(int a, int b) {
        while (b != 0) {
            int tmp = (a & b) << 1;
            a = a ^ b;
            b = tmp;
        }
        return a;
    }
}

// add bit by bit, be mindful of carry, after adding, if carry is still 1, then add it as well;
