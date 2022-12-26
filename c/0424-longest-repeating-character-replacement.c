int characterReplacement(char * s, int k){
    int count[26] = {0};
    int left = 0, right = 0, maxCount = 0;
    
    while (right < strlen(s)) {
        count[s[right] - 'A']++;
        maxCount = max(maxCount, count[s[right] - 'A']);
        right++;
        if (right - left - maxCount > k) {
            count[s[left] - 'A']--;
            left++;
        }
    }
    return right - left;
}

// C doesn't have a built-in max function
int max(int a, int b) {
    return (a > b) ? a : b;
}
