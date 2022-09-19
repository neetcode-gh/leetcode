const int MAX_N = 1e5 + 5;
struct Stack
{
	int top;
	int capacity;
	int *array;
};

struct Stack *createStack()
{
	struct Stack *stack = (struct Stack *)malloc(sizeof(struct Stack));
	stack->capacity = MAX_N;
	stack->top = -1;
	stack->array = (int *)malloc(stack->capacity * sizeof(int));
	return stack;
}

int isFull(struct Stack *stack)
{
	return stack->top == stack->capacity - 1;
}

int isEmpty(struct Stack *stack)
{
	return stack->top == -1;
}

void push(struct Stack *stack, int val)
{
	if (isFull(stack))
		return;
	stack->array[++stack->top] = val;
}

void pop(struct Stack *stack)
{
	if (isEmpty(stack))
		return;
	--stack->top;
}

int peek(struct Stack *stack)
{
	if (isEmpty(stack))
		return INT_MIN;
	return stack->array[stack->top];
}

int max(int num1, int num2)
{
	return (num1 > num2) ? num1 : num2;
}

int largestRectangleArea(int *heights, int heightsSize)
{
	int ans = 0;
	struct Stack *st = createStack();
	for (int i = 0; i < heightsSize; i++)
	{
		while (!isEmpty(st) && heights[peek(st)] > heights[i])
		{
			int tp = peek(st);
			pop(st);
			int dist = (isEmpty(st) ? i : i - peek(st) - 1);
			ans = max(ans, dist * heights[tp]);
		}
		push(st, i);
	}
	while (!isEmpty(st))
	{
		int tp = peek(st);
		pop(st);
		int dist = (isEmpty(st) ? heightsSize : heightsSize - peek(st) - 1);
		ans = max(ans, dist * heights[tp]);
	}
	return ans;
}
