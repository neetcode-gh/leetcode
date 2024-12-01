int isVowel(char c) {
    return c == 'a' || c == 'e' || c == 'i' || c == 'o' || c == 'u';
}

int maxVowels(char* s, int k) {
    int windowSum = 0;
    int len = strlen(s);
    int maxVowelCount;

    // calculate for the first window
    for (int i = 0; i < k; i++) {
        windowSum += isVowel(s[i]);
    }
    maxVowelCount = windowSum;


    for (int i = k; i < len; i++) {
        // remove the first ekem of the previous window and add the next element 
        windowSum = windowSum - isVowel(s[i - k]) + isVowel(s[i]);
        if (windowSum > maxVowelCount) {
            maxVowelCount = windowSum;
        }
    }
    return maxVowelCount;
}