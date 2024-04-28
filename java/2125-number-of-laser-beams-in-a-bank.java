class Solution {
    public int numberOfBeams(String[] bank) {
        int prev = countOnes(bank[0]);
        int res = 0;

        for(int i = 1; i < bank.length; i++){
            int curr = countOnes(bank[i]);
            if(curr > 0){
                res += curr*prev;
                prev = curr;
            }
        }
        return res;
    }
    private int countOnes(String str){
        int res = 0;
        for(char c: str.toCharArray())
            res += (c == '1')? 1: 0;
        return res;        
    }
}
