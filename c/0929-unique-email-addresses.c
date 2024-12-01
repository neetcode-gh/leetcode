// Represent an element in a hash table.
typedef struct Hash {
    char* key;
    UT_hash_handle hh;
} Hash;

char *EmailToKey(char *email) {
    int len = strlen(email);
    char *key = (char*)malloc( len + 1);
    char *k = key;
    int domain = 0;
    int i;

    for (i = 0; i < len; i++) {
        if (!domain && email[i] == '.') {
            continue;
        }
        if (email[i] == '+') {
            while(i < len && email[i] != '@') {
                i++;
            }
        }
        if (email[i] == '@') {
            domain = 1;
        }
        *k++ = email[i];
    }
    *k = '\0';

    return key;
}

int numUniqueEmails(char ** emails, int emailsSize){
    Hash *root = NULL;
    Hash *entry = NULL;
    char *key = NULL;
    int i;

    for (i = 0; i < emailsSize; i++) {
        entry = NULL;
        key = EmailToKey(emails[i]);
        HASH_FIND_STR(root, key, entry);
        if (!entry) {
            entry = malloc(sizeof(Hash));
            entry->key = key;
            HASH_ADD_KEYPTR(hh, root, key, strlen(key), entry);
        } else {
            free(key);
        }
    }

    return HASH_COUNT(root);
}
