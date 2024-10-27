class Solution {
    private final int[] parent;
    private final int[] locked;
    private final Map<Integer, List<Integer>> child;

    public LockingTree(int[] parent) {
        this.parent = parent;
        locked = new int[parent.length];
        child = new HashMap<>();

        for (int i = 0; i < parent.length; i++) {
            child.putIfAbsent(parent[i], new ArrayList<>());
            child.putIfAbsent(i, new ArrayList<>());
            child.get(parent[i]).add(i);
        }
    }

    public boolean lock(int num, int user) {
        if (locked[num] <= 0) {
            locked[num] = user;
            return true;
        }

        return false;
    }

    public boolean unlock(int num, int user) {
        if (locked[num] == user) {
            locked[num] = 0;
            return true;
        }

        return false;
    }

    public boolean upgrade(int num, int user) {
        if (!noneAncestorsLocked(num)) {
            return false;
        }

        int lockedCount = checkDescendantsAndLockIfNeeded(num);

        if (lockedCount > 0) {
            locked[num] = user;
        }

        return lockedCount > 0;
    }

    private boolean noneAncestorsLocked(int num) {
        while (num != -1) {
            if (locked[num] != 0) {
                return false;
            }
            num = parent[num];
        }

        return true;
    }

    private int checkDescendantsAndLockIfNeeded(int num) {
        int lockedCount = 0;
        Deque<Integer> deque = new ArrayDeque<>();

        deque.addFirst(num);
        while (!deque.isEmpty()) {
            int n = deque.pollLast();
            if (locked[n] > 0) {
                lockedCount++;
                locked[n] = 0;
            }
            for (Integer i : child.get(n)) {
                deque.addFirst(i);
            }
        }

        return lockedCount;
    }
}
