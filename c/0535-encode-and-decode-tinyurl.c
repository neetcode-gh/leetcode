// Represent an element in a hash table.
typedef struct Hash {
    char* key;
    char* value;
    UT_hash_handle hh;
} Hash;

Hash *root = NULL;

char *UrlToKey(char *url) {
    char *key = NULL;
    unsigned int hash = 1853;
    int i = 0;

    while (i < strlen(url)) {
        hash = ((hash << 5) + hash) + url[i];
        i++;
    }

    key = (char*)calloc(32, 1);
    snprintf(key, 32, "http://tinyurl.com/%X", hash);
    return key;
}

/** Encodes a URL to a shortened URL. */
char* encode(char* longUrl) {
    Hash *entry = NULL;
    char *key = NULL;
    key = UrlToKey(longUrl);
    HASH_FIND_STR(root, key, entry);
    if (!entry) {
        entry = malloc(sizeof(Hash));
        entry->key = key;
        entry->value = longUrl;
        HASH_ADD_KEYPTR(hh, root, key, strlen(key), entry);
    } else {
        free(key);
    }
    return entry->key;
}

/** Decodes a shortened URL to its original URL. */
char* decode(char* shortUrl) {
    Hash *entry = NULL;
    HASH_FIND_STR(root, shortUrl, entry);
    if (entry) {
        return entry->value;
    }
    return NULL;
}

// Your functions will be called as such:
// char* s = encode(s);
// decode(s);

