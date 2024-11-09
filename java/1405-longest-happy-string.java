class Solution {
    public String longestDiverseString(int a, int b, int c) {
        String res = "";
        PriorityQueue<Pair<Integer, Character>> maxHeap = new PriorityQueue<>(
                (i1, i2) -> i2.getKey() - i1.getKey());
        if (a > 0) {
            maxHeap.add(new Pair<>(a, 'a'));
        }
        if (b > 0) {
            maxHeap.add(new Pair<>(b, 'b'));
        }
        if (c > 0) {
            maxHeap.add(new Pair<>(c, 'c'));
        }

        while (!maxHeap.isEmpty()) {
            Pair<Integer, Character> item = maxHeap.poll();
            Integer count = item.getKey();
            Character ch = item.getValue();
            if (res.length() > 1
                    && ch.equals(res.charAt(res.length() - 1))
                    && ch.equals(res.charAt(res.length() - 2))) {
                if (maxHeap.isEmpty()) {
                    break;
                }
                Pair<Integer, Character> item2 = maxHeap.poll();
                Integer count2 = item2.getKey();
                Character ch2 = item2.getValue();
                res += ch2;
                count2 -= 1;
                if (count2 > 0) {
                    maxHeap.add(new Pair<>(count2, ch2));
                }
            } else {
                res += ch;
                count -= 1;
            }
            if (count > 0) {
                maxHeap.add(new Pair<>(count, ch));
            }
        }
        return res;
    }
}
