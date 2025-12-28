## 1. Two Balanced Trees

::tabs-start

```python
from sortedcontainers import SortedList

class MaxStack:

    def __init__(self):
        self.stack = SortedList()
        self.values = SortedList()
        self.cnt = 0

    def push(self, x: int) -> None:
        self.stack.add((self.cnt, x))
        self.values.add((x, self.cnt))
        self.cnt += 1

    def pop(self) -> int:
        idx, val = self.stack.pop()
        self.values.remove((val, idx))
        return val

    def top(self) -> int:
        return self.stack[-1][1]

    def peekMax(self) -> int:
        return self.values[-1][0]

    def popMax(self) -> int:
        val, idx = self.values.pop()
        self.stack.remove((idx, val))
        return val
```

```java
class MaxStack {

    private TreeSet<int[]> stack;
    private TreeSet<int[]> values;
    private int cnt;

    public MaxStack() {
        Comparator<int[]> comp = (a, b) -> {
            return a[0] == b[0] ? a[1] - b[1] : a[0] - b[0];
        };
        stack = new TreeSet<>(comp);
        values = new TreeSet<>(comp);
        cnt = 0;
    }

    public void push(int x) {
        stack.add(new int[] { cnt, x });
        values.add(new int[] { x, cnt });
        cnt++;
    }

    public int pop() {
        int[] pair = stack.pollLast();
        values.remove(new int[] { pair[1], pair[0] });
        return pair[1];
    }

    public int top() {
        return stack.last()[1];
    }

    public int peekMax() {
        return values.last()[0];
    }

    public int popMax() {
        int[] pair = values.pollLast();
        stack.remove(new int[] { pair[1], pair[0] });
        return pair[0];
    }
}
```

```cpp
class MaxStack {
private:
    set<pair<int, int>> stack;
    set<pair<int, int>> values;
    int cnt;

public:
    MaxStack() { cnt = 0; }

    void push(int x) {
        stack.insert({cnt, x});
        values.insert({x, cnt});
        cnt++;
    }

    int pop() {
        pair<int, int> p = *stack.rbegin();
        stack.erase(p);
        values.erase({p.second, p.first});
        return p.second;
    }

    int top() { return stack.rbegin()->second; }

    int peekMax() { return values.rbegin()->first; }

    int popMax() {
        pair<int, int> p = *values.rbegin();
        values.erase(p);
        stack.erase({p.second, p.first});
        return p.first;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time Complexity: $O(\log N)$ for each operation except for initialization. All operations other than initialization involve finding/inserting/removing elements in a balanced tree once or twice. In general, the upper bound of time complexity for each of them is $O(\log N)$. However, note that `top` and `peekMax` operations, which require only the last element in a balanced tree, can be done in $O(1)$ with `set::rbegin()` in C++ and special handling on the last element of `SortedList` in Python. However, `last` for `TreeSet` in Java hasn't implemented similar optimization yet, so we have to get the last element in $O(\log N)$.

- Space complexity: $O(N)$ the maximum size of the two balanced trees.

>  Where $N$ is the number of elements to add to the stack.

---

## 2. Heap + Lazy Update

::tabs-start

```python
class MaxStack:

    def __init__(self):
        self.heap = []
        self.cnt = 0
        self.stack = []
        self.removed = set()

    def push(self, x: int) -> None:
        heapq.heappush(self.heap, (-x, -self.cnt))
        self.stack.append((x, self.cnt))
        self.cnt += 1

    def pop(self) -> int:
        while self.stack and self.stack[-1][1] in self.removed:
            self.stack.pop()

        num, idx = self.stack.pop()
        self.removed.add(idx)

        return num

    def top(self) -> int:
        while self.stack and self.stack[-1][1] in self.removed:
            self.stack.pop()

        return self.stack[-1][0]

    def peekMax(self) -> int:
        while self.heap and -self.heap[0][1] in self.removed:
            heapq.heappop(self.heap)

        return -self.heap[0][0]

    def popMax(self) -> int:
        while self.heap and -self.heap[0][1] in self.removed:
            heapq.heappop(self.heap)
            
        num, idx = heapq.heappop(self.heap)
        self.removed.add(-idx)

        return -num
```

```java
class MaxStack {
    
    private Stack<int[]> stack;
    private Queue<int[]> heap;
    private Set<Integer> removed;
    private int cnt;

    public MaxStack() {
        stack = new Stack<>();
        heap = new PriorityQueue<>((a, b) -> b[0] - a[0] == 0 ? b[1] - a[1] : b[0] - a[0]);
        removed = new HashSet<>();
    }

