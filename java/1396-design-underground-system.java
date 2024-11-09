class UndergroundSystem {
    // id, src, time
    Map<Integer, Pair<String, Integer>> entries;
    // src, dest, int[total time, number of travels]
    Map<String, Map<String, int[]>> times;

    public UndergroundSystem() {
        this.entries = new HashMap<>();
        this.times = new HashMap<>();
    }
    
    public void checkIn(int id, String stationName, int t) {
        entries.put(id, new Pair<>(stationName, t));
    }
    
    public void checkOut(int id, String dest, int t) {
        Pair<String, Integer> entry = entries.get(id);
        String src = entry.getKey();
        int duration = t - entry.getValue();

        Map<String, int[]> city = times.getOrDefault(src, new HashMap<>());
        int[] total = city.getOrDefault(dest, new int[2]);
        total[0] += duration;
        total[1]++;
        city.put(dest, total);
        times.put(src, city);
    }
    
    public double getAverageTime(String startStation, String endStation) {
        int[] total = times.get(startStation).get(endStation);
        return 1.0 * total[0] / total[1];
    }
}

/**
 * Your UndergroundSystem object will be instantiated and called as such:
 * UndergroundSystem obj = new UndergroundSystem();
 * obj.checkIn(id,stationName,t);
 * obj.checkOut(id,stationName,t);
 * double param_3 = obj.getAverageTime(startStation,endStation);
 */