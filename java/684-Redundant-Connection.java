class DisjointSet {
    private int[] roots;
    private int[] ranks;
    
    public DisjointSet(int n) {
        this.roots = new int[n];
        this.ranks = new int[n];
        
        // Initialize
        for(int i=0; i<n; i++) {
            this.roots[i] = i;
            this.ranks[i] = 0;
        }
    }
    
    // Standard functions
    public void union(int x, int y) {
        int rootX = find(x), rootY = find(y);
        int rankX = this.ranks[x], rankY = this.ranks[y];
        
        if(rootX == rootY)
            return;
        
        if(rankX > rankY) {
            // go to rootY
            this.roots[rootX] = rootY;
            this.ranks[rootY]++;
        }
        else {
            // go to rootX
            this.roots[rootY] = rootX;
            this.ranks[rootX]++;
        }
    }
    
    public int find(int x) {
        if(this.roots[x] == x)
            return x;
        
        // path compression
        int findX = find(this.roots[x]);
        this.roots[x] = findX;
        return findX;
    }
    
    public boolean areConnected(int x, int y) {
        return (find(x) == find(y));   
    }
    
    public String toString() {
        return "Roots: " + Arrays.toString(this.roots);
    }
}

class Solution {
    public int[] findRedundantConnection(int[][] edges) {
        int n = edges.length;
        DisjointSet ds = new DisjointSet(n);
        
        for(int[] edge: edges) {
            // Switch from 1-index to 0-index
            int u = edge[0] - 1;
            int v = edge[1] - 1;
            
            if(ds.areConnected(u, v)) {
                return edge;
            }
            
            ds.union(u, v);
        }
        
        // Guaranteed to have redundant connection, should not come here
        return null;
    }
}


