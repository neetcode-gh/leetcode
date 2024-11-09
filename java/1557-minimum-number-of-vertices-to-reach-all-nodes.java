class Solution {
    public List<Integer> findSmallestSetOfVertices(int n, List<List<Integer>> edges) {
        int[] incoming = new int[n];
        for(List<Integer> ls: edges){
            int in = ls.get(1);
            incoming[in]++; 
        }
        List<Integer> res = new ArrayList<>();
        for(int i=0; i<n; i++){
            if(incoming[i] == 0)
                res.add(i);
        }
        return res;
    }
}
