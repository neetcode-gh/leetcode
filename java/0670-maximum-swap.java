/*---------------------------------
  Time Complexity: O(n)
  Space Complexity: O(n)
----------------------------------*/  

class Solution {
    public int maximumSwap(int num) {
        StringBuilder str = new StringBuilder(Integer.toString(num));
        if(str.length() == 1){
            return num;
        }

        int[] maxRight = new int[str.length()];
        int max = str.length()-1;
        for(int i = str.length()-1; i >= 0; i--){
            maxRight[i] = max;
            if(str.charAt(i) > str.charAt(max)){
                max = i;
            }
        }

        for(int i = 0; i < str.length(); i++){
            if(str.charAt(maxRight[i]) > str.charAt(i)){
                char t = str.charAt(maxRight[i]);
                str.setCharAt(maxRight[i], str.charAt(i));
                str.setCharAt(i, t);
                break;
            }
        }

        return Integer.parseInt(str.toString());
    }
}
