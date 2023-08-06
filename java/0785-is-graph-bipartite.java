class Solution {
    public boolean isBipartite(int[][] graph) {
        int[] color = new int[graph.length]; // 1 for one color , -1 for second color and 0 for not visited.

        for(int i = 0; i < graph.length; i++){
            if(color[i] != 0){
                continue;
            }

            Queue<Integer> q = new LinkedList<>();
            q.add(i);
            color[i] = 1;

            while(!q.isEmpty()){
                int curr = q.poll();

                for(int n : graph[curr]){
                    if(color[n] == 0){
                        color[n] = -1 * color[curr];
                        q.add(n);
                    }
                    if(color[n] == color[curr])
                        return false;
                }
            }
        }
        return true;
    }
}
