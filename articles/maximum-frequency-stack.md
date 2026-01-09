## 1. Brute Force

### Intuition

The most straightforward approach is to maintain a regular stack along with a frequency count for each element. When we need to pop, we find the maximum frequency among all elements, then scan backwards through the stack to find the most recent element with that frequency. While simple to understand, this requires scanning the entire stack on every pop operation.

### Algorithm

1. Initialize a hash map `cnt` to track the frequency of each element and a list `stack` to store pushed elements.
2. For `push(val)`: append the value to the stack and increment its count in the hash map.
3. For `pop()`: find the maximum frequency across all elements, then iterate from the end of the stack to find the first element with that frequency. Remove it from the stack, decrement its count, and return it.

::tabs-start

```python
class FreqStack:

    def __init__(self):
        self.cnt = defaultdict(int)
        self.stack = []

    def push(self, val: int) -> None:
        self.stack.append(val)
        self.cnt[val] += 1

    def pop(self) -> int:
        maxCnt = max(self.cnt.values())
        i = len(self.stack) - 1
        while self.cnt[self.stack[i]] != maxCnt:
            i -= 1
        self.cnt[self.stack[i]] -= 1
        return self.stack.pop(i)
```

```java
public class FreqStack {
    private Map<Integer, Integer> cnt;
    private List<Integer> stack;

    public FreqStack() {
        cnt = new HashMap<>();
        stack = new ArrayList<>();
    }

    public void push(int val) {
        stack.add(val);
        cnt.put(val, cnt.getOrDefault(val, 0) + 1);
    }

    public int pop() {
        int maxCnt = Collections.max(cnt.values());
        int i = stack.size() - 1;
        while (cnt.get(stack.get(i)) != maxCnt) {
            i--;
        }
        int val = stack.remove(i);
        cnt.put(val, cnt.get(val) - 1);
        return val;
    }
}
```

```cpp
class FreqStack {
private:
    unordered_map<int, int> cnt;
    vector<int> stack;

public:
    FreqStack() {}

    void push(int val) {
        stack.push_back(val);
        cnt[val]++;
    }

    int pop() {
        int maxCnt = 0;
        for (auto& [_, frequency] : cnt) {
            maxCnt = max(maxCnt, frequency);
        }
        int i = stack.size() - 1;
        while (cnt[stack[i]] != maxCnt) {
            i--;
        }
        int val = stack[i];
        stack.erase(stack.begin() + i);
        cnt[val]--;
        return val;
    }
};
```

```javascript
class FreqStack {
    constructor() {
        this.cnt = new Map();
        this.stack = [];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.stack.push(val);
        this.cnt.set(val, (this.cnt.get(val) || 0) + 1);
    }

    /**
     * @return {number}
     */
    pop() {
        const maxCnt = Math.max(...this.cnt.values());
        let i = this.stack.length - 1;
        while (this.cnt.get(this.stack[i]) !== maxCnt) {
            i--;
        }
        const val = this.stack.splice(i, 1)[0];
        this.cnt.set(val, this.cnt.get(val) - 1);
        return val;
    }
}
```

```csharp
public class FreqStack {
    private Dictionary<int, int> cnt;
    private List<int> stack;

    public FreqStack() {
        cnt = new Dictionary<int, int>();
        stack = new List<int>();
    }

    public void Push(int val) {
        stack.Add(val);
        if (!cnt.ContainsKey(val)) {
            cnt[val] = 0;
        }
        cnt[val]++;
    }

    public int Pop() {
        int maxCnt = 0;
        foreach (var kvp in cnt) {
            maxCnt = Math.Max(maxCnt, kvp.Value);
        }

        for (int i = stack.Count - 1; i >= 0; i--) {
            int val = stack[i];
            if (cnt[val] == maxCnt) {
                cnt[val]--;
                stack.RemoveAt(i);
                return val;
            }
        }

        return -1;
    }
}
```

```go
type FreqStack struct {
    cnt   map[int]int
    stack []int
}

func Constructor() FreqStack {
    return FreqStack{
        cnt:   make(map[int]int),
        stack: []int{},
    }
}

func (this *FreqStack) Push(val int) {
    this.stack = append(this.stack, val)
    this.cnt[val]++
}

func (this *FreqStack) Pop() int {
    maxCnt := 0
    for _, freq := range this.cnt {
        if freq > maxCnt {
            maxCnt = freq
        }
    }
    for i := len(this.stack) - 1; i >= 0; i-- {
        val := this.stack[i]
        if this.cnt[val] == maxCnt {
            this.cnt[val]--
            this.stack = append(this.stack[:i], this.stack[i+1:]...)
            return val
        }
    }
    return -1
}
```

