## 1. Two Balanced Trees

### Intuition

A regular stack gives us O(1) access to the top element, but finding or removing the maximum requires scanning. To support efficient `peekMax` and `popMax`, we maintain two balanced trees (or sorted sets). One tree orders elements by their insertion index (simulating stack order), while the other orders by value (for quick max access). Each element is stored as a pair of `(index, value)`. When we pop or `popMax`, we remove from both structures to keep them synchronized.

### Algorithm

1. Maintain two balanced trees: `stack` keyed by insertion count, and `values` keyed by value.
2. **push(x)**: Insert `(cnt, x)` into `stack` and `(x, cnt)` into `values`. Increment `cnt`.
3. **pop()**: Remove the last element from `stack` (highest index), then remove the corresponding entry from `values`. Return the value.
4. **top()**: Return the value of the last element in `stack`.
5. **peekMax()**: Return the value of the last element in `values` (highest value).
6. **popMax()**: Remove the last element from `values`, then remove the corresponding entry from `stack`. Return the value.

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

```javascript
class MaxStack {
    constructor() {
        // Using balanced BST via sorted array simulation
        this.stack = []; // [cnt, x]
        this.values = []; // [x, cnt]
        this.cnt = 0;
    }

    _insertSorted(arr, item, compareFn) {
        let low = 0, high = arr.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (compareFn(arr[mid], item) < 0) low = mid + 1;
            else high = mid;
        }
        arr.splice(low, 0, item);
    }

    _removeSorted(arr, item, compareFn) {
        let low = 0, high = arr.length;
        while (low < high) {
            const mid = (low + high) >> 1;
            if (compareFn(arr[mid], item) < 0) low = mid + 1;
            else high = mid;
        }
        if (low < arr.length && compareFn(arr[low], item) === 0) {
            arr.splice(low, 1);
        }
    }

    /**
     * @param {number} x
     * @return {void}
     */
    push(x) {
        const compStack = (a, b) => a[0] - b[0] || a[1] - b[1];
        const compValues = (a, b) => a[0] - b[0] || a[1] - b[1];
        this._insertSorted(this.stack, [this.cnt, x], compStack);
        this._insertSorted(this.values, [x, this.cnt], compValues);
        this.cnt++;
    }

    /**
     * @return {number}
     */
    pop() {
        const compValues = (a, b) => a[0] - b[0] || a[1] - b[1];
        const [idx, val] = this.stack.pop();
        this._removeSorted(this.values, [val, idx], compValues);
        return val;
    }

    /**
     * @return {number}
     */
    top() {
        return this.stack[this.stack.length - 1][1];
    }

    /**
     * @return {number}
     */
    peekMax() {
        return this.values[this.values.length - 1][0];
    }

    /**
     * @return {number}
     */
    popMax() {
        const compStack = (a, b) => a[0] - b[0] || a[1] - b[1];
        const [val, idx] = this.values.pop();
        this._removeSorted(this.stack, [idx, val], compStack);
        return val;
    }
}
```

```csharp
public class MaxStack {
    private SortedSet<(int cnt, int val)> stack;
    private SortedSet<(int val, int cnt)> values;
    private int cnt;

    public MaxStack() {
        stack = new SortedSet<(int cnt, int val)>();
        values = new SortedSet<(int val, int cnt)>();
        cnt = 0;
    }

    public void Push(int x) {
        stack.Add((cnt, x));
        values.Add((x, cnt));
        cnt++;
    }

    public int Pop() {
        var p = stack.Max;
        stack.Remove(p);
        values.Remove((p.val, p.cnt));
        return p.val;
    }

    public int Top() {
        return stack.Max.val;
    }

    public int PeekMax() {
        return values.Max.val;
    }

    public int PopMax() {
        var p = values.Max;
        values.Remove(p);
        stack.Remove((p.cnt, p.val));
        return p.val;
    }
}
```

