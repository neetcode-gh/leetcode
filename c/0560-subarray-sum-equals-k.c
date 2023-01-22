#define INIT_HASH_SIZE 4096

// Represent an element in a hash table.
typedef struct Hash {
    int key;
    int count;
    struct Hash *next;
} Hash;

Hash *InitHash() {
    Hash *h = (Hash*)calloc(INIT_HASH_SIZE, sizeof(Hash));
    assert(h);
    return h;
}

Hash *NewHash(int key) {
    Hash *h = (Hash*)malloc(sizeof(Hash));
    assert(h);
    h->key = key;
    h->count = 1;
    h->next = NULL;
    return h;
}

int HashKey(int key) {
    while(key < 0) key += INIT_HASH_SIZE;
    return (key % INIT_HASH_SIZE);
}

void AddHash(Hash *root, int key) {
    assert(root);
    Hash *h = &root[HashKey(key)];
    if (h->key == 0 && h->count == 0) {
        h->key = key;
        h->count = 1;
    } else if (h->key == key) {
        h->count++;
    } else {
        while (h) {
            if (h->key == key) {
                h->count++;
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
int GetHash(Hash *root, int key) {
    Hash *h = &root[HashKey(key)];
    while(h) {
        if (h->key == key) {
            return h->count;
        }
        h = h->next;
    }
    return 0;
}

int subarraySum(int* nums, int numsSize, int k){
    Hash* hash = InitHash();
    int sum = 0;
    int res = 0;
    int r = 0;

    AddHash(hash, 0);
    for(int i = 0; i < numsSize; i++){
        sum += nums[i];
        res += GetHash(hash, sum - k);
        AddHash(hash, sum);
    }

    return res;
}