```kotlin
class FreqStack() {
    private val cnt = mutableMapOf<Int, Int>()
    private val stack = mutableListOf<Int>()

    fun push(`val`: Int) {
        stack.add(`val`)
        cnt[`val`] = cnt.getOrDefault(`val`, 0) + 1
    }

    fun pop(): Int {
        val maxCnt = cnt.values.maxOrNull() ?: 0
        for (i in stack.lastIndex downTo 0) {
            val v = stack[i]
            if (cnt[v] == maxCnt) {
                cnt[v] = cnt[v]!! - 1
                stack.removeAt(i)
                return v
            }
        }
        return -1
    }
}
```

```swift
class FreqStack {
    private var cnt: [Int: Int]
    private var stack: [Int]

    init() {
        cnt = [:]
        stack = []
    }

    func push(_ val: Int) {
        stack.append(val)
        cnt[val, default: 0] += 1
    }

    func pop() -> Int {
        let maxCnt = cnt.values.max() ?? 0
        for i in stride(from: stack.count - 1, through: 0, by: -1) {
            let val = stack[i]
            if cnt[val] == maxCnt {
                cnt[val]! -= 1
                stack.remove(at: i)
                return val
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(n)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 2. Heap

### Intuition

We can use a max-heap to efficiently retrieve the element that should be popped next. Each heap entry stores three pieces of information: the element's frequency, its insertion order (index), and the value itself. By prioritizing higher frequencies and then more recent insertions, the heap always gives us the correct element to pop in logarithmic time.

### Algorithm

1. Initialize a max-heap, a frequency hash map `cnt`, and an `index` counter starting at 0.
2. For `push(val)`: increment the value's frequency, then push a tuple of `(frequency, index, val)` onto the heap. Increment the index counter.
3. For `pop()`: pop the top element from the heap (which has the highest frequency and most recent index among ties), decrement that value's frequency, and return the value.

::tabs-start

```python
class FreqStack:

    def __init__(self):
        self.heap = []
        self.cnt = defaultdict(int)
        self.index = 0

    def push(self, val: int) -> None:
        self.cnt[val] += 1
        heapq.heappush(self.heap, (-self.cnt[val], -self.index, val))
        self.index += 1

    def pop(self) -> int:
        _, _, val = heapq.heappop(self.heap)
        self.cnt[val] -= 1
        return val
```

```java
public class FreqStack {
    private PriorityQueue<int[]> heap;
    private Map<Integer, Integer> cnt;
    private int index;

    public FreqStack() {
        heap = new PriorityQueue<>((a, b) ->
            a[0] != b[0] ? Integer.compare(b[0], a[0]) : Integer.compare(b[1], a[1])
        );
        cnt = new HashMap<>();
        index = 0;
    }

    public void push(int val) {
        cnt.put(val, cnt.getOrDefault(val, 0) + 1);
        heap.offer(new int[]{cnt.get(val), index++, val});
    }

    public int pop() {
        int[] top = heap.poll();
        int val = top[2];
        cnt.put(val, cnt.get(val) - 1);
        return val;
    }
}
```

```cpp
class FreqStack {
private:
    priority_queue<vector<int>> heap; // {frequency, index, value}
    unordered_map<int, int> cnt;
    int index;

public:
    FreqStack() : index(0) {}

    void push(int val) {
        cnt[val]++;
        heap.push({cnt[val], index++, val});
    }

    int pop() {
        auto top = heap.top();
        heap.pop();
        int val = top[2];
        cnt[val]--;
        return val;
    }
};
```

```javascript
class FreqStack {
    constructor() {
        this.heap = new MaxPriorityQueue({
            priority: (element) => element[0] * 100000 + element[1],
        });
        this.cnt = new Map();
        this.index = 0;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        this.cnt.set(val, (this.cnt.get(val) || 0) + 1);
        this.heap.enqueue([this.cnt.get(val), this.index++, val]);
    }

