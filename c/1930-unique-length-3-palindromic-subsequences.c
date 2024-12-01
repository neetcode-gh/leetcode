int countPalindromicSubsequence(char * s){
    int n = strlen(s);
    int i, j;
    int c, answer;
    int first[26] = {[0 ... 25] = -1};
    int last[26] = {[0 ... 25] = -1};

    // Use two arrays to record the first and last
    // location of each character.
    for (i = 0; i < n; i++) {
        c = s[i] - 'a';
        if (first[c] == -1) {
            first[c] = i;
        } else {
            last[c] = i;
        }
    }

    // When a character appears twice, count all the
    // unique character between them.
    answer = 0;
    for (i = 0; i < 26; i++) {
        if (last[i] != -1) {
            int m[26] = {[0 ... 25] = -1};
            for (j = first[i] + 1;  j < last[i]; j++) {
                int c = s[j] - 'a';
                if (m[c] == -1) {
                    m[c] = j;
                    answer++;
                }
            }
        }
    }

    return answer;
}
