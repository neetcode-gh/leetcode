class Solution {
    public int minFlips(String s) {
        int n = s.length();
        String doubled = s + s;

        // Build alternating patterns of length 2n
        StringBuilder alt1 = new StringBuilder(); // 010101...
        StringBuilder alt2 = new StringBuilder(); // 101010...
        
        for (int i = 0; i < 2 * n; i++) {
            alt1.append(i % 2 == 0 ? '0' : '1');
            alt2.append(i % 2 == 0 ? '1' : '0');
        }

        int res = Integer.MAX_VALUE;
        int diff1 = 0, diff2 = 0;
        int left = 0;

        for (int right = 0; right < 2 * n; right++) {

            if (doubled.charAt(right) != alt1.charAt(right)) diff1++;
            if (doubled.charAt(right) != alt2.charAt(right)) diff2++;

            // Keep window size = n
            if (right - left + 1 > n) {
                if (doubled.charAt(left) != alt1.charAt(left)) diff1--;
                if (doubled.charAt(left) != alt2.charAt(left)) diff2--;
                left++;
            }

            // When window size is n, update result
            if (right - left + 1 == n) {
                res = Math.min(res, Math.min(diff1, diff2));
            }
        }

        return res;
    }
}
