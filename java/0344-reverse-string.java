class Solution {
    public void reverseString(char[] s) {
        //Do not return anything, modify s in-place instead.
        int l = 0;
        int r = s.length - 1;
        while(l <= r) {
            char tmp = s[l];
            s[l++] = s[r];
            s[r--] = tmp;
        }
    }
}
