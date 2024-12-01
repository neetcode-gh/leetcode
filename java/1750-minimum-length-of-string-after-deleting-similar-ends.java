class Solution {
    public int minimumLength(String s) {
        int l = 0;
        int r = s.length() - 1;

        while (l < r && s.charAt(l) == s.charAt(r)) {
            char temp = s.charAt(l);
            while (l <= r && s.charAt(l) == temp)
                l++;
            while (l <= r && s.charAt(r) == temp)
                r--;
        }

        return (r - l + 1);
    }
}
