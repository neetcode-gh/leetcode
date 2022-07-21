// Since the array has values form 0 to n we can use in-place sorting that's O(N) time and constant space.
class Solution {

    public List<Integer> findDisappearedNumbers(int[] nums) {
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i < nums.length; i++) {
            int correct = nums[i] - 1;
            if (nums[i] != nums[correct] && nums[correct] != nums[i]) {
                int temp = nums[i];
                nums[i] = nums[correct];
                nums[correct] = temp;
                i--;
            }
        }
        for (int i = 0; i < nums.length; i++) {
            if (nums[i] - 1 != i) list.add(i + 1);
        }
        return list;
    }
}
