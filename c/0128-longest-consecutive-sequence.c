#define INIT_HASH_SIZE 4096

// Represent an element in a hash table.
typedef struct Hash {
    int key;
    struct Hash *next;
} Hash;

Hash **InitHash() {
    Hash **h = (Hash**)calloc(INIT_HASH_SIZE, sizeof(Hash*));
    assert(h);
    return h;
}

Hash *NewHash(int key) {
    Hash *h = (Hash*)malloc(sizeof(Hash));
    assert(h);
    h->key = key;
    h->next = NULL;
    return h;
}

int HashKey(int key) {
    while(key < 0) key += INIT_HASH_SIZE;
    return (key % INIT_HASH_SIZE);
}

void AddHash(Hash **hash, int key) {
    assert(hash);
    int hash_key = HashKey(key);
    Hash **head = hash + hash_key;
    if (!*head) {
        *head = NewHash(key);
    } else {
        Hash *h = *head;
        while (h) {
            if (h->key == key) {
                return;
            } else if (!h->next) {
                h->next = NewHash(key);
                return;
            }
            h = h->next;
        }
    }
}

// If hash not round return 0 on purpose.
int GetHash(Hash **hash, int key) {
    assert(hash);
    Hash * h = hash[HashKey(key)];
    while(h) {
        if (h->key == key) {
            return 1;
        }
        h = h->next;
    }

    return 0;
}

int longestConsecutive(int* nums, int numsSize){
    Hash **hash = InitHash();
    int i, len, n, maxLen = 0;

    for (i = 0; i < numsSize; i++) {
        AddHash(hash, nums[i]);
    }
    for (i = 0; i < numsSize; i++) {
        n = nums[i];
        len = 1;
        if (GetHash(hash, n - 1) == 0) {
            while(GetHash(hash, ++n) == 1) {
                len++;
            }
        }
        maxLen = (len > maxLen) ? len : maxLen;
    }

    return maxLen;
}

//
// According to the official solution, using hash map will be considered as O(n).
//
// Alternative solution 1 - With uthash, the runtime is poorer. It is a little surprise.
//
// typedef struct Hash {
//     int num;
//     UT_hash_handle hh;
// } Hash;
//
// void AddHash(Hash **hash, int num) {
//     Hash *entry;
//     HASH_FIND_INT(*hash, &num, entry);
//     if (!entry) {
//         entry = malloc(sizeof(Hash));
//         entry->num = num;
//         HASH_ADD_INT(*hash, num, entry);
//     }
// }
//
// Hash * GetHash(Hash **hash, int num) {
//     Hash *entry = NULL;
//     HASH_FIND_INT(*hash, &num, entry);
//     return entry;
// }
//
// int longestConsecutive(int* nums, int numsSize){
//     Hash *root = NULL;
//     int i, len, n, maxLen = 0;
//
//     for (i = 0; i < numsSize; i++) {
//         AddHash(&root, nums[i]);
//     }
//     for (i = 0; i < numsSize; i++) {
//         n = nums[i];
//         len = 1;
//         if (!GetHash(&root, n - 1)) {
//             while(GetHash(&root, ++n)) {
//                 len++;
//             }
//         }
//         maxLen = (len > maxLen) ? len : maxLen;
//     }
//
//     return maxLen;
// }
//
//
// Alternative solution 2 - With sorting, O(nlogn), the runtime is the best.
//
// int compare(const void *a, const void *b) {
//     return *(int*)a - *(int*)b;
// }
//
// int longestConsecutive(int* nums, int numsSize){
//     int i, len, max;
//     if (numsSize <= 0) {
//         return 0;
//     }
//     len = 1;
//     max = 1;
//     qsort(nums, numsSize, sizeof(int), compare);
//     for (i = 0; i < numsSize - 1; i++) {
//         if (nums[i] + 1 == nums[i + 1]) {
//             len++;
//         } else if (nums[i] == nums[i + 1]){
//             continue;
//         } else {
//             len = 1;
//         }
//         max = (max > len) ? max : len;
//     }
//
//     return max;
// }
//