```go
type MaxStack struct {
    stack  [][2]int // [cnt, x]
    values [][2]int // [x, cnt]
    cnt    int
}

func Constructor() MaxStack {
    return MaxStack{
        stack:  make([][2]int, 0),
        values: make([][2]int, 0),
        cnt:    0,
    }
}

func (this *MaxStack) insertStack(item [2]int) {
    i := sort.Search(len(this.stack), func(i int) bool {
        if this.stack[i][0] != item[0] {
            return this.stack[i][0] >= item[0]
        }
        return this.stack[i][1] >= item[1]
    })
    this.stack = append(this.stack, [2]int{})
    copy(this.stack[i+1:], this.stack[i:])
    this.stack[i] = item
}

func (this *MaxStack) insertValues(item [2]int) {
    i := sort.Search(len(this.values), func(i int) bool {
        if this.values[i][0] != item[0] {
            return this.values[i][0] >= item[0]
        }
        return this.values[i][1] >= item[1]
    })
    this.values = append(this.values, [2]int{})
    copy(this.values[i+1:], this.values[i:])
    this.values[i] = item
}

func (this *MaxStack) removeStack(item [2]int) {
    i := sort.Search(len(this.stack), func(i int) bool {
        if this.stack[i][0] != item[0] {
            return this.stack[i][0] >= item[0]
        }
        return this.stack[i][1] >= item[1]
    })
    if i < len(this.stack) && this.stack[i] == item {
        this.stack = append(this.stack[:i], this.stack[i+1:]...)
    }
}

func (this *MaxStack) removeValues(item [2]int) {
    i := sort.Search(len(this.values), func(i int) bool {
        if this.values[i][0] != item[0] {
            return this.values[i][0] >= item[0]
        }
        return this.values[i][1] >= item[1]
    })
    if i < len(this.values) && this.values[i] == item {
        this.values = append(this.values[:i], this.values[i+1:]...)
    }
}

func (this *MaxStack) Push(x int) {
    this.insertStack([2]int{this.cnt, x})
    this.insertValues([2]int{x, this.cnt})
    this.cnt++
}

func (this *MaxStack) Pop() int {
    p := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    this.removeValues([2]int{p[1], p[0]})
    return p[1]
}

func (this *MaxStack) Top() int {
    return this.stack[len(this.stack)-1][1]
}

func (this *MaxStack) PeekMax() int {
    return this.values[len(this.values)-1][0]
}

func (this *MaxStack) PopMax() int {
    p := this.values[len(this.values)-1]
    this.values = this.values[:len(this.values)-1]
    this.removeStack([2]int{p[1], p[0]})
    return p[0]
}
```

```kotlin
import java.util.TreeSet

class MaxStack {
    private val stack = TreeSet<IntArray>(compareBy({ it[0] }, { it[1] }))
    private val values = TreeSet<IntArray>(compareBy({ it[0] }, { it[1] }))
    private var cnt = 0

    fun push(x: Int) {
        stack.add(intArrayOf(cnt, x))
        values.add(intArrayOf(x, cnt))
        cnt++
    }

    fun pop(): Int {
        val p = stack.last()
        stack.remove(p)
        values.remove(intArrayOf(p[1], p[0]))
        return p[1]
    }

    fun top(): Int {
        return stack.last()[1]
    }

    fun peekMax(): Int {
        return values.last()[0]
    }

    fun popMax(): Int {
        val p = values.last()
        values.remove(p)
        stack.remove(intArrayOf(p[1], p[0]))
        return p[0]
    }
}
```

