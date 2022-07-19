class Solution {
  public int[] topKFrequent(int[] nums, int k) {
    if (nums.length == 1)
      return nums;
    Map<Integer, Integer> hm = new HashMap<Integer, Integer>();

    for (int i = 0; i < nums.length; i++) {
      hm.put(nums[i], hm.getOrDefault(nums[i], 0) + 1);
    }
    // Making hashmap to count the number of occurences
    // 1:3
    // 2:2
    // 3:1

    // Forming an array of arraylist
    ArrayList<Integer>[] al = new ArrayList[nums.length + 1];
    // initializing each index as an arraylist
    for (int i = 0; i < nums.length + 1; i++) {
      al[i] = new ArrayList<Integer>();
    }

    // Taking no of occurences from the hashmap and storing list of elements
    // having same count
    for (Map.Entry en : hm.entrySet()) {
      int a = (int) en.getKey();
      int b = (int) en.getValue();
      al[b].add(a);
    }
    int[] retu = new int[k];
    int x = 0;

    for (int i = nums.length; i >= 0; i--) {
      for (int j = 0; j < al[i].size(); j++) {
        if (x == k)
          break;

        retu[x] = (al[i].get(j));
        x++;
      }
    }

    return retu;
  }
}