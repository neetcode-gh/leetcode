class Solution {
    public int minSwaps(String s) {
        int extraClosingbrackets = 0, max = 0;
        for(int i = 0; i < s.length(); i++) {
            if(s.charAt(i)== ']') {
                extraClosingbrackets++;
                max = Math.max(extraClosingbrackets, max);
            }
            else 
                extraClosingbrackets--;
        }

        return (max + 1) / 2;
    }
}
