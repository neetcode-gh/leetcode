int* partitionLabels(char* s, int* returnSize) {
    int* result = NULL;
    int* lastOccurrence = (int*)calloc(26, sizeof(int)); // Store the last occurrence index of each character

    // Find the last occurrence index of each character
    for (int i = 0; s[i] != '\0'; i++) {
        lastOccurrence[s[i] - 'a'] = i;
    }

    int start = 0, end = 0; // Pointers to track the current partition
    *returnSize = 0;

    for (int i = 0; s[i] != '\0'; i++) {
        end = (end > lastOccurrence[s[i] - 'a']) ? end : lastOccurrence[s[i] - 'a'];

        if (i == end) {
            (*returnSize)++;
            result = (int*)realloc(result, sizeof(int) * (*returnSize));
            result[(*returnSize) - 1] = end - start + 1;
            start = end + 1;
        }
    }

    free(lastOccurrence);
    return result;
}
