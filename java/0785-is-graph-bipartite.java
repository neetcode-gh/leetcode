class Solution {
    public boolean isBipartite(int[][] graph) {
        int n = graph.length;
        int[] color = new int[n];
        
        for(int node = 0; node<n; node++) {
            // Node is visited if it is colored
            if (color[node] != 0) continue;

            Queue<Integer> q = new ArrayDeque<>();
            q.add(node);
            color[node] = 1;

            while (!q.isEmpty()) {
                // Removes the front of queue and returns it
                int cur = q.poll();

                // Traverse every adjacent node for the current node
                for(int ne : graph[cur]) {
                    // The adjacent node is uncolored
                    // We simply color it the opposite of cur's color
                    if (color[ne] == 0) {
                        color[ne] = -color[cur];
                        q.add(ne);
                    }
                    // If the adjacent node is not the opposite color
                    // We return false
                    else if (color[ne] != -color[cur])
                        return false;
                }
            }
        }
        return true;
    }
}