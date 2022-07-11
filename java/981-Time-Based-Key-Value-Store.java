class TimeMap {

  HashMap<String, List<Pair<String, Integer>>> map;

  public TimeMap() {
    map = new HashMap<>();
  }

  public void set(String key, String value, int timestamp) {
    if (!map.containsKey(key)) map.put(key, new ArrayList<>());
    map.get(key).add(new Pair(value, timestamp));
  }

  public String get(String key, int timestamp) {
    if (!map.containsKey(key)) return "";
    List<Pair<String, Integer>> list = map.get(key);
    return search(list, timestamp);
  }

  public String search(List<Pair<String, Integer>> list, int timestamp) {
    int start = 0;
    int end = list.size() - 1;
    while (start < end) {
      int mid = start + (end - start + 1) / 2;
      if (list.get(mid).getValue() <= timestamp) start = mid; else end =
        mid - 1;
    }
    return list.get(start).getValue() <= timestamp
      ? list.get(start).getKey()
      : "";
  }
}
