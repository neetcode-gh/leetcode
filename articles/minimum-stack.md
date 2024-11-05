## 1. Brute Force

::tabs-start

```python
class MinStack:

    def __init__(self):
        self.stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)

    def pop(self) -> None:
        self.stack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        tmp = []
        mini = self.stack[-1]

        while len(self.stack):
            mini = min(mini, self.stack[-1])
            tmp.append(self.stack.pop())
        
        while len(tmp):
            self.stack.append(tmp.pop())
        
        return mini
```

```java
class MinStack {

    private Stack<Integer> stack;

    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
    }
    
    public void pop() {
        stack.pop();
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        Stack<Integer> tmp = new Stack<>();
        int mini = stack.peek();

        while (!stack.isEmpty()) {
            mini = Math.min(mini, stack.peek());
            tmp.push(stack.pop());
        }
        
        while (!tmp.isEmpty()) {
            stack.push(tmp.pop());
        }
        
        return mini;
    }
}
```

```cpp
class MinStack {
public:
    stack<int> stk;
    MinStack() {
        
    }
    
    void push(int val) {
        stk.push(val);
    }
    
    void pop() {
        stk.pop();
    }
    
    int top() {
        return stk.top();
    }
    
    int getMin() {
        stack<int> tmp;
        int mini = stk.top();
        while (stk.size()) {
            mini = min(mini, stk.top());
            tmp.push(stk.top());
            stk.pop();
        }

        while (tmp.size()) {
            stk.push(tmp.top());
            tmp.pop();
        }

        return mini;
    }
};
```

```javascript
class MinStack {
    constructor() {
        this.stack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
    }

    /**
     * @return {void}
     */
    pop() {
        this.stack.pop();
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1];
    }

    /**
     * @return {number}
     */
    getMin() {
        const tmp = [];
        let mini = this.stack[this.stack.length - 1];

        while (this.stack.length > 0) {
            mini = Math.min(mini, this.stack[this.stack.length - 1]);
            tmp.push(this.stack.pop());
        }

        while (tmp.length > 0) {
            this.stack.push(tmp.pop());
        }

        return mini;
    }
}
```

```csharp
public class MinStack {
    private Stack<int> stack;

    public MinStack() {
        stack = new Stack<int>();
    }
    
    public void Push(int val) {
        stack.Push(val);
    }
    
    public void Pop() {
        stack.Pop();
    }
    
    public int Top() {
        return stack.Peek();
    }
    
    public int GetMin() {
        Stack<int> tmp = new Stack<int>();
        int mini = stack.Peek();

        while (stack.Count > 0) {
            mini = System.Math.Min(mini, stack.Peek());
            tmp.Push(stack.Pop());
        }
        
        while (tmp.Count > 0) {
            stack.Push(tmp.Pop());
        }
        
        return mini;
    }
}
```

```go
type MinStack struct {
    stack *linkedliststack.Stack
}

func Constructor() MinStack {
    return MinStack{stack: linkedliststack.New()}
}

func (this *MinStack) Push(val int) {
    this.stack.Push(val)
}

func (this *MinStack) Pop() {
    this.stack.Pop()
}

func (this *MinStack) Top() int {
    top, _ := this.stack.Peek()
    return top.(int)
}

func (this *MinStack) GetMin() int {
    tmp := linkedliststack.New()
    min := this.Top()

    for !this.stack.Empty() {
        val, _ := this.stack.Pop()
        min = getMin(min, val.(int))
        tmp.Push(val)
    }

    for !tmp.Empty() {
        val, _ := tmp.Pop()
        this.stack.Push(val)
    }

    return min
}

func getMin(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class MinStack() {
    private val stack = ArrayDeque<Int>()

    fun push(`val`: Int) {
        stack.addLast(`val`)
    }

    fun pop() {
        stack.removeLast()
    }

    fun top(): Int {
        return stack.last()
    }

    fun getMin(): Int {
        val tmp = ArrayDeque<Int>()
        var min = stack.last()

        while (stack.isNotEmpty()) {
            min = minOf(min, stack.last())
            tmp.addLast(stack.removeLast())
        }

        while (tmp.isNotEmpty()) {
            stack.addLast(tmp.removeLast())
        }

        return min
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for $getMin()$ and $O(1)$ for other operations.
* Space complexity: $O(n)$ for $getMin()$ and $O(1)$ for other operations.

---

## 2. Two Stacks

::tabs-start

```python
class MinStack:
    def __init__(self):
        self.stack = []
        self.minStack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        val = min(val, self.minStack[-1] if self.minStack else val)
        self.minStack.append(val)

    def pop(self) -> None:
        self.stack.pop()
        self.minStack.pop()

    def top(self) -> int:
        return self.stack[-1]

    def getMin(self) -> int:
        return self.minStack[-1]
