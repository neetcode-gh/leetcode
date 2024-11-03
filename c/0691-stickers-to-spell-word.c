#define MIN 5

typedef struct myInstance {
    int index;
    int count;
} Instance;

typedef struct myList {
    int size;
    int maxSize;
    Instance *data;
} InstanceList;

// Function to clean up allocated memory
void cleanup(InstanceList **mapping, int **stickerSignatures, int signatureSize) {
    // Clean up the memory used for mapping
    for (int i = 0; i < 26; i++) {
        InstanceList *current = mapping[i];
        if (current != NULL) {
            if (current->data != NULL) {
                free(current->data);
            }
            free(current);
        }
    }

    // Clean up the memory used for sticker signatures
    for (int i = 0; i < signatureSize; i++) {
        if (stickerSignatures[i] != NULL) {
            free(stickerSignatures[i]);
        }
    }
}

// Hash function to map a character to an index
int hashFunction(char c) {
    return c - 'a';
}

// Initialize the signature for a word (count of each letter)
void initializeSignature(char *word, int *signature) {
    for (int i = 0; i < 26; i++) {
        signature[i] = 0;
    }

    for (char *c = word; *c != '\0'; c++) {
        signature[hashFunction(*c)]++;
    }
}

// Preprocess stickers and filter out dominated ones
int preprocessStickers(char **stickers, int stickersSize,
                       int **stickerSignatures, char **workingStickers, const int const *targetSignature) {
    for (int i = 0; i < stickersSize; i++) {
        workingStickers[i] = stickers[i];
        stickerSignatures[i] = (int *)malloc(sizeof(int) * 26);

        for (int j = 0; j < 26; j++) {
            stickerSignatures[i][j] = 0;
        }

        for (char *c = stickers[i]; *c != '\0'; c++) {
            int index = hashFunction(*c);

            if (targetSignature[index] > 0) {
                stickerSignatures[i][index]++;
            }
        }
    }

    int remaining = stickersSize;

    for (int i = 0; i < remaining; i++) {
        for (int j = 0; j < remaining; j++) {
            if (i == j || workingStickers[j] == NULL) {
                continue;
            }

            int dominated = 1;

            for (int k = 0; k < 26; k++) {
                if (stickerSignatures[i][k] > stickerSignatures[j][k]) {
                    dominated = 0;
                    break;
                }
            }

            if (dominated) {
                free(stickerSignatures[i]);
                stickerSignatures[i] = NULL;
                workingStickers[i] = NULL;
                remaining--;

                if (i < remaining) {
                    stickerSignatures[i] = stickerSignatures[remaining];
                    workingStickers[i] = workingStickers[remaining];
                    stickerSignatures[remaining] = NULL;
                    workingStickers[remaining] = NULL;
                    i--;
                }

                break;
            }
        }
    }

    return remaining;
}

// Create a hash table to map characters to stickers
int makeHashTable(char **stickers, int stickersSize, char *target, InstanceList **mapping) {
    for (int i = 0; i < 26; i++) {
        mapping[i] = NULL;
    }

    for (char *c = target; *c != '\0'; c++) {
        int index = hashFunction(*c);

        if (mapping[index] == NULL) {
            mapping[index] = (InstanceList *)malloc(sizeof(InstanceList));
            mapping[index]->data = NULL;
        }
    }

    for (int i = 0; i < stickersSize; i++) {
        for (char *c = stickers[i]; *c != '\0'; c++) {
            int index = hashFunction(*c);

            if (mapping[index] != NULL) {
                InstanceList *spot = mapping[index];

                if (spot->data != NULL && spot->size > 0
                    && spot->data[spot->size - 1].index == i) {
                    spot->data[spot->size - 1].count++;
                    continue;
                }

                if (spot->data == NULL) {
                    spot->data = (Instance *)malloc(sizeof(Instance) * MIN);
                    spot->size = 0;
                    spot->maxSize = MIN;
                } else if (spot->size == spot->maxSize) {
                    spot->maxSize *= 2;
                    spot->data = realloc(spot->data, sizeof(Instance) * spot->maxSize);
                }

                spot->data[spot->size].index = i;
                spot->data[spot->size].count = 1;
                spot->size++;
            }
        }
    }

    return 0;
}

