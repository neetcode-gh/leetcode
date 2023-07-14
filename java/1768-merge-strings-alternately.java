class Solution {
    public String mergeAlternately(String word1, String word2) {
        String newWord = "";
        int firstPointer = 0;
        int secondPointer = 0;
        while (firstPointer < word1.length() && secondPointer < word2.length()) {
            newWord += word1.charAt(firstPointer);
            newWord += word2.charAt(secondPointer);
            firstPointer++;
            secondPointer++;
        }
        while (firstPointer < word1.length()) { // word 2 was shorter
            newWord += word1.charAt(firstPointer);
            firstPointer++;
        }
        while (secondPointer < word2.length()) { // word 1 was shorter
            newWord += word2.charAt(secondPointer);
            secondPointer++;
        }
        return newWord;
    }
}