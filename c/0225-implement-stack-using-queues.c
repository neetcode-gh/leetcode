// A structure to represent an element of the queue.
typedef struct Node {
    int value;
    struct Node* next;
} Node;

typedef struct MyQueue {
    int size;
    Node* front;
    Node* rear;
} MyQueue;

MyQueue* MyQueueCreate() {
    MyQueue* queue = (MyQueue*)malloc(sizeof(MyQueue));
    queue->size = 0;
    queue->front = NULL;
    queue->rear = NULL;
    return queue;
}

void MyQueuePush(MyQueue** obj, int val) {
    assert(obj);
    assert(*obj);
    MyQueue* queue = *obj;
    Node* node = (Node*)malloc(sizeof(Node));
    node->value = val;
    node->next = NULL;
    if (queue->rear) {
        queue->rear->next = node;
        queue->rear = node;
    } else {
        queue->front = node;
        queue->rear = node;
    }
    queue->size++;
}

void MyQueuePop(MyQueue** obj) {
    assert(obj);
    assert(*obj);
    MyQueue* queue = *obj;
    Node* tmp = queue->front;
    if (queue->size > 0 && tmp) {
        queue->front = queue->front->next;
        queue->size--;
        free(tmp);
    }
    if (queue->rear == tmp) {
        queue->rear = NULL;
    }
}

int MyQueueFront(MyQueue** obj) {
    assert(obj);
    MyQueue* queue = *obj;
    assert(queue->front);
    return queue->front->value;
}

int MyQueueRear(MyQueue** obj) {
    assert(obj);
    MyQueue* queue = *obj;
    assert(queue->rear);
    return queue->rear->value;
}

int MyQueueSize(MyQueue** obj) {
    assert(obj);
    assert(*obj);
    return (*obj)->size;
}

typedef struct {
    MyQueue* queue;
} MyStack;


MyStack* myStackCreate() {
    MyStack* stack = (MyStack*)malloc(sizeof(MyStack));
    stack->queue = NULL;
    return stack;
}

void myStackPush(MyStack* obj, int x) {
    assert(obj);
    int size;
    if (!obj->queue) {
        obj->queue = MyQueueCreate();
    }
    MyQueuePush(&obj->queue, x);
    size = obj->queue->size;
    while(--size > 0) {
        MyQueuePush(&obj->queue, MyQueueFront(&obj->queue));
        MyQueuePop(&obj->queue);
    }
}

int myStackPop(MyStack* obj) {
    assert(obj);
    int val = MyQueueFront(&obj->queue);
    MyQueuePop(&obj->queue);
    return val;
}

int myStackTop(MyStack* obj) {
    assert(obj);
    assert(obj->queue);
    return MyQueueFront(&obj->queue);
}

bool myStackEmpty(MyStack* obj) {
    assert(obj);
    if (obj->queue) {
        return obj->queue->size == 0;
    }
    return true;
}

void myStackFree(MyStack* obj) {
    if(obj) {
        while(obj->queue && obj->queue->front) {
            MyQueuePop(&obj->queue);
        }
        free(obj);
    }
}

/**
 * Your MyStack struct will be instantiated and called as such:
 * MyStack* obj = myStackCreate();
 * myStackPush(obj, x);
 * int param_2 = myStackPop(obj);
 * int param_3 = myStackTop(obj);
 * bool param_4 = myStackEmpty(obj);
 * myStackFree(obj);
 */
