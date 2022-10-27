/*
Return the sum of all the scores on the record after applying all the operations.

Space: O(n)
Time: O(n)
Where n is the size of operations
*/

//-------Implementation of a stack--------

typedef struct stack {
    int val;
    struct stack* next;
} stack;

int sum(stack* s) {
    if (s==NULL)
        return 0;
    return s->val + sum(s->next);
}

stack* add(stack* s, int value) {
    stack* new_s = malloc(sizeof(stack));
    new_s->val = value;
    new_s->next = s;
    return new_s;
}

stack* rmv(stack* s) {
    if (s==NULL) {
        printf("Impossible de supprimer un élément d'une pile vide");
        return NULL;
    }
    stack* ans = s->next;
    free(s);
    return ans;
}

//------------Main algorithm-------------

int calPoints(char ** operations, int operationsSize){
    stack* s = NULL;
    for (int i=0; i<operationsSize; i++) {
        if (operations[i][0]=='+') {
            int to_add = s->val + (s->next)->val;
            s = add(s, to_add);
        } else if (operations[i][0]=='D') {
            s = add(s, 2*(s->val));
        } else if (operations[i][0]=='C') {
            s = rmv(s);
        } else { // It's a number
            if (operations[i][0]=='-') { // It's a negative number
                int n = 0;
                for (int j=0; operations[i][j+1]!='\0'; j++) {
                    n *= 10;
                    n -= operations[i][j+1] - '0';
                }
                s = add(s, n);
            } else { // It's a positive number
                int n = 0;
                for (int j=0; operations[i][j]!='\0'; j++) {
                    n *= 10;
                    n += operations[i][j] - '0';
                }
                s = add(s, n);
            }
        }
    }
        
    return sum(s);
}
