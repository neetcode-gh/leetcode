class Solution {
    public String mergeAlternately(String word1, String word2) {
        int i = 0, j = 0;
        StringBuilder res = new StringBuilder();

        while (i < word1.length() && j < word2.length()) {
            res.append(word1.charAt(i));
            res.append(word2.charAt(j));
            i++;
            j++;
        }

        res.append(word1.substring(i));
        res.append(word2.substring(j));
        return res.toString();
    }
}