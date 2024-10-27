class Solution {
    public static List<List<Integer>> fourSum(int[] nums, int target) {
        List<List<Integer>> res = new ArrayList<>();
        Arrays.sort(nums);

        for (int a = 0; a < nums.length-3; a++) {
            if (a > 0 && nums[a] == nums[a - 1]) {
                continue;
            }
            for (int i = a + 1; i < nums.length - 2; i++) {
                if (i > 1 && nums[i] == nums[i - 1] && i-1 != a) {
                    continue;
                }
                int j = i + 1;
                int k = nums.length - 1;
                while (k > j) {
                    long sum = (long) nums[i] + nums[j] + nums[k] + nums[a];
                    if (sum == target) {
                        res.add(new ArrayList<>(Arrays.asList(nums[a],nums[i], nums[j], nums[k])));
                        j++;
                        while (nums[j] == nums[j - 1] && j < k) {
                            j++;
                        }
                    } else if (sum > target) {
                        k--;
                    } else
                        j++;
                }
            }
        }
        return res;
    }
}
