class Solution {
    public int maxScore(String s) {
        int zero = 0, one = 0;
        int res = 0;

        for(char c: s.toCharArray()){
            if(c == '1')
                one += 1;
        }
        for(int i = 0; i < s.length()-1; i++){
            char c = s.charAt(i);
            if(c == '0')
                zero += 1;
            else
                one -= 1;  
            res = Math.max(res, zero + one);      
        }
        return res;
    }
}
