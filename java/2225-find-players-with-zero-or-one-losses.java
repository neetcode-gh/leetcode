class Solution {
    public List<List<Integer>> findWinners(int[][] matches) {
        Map<Integer, Integer> map = new TreeMap<>(); // Store player as key and loses as value
        for(int[] arr: matches){
            int winner = arr[0], loser = arr[1];
            map.put(winner, map.getOrDefault(winner, 0));
            map.put(loser, map.getOrDefault(loser, 0) + 1);     
        }

        List<List<Integer>> res = new ArrayList<>();
        res.add(new ArrayList<>());
        res.add(new ArrayList<>());
        for(int player: map.keySet()){
            int loses = map.get(player);
            if(loses == 0)
                res.get(0).add(player);
            else if(loses == 1)
                res.get(1).add(player);    
        }
        return res;
    }
}
