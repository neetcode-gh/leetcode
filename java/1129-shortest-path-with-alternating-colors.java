class Solution {
    public int[] shortestAlternatingPaths(int n, int[][] redEdges, int[][] blueEdges) {
        Map<Integer, List<Integer>> red = new HashMap<>();
        Map<Integer, List<Integer>> blue = new HashMap<>();
        for (int i = 0; i < n; i++) {
            red.put(i, new ArrayList<>());
            blue.put(i, new ArrayList<>());
        }
        for (int[] redEdge : redEdges) {
            red.get(redEdge[0]).add(redEdge[1]);
        }
        for (int[] blueEdge : blueEdges) {
            blue.get(blueEdge[0]).add(blueEdge[1]);
        }
        int[] answer = new int[n];
        Arrays.fill(answer, -1);

        ArrayDeque<ColorStep> deque = new ArrayDeque<>();
        boolean[][] visit = new boolean[n][2];
        deque.addLast(new ColorStep(0, 0, -1));
        while (!deque.isEmpty()) {
            ColorStep step = deque.pollFirst();
            if (answer[step.node] == -1) {
                answer[step.node] = step.length;
            }
            if (step.prevEdgeColor != 0) {
                for (int nei : red.get(step.node)) {
                    if (!visit[nei][0]) {
                        visit[nei][0] = true;
                        deque.addLast(new ColorStep(nei, step.length + 1, 0));
                    }
                }
            }
            if (step.prevEdgeColor != 1) {
                for (int nei : blue.get(step.node)) {
                    if (!visit[nei][1]) {
                        visit[nei][1] = true;
                        deque.addLast(new ColorStep(nei, step.length + 1, 1));
                    }
                }
            }
        }
        return answer;
    }

    public class ColorStep {
        int node;
        int length;
        int prevEdgeColor; // 0 is for Red, 1 is for Blue

        public ColorStep(int node, int length, int prevEdgeColor) {
            this.node = node;
            this.length = length;
            this.prevEdgeColor = prevEdgeColor;
        }
    }
}
