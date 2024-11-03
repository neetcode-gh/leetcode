/*          BFS
--------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
------------------------------*/  
  
class Solution {
    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        int root = findRoot(n, leftChild, rightChild);
        if(root == -1)
            return false;

        Set<Integer> visited = new HashSet<>();
        Queue<Integer> q = new LinkedList<>();

        q.add(root);
        visited.add(root);

        while(!q.isEmpty()){
            int node = q.poll();
            int[] childerns = {leftChild[node], rightChild[node]};
          
            for(int c: childerns){
                if(c == -1)
                    continue;
                if(visited.contains(c))
                    return false;
                q.add(c);
                visited.add(c);
            }    
        }
        return visited.size() == n;    
    }
    private int findRoot(int n, int[] leftChild, int[] rightChild){
        Set<Integer> set = new HashSet<>();
        for(int lc: leftChild)
            set.add(lc);
        for(int rc: rightChild)
            set.add(rc);

        for(int i = 0; i < n; i++){
            if(!set.contains(i))
                return i;
        } 
        return -1;       
    }
}