    /**
     * @return {number}
     */
    pop() {
        const [, , val] = this.heap.dequeue().element;
        this.cnt.set(val, this.cnt.get(val) - 1);
        return val;
    }
}
```

```csharp
public class FreqStack {
    private class Entry : IComparable<Entry> {
        public int Freq { get; }
        public int Index { get; }
        public int Value { get; }

        public Entry(int freq, int index, int value) {
            Freq = freq;
            Index = index;
            Value = value;
        }

        public int CompareTo(Entry other) {
            if (Freq != other.Freq)
                return other.Freq.CompareTo(Freq);
            return other.Index.CompareTo(Index);
        }
    }

    private Dictionary<int, int> cnt;
    private PriorityQueue<Entry, Entry> heap;
    private int index;

    public FreqStack() {
        cnt = new Dictionary<int, int>();
        heap = new PriorityQueue<Entry, Entry>();
        index = 0;
    }

    public void Push(int val) {
        if (!cnt.ContainsKey(val)) {
            cnt[val] = 0;
        }
        cnt[val]++;
        var entry = new Entry(cnt[val], index++, val);
        heap.Enqueue(entry, entry);
    }

    public int Pop() {
        var entry = heap.Dequeue();
        cnt[entry.Value]--;
        return entry.Value;
    }
}
```

```go
import "container/heap"

type Entry struct {
    freq  int
    index int
    val   int
}

type MaxHeap []Entry

