class Solution {
    /**
     * First solution utilizes a hashmap and then does the due diligience of adding the 
     * appropriate values that appear more than n/3 times
     * Runtime O(n) : Space O(n)
     */
    public List<Integer> majorityElement(int[] nums) {
        List<Integer> res = new ArrayList<>();
        Map<Integer, Integer> map = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            if (map.containsKey(nums[i])) 
                map.put(nums[i], map.get(nums[i]) + 1);
            else 
                map.put(nums[i], 1);
        }

        for (Map.Entry<Integer, Integer> entry: map.entrySet()) {
            int potentialCandidate = entry.getValue();
            if (potentialCandidate > nums.length / 3)
                res.add(entry.getKey());
        }

        return res;
    }


    /**
     * This is called Boyer-Moore Vote algorithm and the idea here is having candidates 
     * with diff values and two counters. 
     * For each number in the array we see if it equals the candidate and increment the count. 
     * The two numbers left after this process are the majority candidates. 
     * Loop through the array again then make sure that each candidate does indeed have more than n/3 occurrences
     * 
     * Runtime O(n) : Space O(1)
     */
    public List<Integer> majorityElement_2(int[] nums) {
        int candidate1 = 0, candidate2 = 0, count1 = 0, count2 = 0;

        for (int num : nums) {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
            else if (count1 == 0) {
                candidate1 = num;
                count1++;
            } else if (count2 == 0) {
                candidate2 = num;
                count2++;
            } else {
                count1--;
                count2--;
            }
        }

        count1 = count2 = 0;
        for (int num : nums) {
            if (num == candidate1) count1++;
            else if (num == candidate2) count2++;
        }

        List<Integer> res = new ArrayList<>();
        if (count1 > nums.length / 3) res.add(candidate1);
        if (count2 > nums.length / 3) res.add(candidate2);
        return res;
    }
}