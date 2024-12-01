#define INIT_HASH_SIZE 1024

// Represent an element in a hash table.
typedef struct Hash {
    int key;
    int value;
    struct Hash *next;
} Hash;

// Use -1 as non-existed key,
// as 0 <= nums1[i], nums2[i] <= 104
Hash *InitHash() {
    Hash *h = (Hash*)calloc(INIT_HASH_SIZE, sizeof(Hash));
    assert(h);
    for (int i = 0; i < INIT_HASH_SIZE; i++) {
        h[i].key = -1;
    }
    return h;
}

Hash *NewHash(int key, int value) {
    Hash *h = (Hash*)malloc(sizeof(Hash));
    assert(h);
    h->key = key;
    h->value = value;
    h->next = NULL;
    return h;
}

int HashKey(int key) {
    while(key < 0) key += INIT_HASH_SIZE;
    return (key % INIT_HASH_SIZE);
}

void SetHash(Hash *root, int key, int value) {
    assert(root);
    Hash *h = &root[HashKey(key)];
    if (h->key == -1) {
        h->key = key;
        h->value = value;
    } else if (h->key == key) {
        h->value = value;
    } else {
        while (h) {
            if (h->key == key) {
                h->value = value;
                return;
            } else if (!h->next) {
                h->next = NewHash(key, value);
                return;
            }
            h = h->next;
        }
    }
}

// If hash not round return -1 on purpose.
int GetHash(Hash *root, int key) {
    Hash *h = &root[HashKey(key)];
    while(h) {
        if (h->key == key) {
            return h->value;
        }
        h = h->next;
    }
    return -1;
}

/**
 * Note: The returned array must be malloced, assume caller calls free().
 */
int* nextGreaterElement(int* nums1, int nums1Size, int* nums2, int nums2Size, int* returnSize){
    Hash *hash = InitHash();
    int *res = (int*)malloc(nums1Size*sizeof(int));
    int i, j;

    for (i = 0; i < nums2Size; i++) {
        for (j = i + 1; j < nums2Size; j++) {
            if (nums2[j] > nums2[i]) {
                SetHash(hash, nums2[i], nums2[j]);
                break;
            }
        }
    }

    for (i = 0; i < nums1Size; i++) {
        res[i] = GetHash(hash, nums1[i]);
    }

    *returnSize = nums1Size;
    return res;
}
