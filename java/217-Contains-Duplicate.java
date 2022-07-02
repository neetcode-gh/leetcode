class Solution {
    public boolean containsDuplicate(int[] nums) {
        Set<Integer> uniques = new HashSet<>();
        for (final int num : nums) {
            if (!uniques.add(num)) {
                return true;
            }
        }
        return false;
    }
}
