class Solution {
    public int deleteAndEarn(int[] nums) {
        Map<Integer, Integer> counter = new HashMap<>();
        for (int i = 0; i < nums.length; i++) {
            counter.put(nums[i], counter.getOrDefault(nums[i], 0) + 1);
        }
        List<Integer> numsList = new ArrayList<>(counter.keySet());
        Collections.sort(numsList);

        int earnOne = 0;
        int earnTwo = 0;
        for (int i = 0; i < numsList.size(); i++) {
            int curEarn = numsList.get(i) * counter.get(numsList.get(i));
            if (i > 0 && numsList.get(i) == numsList.get(i - 1) + 1) {
                int temp = earnTwo;
                earnTwo = Math.max(earnOne + curEarn, earnTwo);
                earnOne = temp;
            } else {
                earnOne = earnTwo;
                earnTwo += curEarn;
            }
        }
        return earnTwo;
    }
}
