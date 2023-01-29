typedef struct WordDictionary{
    struct WordDictionary *c[26];
    bool isWord;
} WordDictionary;

WordDictionary *NewDictionary() {
    // allocate and init the memory for a dictionary element.
    WordDictionary *n = (WordDictionary*)calloc(1, sizeof(WordDictionary));
    return n;
}

WordDictionary* wordDictionaryCreate() {
    WordDictionary *root = NewDictionary();
    return root;
}

void wordDictionaryAddWord(WordDictionary* obj, char * word) {
    assert(obj);
    int n = strlen(word);
    WordDictionary* dict = obj;
    int i, j;
    for (i = 0; i < n; i++) {
        j = word[i] - 'a';
        if (!dict->c[j]) {
            dict->c[j] = NewDictionary();
        }
        dict = dict->c[j];
    }
    dict->isWord = true;
}

bool wordDictionarySearchR(WordDictionary* dict, char * word, int index) {
    assert(dict);

    char c = word[index];
    int i, j;
    if (index == strlen(word)) {
        return dict->isWord;
    }
    if (c == '.') {
        for (i = 0; i < 26; i++) {
            if (dict->c[i] && wordDictionarySearchR(dict->c[i], word, index + 1)) {
                return true;
            }
        }
    } else {
        j = c - 'a';
        if (!dict->c[j]) {
            return false;
        }
        return wordDictionarySearchR(dict->c[j], word, index + 1);
    }
    return false;
}

bool wordDictionarySearch(WordDictionary* obj, char * word) {
    assert(obj);
    return wordDictionarySearchR(obj, word, 0);
}

void wordDictionaryFreeR(WordDictionary* dict) {
    assert(dict);
    int i;
    for (i = 0; i < 26; i++) {
        if (dict->c[i]) {
            return wordDictionaryFreeR(dict->c[i]);
        }
    }
    free(dict);
}

void wordDictionaryFree(WordDictionary* obj) {
    assert(obj);
    wordDictionaryFreeR(obj);
}

/**
 * Your WordDictionary struct will be instantiated and called as such:
 * WordDictionary* obj = wordDictionaryCreate();
 * wordDictionaryAddWord(obj, word);

 * bool param_2 = wordDictionarySearch(obj, word);

 * wordDictionaryFree(obj);
*/

