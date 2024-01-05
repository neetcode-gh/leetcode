class Solution {
    public int maximumRemovals(String s, String p, int[] removable) {
        return binarySearch(s, p, removable);
    }

    private boolean isSubsequence(String s, String p, int[] removable, int k) {
        Set<Integer> removedSet = new HashSet<>();
        for (int i = 0; i < k; i++) {
            removedSet.add(removable[i]);
        }

        int i = 0, j = 0;
        while (i < s.length() && j < p.length()) {
            if (removedSet.contains(i) || s.charAt(i) != p.charAt(j)) {
                i++;
            } else {
                i++;
                j++;
            }
        }
        return j == p.length();
    }

    private int binarySearch(String s, String p, int[] removable) {
        int left = 0, right = removable.length + 1;

        while (left < right) {
            int mid = (left + right) / 2;
            if (isSubsequence(s, p, removable, mid)) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return left - 1;
    }
}
