class Solution {
    
    public void checkSum(int[] candidates, int idx, List<Integer> curList, int target, List<List<Integer>> result) {
        
        if(target<0) return;
        if(target==0) {
            List<Integer> tmp = new ArrayList<>();
            tmp.addAll(curList);
            result.add(tmp);
        }
        
        for(int i=idx;i<candidates.length;i++) {
            
            if(i>idx && candidates[i]==candidates[i-1]) continue;
            curList.add(candidates[i]);
            checkSum(candidates, i+1, curList, target-candidates[i], result);
            curList.remove(curList.size()-1);
        }
    }
    
    public List<List<Integer>> combinationSum2(int[] candidates, int target) {
        Arrays.sort(candidates);
        List<List<Integer>> result  = new ArrayList<>();
        checkSum(candidates, 0, new ArrayList<>(), target, result);
        return result;
    }
}
