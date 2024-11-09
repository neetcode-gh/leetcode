/*
-----------------------
  Time Complexity : O(n)
  Space Complexity = O(1)
-----------------------
*/

class Solution {
    public String decodeAtIndex(String s, int k) {
        long wordLength = 0;
        for (char c : s.toCharArray()) {
            if (Character.isLetter(c)) {
                wordLength += 1;
            } else {
                wordLength *= Character.getNumericValue(c);
            }
        }

        for (int i = s.length() - 1; i >= 0; i--) {
            char c = s.charAt(i);
            k %= wordLength;
            if (Character.isLetter(c)) {
                if (k == 0) {
                    return String.valueOf(c);
                } else {
                    wordLength -= 1;
                }
            } else {
                wordLength /= Character.getNumericValue(c);
            }
        }
        return ""; 
    }
}
