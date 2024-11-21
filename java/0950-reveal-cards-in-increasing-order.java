class Solution {
    public int[] deckRevealedIncreasing(int[] deck) {
        Arrays.sort(deck);
        int[] res = new int[deck.length];
        ArrayDeque<Integer> q = new ArrayDeque<>();
        for (int i = 0; i < deck.length; i++) {
            q.addLast(i);
        }
        for (int n : deck) {
            int i = q.removeFirst();
            res[i] = n;
            if (!q.isEmpty()) {
                q.addLast(q.removeFirst());
            }
        }
        return res;
    }
}
