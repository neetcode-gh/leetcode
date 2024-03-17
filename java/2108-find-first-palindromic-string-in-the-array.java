public class Solution {

    public String firstPalindrome(String[] words) {
        for (int i = 0; i < words.length; i++) {
            String word = words[i];
            int x = 0, y = word.length() - 1;
            while (word.charAt(x) == word.charAt(y)) {
                if (x >= y)
                    return word;
                else {
                    x++;
                    y--;
                }
            }
        }
        return "";
    }
    
}