```swift
class MaxStack {
    private var stack: [[Int]] = []  // [cnt, x]
    private var values: [[Int]] = [] // [x, cnt]
    private var cnt = 0

    init() {}

    private func insertSorted(_ arr: inout [[Int]], _ item: [Int], _ compare: ([Int], [Int]) -> Bool) {
        var low = 0, high = arr.count
        while low < high {
            let mid = (low + high) / 2
            if compare(arr[mid], item) {
                low = mid + 1
            } else {
                high = mid
            }
        }
        arr.insert(item, at: low)
    }

    private func removeSorted(_ arr: inout [[Int]], _ item: [Int], _ compare: ([Int], [Int]) -> Int) {
        var low = 0, high = arr.count
        while low < high {
            let mid = (low + high) / 2
            if compare(arr[mid], item) < 0 {
                low = mid + 1
            } else {
                high = mid
            }
        }
        if low < arr.count && compare(arr[low], item) == 0 {
            arr.remove(at: low)
        }
    }

    func push(_ x: Int) {
        let stackCompare: ([Int], [Int]) -> Bool = { a, b in
            if a[0] != b[0] { return a[0] < b[0] }
            return a[1] < b[1]
        }
        let valuesCompare: ([Int], [Int]) -> Bool = { a, b in
            if a[0] != b[0] { return a[0] < b[0] }
            return a[1] < b[1]
        }
        insertSorted(&stack, [cnt, x], stackCompare)
        insertSorted(&values, [x, cnt], valuesCompare)
        cnt += 1
    }

    func pop() -> Int {
        let p = stack.removeLast()
        let valuesCompareInt: ([Int], [Int]) -> Int = { a, b in
            if a[0] != b[0] { return a[0] - b[0] }
            return a[1] - b[1]
        }
        removeSorted(&values, [p[1], p[0]], valuesCompareInt)
        return p[1]
    }

    func top() -> Int {
        return stack[stack.count - 1][1]
    }

    func peekMax() -> Int {
        return values[values.count - 1][0]
    }

    func popMax() -> Int {
        let p = values.removeLast()
        let stackCompareInt: ([Int], [Int]) -> Int = { a, b in
            if a[0] != b[0] { return a[0] - b[0] }
            return a[1] - b[1]
        }
        removeSorted(&stack, [p[1], p[0]], stackCompareInt)
        return p[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time Complexity: $O(\log N)$ for each operation except for initialization. All operations other than initialization involve finding/inserting/removing elements in a balanced tree once or twice. In general, the upper bound of time complexity for each of them is $O(\log N)$. However, note that `top` and `peekMax` operations, which require only the last element in a balanced tree, can be done in $O(1)$ with `set::rbegin()` in C++ and special handling on the last element of `SortedList` in Python. However, `last` for `TreeSet` in Java hasn't implemented similar optimization yet, so we have to get the last element in $O(\log N)$.

- Space complexity: $O(N)$ the maximum size of the two balanced trees.

>  Where $N$ is the number of elements to add to the stack.

---

## 2. Heap + Lazy Update

### Intuition

We can use a standard stack for regular push/pop/top operations and a max heap to quickly find the maximum. The challenge is that removing an element from one structure does not automatically remove it from the other. We solve this with lazy deletion: when we remove an element, we record its index in a `removed` set. Before accessing the top of the `stack` or `heap`, we skip over any elements that have been marked as removed. This defers the actual cleanup until it is needed.

### Algorithm

1. Maintain a `stack` for LIFO access, a max `heap` for maximum access, and a `removed` set for tracking deleted indices.
2. **push(x)**: Add `(x, cnt)` to both `stack` and `heap`. Increment `cnt`.
3. **pop()**: Skip elements at the top of `stack` that are in `removed`. Pop the top element, add its index to `removed`, and return the value.
4. **top()**: Skip `removed` elements at the top of `stack`, then return the top value.
5. **peekMax()**: Skip `removed` elements at the top of `heap`, then return the top value.
6. **popMax()**: Skip `removed` elements at the top of `heap`. Pop the top, add its index to `removed`, and return the value.

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

```csharp
public class MaxStack {
    private Stack<int[]> stack;
    private PriorityQueue<int[], int[]> heap;
    private HashSet<int> removed;
    private int cnt;

    public MaxStack() {
        stack = new Stack<int[]>();
        heap = new PriorityQueue<int[], int[]>(
            Comparer<int[]>.Create((a, b) => b[0] != a[0] ? b[0] - a[0] : b[1] - a[1])
        );
        removed = new HashSet<int>();
        cnt = 0;
    }

    public void Push(int x) {
        var element = new int[] { x, cnt };
        stack.Push(element);
        heap.Enqueue(element, element);
        cnt++;
    }

    public int Pop() {
        while (removed.Contains(stack.Peek()[1])) {
            stack.Pop();
        }
        var top = stack.Pop();
        removed.Add(top[1]);
        return top[0];
    }

    public int Top() {
        while (removed.Contains(stack.Peek()[1])) {
            stack.Pop();
        }
        return stack.Peek()[0];
    }

    public int PeekMax() {
        while (removed.Contains(heap.Peek()[1])) {
            heap.Dequeue();
        }
        return heap.Peek()[0];
    }

    public int PopMax() {
        while (removed.Contains(heap.Peek()[1])) {
            heap.Dequeue();
        }
        var top = heap.Dequeue();
        removed.Add(top[1]);
        return top[0];
    }
}
```

```go
import (
    "container/heap"
)

type MaxHeap [][2]int