```

```java
public class MinStack {
    private Stack<Integer> stack;
    private Stack<Integer> minStack;

    public MinStack() {
        stack = new Stack<>();
        minStack = new Stack<>();
    }
    
    public void push(int val) {
        stack.push(val);
        if (minStack.isEmpty() || val <= minStack.peek()) {
            minStack.push(val);
        }
    }
    
    public void pop() {
        if (stack.isEmpty()) return;
        int top = stack.pop();
        if (top == minStack.peek()) {
            minStack.pop();
        }
    }
    
    public int top() {
        return stack.peek();
    }
    
    public int getMin() {
        return minStack.peek();
    }
}
```

```cpp
class MinStack {
private:
    std::stack<int> stack;
    std::stack<int> minStack;

public:
    MinStack() {}

    void push(int val) {
        stack.push(val);
        val = std::min(val, minStack.empty() ? val : minStack.top());
        minStack.push(val);
    }

    void pop() {
        stack.pop();
        minStack.pop();
    }

    int top() {
        return stack.top();
    }

    int getMin() {
        return minStack.top();
    }
};
```

```javascript
class MinStack {
    constructor() {
        this.stack = [];
        this.minStack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        val = Math.min(
            val,
            this.minStack.length === 0
                ? val
                : this.minStack[this.minStack.length - 1],
        );
        this.minStack.push(val);
    }

    /**
     * @return {void}
     */
    pop() {
        this.stack.pop();
        this.minStack.pop();
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1];
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.minStack[this.minStack.length - 1];
    }
}
```

```csharp
public class MinStack {
    
    private Stack<int> stack;
    private Stack<int> minStack;

    public MinStack() {
        stack = new Stack<int>();
        minStack = new Stack<int>();
    }

    public void Push(int val) {
        stack.Push(val);
        val = Math.Min(val, minStack.Count == 0 ? val : minStack.Peek());
        minStack.Push(val);
    }

    public void Pop() {
        stack.Pop();
        minStack.Pop();
    }

    public int Top() {
        return stack.Peek();
    }

    public int GetMin() {
        return minStack.Peek();
    }
}
```

```go
type MinStack struct {
    stack    *linkedliststack.Stack
    minStack *linkedliststack.Stack
}

func Constructor() MinStack {
    return MinStack{
        stack:    linkedliststack.New(),
        minStack: linkedliststack.New(),
    }
}

func (this *MinStack) Push(val int) {
    this.stack.Push(val)
    minVal := val
    if !this.minStack.Empty() {
        if top, ok := this.minStack.Peek(); ok {
            if top.(int) < val {
                minVal = top.(int)
            }
        }
    }
    this.minStack.Push(minVal)
}

func (this *MinStack) Pop() {
    this.stack.Pop()
    this.minStack.Pop()
}

func (this *MinStack) Top() int {
    top, _ := this.stack.Peek()
    return top.(int)
}

func (this *MinStack) GetMin() int {
    min, _ := this.minStack.Peek()
    return min.(int)
}
```

```kotlin
class MinStack() {
    private val stack = ArrayDeque<Int>()
    private val minStack = ArrayDeque<Int>()

    fun push(`val`: Int) {
        stack.addLast(`val`)
        val minVal = if (minStack.isNotEmpty()) minOf(`val`, minStack.last()) else `val`
        minStack.addLast(minVal)
    }

    fun pop() {
        stack.removeLast()
        minStack.removeLast()
    }

    fun top(): Int {
        return stack.last()
    }

