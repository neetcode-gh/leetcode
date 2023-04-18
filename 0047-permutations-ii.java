class Solution {
    public List<List<Integer>> permuteUnique(int[] nums) {
        List<List<Integer>> res = new ArrayList<>();
        HashMap<Integer, Integer> map = new HashMap<>();

        for(int i=0;i<nums.length;i++) {
            map.put(nums[i], map.getOrDefault(nums[i], 0) + 1);
        }

        permutation(map, new ArrayList<Integer>(), res, nums);
        return res;
    }

    public void permutation(HashMap<Integer, Integer> map, List<Integer> list, List<List<Integer>> res, int[] arr) {
        if(list.size() == arr.length) {
            res.add(new ArrayList<>(list));
            return;
        }

        for (Map.Entry<Integer, Integer> entry : map.entrySet()) {
            int num = entry.getKey();
            int count = entry.getValue();

            if(count != 0) {
                list.add(num);
                map.put(num, count-1);

                permutation(map, list, res, arr);

                map.put(num, map.get(num) + 1);
                list.remove(list.size()-1);
            }
        }
    }
}

// https://leetcode.com/problems/permutations-ii/submissions/935831535/
