#define TO_INDEX(c) c - 'a'

bool isEquals(int* a, int* b, int n) {
    for (int i = 0; i < n; i++) {
        if (a[i] != b[i]) {
            return false;
        }
    }
    return true;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* findAnagrams(char * s, char * p, int* returnSize) {
    int sSize = strlen(s);
    int pSize = strlen(p);
    int pFreq[26] = {0};
    int sFreq[26] = {0};
    int i, count;
    int* ans;

    if (sSize < pSize) {
        *returnSize = 0;
        return ans;
    }

    for (i = 0; i < pSize; i++) {
        pFreq[TO_INDEX(p[i])]++;
        sFreq[TO_INDEX(s[i])]++;
    }

    count = 0;
    ans = (int*)calloc(sSize - pSize + 1, sizeof(int));
    for (i = 0; i <= sSize - pSize; i++) {
        if (i > 0) {
            sFreq[TO_INDEX(s[i - 1])]--;
            sFreq[TO_INDEX(s[i + pSize - 1])]++;
        }
        if (isEquals(sFreq, pFreq, 26)) {
            ans[count++] = i;
        }
    }
    *returnSize = count;

    return ans;
}