func (h MaxHeap) Len() int { return len(h) }
func (h MaxHeap) Less(i, j int) bool {
    if h[i][0] != h[j][0] {
        return h[i][0] > h[j][0]
    }
    return h[i][1] > h[j][1]
}
func (h MaxHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.([2]int)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type MaxStack struct {
    stack   [][2]int
    heap    *MaxHeap
    removed map[int]bool
    cnt     int
}

func Constructor() MaxStack {
    h := &MaxHeap{}
    heap.Init(h)
    return MaxStack{
        stack:   make([][2]int, 0),
        heap:    h,
        removed: make(map[int]bool),
        cnt:     0,
    }
}

func (this *MaxStack) Push(x int) {
    element := [2]int{x, this.cnt}
    this.stack = append(this.stack, element)
    heap.Push(this.heap, element)
    this.cnt++
}

func (this *MaxStack) Pop() int {
    for this.removed[this.stack[len(this.stack)-1][1]] {
        this.stack = this.stack[:len(this.stack)-1]
    }
    top := this.stack[len(this.stack)-1]
    this.stack = this.stack[:len(this.stack)-1]
    this.removed[top[1]] = true
    return top[0]
}

func (this *MaxStack) Top() int {
    for this.removed[this.stack[len(this.stack)-1][1]] {
        this.stack = this.stack[:len(this.stack)-1]
    }
    return this.stack[len(this.stack)-1][0]
}

func (this *MaxStack) PeekMax() int {
    for this.removed[(*this.heap)[0][1]] {
        heap.Pop(this.heap)
    }
    return (*this.heap)[0][0]
}

func (this *MaxStack) PopMax() int {
    for this.removed[(*this.heap)[0][1]] {
        heap.Pop(this.heap)
    }
    top := heap.Pop(this.heap).([2]int)
    this.removed[top[1]] = true
    return top[0]
}
```

```kotlin
import java.util.PriorityQueue
import java.util.Stack

class MaxStack {
    private val stack = Stack<IntArray>()
    private val heap = PriorityQueue<IntArray> { a, b ->
        if (b[0] != a[0]) b[0] - a[0] else b[1] - a[1]
    }
    private val removed = HashSet<Int>()
    private var cnt = 0

    fun push(x: Int) {
        val element = intArrayOf(x, cnt)
        stack.push(element)
        heap.add(element)
        cnt++
    }

    fun pop(): Int {
        while (removed.contains(stack.peek()[1])) {
            stack.pop()
        }
        val top = stack.pop()
        removed.add(top[1])
        return top[0]
    }

    fun top(): Int {
        while (removed.contains(stack.peek()[1])) {
            stack.pop()
        }
        return stack.peek()[0]
    }

    fun peekMax(): Int {
        while (removed.contains(heap.peek()[1])) {
            heap.poll()
        }
        return heap.peek()[0]
    }

    fun popMax(): Int {
        while (removed.contains(heap.peek()[1])) {
            heap.poll()
        }
        val top = heap.poll()
        removed.add(top[1])
        return top[0]
    }
}
```

```swift
class MaxStack {
    private var stack: [[Int]] = []
    private var heap: [[Int]] = [] // Max heap based on [value, cnt]
    private var removed = Set<Int>()
    private var cnt = 0

    init() {}

    private func heapifyUp(_ index: Int) {
        var i = index
        while i > 0 {
            let parent = (i - 1) / 2
            if compare(heap[i], heap[parent]) > 0 {
                heap.swapAt(i, parent)
                i = parent
            } else {
                break
            }
        }
    }

    private func heapifyDown(_ index: Int) {
        var i = index
        while true {
            let left = 2 * i + 1
            let right = 2 * i + 2
            var largest = i
            if left < heap.count && compare(heap[left], heap[largest]) > 0 {
                largest = left
            }
            if right < heap.count && compare(heap[right], heap[largest]) > 0 {
                largest = right
            }
            if largest != i {
                heap.swapAt(i, largest)
                i = largest
            } else {
                break
            }
        }
    }

    private func compare(_ a: [Int], _ b: [Int]) -> Int {
        if a[0] != b[0] { return a[0] - b[0] }
        return a[1] - b[1]
    }

    private func heapPush(_ element: [Int]) {
        heap.append(element)
        heapifyUp(heap.count - 1)
    }

    private func heapPop() -> [Int] {
        let top = heap[0]
        heap[0] = heap[heap.count - 1]
        heap.removeLast()
        if !heap.isEmpty {
            heapifyDown(0)
        }
        return top
    }

    func push(_ x: Int) {
        let element = [x, cnt]
        stack.append(element)
        heapPush(element)
        cnt += 1
    }

    func pop() -> Int {
        while removed.contains(stack[stack.count - 1][1]) {
            stack.removeLast()
        }
        let top = stack.removeLast()
        removed.insert(top[1])
        return top[0]
    }

    func top() -> Int {
        while removed.contains(stack[stack.count - 1][1]) {
            stack.removeLast()
        }
        return stack[stack.count - 1][0]
    }

    func peekMax() -> Int {
        while removed.contains(heap[0][1]) {
            _ = heapPop()
        }
        return heap[0][0]
    }

    func popMax() -> Int {
        while removed.contains(heap[0][1]) {
            _ = heapPop()
        }
        let top = heapPop()
        removed.insert(top[1])
        return top[0]
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
