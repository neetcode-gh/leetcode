//Simple BFS solution

class Solution {

    public int openLock(String[] deadends, String target) {
        String start = "0000";
        int ans = 0;
        Queue<String> q = new LinkedList<>();
        HashSet<String> visited = new HashSet<>();
        //Add all the deadends in the visited set so we can ignore them and visited values altogether.
        for (String s : deadends) visited.add(s);
        q.offer(start);
        while (!q.isEmpty()) {
            int size = q.size();
            for (int j = 0; j < size; j++) {
                String str = q.poll();
                StringBuilder cur = new StringBuilder(str);
                if (str.equals(target)) return ans;
                if (!visited.contains(cur.toString())) {
                    for (int i = 0; i < start.length(); i++) {
                        //edge case for 0
                        if (cur.charAt(i) == '0') {
                            cur.setCharAt(i, '1');
                            q.offer(cur.toString());
                            cur.setCharAt(i, '9');
                            q.offer(cur.toString());
                        } else if (cur.charAt(i) == '9') { //edge case for 9
                            cur.setCharAt(i, '0');
                            q.offer(cur.toString());
                            cur.setCharAt(i, '8');
                            q.offer(cur.toString());
                        } else {
                            cur.setCharAt(i, ((char) (cur.charAt(i) + 1)));
                            q.offer(cur.toString());
                            cur.setCharAt(i, ((char) (cur.charAt(i) - 2)));
                            q.offer(cur.toString());
                        }
                        visited.add(str);
                        cur.setLength(0);
                        cur.append(str);
                    }
                }
            }
            ans++;
        }
        return -1;
    }
}
