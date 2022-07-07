import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer/*num*/, Integer/*count*/> numCountGroups = new HashMap<>();
        for (int num : nums) {
            numCountGroups.put(num, numCountGroups.getOrDefault(num, 0) + 1);
        }

        ArrayList[] buckets = new ArrayList[nums.length + 1];
        for (Map.Entry<Integer, Integer> entry : numCountGroups.entrySet()) {
            ArrayList bucket = buckets[entry.getValue()];
            if (bucket == null) {
                bucket = new ArrayList<>();
            }
            bucket.add(entry.getKey());
            buckets[entry.getValue()] = bucket;
        }


        List<Integer> res = new ArrayList<>();
        for (int i = buckets.length - 1; i >= 0; i--) {
            if (buckets[i] == null) {
                continue;
            }
            for (Object num : buckets[i]) {
                res.add((Integer) num);
                if (res.size() == k) {
                    return res.stream().mapToInt(it -> it).toArray();
                }
            }
        }
        return new int[]{};
    }
}
