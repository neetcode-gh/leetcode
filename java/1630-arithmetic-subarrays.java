class Solution {
    /**
     * Runtime Complexity: O(n * m)
     * Space Complexity: O(n)
     */
    public List<Boolean> checkArithmeticSubarrays(int[] nums, int[] l, int[] r) {
        List<Boolean> res = new ArrayList<>();

        for (int i = 0; i < l.length; i++) {
            res.add(check(nums, l[i], r[i]));
        }

        return res;
    }

    private boolean check(int[] nums, int l, int r) {
        List<Integer> subArray = new ArrayList<>();
        for (int i = l; i < r + 1; i++) {
            subArray.add(nums[i]);
        }
        Collections.sort(subArray);

        Set<Integer> diffTrack = new HashSet<>();
        diffTrack.add(Math.abs(subArray.get(0) - subArray.get(1)));

        for (int i = 2; i < subArray.size(); i++) {
            int diff = Math.abs(subArray.get(i) - subArray.get(i - 1));
            if (!diffTrack.contains(diff))
                return false;
        }
        return true;
    }
}