public class Solution {
    public int[] FindRedundantConnection(int[][] edges) {
        var nodes = edges.Length;
        int[] parent = new int[nodes + 1];
        int[] rank   = new int[nodes + 1];
        
        for(int i = 0; i < nodes; i++) {
            parent[i] = i;
            rank[i] = 1;
        }
        
        int findParent (int n) {
            var p = parent[n];
            
            while(p != parent[p]) {
                parent[p] = parent[parent[p]];
                p = parent[p];
            }
            
            return p;
        }
        bool union(int n1, int n2) {
            (int p1, int p2) = (findParent(n1), findParent(n2));
            
            if(p1 == p2) return false;
            
            if(rank[p1] > rank[p2]) {
                parent[p2] = p1;
                rank[p1] += rank[p2];
            } else {
                parent[p1] = p2;
                rank[p2] += rank[p1];
            }
            
            return true;
        }
        
        foreach(var edge in edges) {
            if(union(edge[0], edge[1]) is false) 
                return edge;
        }
        
        return new int[2];
    }
}