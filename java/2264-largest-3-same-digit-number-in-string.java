class Solution {
    public String largestGoodInteger(String num) {
        String res = "";

        for(int i = 0; i <= num.length()-3; i++){
            String curr = num.substring(i, i+3);
            if(curr.charAt(0) == curr.charAt(1) && curr.charAt(0) == curr.charAt(2))
                res = (curr.compareTo(res) > 0) ? curr: res;
        }
        return res;
    }
}
