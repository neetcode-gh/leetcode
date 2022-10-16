//The idea is to have two conditions: One in which we will take the element into consideration, Second in which we won't take the element into consideration.
//This video was good for code explanation. https://www.youtube.com/watch?v=6BPurabdAl4&t=508s&ab_channel=Fraz
class Solution {

    public List<List<Integer>> subsets(int[] nums) {
        List<List<Integer>> ans = new ArrayList<>();
        List<Integer> list = new ArrayList<>();
        helper(ans, 0, nums, list);
        return ans;
    }

    public void helper(
        List<List<Integer>> ans,
        int start,
        int[] nums,
        List<Integer> list
    ) {
        if (start >= nums.length) {
            ans.add(new ArrayList<>(list)); //In java, we will have to add like this otherwise it'll give null as it'll just have the reference instead of actual values.
        } else {
            //add the element and start the  recursive call
            list.add(nums[start]);
            helper(ans, start + 1, nums, list);
            //remove the element and do the backtracking call.
            list.remove(list.size() - 1);
            helper(ans, start + 1, nums, list);
        }
    }
}