    public void push(int x) {
        stack.add(new int[] { x, cnt });
        heap.add(new int[] { x, cnt });
        cnt++;
    }

    public int pop() {
        while (removed.contains(stack.peek()[1])) {
            stack.pop();
        }

        int[] top = stack.pop();
        removed.add(top[1]);

        return top[0];
    }

    public int top() {
        while (removed.contains(stack.peek()[1])) {
            stack.pop();
        }

        return stack.peek()[0];
    }

    public int peekMax() {
        while (removed.contains(heap.peek()[1])) {
            heap.poll();
        }

        return heap.peek()[0];

    }

    public int popMax() {
        while (removed.contains(heap.peek()[1])) {
            heap.poll();
        }

        int[] top = heap.poll();
        removed.add(top[1]);

        return top[0];
    }
}
```

```cpp
class MaxStack {
private:
    stack<pair<int, int>> stk;
    priority_queue<pair<int, int>> heap;
    unordered_set<int> removed;
    int cnt;

public:
    MaxStack() { cnt = 0; }

    void push(int x) {
        stk.push({x, cnt});
        heap.push({x, cnt});
        cnt++;
    }

    int pop() {
        while (removed.count(stk.top().second)) {
            stk.pop();
        }

        const pair<int, int> p = stk.top();
        stk.pop();
        removed.insert(p.second);

        return p.first;
    }

    int top() {
        while (removed.count(stk.top().second)) {
            stk.pop();
        }

        return stk.top().first;
    }

    int peekMax() {
        while (removed.count(heap.top().second)) {
            heap.pop();
        }

        return heap.top().first;
    }

    int popMax() {
        while (removed.count(heap.top().second)) {
            heap.pop();
        }

        const pair<int, int> p = heap.top();
        heap.pop();
        removed.insert(p.second);
        
        return p.first;
    }
};
```

```javascript
class MaxStack {
    constructor() {
        this.stack = [];
        
        // Using @datastructures-js/priority-queue
        this.heap = new PriorityQueue((a, b) => {
            if (b[0] !== a[0]) {
                return b[0] - a[0];
            }
            return b[1] - a[1];
        });
        
        this.removed = new Set();
        this.cnt = 0;
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        const element = [x, this.cnt];
        
        this.stack.push(element);
        this.heap.enqueue(element);
        
        this.cnt++;
    }

    /**
     * @return {number}
     */
    pop() {
        while (this.removed.has(this.stack[this.stack.length - 1][1])) {
            this.stack.pop();
        }
        
        const top = this.stack.pop();
        this.removed.add(top[1]);
        
        return top[0];
    }

    /**
     * @return {number}
     */
    top() {
        while (this.removed.has(this.stack[this.stack.length - 1][1])) {
            this.stack.pop();
        }
        
        return this.stack[this.stack.length - 1][0];
    }

    /**
     * @return {number}
     */
    peekMax() {
        while (this.removed.has(this.heap.front()[1])) {
            this.heap.dequeue();
        }
        
        return this.heap.front()[0];
    }

    /**
     * @return {number}
     */
    popMax() {
        while (this.removed.has(this.heap.front()[1])) {
            this.heap.dequeue();
        }
        
        const top = this.heap.dequeue();
        this.removed.add(top[1]);
        
        return top[0];
    }
}
```

::tabs-end

### Time & Space Complexity

- Time Complexity:
    - `push`: $O(\log N)$. It costs $O(\log N)$ to add an element to the `heap` and $O(1)$ to add it to the `stack`.
    - The amortized time complexity of operations caused by a single `pop` / `popMax` call is $O(\log N)$. For a `pop` call, we first remove the last element in the `stack` and add its ID to `removed` in $O(1)$, resulting in the deletion of the top element in the `heap` in the future (when `peekMax` or `popMax` is called), which has a time complexity of $O(\log N)$. Similarly, `popMax` needs $O(\log N)$ immediately and $O(1)$ for the operations later. Note that because we lazy-update the two data structures, future operations might never happen in some cases. However, even in the worst cases, the upper bound of the amortized time complexity is still only $O(\log N)$.
    - `top`: $O(1)$, excluding the time cost related to `popMax` calls we discussed above.
    - `peekMax`: $O(1)$, excluding the time cost related to `pop` calls we discussed above.

- Space Complexity: $O(N)$, the maximum size of the `heap`, `stack`, and `removed`.

>  Where $N$ is the number of elements to add to the stack.
