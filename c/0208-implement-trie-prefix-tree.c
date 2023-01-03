
// struct trieNode {
//     struct trieNode* nextNodes[26];
//     bool end;  
// };

typedef struct {
    struct Trie* nextNodes[26]; /* a Trie* pointer array of size 26 to store char nodes from a to z*/
    bool end; /* a boolean to mark the end of word */ 
} Trie;

// Create a trie node using malloc.
Trie* trieCreate() {
    Trie* root = (Trie*)malloc(sizeof(Trie));
    for (int i = 0; i < 26; i++) {
        root -> nextNodes[i] = NULL;
    }
    root -> end = false;
    return root;
}

// Get the next character node from the current trie node.
Trie* get_node(Trie* node, char character) {
    int index = character - 97;
    Trie* nextNode = node -> nextNodes[index];
    return nextNode;
}

// Add a new character node to the current trie node.
void add_node(Trie* node, char character, Trie* newNode) {
    int index = character - 97;
    node -> nextNodes[index] = newNode;
    return;
}

// Insert implementation in recursion.
void insert_recur(Trie* node, int idx, char * word, int wordSize) {
    if (idx == wordSize) {
        node -> end = true;
        return;
    }
    if (get_node(node, word[idx]) == NULL) {
        add_node(node, word[idx], trieCreate());
    }
    return insert_recur(get_node(node, word[idx]), idx + 1, word, wordSize);
}

// Insert method.
void trieInsert(Trie* obj, char * word) {
    insert_recur(obj, 0, word, strlen(word));
    return;
}

// Search implementation in recursion.
bool trieSearch_recur(Trie* node, int idx, char * word, int wordSize) {
    if (idx == wordSize) {
        return node -> end;
    }
    if (get_node(node, word[idx]) == NULL) {
        return false;
    }
    return trieSearch_recur(get_node(node, word[idx]), idx + 1, word, wordSize);
}

// Search method.
bool trieSearch(Trie* obj, char * word) {
    return trieSearch_recur(obj, 0, word, strlen(word));
}

// prefix search implementation in recursion.
bool trieStartsWith_recur(Trie* node, int idx, char * prefix, int prefixSize) {
    if (idx == prefixSize) {
        return true;
    }
    if (get_node(node, prefix[idx]) == NULL) {
        return false;
    }
    return trieStartsWith_recur(get_node(node, prefix[idx]), idx + 1, prefix, prefixSize);
}

// prefix search method.
bool trieStartsWith(Trie* obj, char * prefix) {
    return trieStartsWith_recur(obj, 0, prefix, strlen(prefix));
}

// free method to free up memory of all the nodes.
void trieFree(Trie* obj) {
    if (obj == NULL) {
        return;
    }    
    for (char i = 97; i < 123; i++) {
        trieFree(get_node(obj, i));
    }
    free(obj);
    return;
}

/**
 * Your Trie struct will be instantiated and called as such:
 * Trie* obj = trieCreate();
 * trieInsert(obj, word);
 
 * bool param_2 = trieSearch(obj, word);
 
 * bool param_3 = trieStartsWith(obj, prefix);
 
 * trieFree(obj);
*/