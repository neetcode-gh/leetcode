// -------------------- Complex solution --------------------
// --------- LinkedList ---------
typedef struct Node {
  int value;
  struct Node *next;
} Node;

typedef struct LinkedListHead {
  Node *next;
} LinkedListHead;

Node *newNode(int key) {
  Node *node = (Node *)malloc(sizeof(Node));
  node->value = key;
  node->next = NULL;
  return node;
}

LinkedListHead *newLinkedList() {
  LinkedListHead *head = (LinkedListHead *)malloc(sizeof(LinkedListHead));
  head->next = NULL;
  return head;
}

bool linkedListContains(LinkedListHead *head, int key) {
  Node *currentNode = head->next;
  while (currentNode) {
    if (currentNode->value == key) return true;
    currentNode = currentNode->next;
  }
  return false;
}

void linkedListPush(LinkedListHead *head, int key) {
  Node *node = newNode(key);
  node->next = head->next;
  head->next = node;
}

void linkedListRemove(LinkedListHead *head, int key) {
  Node *previousNode = head->next;
  if (previousNode == NULL) return;
  if (previousNode->value == key) {
    head->next = previousNode->next;
    free(previousNode);
    return;
  }
  Node *currentNode = previousNode->next;
  while (currentNode) {
    if (currentNode->value == key) {
      previousNode->next = currentNode->next;
      free(currentNode);
      return;
    }
    currentNode = currentNode->next;
  }
}

void freeLinkedList(LinkedListHead *head) {
  Node *previousNode = head->next;
  if (previousNode) {
    Node *currentNode = previousNode->next;
    while (currentNode) {
      free(previousNode);
      previousNode = currentNode;
      currentNode = currentNode->next;
    }
    free(previousNode);
  }
  free(head);
}
// --------- LinkedList ---------

// ----------- HashSet ----------
typedef struct {
  LinkedListHead *head;
} MyHashSet;

#define HASH_SET_DEFAULT_SIZE 10000

MyHashSet *myHashSetCreate() {
  MyHashSet *obj =
      (MyHashSet *)malloc(sizeof(MyHashSet) * HASH_SET_DEFAULT_SIZE);
  for (int i = 0; i < HASH_SET_DEFAULT_SIZE; i++) {
    obj[i].head = newLinkedList();
  }
  return obj;
}

int getHashPosition(int key) { return key % HASH_SET_DEFAULT_SIZE; }

void myHashSetAdd(MyHashSet *obj, int key) {
  int pos = getHashPosition(key);
  if (obj[pos].head == NULL) obj[pos].head = newLinkedList();
  if (!linkedListContains(obj[pos].head, key))
    linkedListPush(obj[pos].head, key);
}

void myHashSetRemove(MyHashSet *obj, int key) {
  linkedListRemove(obj[getHashPosition(key)].head, key);
}

bool myHashSetContains(MyHashSet *obj, int key) {
  LinkedListHead *head = obj[getHashPosition(key)].head;
  if (head == NULL || head->next == NULL) return false;
  return linkedListContains(head, key);
}

void myHashSetFree(MyHashSet *obj) {
  for (int i = 0; i < HASH_SET_DEFAULT_SIZE; i++)
    if (obj[i].head != NULL) freeLinkedList(obj[i].head);
  free(obj);
}
// ----------- HashSet ----------
// -------------------- Complex solution --------------------

// -------------------- Simpler and faster solution --------------------
typedef struct {
  bool *values;
} MyHashSet;

MyHashSet *myHashSetCreate() {
  MyHashSet *obj = (MyHashSet *)malloc(sizeof(MyHashSet));
  obj->values = (bool *)calloc(1000001, sizeof(bool));
  return obj;
}

void myHashSetAdd(MyHashSet *obj, int key) { obj->values[key] = true; }

void myHashSetRemove(MyHashSet *obj, int key) { obj->values[key] = false; }

bool myHashSetContains(MyHashSet *obj, int key) { return obj->values[key]; }

void myHashSetFree(MyHashSet *obj) { free(obj); }
// -------------------- Simpler and faster solution --------------------

/**
 * Your MyHashSet struct will be instantiated and called as such:
 * MyHashSet* obj = myHashSetCreate();
 * myHashSetAdd(obj, key);

 * myHashSetRemove(obj, key);

 * bool param_3 = myHashSetContains(obj, key);

 * myHashSetFree(obj);
*/
