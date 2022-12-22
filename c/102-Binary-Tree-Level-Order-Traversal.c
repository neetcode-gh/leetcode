/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     struct TreeNode *left;
 *     struct TreeNode *right;
 * };
 */

#define ARRAY_ALLOCATION_SIZE 500
typedef struct TreeNode TreeNode;

// Circular queue with dynamic size
typedef struct Queue
{
    TreeNode** treeNodeArray;
    int treeNodeArraySize;  // Allocated size of the treeNodeArray
    int treeNodeArrayUsed;  // Number of used space in the treeNodeArray
    int front;
    int back;
}Queue;

void queueInit(Queue* queue)
{
    queue->treeNodeArray = (TreeNode**)malloc(ARRAY_ALLOCATION_SIZE * sizeof(TreeNode*));
    queue->treeNodeArraySize = ARRAY_ALLOCATION_SIZE;
    queue->treeNodeArrayUsed = 0;
    queue->front = -1;
    queue->back = -1;
}

int isQueueEmpty(Queue* queue)
{
    if(queue->treeNodeArrayUsed == 0)
    {
        return true;
    }
    
    return false;
}

void queuePush(Queue* queue, TreeNode* node)
{
    // Check if space reallocation is needed
    if(queue->treeNodeArrayUsed == queue->treeNodeArraySize)
    {
        // Reallocate bigger space for the array
        queue->treeNodeArraySize += ARRAY_ALLOCATION_SIZE; // Increase the array size
        queue->treeNodeArray = (TreeNode**)realloc(queue->treeNodeArray, queue->treeNodeArraySize * sizeof(TreeNode*));

        // If the front passed the back, we need to move any element statring of the front to the end of the array
        if(queue->front >= queue->back)
        {
            int oldArraySize = (queue->treeNodeArraySize - ARRAY_ALLOCATION_SIZE);
            // Calculate how many elements we need to move, starting from the from til the array end (with old array size before reallocation)
            int elementsToMoveCount = oldArraySize - queue->front;
            
            for(int i = 1; i < elementsToMoveCount; i++)
            {
                printf("%d, %d\n", i, elementsToMoveCount);
                queue->treeNodeArray[queue->treeNodeArraySize - i] = queue->treeNodeArray[--oldArraySize];
            }
            
            // Set the new front position
            queue->front = queue->treeNodeArraySize - elementsToMoveCount;
        }
    }
    
    // If back is at the end of the array, we circle back to beginning of the array
    if(++queue->back == queue->treeNodeArraySize)
    {
        queue->back = 0;
    }
    
    // Add node at the back
    queue->treeNodeArray[queue->back] = node;
    
    // Increment the treeNodeArrayUsed counter
    queue->treeNodeArrayUsed++;
}

TreeNode* queuePop(Queue* queue)
{
    // Make sure the queue is not empty
    if(!isQueueEmpty(queue))
    {
        // Decrement the treeNodeArrayUsed counter
        queue->treeNodeArrayUsed--;
        
        // If front is at the end of the array, we circle back to beginning of the array
        if(++queue->front == queue->treeNodeArraySize)
        {
            queue->front = 0;
        }
        
        return queue->treeNodeArray[queue->front];
    }
    
    return NULL;
}


/**
 * Return an array of arrays of size *returnSize.
 * The sizes of the arrays are returned as *returnColumnSizes array.
 * Note: Both returned array and *columnSizes array must be malloced, assume caller calls free().
 */
int** levelOrder(struct TreeNode* root, int* returnSize, int** returnColumnSizes){
    int resultAllocatedSize = ARRAY_ALLOCATION_SIZE;
    int** result = (int**)malloc(resultAllocatedSize * sizeof(int*));
    int resultIndex = 0;
    Queue queue;
    
    // Initialize to 0
    *returnSize = 0;
    *returnColumnSizes = (int*)malloc(resultAllocatedSize * sizeof(int));

    
    if(!root)
    {
        return result;
    }

    queueInit(&queue);
    // Initialize the queue with the root node
    queuePush(&queue, root);

    while(!isQueueEmpty(&queue))
    {
        int levelLen = queue.treeNodeArrayUsed;
        int* level = (int*)malloc(levelLen * sizeof(int));
        int levelIndex = 0;
        
        for(int i = 0; i < levelLen; i++)
        {
            TreeNode* poppedNode = queuePop(&queue);
            
            level[levelIndex++] = poppedNode->val;
            if(poppedNode->left)
            {
                queuePush(&queue, poppedNode->left);
            }

            if(poppedNode->right)
            {
                queuePush(&queue, poppedNode->right);
            }
        }
        
        // Check if result array has enough space
        if(resultIndex + 1 == resultAllocatedSize)
        {
            resultAllocatedSize += ARRAY_ALLOCATION_SIZE;

            result = (int**)realloc(result, resultAllocatedSize * sizeof(int*));
            *returnColumnSizes = (int*)realloc(*returnColumnSizes, resultAllocatedSize * sizeof(int));
        }
        
        result[resultIndex] = level;
        (*returnColumnSizes)[resultIndex] = levelLen;
        resultIndex++;
        (*returnSize)++;
    }

    return result;
}
