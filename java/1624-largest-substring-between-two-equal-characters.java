/*---------------------------
  Time Complexity: O(n)
  Space Complexity: O(1)
-----------------------------*/  
class Solution {
    public int maxLengthBetweenEqualCharacters(String s) {
        Map<Character, Integer> char_index = new HashMap<>();
        int res = -1;

        for(int i = 0; i < s.length(); i++){
            if(char_index.containsKey(s.charAt(i))){
                res = Math.max(res, i - char_index.get(s.charAt(i)) - 1);
            }
            else
                char_index.put(s.charAt(i), i);
        }
        return res;
    }
}
