class Solution {
    public int maxScoreWords(String[] words, char[] letters, int[] score) {
        int[] letterCount = new int[26];
        for (char letter : letters) {
            letterCount[letter - 'a'] += 1;
        }
        return backtrack(0, words, score, letterCount);
    }

    private int backtrack(int i, String[] words, int[] score, int[] letterCount) {
        if (i == words.length) {
            return 0;
        }
        int res = backtrack(i + 1, words, score, letterCount);
        String word = words[i];
        if (canFormWord(word, letterCount)) {
            for (char ch : word.toCharArray()) {
                letterCount[ch - 'a'] -= 1;
            }
            res = Math.max(res, getScore(word, score) + backtrack(i + 1, words, score, letterCount));
            for (char ch : word.toCharArray()) {
                letterCount[ch - 'a'] += 1;
            }
        }
        return res;
    }

    private boolean canFormWord(String word, int[] letterCount) {
        int[] wordCount = new int[26];
        for (char ch : word.toCharArray()) {
            wordCount[ch - 'a'] += 1;
        }
        for (int i = 0; i < 26; i++) {
            if (wordCount[i] > letterCount[i]) {
                return false;
            }
        }
        return true;
    }

    private int getScore(String word, int[] score) {
        int total = 0;
        for (char ch : word.toCharArray()) {
            total += score[ch - 'a'];
        }
        return total;
    }
}
