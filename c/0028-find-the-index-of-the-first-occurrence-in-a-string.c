int strStr(char * haystack, char * needle){
    int h_size = strlen(haystack);
    int n_size = strlen(needle);
    int i, j;
    if (h_size < n_size) {
        return -1;
    }
    for (i = 0; i < h_size - n_size + 1; i++) {
        for (j = 0; j < n_size; j++) {
            if (haystack[i + j] != needle[j]) {
                break;
            }
        }
        if (j == n_size) {
            return i;
        }
    }
    return -1;
}
