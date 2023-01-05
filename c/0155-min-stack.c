#include <stdlib.h>
#include <assert.h>

// A structure to represent an element of the stack.
typedef struct Node {
    int value;
    struct Node* next;
} Node;

Node* nodeCreate(int val) {
    Node* node = (Node*)malloc(sizeof(Node));
    node->value = val;
    node->next = NULL;
    return node;
}

void nodePush(Node** obj, int val) {
    assert(obj);
    Node* node = (Node*)malloc(sizeof(Node));
    node->value = val;
    node->next = *obj;
    *obj = node;
}

void nodePop(Node** obj) {
    assert(obj);
    if (*obj) {
        Node* tmp = *obj;
        *obj = tmp->next;
        free(tmp);
    }
}

// A structure to represent a stack.
typedef struct {
    int size;
    Node* top;
} MyStack;

MyStack* stackCreate()
{
    MyStack* stack = (MyStack*)malloc(sizeof(MyStack));
    stack->size = 0;
    stack->top = NULL;
    return stack;
}

void stackPush(MyStack* stack, int item)
{
    if (!stack->top) {
        stack->top = nodeCreate(item);
    } else {
        nodePush(&stack->top, item);
    }
    stack->size++;
}

void stackPop(MyStack* stack)
{
    nodePop(&stack->top);
    stack->size--;
}

int stackTop(MyStack* stack)
{
    assert(stack);
    assert(stack->top);
    return stack->top->value;
}

typedef struct {
    MyStack* stk;
    MyStack* minStk;
} MinStack;

MinStack* minStackCreate() {
    MinStack* min = (MinStack*)malloc(sizeof(MinStack));
    min->stk = NULL;
    min->minStk = NULL;
    return min;
}

void minStackPush(MinStack* obj, int val) {
    assert(obj);
    if(!obj->stk) {
        obj->stk = stackCreate();
        obj->minStk = stackCreate();
    }
    stackPush(obj->stk, val);
    if (obj->minStk->top) {
        int minTop = stackTop(obj->minStk);
        if ( val < minTop) {
            stackPush(obj->minStk, val);
        } else {
            stackPush(obj->minStk, minTop);
        }
    } else {
        stackPush(obj->minStk, val);
    }
}

void minStackPop(MinStack* obj) {
    assert(obj);
    stackPop(obj->stk);
    stackPop(obj->minStk);
}

int minStackTop(MinStack* obj) {
    assert(obj);
    return stackTop(obj->stk);
}

int minStackGetMin(MinStack* obj) {
    assert(obj);
    return stackTop(obj->minStk);
}

void minStackFree(MinStack* obj) {
    assert(obj);
    if (obj->stk) {
        while(obj->stk->top) {
            stackPop(obj->stk);
        }
        while(obj->minStk->top) {
            stackPop(obj->minStk);
        }
        free(obj->stk);
        free(obj->minStk);
    }
    free(obj);
}

/**
 * Your MinStack struct will be instantiated and called as such:
 * MinStack* obj = minStackCreate();
 * minStackPush(obj, val);
 * minStackPop(obj);
 * int param_3 = minStackTop(obj);
 * int param_4 = minStackGetMin(obj);
 * minStackFree(obj);
 */

