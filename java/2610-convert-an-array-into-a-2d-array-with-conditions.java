class Solution {
    public List<List<Integer>> findMatrix(int[] nums) {
        Map<Integer, Integer> count = new HashMap<>();
        List<List<Integer>> res = new ArrayList<>();

        for (int n : nums) {
            int row = count.getOrDefault(n, 0);
            if (res.size() == row) {
                res.add(new ArrayList<>());
            }
            res.get(row).add(n);
            count.put(n, count.getOrDefault(n, 0) + 1);
        }

        return res;
    }
}
