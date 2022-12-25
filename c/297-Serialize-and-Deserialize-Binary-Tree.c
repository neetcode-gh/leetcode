/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */
#define DATA_ALLOCATION_SIZE 10000

typedef struct TreeNode TreeNode;

void dfs_encode(TreeNode* node, char** data, int* dataIndex, int* dataSize)
{
    // Check if new space reallocation is needed
    if((*dataIndex) + 10 >= *dataSize)  // (+10) to add a little bit of margin for any data to be written in this function scope
    {
        // Reallocate data string for a bigger space
        *dataSize += DATA_ALLOCATION_SIZE;
        *data = (char*)realloc(*data, *dataSize * sizeof(char));
    }

    if(!node)
    {
        (*data)[(*dataIndex)++] = 'N';
        (*data)[(*dataIndex)++] = ',';
        return;
    }

    // Returns total number of characters written is returned excluding the null-character 
    int charsWritten = sprintf(*data + *dataIndex, "%d", node->val);
    *dataIndex += charsWritten;
    (*data)[(*dataIndex)++] = ',';     // This is actually is written in-place of the null terminator

    dfs_encode(node->left, data, dataIndex, dataSize);
    dfs_encode(node->right, data, dataIndex, dataSize);
}

TreeNode* dfs_decode(char** data)
{
    // Reached end of the string
    if((*data)[0] == '\0')
    {
        return NULL;
    }
    else if((*data)[0] == 'N')
    {
        // Skip two chars ('N' and ',')
        *data += 2;
        return NULL;
    }

    TreeNode* node = (TreeNode*)malloc(sizeof(TreeNode));
    char* endPtr = NULL; // Points to the first char after the numeric value

    // Set the node value
    node->val = strtol(*data, &endPtr, 10);
    *data = endPtr + 1;  // (+1) to skip the ','

    node->left = dfs_decode(data);
    node->right = dfs_decode(data);
    
    return node;
}

/** Encodes a tree to a single string. */
char* serialize(struct TreeNode* root) {
    // Allocate the maximum possible number of nodes
    int dataSize = DATA_ALLOCATION_SIZE;
    char* data = (char*)malloc(dataSize * sizeof(char));
    int dataIndex = 0;  // points to the first empty space in the data string

    dfs_encode(root, &data, &dataIndex, &dataSize);
    // Add the null terminator
    data[dataIndex] = '\0';

    return data;
}

/** Decodes your encoded data to tree. */
struct TreeNode* deserialize(char* data) {

    return dfs_decode(&data);
}

// Your functions will be called as such:
// char* data = serialize(root);
// deserialize(data);
