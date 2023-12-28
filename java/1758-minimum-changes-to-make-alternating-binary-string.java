class Solution {
    public int minOperations(String s) {
        int count = 0;

        for(int i = 0; i < s.length(); i++){
            if(i % 2 == 1)
                count += (s.charAt(i) == '0')? 1: 0;    
            else
                count += (s.charAt(i) == '1')? 1: 0;
        }
        return Math.min(count, s.length() - count);
    }
}
