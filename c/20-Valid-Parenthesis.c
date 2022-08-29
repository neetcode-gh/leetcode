
struct Node {
    char val;
    struct Node* next;
};

struct Stack {
    struct Node* head;
    size_t len;
};

struct Node* Node(char val, struct Node* next) {
    struct Node* root = (struct Node*)malloc(sizeof(struct Node));
    root -> next = next;
    root -> val = val; 
    return root; 
}

struct Stack* Stack() {
    struct Stack* stack = (struct Stack*)malloc(sizeof(struct Stack));
    stack -> len = 0;
    stack -> head = NULL;
    return stack;
}

void append(struct Stack* stack, char val) {
    struct Node* node = Node(val, stack -> head); 
    stack -> head = node;
    stack -> len += 1;
}

char pop(struct Stack* stack) {
    if (stack -> head == NULL) {
        return NULL;
    }
    char val = stack -> head -> val;
    struct Node* deleteNode = stack -> head;
    stack -> head = stack -> head -> next;
    stack -> len -= 1;
    free(deleteNode);
    return val;
}

void freeStack(struct Stack* stack) {
    while (pop(stack) != NULL) {
        pop(stack);
    }
    free(stack);
}

char opposite_parenthesis(char closing) {
    char opening = NULL;
    if (closing == ')') {
        opening = '(';
    } else if (closing == '}') {
        opening = '{';
    } else if (closing == ']') {
        opening = '[';
    }
    return opening;
}

bool isValid(char * s){
    
    struct Stack* stack = Stack();
    char* chr;
    
    for (chr = s; *chr != '\0'; chr++) {
        if (opposite_parenthesis(*chr) == NULL) {
            append(stack, *chr);
        } else if (stack -> len != 0 && opposite_parenthesis(*chr) == pop(stack)) {
            continue;
        } else {
            return false;
        }
    }
    return stack -> len == 0;
}