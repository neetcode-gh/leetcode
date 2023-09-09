class Solution {
    public int alternateDigitSum(int n) {

        int result =0;
        int flag = 1;

        String  num = String.valueOf(n);
        for(int i=0; i<num.length(); i++){
            result += Character.getNumericValue(num.charAt(i)) * flag;
            flag *= -1;   
        } 
        
        return result;
    }
}
