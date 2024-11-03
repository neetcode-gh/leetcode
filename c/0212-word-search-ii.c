typedef struct TrieNode trie_t;

struct TrieNode {
    bool valid;
    char* word;
    int count;
    trie_t* parent;
    trie_t* children[26];
};

void insert(trie_t* root, char* word) {
    char* curr = word;
    while (*curr != '\0') {
        int index = *curr - 'a';
        if (root->children[index] == NULL) {
            root->children[index] = (trie_t*)calloc(1, sizeof(trie_t));
            root->children[index]->valid = true;
            root->children[index]->parent = root;
        }
        root->count++;
        root = root->children[index];
        curr++;
    }
    root->count++;
    root->word = word;
}

void traverse(char** result, int* resultSize, char** board, bool** visited, int boardSize, int boardColSize, int x, int y, trie_t* node) {
    if (node == NULL || !node->valid) {
        return;
    }
    if (node->word != NULL) {
        result[(*resultSize)++] = node->word;
        node->word = NULL;
        trie_t* curNode = node;
        while (curNode != NULL) {
            curNode->count--;
            if (curNode->count <= 0) {
                curNode->valid = false;
            }
            curNode = curNode->parent;
        }
    }
    visited[x][y] = true;

    int directions[4][2] = {{-1, 0}, {1, 0}, {0, -1}, {0, 1}};
    for (int i = 0; i < 4; i++) {
        int newX = x + directions[i][0];
        int newY = y + directions[i][1];
        if (newX >= 0 && newX < boardSize && newY >= 0 && newY < boardColSize && !visited[newX][newY]) {
            int c = board[newX][newY] - 'a';
            traverse(result, resultSize, board, visited, boardSize, boardColSize, newX, newY, node->children[c]);
        }
    }
    
    visited[x][y] = false;
}

char ** findWords(char** board, int boardSize, int* boardColSize, char ** words, int wordsSize, int* returnSize) {
    // Create the trie and insert words
    trie_t* trie = (trie_t*) calloc(1, sizeof(trie_t));
    for (int i = 0; i < wordsSize; i++) {
        insert(trie, words[i]);
    }
    
    // Allocate memory for the result array
    char** result = (char**) malloc(sizeof(char*) * wordsSize);
    int resultSize = 0;
    
    // Create and initialize the visited array
    bool** visited = (bool**) malloc(sizeof(bool*) * boardSize);
    for (int i = 0; i < boardSize; i++) {
        visited[i] = (bool*) calloc(*boardColSize, sizeof(bool));
    }
    
    // Traverse the board and find words
    for (int i = 0; i < boardSize; i++) {
        for (int j = 0; j < *boardColSize; j++) {
            int c = board[i][j] - 'a';
            traverse(result, &resultSize, board, visited, boardSize, *boardColSize, i, j, trie->children[c]);
        }
    }
    
    // Clean up and set the return size
    *returnSize = resultSize;
    return result;
}
