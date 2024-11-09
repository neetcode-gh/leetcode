class Solution {

    public int numOfMinutes(int n, int headID, int[] manager, int[] informTime) {
        Map<Integer, List<Integer>> adjacentMap = prepareAdjacentMap(headID, manager);

        int time = 0;

        Deque<Pair<Integer, Integer>> deque = new ArrayDeque<>();
        deque.addFirst(new Pair<>(headID, informTime[headID]));

        while (!deque.isEmpty()) {
            Pair<Integer, Integer> curManager = deque.pollLast();
            time = Math.max(time, curManager.getValue());

            if (adjacentMap.containsKey(curManager.getKey())) {
                for (Integer employee : adjacentMap.get(curManager.getKey())) {
                    deque.addFirst(new Pair<>(employee, curManager.getValue() + informTime[employee]));
                }
            }
        }

        return time;
    }

    private Map<Integer, List<Integer>> prepareAdjacentMap(int headId, int[] manager) {
        Map<Integer, List<Integer>> adjacentMap = new HashMap<>();

        for (int i = 0; i < manager.length; i++) {
            if (i == headId) {
                continue;
            }
            if (!adjacentMap.containsKey(manager[i])) {
                adjacentMap.put(manager[i], new ArrayList<>());
            }
            adjacentMap.get(manager[i]).add(i);
        }

        return adjacentMap;
    }
}
