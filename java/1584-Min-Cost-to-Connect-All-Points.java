class Edge {
    public int source;
    public int destination;
    public int weight; // manhattan distance
    
    public Edge(int s, int d, int w){
        this.source = s;
        this.destination = d;
        this.weight = w;
    }
    
    @Override
    public String toString() {
        return "Edge(u=" + source + ", v=" + destination + ", w=" + weight + ")";
    }
}

class DisjointSet {
    private int[] roots;
    private int[] ranks;
    
    public DisjointSet(int n) {
        this.roots = new int[n];
        this.ranks = new int[n];
        
        // intializing
        for(int i=0; i<n; i++){
            this.roots[i] = i;
            this.ranks[i] = 0; // initially ranking 0
        }
    }
    
    // get the root, use path compression
    public int find(int u) {
        if(this.roots[u] == u)
            return u;
        
        int root = find(this.roots[u]);
        this.roots[u] = root;
        return root;
    }
    
    // use ranking
    public void union(int x, int y) {
        int rootX = find(x), rootY = find(y);
        int rankX = this.ranks[rootX], rankY = this.ranks[rootY];
        
        if(rootX == rootY) // already same roots
            return;
        
        if(rankX < rankY){
            // put into rootY
            this.roots[rootX] = this.roots[rootY];
            this.ranks[rootY]++;
        }
        else{
            // default, put into rootX
            this.roots[rootY] = this.roots[rootX];
            this.ranks[rootX]++;
        }
    }
    
    public boolean areDisjoint(int u, int v) {
        return (find(u) != find(v));
    }
}

class Solution {
    private int getManhattanDistance(int[] p1, int[] p2){
        return (
            Math.abs(p1[0] - p2[0]) +
            Math.abs(p1[1] - p2[1])
        );
    }
    
    private List<Edge> getEdges(int[][] points) {
        int n = points.length;
        List<Edge> edges = new ArrayList<>();
        
        // edge case
        if(n <= 1)
            return edges;
        
        for(int i=0; i<(n - 1); i++){
            for(int j=i+1; j<n; j++){
                int w = getManhattanDistance(points[i], points[j]);
                edges.add(new Edge(i, j, w));
            }
        }
        
        return edges;
    }
    
    private boolean isEdgeCase(int[][] points) {
        return (points.length <= 1);
    }
    
    private int getCostMST(List<Edge> edges, int numVertices) {
        DisjointSet ds = new DisjointSet(numVertices);
        int minCost = 0, numEdgesTaken = 0;
        
        for(Edge edge: edges){
            if(ds.areDisjoint(edge.source, edge.destination)){
                ds.union(edge.source, edge.destination);
                numEdgesTaken++;
                minCost += edge.weight;
            }
            
            if(numEdgesTaken == (numVertices - 1)) // tree is formed, early exit
                break;
        }
        return minCost;
    }
    
    public int minCostConnectPoints(int[][] points) {
        // edge cases
        if(isEdgeCase(points))
            return 0;
        
        // edges        
        List<Edge> edges = getEdges(points);
        
        // sort the edges in ascending order
        edges.sort((x1, x2) -> (x1.weight - x2.weight));
        
        // Kruskals algorithm for MST [Union Find]
        return getCostMST(edges, points.length);
    }
}