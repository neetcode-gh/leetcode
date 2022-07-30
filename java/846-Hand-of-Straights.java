class Solution {
    public boolean isNStraightHand(int[] hand, int groupSize) {
        if (hand.length % groupSize != 0)
            return false;

        TreeMap<Integer, Integer> map = new TreeMap<>();

        for (int card : hand) {
            map.put(card, map.getOrDefault(card, 0)+1);
        }

        while (!map.isEmpty()) {
            int num = map.firstKey();
            int k = groupSize;

            while (map.containsKey(num) && k-- > 0) {
                map.put(num, map.get(num)-1);

                if (map.get(num) == 0)
                    map.remove(num);

                num++;
            }

            if (k > 0)
                return false;
        }

        return true;
    }
}