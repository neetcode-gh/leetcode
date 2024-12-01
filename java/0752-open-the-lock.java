class Solution {
    public int openLock(String[] deadends, String target) {
        Set<String> visited = new HashSet<>();
        for (String deadend : deadends) {
            if (deadend.equals("0000")) {
                return -1;
            }
            visited.add(deadend);
        }

        Queue<String> queue = new LinkedList<>();
        queue.offer("0000");
        visited.add("0000");

        int turns = 0;
        while (!queue.isEmpty()) {
            int size = queue.size();
            for (int i = 0; i < size; i++) {
                String lock = queue.poll();
                if (lock.equals(target)) {
                    return turns;
                }
                List<String> children = generateChildren(lock);
                for (String child : children) {
                    if (!visited.contains(child)) {
                        visited.add(child);
                        queue.offer(child);
                    }
                }
            }
            turns++;
        }
        return -1;
    }

    private List<String> generateChildren(String lock) {
        List<String> children = new ArrayList<>();
        for (int i = 0; i < 4; i++) {
            char[] digits = lock.toCharArray();
            digits[i] = (char)(((digits[i] - '0' + 1) % 10) + '0');
            children.add(new String(digits));
            digits[i] = (char)(((digits[i] - '0' - 2 + 10) % 10) + '0');
            children.add(new String(digits));
        }
        return children;
    }
}
