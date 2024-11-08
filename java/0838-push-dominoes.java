class Solution {
    public String pushDominoes(String dominoes) {
        int len = dominoes.length();
        Queue<Integer> q = new LinkedList<>();
        char[] dom = dominoes.toCharArray();
        for (int i = 0; i < len; i++)
            if (dominoes.charAt(i) != '.') q.offer(i);

        while (!q.isEmpty()) {
            int i = q.poll();
            char ch = dom[i];
            if (dom[i] == 'R') {
                if (i + 1 < len && dom[i + 1] == '.') {
                    if (i + 2 < len && dom[i + 2] == 'L') {
                        q.poll();
                    } else {
                        dom[i + 1] = 'R';
                        q.offer(i + 1);
                    }
                }
            } else if (i > 0 && dom[i - 1] == '.') {
                dom[i - 1] = 'L';
                q.offer(i - 1);
            }
        }
        return String.valueOf(dom);
    }
}