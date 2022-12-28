//We are basically storing sum%k and storing it in the hashmap and checking it.
//Math logic is that the overall sum will get cancelled out because of modulo

class Solution {
    public boolean checkSubarraySum(int[] nums, int k) {
        HashMap<Integer, Integer> map = new HashMap<>();
        map.put(0, -1);
        int sum = 0;
        for (int i = 0; i<nums.length; i++) {
            sum += nums[i];
            int rem = sum%k;
            if (map.containsKey(rem)) 
                if (i - map.get(rem)>=2) 
                    return true;
            if (!map.containsKey(rem)) 
                map.put(rem, i);
        }
        return false;
    }
}
