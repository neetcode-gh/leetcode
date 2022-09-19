class Solution {

    public int[] twoSum(int[] nums, int target) {
        HashMap<Integer, Integer> prevMap = new HashMap<>();

        for (int i = 0; i < nums.length; i++) {
            int num = nums[i];
            int diff = target - num;

            if (prevMap.containsKey(nums[i])) {
                return new int[] { prevMap.get(num), i };
            }

            prevMap.put(diff, i);
        }

        return new int[] {};
    }
}
