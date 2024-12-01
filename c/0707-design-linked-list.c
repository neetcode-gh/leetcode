typedef struct Node {
    struct Node* next;
    struct Node* prev;
    int val;
} Node;

typedef struct {
    Node* head;
    Node* tail;
    int length;
} MyLinkedList;

Node* createNode(int val) {
    Node* new_node = (Node*)malloc(sizeof(Node) );
    new_node->next = NULL;
    new_node->prev = NULL;
    new_node->val = val;
    return new_node;
}

MyLinkedList* myLinkedListCreate() {
    MyLinkedList* list = (MyLinkedList*)malloc(sizeof(MyLinkedList) );
    list->head = createNode(-1);
    list->tail = list->head;
    list->length = 0;
    return list;
}

Node* traverseList(MyLinkedList* obj, int index) {
    if (index < 0 || index >= obj->length)
        return NULL;
    Node* trev = obj->head;
    while (index >= 0) {
        trev = trev->next;
        index -= 1;
    }
    return trev; 
}

int myLinkedListGet(MyLinkedList* obj, int index) {
    Node *node = traverseList(obj, index);
    if (node != NULL)
        return node->val;
    return -1;
}

void myLinkedListAddAtHead(MyLinkedList* obj, int val) {
    Node* new_node = createNode(val);
    new_node->next = obj->head->next;
    new_node->prev = obj->head;
    obj->head->next = new_node;
    if (new_node->next != NULL)
        new_node->next->prev = new_node;
    else
        obj->tail = new_node;
    obj->length += 1;
    return;
}

void myLinkedListAddAtTail(MyLinkedList* obj, int val) {
    Node* new_node = createNode(val);
    obj->tail->next = new_node;
    new_node->prev = obj->tail;
    obj->tail = obj->tail->next;
    obj->length += 1;
    return;
}

void myLinkedListAddAtIndex(MyLinkedList* obj, int index, int val) {
    if (index == 0) {
        myLinkedListAddAtHead(obj, val);
        return;
    }
    else if (index == obj->length) {
        myLinkedListAddAtTail(obj, val);
        return;
    }
    Node* prev_node = traverseList(obj, index - 1);
    if (prev_node == NULL)
        return;
    Node* new_node = createNode(val);
    new_node->next = prev_node->next;
    new_node->prev = prev_node;
    prev_node->next = new_node;
    if (new_node->next != NULL)
        new_node->next->prev = new_node;
    obj->length += 1;
    return;
}

void myLinkedListDeleteAtIndex(MyLinkedList* obj, int index) {
    Node *node = traverseList(obj, index);
    if (node == NULL)
        return;
    Node *temp = node;
    node->prev->next = node->next;
    if (node->next != NULL)
        node->next->prev = node->prev;
    else
        obj->tail = node->prev; 
    obj->length -= 1;
    free(temp);
    return;
}

void myLinkedListFree(MyLinkedList* obj) {
    Node *prev = NULL, *cur = obj->head;
    while (cur != NULL) {
        prev = cur;
        cur = cur->next;
        free(prev);
    }
    free(obj);
}

/**
 * Your MyLinkedList struct will be instantiated and called as such:
 * MyLinkedList* obj = myLinkedListCreate();
 * int param_1 = myLinkedListGet(obj, index);
 
 * myLinkedListAddAtHead(obj, val);
 
 * myLinkedListAddAtTail(obj, val);
 
 * myLinkedListAddAtIndex(obj, index, val);
 
 * myLinkedListDeleteAtIndex(obj, index);
 
 * myLinkedListFree(obj);
*/
