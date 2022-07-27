//Contest 298 problem brute-force. Feel free to update this.
class Solution {

    public int minimumNumbers(int num, int k) {
        if (num == 0) return 0;
        if (num % 10 == k) return 1;
        if (k == 0 && num % 10 == 0) return 1; else if (
            k == 0 && num % 10 != 0
        ) return -1;
        int temp = num;
        num -= k;
        int len = 1;
        while (num > 0) {
            len++;
            if (num % 10 == k) return len;
            num -= k;
        }
        return num < 0 ? -1 : len;
    }
}
