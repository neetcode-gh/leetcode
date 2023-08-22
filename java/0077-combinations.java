class Solution {
    List<List<Integer>> res;
    public List<List<Integer>> combine(int n, int k) {
        res = new ArrayList<>();
        backtrack(1, new ArrayList<Integer>(), n, k);
        return res;
    }

    private void backtrack(int start, ArrayList<Integer> comb, int n, int k) {
        if (comb.size() == k){
            res.add(new ArrayList<>(comb));
            return;
        }

        for (int i = start; i <= n; i++) {
            comb.add(i);
            backtrack(i+1, comb, n, k);
            comb.remove((Integer) i);
        }
    }
}
