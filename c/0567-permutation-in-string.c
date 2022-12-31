bool isPermutation(int *count) {
    for (int i = 0; i < 26; i++) {
        if (count[i] != 0) {
            return false;
        }
    }
    return true;
}

bool checkInclusion(char * s1, char * s2){
    const int m = strlen(s1);
    const int n = strlen(s2);
    
    if (m > n) {
        return false;
    }
    
    int count[26] = {0};
    for (int i = 0; i < m; i++) {
        count[s1[i] - 'a']++;
        count[s2[i] - 'a']--;
    }
    
    if (isPermutation(count)) {
        return true;
    }
    
    for (int i = m; i < n; i++) {
        count[s2[i] - 'a']--;
        count[s2[i - m] - 'a']++;
        if (isPermutation(count)) {
            return true;
        }
    }
    return false;
}