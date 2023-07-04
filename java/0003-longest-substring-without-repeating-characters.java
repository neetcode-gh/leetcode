class Solution {
    public int lengthOfLongestSubstring(String s) {
       HashMap<Character,Integer> charIndex = new HashMap<>();
       int max = Integer.MIN_VALUE;
       int start =0;
       if(s=="" || s.length()==0) return 0;
       for(int end=0;end<s.length();end++)
       {
           if(charIndex.containsKey(s.charAt(end)))
           {
              start = Math.max(start,charIndex.get(s.charAt(end))+1);

           }
           charIndex.put(s.charAt(end),end);
           max = Math.max(end-start+1,max);
       }
       return max;
    }
}
