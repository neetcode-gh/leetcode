/**
 * Definition for a Node.
 * struct Node {
 *     int val;
 *     struct Node *next;
 *     struct Node *random;
 * };
 */

/*
    Time: O(n)
    Space: O(1)
*/

typedef struct Node Node;
struct Node* copyRandomList(struct Node* head) {
    
	    if(head == NULL)
        {
            return NULL;
        }
        
        /**
         * Insert each new node after each original node 
         */
        Node* curr = head;
        while(curr)
        {
            // Create the new node
            Node* newNode = (Node*)malloc(sizeof(Node));
            newNode->val = curr->val;
            
            // Insert new node after the original node
            newNode->next = curr->next;
            curr->next = newNode;
            
            // Move curr to the next original node
            curr = curr->next->next;
        }
        
        
        /**
         * Add the random node for each new node 
         */
        curr = head;
        Node* newNode = NULL;
        while(curr)
        {
            // The new node is the next node to the original node
            newNode = curr->next;

            if(curr->random)
            {
                newNode->random = curr->random->next;
            }
            else
            {
                newNode->random = NULL;
            }
            
            // Move curr to the next original node
            curr = curr->next->next;
        }
        
        /**
         * Separate the original nodes list from the new nodes list  
         */
        Node* originalList = head;
        Node* copiedList = head->next;
        Node* copiedListHead = head->next;
        while(originalList)
        {
            originalList->next = originalList->next->next;
            if(copiedList->next)
            {
                copiedList->next = copiedList->next->next;
            }
            else
            {
                copiedList->next = NULL;
            }
            
            originalList = originalList->next;
            copiedList = copiedList->next;
        }
        
       
        return copiedListHead;
}
