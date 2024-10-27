class Solution {
    public int[] intersection(int[] nums1, int[] nums2) {
        var seen = new HashSet<Integer>();
        for (int n : nums1)
            seen.add(n);

        var res = new HashSet<Integer>();
        for (int n : nums2) {
            if (seen.contains(n)) {
                res.add(n);
            }
        }

        return res.stream().mapToInt(Integer::intValue).toArray();
    }
}
