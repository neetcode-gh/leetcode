public class Solution {
    IList<IList<int>> result = new List<IList<int>>();
    public void backtrack(int index, List<int> path, int total, int[] candidates, int target) {
        if(total == target) {
            result.Add(path.ToList());
            return;
        }
        
        if(total > target || index >= candidates.Length) return;
        
        path.Add(candidates[index]);
        backtrack(index, 
                  path, 
                  total + candidates[index], 
                  candidates, 
                  target);
        
        path.Remove(path.Last());
        
        backtrack(index + 1, 
                  path, 
                  total, 
                  candidates, 
                  target);
        
    }
    public IList<IList<int>> CombinationSum(int[] candidates, int target) {
        backtrack(0, new List<int>(), 0, candidates, target);
        return result;
    }
}