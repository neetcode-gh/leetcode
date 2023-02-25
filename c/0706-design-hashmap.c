#define HASH_SIZE 1024

typedef struct HashNode {
    int key;
    int value;
    struct HashNode *next;
} HashNode;

typedef struct  {
    HashNode *hash[HASH_SIZE];
} MyHashMap;

inline HashNode *NewHashNode(int key, int value) {
    HashNode *h = (HashNode*)malloc(sizeof(HashNode));
    h->key = key;
    h->value = value;
    h->next = NULL;
    return h;
}

inline int KeyToIndex(int key) {
    while (key < 0) key += HASH_SIZE;
    return key % HASH_SIZE;
}

MyHashMap* myHashMapCreate() {
    MyHashMap* h = (MyHashMap*)calloc(1, sizeof(MyHashMap));
    return h;
}

void myHashMapPut(MyHashMap* obj, int key, int value) {
    assert(obj);
    HashNode **hash = &obj->hash[KeyToIndex(key)];
    HashNode *h = *hash;
    if (!*hash) {
        *hash = NewHashNode(key, value);
    } else if (h->key == key) {
        h->value = value;
        return;
    } else {
        while (h->next) {
            h = h->next;
            if (h->key == key) {
                h->value = value;
                return;
            }
        }
        h->next = NewHashNode(key, value);
    }
}

int myHashMapGet(MyHashMap* obj, int key) {
    assert(obj);
    HashNode* hash = obj->hash[KeyToIndex(key)];
    while (hash) {
        if (hash->key == key) {
            return hash->value;
        }
        hash = hash->next;
    }
    return -1;
}

void myHashMapRemove(MyHashMap* obj, int key) {
    assert(obj);
    HashNode **head = &obj->hash[KeyToIndex(key)];
    if (*head) {
        HashNode *h = *head;
        if (h->key == key) {
            HashNode *tmp = *head;
            *head = h->next;
            free(tmp);
            return;
        } else {
            HashNode *h_parent = h;
            while(h) {
                if (h->key == key) {
                    h_parent->next = h->next;
                    free(h);
                    return;
                }
                h_parent = h;
                h = h->next;
            }
        }
    }
    return;
}

void myHashMapFree(MyHashMap* obj) {
    if(obj) {
        HashNode* h;
        HashNode *tmp;
        for (int i = 0; i < HASH_SIZE; i++) {
            h = obj->hash[i];
            if(h) {
                while (h != NULL) {
                    tmp = h->next;
                    free(h);
                    h = tmp;
                }
            }
        }
    }
}

/**
 * Your MyHashMap struct will be instantiated and called as such:
 * MyHashMap* obj = myHashMapCreate();
 * myHashMapPut(obj, key, value);

 * int param_2 = myHashMapGet(obj, key);

 * myHashMapRemove(obj, key);

 * myHashMapFree(obj);
*/