func (h MaxHeap) Len() int { return len(h) }
func (h MaxHeap) Less(i, j int) bool {
    if h[i].freq != h[j].freq {
        return h[i].freq > h[j].freq
    }
    return h[i].index > h[j].index
}
func (h MaxHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(Entry)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

type FreqStack struct {
    cnt   map[int]int
    h     *MaxHeap
    index int
}

func Constructor() FreqStack {
    h := &MaxHeap{}
    heap.Init(h)
    return FreqStack{cnt: make(map[int]int), h: h, index: 0}
}

func (this *FreqStack) Push(val int) {
    this.cnt[val]++
    heap.Push(this.h, Entry{this.cnt[val], this.index, val})
    this.index++
}

func (this *FreqStack) Pop() int {
    entry := heap.Pop(this.h).(Entry)
    this.cnt[entry.val]--
    return entry.val
}
```

```kotlin
import java.util.PriorityQueue

class FreqStack() {
    private val cnt = mutableMapOf<Int, Int>()
    private val heap = PriorityQueue<IntArray> { a, b ->
        if (a[0] != b[0]) b[0] - a[0] else b[1] - a[1]
    }
    private var index = 0

    fun push(`val`: Int) {
        cnt[`val`] = cnt.getOrDefault(`val`, 0) + 1
        heap.offer(intArrayOf(cnt[`val`]!!, index++, `val`))
    }

    fun pop(): Int {
        val top = heap.poll()
        val v = top[2]
        cnt[v] = cnt[v]!! - 1
        return v
    }
}
```

```swift
class FreqStack {
    private var cnt: [Int: Int]
    private var heap: [(freq: Int, index: Int, val: Int)]
    private var index: Int

    init() {
        cnt = [:]
        heap = []
        index = 0
    }

    func push(_ val: Int) {
        cnt[val, default: 0] += 1
        heap.append((cnt[val]!, index, val))
        index += 1
        heap.sort { ($0.freq, $0.index) > ($1.freq, $1.index) }
    }

    func pop() -> Int {
        let top = heap.removeFirst()
        cnt[top.val]! -= 1
        return top.val
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(\log n)$ time for each $push()$ function call.
    - $O(\log n)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 3. Stack Of Stacks (Hash Map)

### Intuition

The key insight is that we can group elements by their frequency level. When an element is pushed for the first time, it goes into stack 1. When pushed again, it also goes into stack 2 (while remaining in stack 1). This way, the stack at the highest frequency level always contains the elements we should consider popping first, and the top of that stack is the most recently pushed among them.

### Algorithm

1. Initialize a frequency hash map `cnt`, a hash map `stacks` where each key is a frequency and each value is a stack, and a variable `maxCnt` to track the current maximum frequency.
2. For `push(val)`: increment the value's count. If this count exceeds `maxCnt`, update `maxCnt` and create a new stack for that frequency. Push the value onto the stack at its new frequency level.
3. For `pop()`: pop from the stack at `maxCnt`, decrement that value's frequency. If the stack at `maxCnt` becomes empty, decrement `maxCnt`. Return the popped value.

::tabs-start

```python
class FreqStack:

    def __init__(self):
        self.cnt = {}
        self.maxCnt = 0
        self.stacks = {}

    def push(self, val: int) -> None:
        valCnt = 1 + self.cnt.get(val, 0)
        self.cnt[val] = valCnt
        if valCnt > self.maxCnt:
            self.maxCnt = valCnt
            self.stacks[valCnt] = []
        self.stacks[valCnt].append(val)

    def pop(self) -> int:
        res = self.stacks[self.maxCnt].pop()
        self.cnt[res] -= 1
        if not self.stacks[self.maxCnt]:
            self.maxCnt -= 1
        return res
```

```java
class FreqStack {
    private Map<Integer, Integer> cnt;
    private Map<Integer, Stack<Integer>> stacks;
    private int maxCnt;

    public FreqStack() {
        cnt = new HashMap<>();
        stacks = new HashMap<>();
        maxCnt = 0;
    }

    public void push(int val) {
        int valCnt = cnt.getOrDefault(val, 0) + 1;
        cnt.put(val, valCnt);
        if (valCnt > maxCnt) {
            maxCnt = valCnt;
            stacks.putIfAbsent(valCnt, new Stack<>());
        }
        stacks.get(valCnt).push(val);
    }

    public int pop() {
        int res = stacks.get(maxCnt).pop();
        cnt.put(res, cnt.get(res) - 1);
        if (stacks.get(maxCnt).isEmpty()) {
            maxCnt--;
        }
        return res;
    }
}
```

```cpp
class FreqStack {
public:
    unordered_map<int, int> cnt;
    unordered_map<int, stack<int>> stacks;
    int maxCnt;

    FreqStack() {
        maxCnt = 0;
    }

    void push(int val) {
        int valCnt = ++cnt[val];
        if (valCnt > maxCnt) {
            maxCnt = valCnt;
            stacks[valCnt] = stack<int>();
        }
        stacks[valCnt].push(val);
    }

    int pop() {
        int res = stacks[maxCnt].top();
        stacks[maxCnt].pop();
        cnt[res]--;
        if (stacks[maxCnt].empty()) {
            maxCnt--;
        }
        return res;
    }
};
```

```javascript
class FreqStack {
    constructor() {
        this.cnt = new Map();
        this.stacks = new Map();
        this.maxCnt = 0;
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        const valCnt = (this.cnt.get(val) || 0) + 1;
        this.cnt.set(val, valCnt);
        if (valCnt > this.maxCnt) {
            this.maxCnt = valCnt;
            if (!this.stacks.has(valCnt)) {
                this.stacks.set(valCnt, []);
            }
        }
        this.stacks.get(valCnt).push(val);
    }

    /**
     * @return {number}
     */
    pop() {
        const res = this.stacks.get(this.maxCnt).pop();
        this.cnt.set(res, this.cnt.get(res) - 1);
        if (this.stacks.get(this.maxCnt).length === 0) {
            this.maxCnt--;
        }
        return res;
    }
}
```

```csharp
public class FreqStack {
    private Dictionary<int, int> cnt;
    private Dictionary<int, Stack<int>> stacks;
    private int maxCnt;

    public FreqStack() {
        cnt = new Dictionary<int, int>();
        stacks = new Dictionary<int, Stack<int>>();
        maxCnt = 0;
    }

    public void Push(int val) {
        int valCnt = cnt.ContainsKey(val) ? cnt[val] + 1 : 1;
        cnt[val] = valCnt;

        if (!stacks.ContainsKey(valCnt)) {
            stacks[valCnt] = new Stack<int>();
        }

        stacks[valCnt].Push(val);

        if (valCnt > maxCnt) {
            maxCnt = valCnt;
        }
    }

    public int Pop() {
        int res = stacks[maxCnt].Pop();
        cnt[res]--;

        if (stacks[maxCnt].Count == 0) {
            maxCnt--;
        }

        return res;
    }
}
```

```go
type FreqStack struct {
    cnt    map[int]int
    stacks map[int][]int
    maxCnt int
}

func Constructor() FreqStack {
    return FreqStack{
        cnt:    make(map[int]int),
        stacks: make(map[int][]int),
        maxCnt: 0,
    }
}

func (this *FreqStack) Push(val int) {
    this.cnt[val]++
    valCnt := this.cnt[val]
    if valCnt > this.maxCnt {
        this.maxCnt = valCnt
        this.stacks[valCnt] = []int{}
    }
    this.stacks[valCnt] = append(this.stacks[valCnt], val)
}

func (this *FreqStack) Pop() int {
    stack := this.stacks[this.maxCnt]
    res := stack[len(stack)-1]
    this.stacks[this.maxCnt] = stack[:len(stack)-1]
    this.cnt[res]--
    if len(this.stacks[this.maxCnt]) == 0 {
        this.maxCnt--
    }
    return res
}
```

```kotlin
class FreqStack() {
    private val cnt = mutableMapOf<Int, Int>()
    private val stacks = mutableMapOf<Int, ArrayDeque<Int>>()
    private var maxCnt = 0

    fun push(`val`: Int) {
        val valCnt = cnt.getOrDefault(`val`, 0) + 1
        cnt[`val`] = valCnt
        if (valCnt > maxCnt) {
            maxCnt = valCnt
            stacks[valCnt] = ArrayDeque()
        }
        stacks[valCnt]!!.addLast(`val`)
    }

    fun pop(): Int {
        val res = stacks[maxCnt]!!.removeLast()
        cnt[res] = cnt[res]!! - 1
        if (stacks[maxCnt]!!.isEmpty()) {
            maxCnt--
        }
        return res
    }
}
```

```swift
class FreqStack {
    private var cnt: [Int: Int]
    private var stacks: [Int: [Int]]
    private var maxCnt: Int

    init() {
        cnt = [:]
        stacks = [:]
        maxCnt = 0
    }

    func push(_ val: Int) {
        let valCnt = (cnt[val] ?? 0) + 1
        cnt[val] = valCnt
        if valCnt > maxCnt {
            maxCnt = valCnt
            stacks[valCnt] = []
        }
        stacks[valCnt]!.append(val)
    }

    func pop() -> Int {
        let res = stacks[maxCnt]!.removeLast()
        cnt[res]! -= 1
        if stacks[maxCnt]!.isEmpty {
            maxCnt -= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 4. Stack Of Stacks (Dynamic Array)

### Intuition

Instead of using a hash map for frequency-indexed stacks, we can use a dynamic array (list). The index in the array represents the frequency level. When an element reaches a new frequency, we extend the array if needed. The last non-empty stack in the array always corresponds to the maximum frequency, eliminating the need to track `maxCnt` separately.

### Algorithm

1. Initialize a frequency hash map `cnt` and a list `stacks` with an empty placeholder at index 0 (since frequencies start at 1).
2. For `push(val)`: increment the value's count. If this count equals the current length of `stacks`, append a new empty stack. Push the value onto the stack at index equal to its frequency.
3. For `pop()`: pop from the last stack in the list, decrement that value's frequency. If the last stack becomes empty, remove it from the list. Return the popped value.

::tabs-start

```python
class FreqStack:

    def __init__(self):
        self.cnt = {}
        self.stacks = [[]]

    def push(self, val: int) -> None:
        valCnt = 1 + self.cnt.get(val, 0)
        self.cnt[val] = valCnt
        if valCnt == len(self.stacks):
            self.stacks.append([])
        self.stacks[valCnt].append(val)

    def pop(self) -> int:
        res = self.stacks[-1].pop()
        self.cnt[res] -= 1
        if not self.stacks[-1]:
            self.stacks.pop()
        return res
```

```java
public class FreqStack {
    private Map<Integer, Integer> cnt;
    private List<Stack<Integer>> stacks;

    public FreqStack() {
        cnt = new HashMap<>();
        stacks = new ArrayList<>();
        stacks.add(new Stack<>());
    }

    public void push(int val) {
        int valCnt = cnt.getOrDefault(val, 0) + 1;
        cnt.put(val, valCnt);
        if (valCnt == stacks.size()) {
            stacks.add(new Stack<>());
        }
        stacks.get(valCnt).push(val);
    }

    public int pop() {
        Stack<Integer> topStack = stacks.get(stacks.size() - 1);
        int res = topStack.pop();
        cnt.put(res, cnt.get(res) - 1);
        if (topStack.isEmpty()) {
            stacks.remove(stacks.size() - 1);
        }
        return res;
    }
}
```

```cpp
class FreqStack {
public:
    unordered_map<int, int> cnt;
    vector<stack<int>> stacks;

    FreqStack() {
        stacks.push_back(stack<int>());
    }

    void push(int val) {
        int valCnt = ++cnt[val];
        if (valCnt == stacks.size()) {
            stacks.push_back(stack<int>());
        }
        stacks[valCnt].push(val);
    }

    int pop() {
        stack<int>& topStack = stacks.back();
        int res = topStack.top();
        topStack.pop();
        if (topStack.empty()) {
            stacks.pop_back();
        }
        cnt[res]--;
        return res;
    }
};
```

```javascript
class FreqStack {
    constructor() {
        this.cnt = new Map();
        this.stacks = [[]];
    }

    /**
     * @param {number} val
     * @return {void}
     */
    push(val) {
        const valCnt = (this.cnt.get(val) || 0) + 1;
        this.cnt.set(val, valCnt);
        if (valCnt === this.stacks.length) {
            this.stacks.push([]);
        }
        this.stacks[valCnt].push(val);
    }

    /**
     * @return {number}
     */
    pop() {
        const topStack = this.stacks[this.stacks.length - 1];
        const res = topStack.pop();
        this.cnt.set(res, this.cnt.get(res) - 1);
        if (topStack.length === 0) {
            this.stacks.pop();
        }
        return res;
    }
}
```

```csharp
public class FreqStack {
    private Dictionary<int, int> cnt;
    private List<List<int>> stacks;

    public FreqStack() {
        cnt = new Dictionary<int, int>();
        stacks = new List<List<int>>();
        stacks.Add(new List<int>());
    }

    public void Push(int val) {
        int valCnt = cnt.ContainsKey(val) ? cnt[val] + 1 : 1;
        cnt[val] = valCnt;

        if (valCnt == stacks.Count) {
            stacks.Add(new List<int>());
        }

        stacks[valCnt].Add(val);
    }

    public int Pop() {
        int lastIndex = stacks.Count - 1;
        List<int> lastStack = stacks[lastIndex];
        int res = lastStack[lastStack.Count - 1];
        lastStack.RemoveAt(lastStack.Count - 1);

        cnt[res]--;

        if (lastStack.Count == 0) {
            stacks.RemoveAt(lastIndex);
        }

        return res;
    }
}
```

```go
type FreqStack struct {
    cnt    map[int]int
    stacks [][]int
}

func Constructor() FreqStack {
    return FreqStack{
        cnt:    make(map[int]int),
        stacks: [][]int{{}},
    }
}

func (this *FreqStack) Push(val int) {
    this.cnt[val]++
    valCnt := this.cnt[val]
    if valCnt == len(this.stacks) {
        this.stacks = append(this.stacks, []int{})
    }
    this.stacks[valCnt] = append(this.stacks[valCnt], val)
}

func (this *FreqStack) Pop() int {
    lastStack := this.stacks[len(this.stacks)-1]
    res := lastStack[len(lastStack)-1]
    this.stacks[len(this.stacks)-1] = lastStack[:len(lastStack)-1]
    this.cnt[res]--
    if len(this.stacks[len(this.stacks)-1]) == 0 {
        this.stacks = this.stacks[:len(this.stacks)-1]
    }
    return res
}
```

```kotlin
class FreqStack() {
    private val cnt = mutableMapOf<Int, Int>()
    private val stacks = mutableListOf(mutableListOf<Int>())

    fun push(`val`: Int) {
        val valCnt = cnt.getOrDefault(`val`, 0) + 1
        cnt[`val`] = valCnt
        if (valCnt == stacks.size) {
            stacks.add(mutableListOf())
        }
        stacks[valCnt].add(`val`)
    }

    fun pop(): Int {
        val lastStack = stacks.last()
        val res = lastStack.removeLast()
        cnt[res] = cnt[res]!! - 1
        if (lastStack.isEmpty()) {
            stacks.removeLast()
        }
        return res
    }
}
```

```swift
class FreqStack {
    private var cnt: [Int: Int]
    private var stacks: [[Int]]

    init() {
        cnt = [:]
        stacks = [[]]
    }

    func push(_ val: Int) {
        let valCnt = (cnt[val] ?? 0) + 1
        cnt[val] = valCnt
        if valCnt == stacks.count {
            stacks.append([])
        }
        stacks[valCnt].append(val)
    }

    func pop() -> Int {
        let res = stacks[stacks.count - 1].removeLast()
        cnt[res]! -= 1
        if stacks[stacks.count - 1].isEmpty {
            stacks.removeLast()
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.
