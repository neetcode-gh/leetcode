class Solution {
    public int subarraysDivByK(int[] nums, int k) {
        int prefix_sum = 0;
        int res = 0;
        Map<Integer, Integer> map = new HashMap<>(); // remainder -> count
        map.put(0, 1);

        for(int n: nums){
            prefix_sum += n;
            int remainder = ((prefix_sum % k) + k) % k;  // twice modulo to avoid negative remainders

            res += map.getOrDefault(remainder, 0);
            map.put(remainder, map.getOrDefault(remainder, 0) + 1);
        }
        return res;
    }
}