    fun getMin(): Int {
        return minStack.last()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for all operations.
* Space complexity: $O(n)$

---

## 3. One Stack

::tabs-start

```python
class MinStack:
    def __init__(self):
        self.min = float('inf')
        self.stack = []

    def push(self, x: int) -> None:
        if not self.stack:
            self.stack.append(0)
            self.min = x
        else:
            self.stack.append(x - self.min)
            if x < self.min:
                self.min = x

    def pop(self) -> None:
        if not self.stack:
            return
        
        pop = self.stack.pop()
        
        if pop < 0:
            self.min = self.min - pop

    def top(self) -> int:
        top = self.stack[-1]
        if top > 0:
            return top + self.min
        else:
            return self.min

    def getMin(self) -> int:
        return self.min
```

```java
public class MinStack {
    long min;
    Stack<Long> stack;

    public MinStack() {
        stack = new Stack<>();
    }
    
    public void push(int x) {
        if (stack.isEmpty()) {
            stack.push(0L);
            min = x;
        } else {
            stack.push(x - min);
            if (x < min) min = x;
        }
    }

    public void pop() {
        if (stack.isEmpty()) return;
        
        long pop = stack.pop();
        
        if (pop < 0) min = min - pop;
    }

    public int top() {
        long top = stack.peek();
        if (top > 0) {
            return (int) (top + min);
        } else {
            return (int) min;
        }
    }

    public int getMin() {
        return (int) min;
    }
}
```

```cpp
class MinStack {
private:
    long min;
    std::stack<long> stack;

public:
    MinStack() {
        
    }
    
    void push(int val) {
        if (stack.empty()) {
            stack.push(0);
            min = val;
        } else {
            stack.push(val - min);
            if (val < min) min = val;
        }
    }
    
    void pop() {
        if (stack.empty()) return;
        
        long pop = stack.top();
        stack.pop();
        
        if (pop < 0) min = min - pop;
    }
    
    int top() {
        long top = stack.top();
        return (top > 0) ? (top + min) : (int)min;
    }
    
    int getMin() {
        return (int)min;
    }
};
```

```javascript
class MinStack {
    constructor() {
        this.min = Infinity;
        this.stack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        if (this.stack.length === 0) {
            this.stack.push(0);
            this.min = val;
        } else {
            this.stack.push(val - this.min);
            if (val < this.min) this.min = val;
        }
    }

    /**
     * @return {void}
     */
    pop() {
        if (this.stack.length === 0) return;

        const pop = this.stack.pop();

        if (pop < 0) this.min -= pop;
    }

    /**
     * @return {number}
     */
    top() {
        const top = this.stack[this.stack.length - 1];
        return top > 0 ? top + this.min : this.min;
    }

    /**
     * @return {number}
     */
    getMin() {
        return this.min;
    }
}
```

```csharp
public class MinStack {
    private long min;
    private Stack<long> stack;

    public MinStack() {
        stack = new Stack<long>();
    }

    public void Push(int val) {
        if (stack.Count == 0) {
            stack.Push(0L);
            min = val;
        } else {
            stack.Push(val - min);
            if (val < min) min = val;
        }
    }

    public void Pop() {
        if (stack.Count == 0) return;

        long pop = stack.Pop();

        if (pop < 0) min -= pop;
    }

    public int Top() {
        long top = stack.Peek();
        return top > 0 ? (int)(top + min) : (int)(min);
    }

    public int GetMin() {
        return (int)min;
    }
}
```

```go
type MinStack struct {
    min   int
    stack []int
}

func Constructor() MinStack {
    return MinStack{
        min:   math.MaxInt64,
        stack: []int{},
    }
}

func (this *MinStack) Push(x int) {
    if len(this.stack) == 0 {
        this.stack = append(this.stack, 0)
        this.min = x
    } else {
        this.stack = append(this.stack, x - this.min)
        if x < this.min {
            this.min = x
        }
    }
}

func (this *MinStack) Pop() {
    if len(this.stack) == 0 {
        return
    }
    pop := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    if pop < 0 {
        this.min = this.min - pop
    }
}

func (this *MinStack) Top() int {
    top := this.stack[len(this.stack)-1]
    if top > 0 {
        return top + this.min
    }
    return this.min
}

func (this *MinStack) GetMin() int {
    return this.min
}
```

```kotlin
class MinStack() {
    private var min: Long = Long.MAX_VALUE
    private val stack = ArrayDeque<Long>()

    fun push(x: Int) {
        val valAsLong = x.toLong()
        if (stack.isEmpty()) {
            stack.addLast(0L)
            min = valAsLong
        } else {
            stack.addLast(valAsLong - min)
            if (valAsLong < min) {
                min = valAsLong
            }
        }
    }

    fun pop() {
        if (stack.isEmpty()) return
        val pop = stack.removeLast()
        if (pop < 0) {
            min -= pop
        }
    }

    fun top(): Int {
        val top = stack.last()
        return if (top > 0) (top + min).toInt() else min.toInt()
    }

    fun getMin(): Int {
        return min.toInt()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for all operations.
* Space complexity: $O(n)$