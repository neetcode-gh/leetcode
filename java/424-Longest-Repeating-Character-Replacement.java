class Solution {
    public int characterReplacement(String s, int k) {

        int i = 0;
        int j = 0;
        int maxWindow = 0;
        Map<Character, Integer> map = new HashMap<>();
        for(int l=0;l<s.length();l++){
            if(!map.containsKey(s.charAt(l))){
                map.put(s.charAt(l),0);
            }
        }

        int maxOccurance = 0;
        while(j<s.length()){
            int value = map.get(s.charAt(j))+1;
            map.put(s.charAt(j), value);
            //1. Get the max occurrence
            //2. Compute window-maxOccurance <= k
            //3. Update window
            maxOccurance = Math.max(maxOccurance,value);
            int window = (j-i) + 1;
            if(window-maxOccurance <=k){
                //its a valid window
                maxWindow = Math.max(maxWindow,window);
                j++;
            }else{
                map.put(s.charAt(i), map.get(s.charAt(i)) - 1);
                map.put(s.charAt(j), map.get(s.charAt(j)) - 1);
                i++;
            }
        }
        return maxWindow;
    }
}
