class Solution {
    public double maxProbability(int n, int[][] edges, double[] succProb, int start, int end) {
        // create the graph
        List<double[]>[] graph = new LinkedList[n];
        for (int i = 0; i < n; i++) {
            graph[i] = new LinkedList<>();
        }
        
        for (int i = 0; i < edges.length; i++) {
            double from =  edges[i][0];
            double to =  edges[i][1];
            double weight = succProb[i];
            double[] m = new double[2];
            m[0] = to;
            m[1] = weight;
            graph[edges[i][0]].add(m);
            double[] k = new double[2];
            k[0] = from;
            k[1] = weight;
            graph[edges[i][1]].add(k);
        }
        
        // call dijkstra and return 
        return dijkstra(start, end, graph);
    }
    
    class State{
        int id;
        double proToStart;
        
        public State(int id, double proToStart){
            this.id = id;
            this.proToStart = proToStart;
        }
    }
    
    private double dijkstra(int start, int end, List<double[]>[] graph){
        double[] proTo = new double[graph.length];
        // 初始化为一个去不到的值
        Arrays.fill(proTo, -1);
        proTo[start] = 1;
        
        PriorityQueue<State> pq = new PriorityQueue<State>((a, b) -> {
        return Double.compare(b.proToStart, a.proToStart);
    });
        pq.offer(new State(start, 1));
        
        while (!pq.isEmpty()){
            State cur = pq.poll();
            int curid = cur.id;
            double curproToStart = cur.proToStart;
            
            if (curid == end) {
                return curproToStart;
            }
            
            if (proTo[curid] > curproToStart) {
                continue;
            }
            
            List<double[]> nexts = graph[curid];
            for (double[] next: nexts) {
                double proToNext = proTo[curid] * next[1];
                int idx = (int) next[0];
                if (proToNext > proTo[idx]) {
                    proTo[idx] = proToNext;
                    pq.offer(new State(idx, proToNext));
                }
            }
        }
        
        return 0;
    }
}
