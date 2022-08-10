class Solution {

    public int longestConsecutive(int[] nums) {
        Set<Integer> memory = new HashSet<Integer>();
        for(int num: nums) memory.add(num);
        int ans = 0;
        for (int num: nums){
            int cnt = 0;
            if (!memory.contains(num-1)){
                cnt++;
                int tmp = num+1;
                while (memory.contains(tmp++)){
                    cnt++;
                }
            }
            ans = Math.max(ans, cnt);
        }
        return ans;
    }
}
