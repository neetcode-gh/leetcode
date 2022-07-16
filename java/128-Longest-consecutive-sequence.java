class Solution {
  
     public int longestConsecutive(int[] nums) {
        Map<Integer,Integer> map = new HashMap<>();
        int result = 0;
        for(int n : nums){
            if(!map.containsKey(n)){
                int left = map.getOrDefault(n-1,0);
                int right = map.getOrDefault(n+1,0);
                int sum = left+right+1;
                result = Math.max(sum,result);
                map.put(n,sum);
                map.put(n-left,sum);
                map.put(n+right,sum);
            }
        }
        return result;
    }
  
}
