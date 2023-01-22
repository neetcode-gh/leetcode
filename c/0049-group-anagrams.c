// Represent an elemet of the hash map.
typedef struct {
    char *key;
    char *strs[100];
    size_t size;
    UT_hash_handle hh;
} StrsHash;

char *StrToKey(char *str) {
    int size = strlen(str);
    char c[26] = {0};
    char *key = malloc(size + 1);
    char *k = key;
    size_t i, j;

    for (i = 0; i < size; i++) {
        c[str[i] - 'a']++;
    }

    for (i = 0; i < 26; i++) {
        for (j = 0; j < c[i]; j++) {
            *k++ = 'a' + i;
        }
    }
    *k = '\0';
    return key;
}

/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */
char *** groupAnagrams(char ** strs, int strsSize, int* returnSize, int** returnColumnSizes){
    StrsHash *map = NULL;
    StrsHash *entry;
    char *key = NULL;
    char **resStrs = NULL;
    char ***result = NULL;
    int *colsSize = NULL;
    size_t i;

    // Create a hash map.
    for (i = 0; i < strsSize; i++) {
        entry = NULL;
        key = StrToKey(strs[i]);
        HASH_FIND_STR(map, key, entry);
        if (!entry) {
            entry = malloc(sizeof(StrsHash));
            entry->key = key;
            entry->size = 0;
            HASH_ADD_KEYPTR(hh, map, key, strlen(key), entry);
        } else {
            free(key);
        }
        entry->strs[entry->size++] = strs[i];
    }

    // Prepare the answer from the hash map.
    *returnSize = HASH_COUNT(map);
    colsSize = (int*)malloc(*returnSize * sizeof(int));
    result = (char***)malloc(*returnSize * sizeof(char**));
    *returnColumnSizes = colsSize;

    for (entry = map, i = 0; entry != NULL; entry = entry->hh.next, i++) {
        colsSize[i] = entry->size;
        result[i] = entry->strs;
    }

    return result;
}
