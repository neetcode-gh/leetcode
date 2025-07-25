## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(n)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 2. Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(\log n)$ time for each $push()$ function call.
    - $O(\log n)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 3. Stack Of Stacks (Hash Map)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.

---

## 4. Stack Of Stacks (Dynamic Array)

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for each $push()$ function call.
    - $O(1)$ time for each $pop()$ function call.
- Space complexity: $O(n)$

> Where $n$ is the number of elements in the stack.