// Find the index with the minimum size in mapping
int minIndex(InstanceList **mapping, int *targetSignature) {
    int index = -1;

    for (int i = 0; i < 26; i++) {
        if (targetSignature[i] > 0 && (index == -1 || mapping[i]->size < mapping[index]->size)) {
            index = i;
        }
    }

    return index;
}

// Recursive search function to find the minimum stickers required
void search(InstanceList **mapping, int **stickerSignatures, int *targetSignature, int depth, int *maxDepth) {
    if (depth >= *maxDepth && *maxDepth > 0) {
        return;
    }

    int minLetter = minIndex(mapping, targetSignature);

    if (minLetter < 0) {
        if (*maxDepth == 0 || depth < *maxDepth) {
            *maxDepth = depth;
        }

        return;
    }

    for (int option = 0; option < mapping[minLetter]->size; option++) {
        int index = mapping[minLetter]->data[option].index;

        for (int i = 0; i < 26; i++) {
            targetSignature[i] -= stickerSignatures[index][i];
        }

        search(mapping, stickerSignatures, targetSignature, depth + 1, maxDepth);

        for (int i = 0; i < 26; i++) {
            targetSignature[i] += stickerSignatures[index][i];
        }
    }

    return;
}

// Main function to calculate the minimum stickers required
int minStickers(char **stickers, int stickersSize, char *target) {
    int targetSignature[26];
    initializeSignature(target, targetSignature);
    int *stickerSignatures[stickersSize];
    char *workingStickers[stickersSize];
    int domainSize = preprocessStickers(stickers, stickersSize, stickerSignatures, workingStickers, targetSignature);
    InstanceList *mapping[26];
    makeHashTable(workingStickers, domainSize, target, mapping);

    for (int i = 0; i < 26; i++) {
        if (mapping[i] != NULL && mapping[i]->data == NULL) {
            cleanup(mapping, stickerSignatures, domainSize);
            return -1;
        }
    }

    int maxDepth = 0;
    search(mapping, stickerSignatures, targetSignature, 0, &maxDepth);
    cleanup(mapping, stickerSignatures, domainSize);
    return maxDepth;
}

// Alternative Solution

// int solve(int mask, char **stickers, char *target, int n, int m, int *dp) {
//     if (mask == (1 << m) - 1) {
//         return 0;
//     }
//     if (dp[mask] != -1) {
//         return dp[mask];
//     }
//     int ans = 1e9;
//     for (int i = 0; i < n; i++) {
//         int freq[26] = {0};
//         for (int j = 0; stickers[i][j] != '\0'; j++) {
//             freq[stickers[i][j] - 'a']++;
//         }
//         int new_mask = 0;
//         for (int j = 0; j < m; j++) {
//             if ((1 << j) & mask) continue;
//             if (freq[target[j] - 'a']) {
//                 freq[target[j] - 'a']--;
//                 new_mask |= (1 << j);
//             }
//         }
//         if (new_mask != 0) {
//             int temp = 1 + solve(new_mask | mask, stickers, target, n, m, dp);
//             ans = (temp < ans) ? temp : ans;
//         }
//     }
//     return dp[mask] = ans;
// }

// int minStickers(char **stickers, int stickersSize, char *target) {
//     int mask = 0;
//     int n = stickersSize, m = strlen(target);
//     int *dp = (int *)malloc((1 << m) * sizeof(int));
//     for (int i = 0; i < (1 << m); i++) {
//         dp[i] = -1;
//     }
//     int ans = solve(mask, stickers, target, n, m, dp);
//     free(dp);
//     return (ans == 1e9) ? -1 : ans;
// }
