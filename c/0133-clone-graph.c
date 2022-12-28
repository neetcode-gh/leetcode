
/**
 * Definition for a Node.
 * struct Node {
 *     int val;
 *     int numNeighbors;
 *     struct Node** neighbors;
 * };
 */

struct Node* create_node(int val, int numNeighbors) {
    struct Node* node = (struct Node*)malloc(sizeof(struct Node));
    node -> val = val;
    node -> numNeighbors = numNeighbors;
    if (numNeighbors > 0) {
        node -> neighbors = (struct Node**)malloc(numNeighbors * sizeof(struct Node*));
    } else {
        node -> neighbors = NULL;
    }
    return node;
}

struct Node* clone_node(struct Node* s, struct Node** hashset) {
    
    if (s == NULL) return s;
    if (hashset[(s -> val) - 1] != NULL) return hashset[(s -> val) - 1];
    
    struct Node* new_node = create_node(s -> val, s -> numNeighbors);
    hashset[(s -> val) - 1] = new_node;
    for (int i = 0; i < s -> numNeighbors; i++) {
        new_node -> neighbors[i] = clone_node(s -> neighbors[i], hashset);
    }
    return new_node;
}

struct Node *cloneGraph(struct Node *s) {
    
    struct Node** hashset = (struct Node**)malloc(100 * sizeof(struct Node*));
    for (int i = 0; i < 100; i++) {
        hashset[i] = NULL;
    }
    struct Node* s_clone = clone_node(s, hashset);
    free(hashset);
    return s_clone;
}