## 1. Recursion (Flatten And Store Into Global List)

### Intuition

The nested list can contain integers or other nested lists at any depth. We can flatten the entire structure upfront using depth-first traversal. By storing all integers in a flat array during construction, subsequent `next()` and `hasNext()` calls become simple array operations.

### Algorithm

1. **Constructor**: Initialize an empty array and a pointer at 0. Call `dfs()` on the nested list to populate the array.
2. **dfs(nestedArr)**: For each element in the nested array:
   - If it's an integer, append it to the array.
   - If it's a list, recursively call `dfs()` on that list.
3. **next()**: Return the element at the current pointer and increment the pointer.
4. **hasNext()**: Return true if the pointer is less than the array length.

::tabs-start

```python
class NestedIterator:
    def __init__(self, nestedList):
        self.arr = []
        self.ptr = 0
        self.dfs(nestedList)

    def next(self):
        val = self.arr[self.ptr]
        self.ptr += 1
        return val

    def hasNext(self):
        return self.ptr < len(self.arr)

    def dfs(self, nestedArr):
        for num in nestedArr:
            if num.isInteger():
                self.arr.append(num.getInteger())
            else:
                self.dfs(num.getList())
```

```java
public class NestedIterator implements Iterator<Integer> {

    private List<Integer> arr;
    private int ptr;

    public NestedIterator(List<NestedInteger> nestedList) {
        arr = new ArrayList<>();
        ptr = 0;
        dfs(nestedList);
    }

    @Override
    public Integer next() {
        return arr.get(ptr++);
    }

    @Override
    public boolean hasNext() {
        return ptr < arr.size();
    }

    private void dfs(List<NestedInteger> nestedArr) {
        for (NestedInteger num : nestedArr) {
            if (num.isInteger()) {
                arr.add(num.getInteger());
            } else {
                dfs(num.getList());
            }
        }
    }
}
```

```cpp
class NestedIterator {
private:
    vector<int> arr;
    int ptr;

    void dfs(const vector<NestedInteger> &nestedArr) {
        for (const auto &num : nestedArr) {
            if (num.isInteger()) {
                arr.push_back(num.getInteger());
            } else {
                dfs(num.getList());
            }
        }
    }

public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        ptr = 0;
        dfs(nestedList);
    }

    int next() {
        return arr[ptr++];
    }

    bool hasNext() {
        return ptr < arr.size();
    }
};
```

```javascript
class NestedIterator {
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.arr = [];
        this.ptr = 0;
        this.dfs(nestedList);
    }

    /**
     * @param {NestedInteger[]} nestedArr
     */
    dfs(nestedArr) {
        for (let num of nestedArr) {
            if (num.isInteger()) {
                this.arr.push(num.getInteger());
            } else {
                this.dfs(num.getList());
            }
        }
    }

    /**
     * @this NestedIterator
     * @returns {integer}
     */
    next() {
        return this.arr[this.ptr++];
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        return this.ptr < this.arr.length;
    }
}
```

```csharp
public class NestedIterator {
    private List<int> arr;
    private int ptr;

    public NestedIterator(IList<NestedInteger> nestedList) {
        arr = new List<int>();
        ptr = 0;
        Dfs(nestedList);
    }

    public int Next() {
        return arr[ptr++];
    }

    public bool HasNext() {
        return ptr < arr.Count;
    }

    private void Dfs(IList<NestedInteger> nestedArr) {
        foreach (var num in nestedArr) {
            if (num.IsInteger()) {
                arr.Add(num.GetInteger());
            } else {
                Dfs(num.GetList());
            }
        }
    }
}
```

```go
type NestedIterator struct {
    arr []int
    ptr int
}

func Constructor(nestedList []*NestedInteger) *NestedIterator {
    it := &NestedIterator{arr: []int{}, ptr: 0}
    it.dfs(nestedList)
    return it
}

func (it *NestedIterator) dfs(nestedArr []*NestedInteger) {
    for _, num := range nestedArr {
        if num.IsInteger() {
            it.arr = append(it.arr, num.GetInteger())
        } else {
            it.dfs(num.GetList())
        }
    }
}

func (it *NestedIterator) Next() int {
    val := it.arr[it.ptr]
    it.ptr++
    return val
}

func (it *NestedIterator) HasNext() bool {
    return it.ptr < len(it.arr)
}
```

```kotlin
class NestedIterator(nestedList: List<NestedInteger>) {
    private val arr = mutableListOf<Int>()
    private var ptr = 0

    init {
        dfs(nestedList)
    }

    fun next(): Int {
        return arr[ptr++]
    }

    fun hasNext(): Boolean {
        return ptr < arr.size
    }

    private fun dfs(nestedArr: List<NestedInteger>) {
        for (num in nestedArr) {
            if (num.isInteger()) {
                arr.add(num.getInteger()!!)
            } else {
                dfs(num.getList()!!)
            }
        }
    }
}
```

```swift
class NestedIterator {
    private var arr: [Int] = []
    private var ptr: Int = 0

    init(_ nestedList: [NestedInteger]) {
        dfs(nestedList)
    }

    func next() -> Int {
        let val = arr[ptr]
        ptr += 1
        return val
    }

    func hasNext() -> Bool {
        return ptr < arr.count
    }

    private func dfs(_ nestedArr: [NestedInteger]) {
        for num in nestedArr {
            if num.isInteger() {
                arr.append(num.getInteger())
            } else {
                dfs(num.getList())
            }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 2. Recursion (Flatten And Return)

### Intuition

This is a variation of the first approach where the recursive function returns a flattened list instead of modifying a global variable. Each recursive call builds and returns its own list, which gets merged into the parent's result.

### Algorithm

1. **Constructor**: Call `dfs()` on the nested list and store the returned array. Initialize pointer to 0.
2. **dfs(nestedArr)**: Create an empty result list. For each element:
   - If it's an integer, append it to the result.
   - If it's a list, recursively call `dfs()` and extend the result with the returned list.
   - Return the result.
3. **next()**: Return the element at the current pointer and increment it.
4. **hasNext()**: Return true if the pointer is less than the array length.

::tabs-start

```python
class NestedIterator:
    def __init__(self, nestedList):
        self.arr = self.dfs(nestedList)
        self.ptr = 0

    def dfs(self, nestedArr):
        res = []
        for num in nestedArr:
            if num.isInteger():
                res.append(num.getInteger())
            else:
                res.extend(self.dfs(num.getList()))
        return res

    def next(self):
        val = self.arr[self.ptr]
        self.ptr += 1
        return val

    def hasNext(self):
        return self.ptr < len(self.arr)
```

```java
public class NestedIterator implements Iterator<Integer> {
    private List<Integer> arr;
    private int ptr;

    public NestedIterator(List<NestedInteger> nestedList) {
        arr = dfs(nestedList);
        ptr = 0;
    }

    private List<Integer> dfs(List<NestedInteger> nestedArr) {
        List<Integer> res = new ArrayList<>();
        for (NestedInteger num : nestedArr) {
            if (num.isInteger()) {
                res.add(num.getInteger());
            } else {
                res.addAll(dfs(num.getList()));
            }
        }
        return res;
    }

    @Override
    public Integer next() {
        return arr.get(ptr++);
    }

    @Override
    public boolean hasNext() {
        return ptr < arr.size();
    }
}
```

```cpp
class NestedIterator {
private:
    vector<int> arr;
    int ptr;

    vector<int> dfs(const vector<NestedInteger> &nestedArr) {
        vector<int> res;
        for (const auto &num : nestedArr) {
            if (num.isInteger()) {
                res.push_back(num.getInteger());
            } else {
                vector<int> temp = dfs(num.getList());
                res.insert(res.end(), temp.begin(), temp.end());
            }
        }
        return res;
    }

public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        arr = dfs(nestedList);
        ptr = 0;
    }

    int next() {
        return arr[ptr++];
    }

    bool hasNext() {
        return ptr < arr.size();
    }
};
```

```javascript
class NestedIterator {
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.arr = this.dfs(nestedList);
        this.ptr = 0;
    }

    /**
     * @param {NestedInteger[]} nestedArr
     */
    dfs(nestedArr) {
        let res = [];
        for (let num of nestedArr) {
            if (num.isInteger()) {
                res.push(num.getInteger());
            } else {
                res.push(...this.dfs(num.getList()));
            }
        }
        return res;
    }

    /**
     * @this NestedIterator
     * @returns {integer}
     */
    next() {
        return this.arr[this.ptr++];
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        return this.ptr < this.arr.length;
    }
}
```

```csharp
public class NestedIterator {
    private List<int> arr;
    private int ptr;

    public NestedIterator(IList<NestedInteger> nestedList) {
        arr = Dfs(nestedList);
        ptr = 0;
    }

    private List<int> Dfs(IList<NestedInteger> nestedArr) {
        List<int> res = new List<int>();
        foreach (var num in nestedArr) {
            if (num.IsInteger()) {
                res.Add(num.GetInteger());
            } else {
                res.AddRange(Dfs(num.GetList()));
            }
        }
        return res;
    }

    public int Next() {
        return arr[ptr++];
    }

    public bool HasNext() {
        return ptr < arr.Count;
    }
}
```

```go
type NestedIterator struct {
    arr []int
    ptr int
}

func Constructor(nestedList []*NestedInteger) *NestedIterator {
    it := &NestedIterator{ptr: 0}
    it.arr = it.dfs(nestedList)
    return it
}

func (it *NestedIterator) dfs(nestedArr []*NestedInteger) []int {
    res := []int{}
    for _, num := range nestedArr {
        if num.IsInteger() {
            res = append(res, num.GetInteger())
        } else {
            res = append(res, it.dfs(num.GetList())...)
        }
    }
    return res
}

func (it *NestedIterator) Next() int {
    val := it.arr[it.ptr]
    it.ptr++
    return val
}

func (it *NestedIterator) HasNext() bool {
    return it.ptr < len(it.arr)
}
```

```kotlin
class NestedIterator(nestedList: List<NestedInteger>) {
    private val arr: List<Int>
    private var ptr = 0

    init {
        arr = dfs(nestedList)
    }

    private fun dfs(nestedArr: List<NestedInteger>): List<Int> {
        val res = mutableListOf<Int>()
        for (num in nestedArr) {
            if (num.isInteger()) {
                res.add(num.getInteger()!!)
            } else {
                res.addAll(dfs(num.getList()!!))
            }
        }
        return res
    }

    fun next(): Int {
        return arr[ptr++]
    }

    fun hasNext(): Boolean {
        return ptr < arr.size
    }
}
```

```swift
class NestedIterator {
    private var arr: [Int]
    private var ptr: Int = 0

    init(_ nestedList: [NestedInteger]) {
        arr = NestedIterator.dfs(nestedList)
    }

    private static func dfs(_ nestedArr: [NestedInteger]) -> [Int] {
        var res = [Int]()
        for num in nestedArr {
            if num.isInteger() {
                res.append(num.getInteger())
            } else {
                res.append(contentsOf: dfs(num.getList()))
            }
        }
        return res
    }

    func next() -> Int {
        let val = arr[ptr]
        ptr += 1
        return val
    }

    func hasNext() -> Bool {
        return ptr < arr.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 3. Recursion + Stack

### Intuition

We can use recursion to flatten the list and store the integers in a stack. By reversing the stack after flattening, we can pop elements in the correct order. This combines recursive traversal with stack-based iteration.

### Algorithm

1. **Constructor**: Initialize an empty stack. Call `dfs()` on the nested list, then reverse the stack.
2. **dfs(nested)**: For each element:
   - If it's an integer, push it onto the stack.
   - If it's a list, recursively call `dfs()` on it.
3. **next()**: Pop and return the top element from the stack.
4. **hasNext()**: Return true if the stack is not empty.

::tabs-start

```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = []
        self.dfs(nestedList)
        self.stack.reverse()

    def next(self) -> int:
        return self.stack.pop()

    def hasNext(self) -> bool:
        return len(self.stack) > 0

    def dfs(self, nested):
        for num in nested:
            if num.isInteger():
                self.stack.append(num.getInteger())
            else:
                self.dfs(num.getList())
```

```java
public class NestedIterator implements Iterator<Integer> {
    private Stack<Integer> stack;

    public NestedIterator(List<NestedInteger> nestedList) {
        stack = new Stack<>();
        dfs(nestedList);
        Collections.reverse(stack);
    }

    private void dfs(List<NestedInteger> nested) {
        for (NestedInteger num : nested) {
            if (num.isInteger()) {
                stack.push(num.getInteger());
            } else {
                dfs(num.getList());
            }
        }
    }

    @Override
    public Integer next() {
        return stack.pop();
    }

    @Override
    public boolean hasNext() {
        return !stack.isEmpty();
    }
}
```

```cpp
class NestedIterator {
private:
    vector<int> stack;

    void dfs(const vector<NestedInteger> &nested) {
        for (const auto &num : nested) {
            if (num.isInteger()) {
                stack.push_back(num.getInteger());
            } else {
                dfs(num.getList());
            }
        }
    }

public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        dfs(nestedList);
        reverse(stack.begin(), stack.end());
    }

    int next() {
        int val = stack.back();
        stack.pop_back();
        return val;
    }

    bool hasNext() {
        return !stack.empty();
    }
};
```

```javascript
class NestedIterator {
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.stack = [];
        this.dfs(nestedList);
        this.stack.reverse();
    }

    /**
     * @param {NestedInteger[]} nested
     */
    dfs(nested) {
        for (let num of nested) {
            if (num.isInteger()) {
                this.stack.push(num.getInteger());
            } else {
                this.dfs(num.getList());
            }
        }
    }

    /**
     * @this NestedIterator
     * @returns {number}
     */
    next() {
        return this.stack.pop();
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        return this.stack.length > 0;
    }
}
```

```csharp
public class NestedIterator {
    private Stack<int> stack;

    public NestedIterator(IList<NestedInteger> nestedList) {
        stack = new Stack<int>();
        List<int> temp = new List<int>();
        Dfs(nestedList, temp);
        temp.Reverse();
        foreach (var num in temp) {
            stack.Push(num);
        }
    }

    private void Dfs(IList<NestedInteger> nested, List<int> temp) {
        foreach (var num in nested) {
            if (num.IsInteger()) {
                temp.Add(num.GetInteger());
            } else {
                Dfs(num.GetList(), temp);
            }
        }
    }

    public int Next() {
        return stack.Pop();
    }

    public bool HasNext() {
        return stack.Count > 0;
    }
}
```

```go
type NestedIterator struct {
    stack []int
}

func Constructor(nestedList []*NestedInteger) *NestedIterator {
    it := &NestedIterator{stack: []int{}}
    it.dfs(nestedList)
    for i, j := 0, len(it.stack)-1; i < j; i, j = i+1, j-1 {
        it.stack[i], it.stack[j] = it.stack[j], it.stack[i]
    }
    return it
}

func (it *NestedIterator) dfs(nested []*NestedInteger) {
    for _, num := range nested {
        if num.IsInteger() {
            it.stack = append(it.stack, num.GetInteger())
        } else {
            it.dfs(num.GetList())
        }
    }
}

func (it *NestedIterator) Next() int {
    val := it.stack[len(it.stack)-1]
    it.stack = it.stack[:len(it.stack)-1]
    return val
}

func (it *NestedIterator) HasNext() bool {
    return len(it.stack) > 0
}
```

```kotlin
class NestedIterator(nestedList: List<NestedInteger>) {
    private val stack = ArrayDeque<Int>()

    init {
        val temp = mutableListOf<Int>()
        dfs(nestedList, temp)
        temp.reverse()
        for (num in temp) {
            stack.addLast(num)
        }
    }

    private fun dfs(nested: List<NestedInteger>, temp: MutableList<Int>) {
        for (num in nested) {
            if (num.isInteger()) {
                temp.add(num.getInteger()!!)
            } else {
                dfs(num.getList()!!, temp)
            }
        }
    }

    fun next(): Int {
        return stack.removeLast()
    }

    fun hasNext(): Boolean {
        return stack.isNotEmpty()
    }
}
```

```swift
class NestedIterator {
    private var stack: [Int] = []

    init(_ nestedList: [NestedInteger]) {
        dfs(nestedList)
        stack.reverse()
    }

    private func dfs(_ nested: [NestedInteger]) {
        for num in nested {
            if num.isInteger() {
                stack.append(num.getInteger())
            } else {
                dfs(num.getList())
            }
        }
    }

    func next() -> Int {
        return stack.removeLast()
    }

    func hasNext() -> Bool {
        return !stack.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 4. Stack

### Intuition

Instead of flattening everything upfront, we can flatten lazily using a stack. We push the NestedInteger objects themselves onto the stack (in reverse order). When checking `hasNext()`, we unpack nested lists on demand until we find an integer at the top. This approach is more memory-efficient when we don't need to iterate through all elements.

### Algorithm

1. **Constructor**: Copy the nested list to a stack in reverse order (so the first element is on top).
2. **next()**: Pop the top element and return its integer value.
3. **hasNext()**: While the stack is not empty:
   - If the top element is an integer, return true.
   - Otherwise, pop the nested list, reverse it, and push its elements back onto the stack.
   - Return false if the stack becomes empty.

::tabs-start

```python
class NestedIterator:
    def __init__(self, nestedList: [NestedInteger]):
        self.stack = nestedList
        self.stack.reverse()

    def next(self) -> int:
        return self.stack.pop().getInteger()

    def hasNext(self) -> bool:
        while self.stack:
            top = self.stack[-1]
            if top.isInteger():
                return True

            self.stack.pop()
            self.stack.extend(reversed(top.getList()))
        return False
```

```java
public class NestedIterator implements Iterator<Integer> {
    private List<NestedInteger> stack;

    public NestedIterator(List<NestedInteger> nestedList) {
        stack = new ArrayList<>(nestedList);
        Collections.reverse(stack);
    }

    @Override
    public Integer next() {
        return stack.remove(stack.size() - 1).getInteger();
    }

    @Override
    public boolean hasNext() {
        while (!stack.isEmpty()) {
            NestedInteger top = stack.get(stack.size() - 1);
            if (top.isInteger()) {
                return true;
            }
            stack.remove(stack.size() - 1);
            List<NestedInteger> nestedList = top.getList();
            Collections.reverse(nestedList);
            stack.addAll(nestedList);
        }
        return false;
    }
}
```

```cpp
class NestedIterator {
private:
    vector<NestedInteger> stack;

public:
    NestedIterator(vector<NestedInteger> &nestedList) {
        stack = nestedList;
        reverse(stack.begin(), stack.end());
    }

    int next() {
        int val = stack.back().getInteger();
        stack.pop_back();
        return val;
    }

    bool hasNext() {
        while (!stack.empty()) {
            NestedInteger top = stack.back();
            if (top.isInteger()) {
                return true;
            }
            stack.pop_back();
            vector<NestedInteger> nestedList = top.getList();
            for (auto it = nestedList.rbegin(); it != nestedList.rend(); ++it) {
                stack.push_back(*it);
            }
        }
        return false;
    }
};
```

```javascript
class NestedIterator {
    /**
     * @constructor
     * @param {NestedInteger[]} nestedList
     */
    constructor(nestedList) {
        this.stack = nestedList;
        this.stack.reverse();
    }

    /**
     * @this NestedIterator
     * @returns {number}
     */
    next() {
        return this.stack.pop().getInteger();
    }

    /**
     * @this NestedIterator
     * @returns {boolean}
     */
    hasNext() {
        while (this.stack.length > 0) {
            const top = this.stack[this.stack.length - 1];
            if (top.isInteger()) {
                return true;
            }
            this.stack.pop();
            const nestedList = top.getList();
            nestedList.reverse();
            this.stack.push(...nestedList);
        }
        return false;
    }
}
```

```csharp
public class NestedIterator {
    private List<NestedInteger> stack;

    public NestedIterator(IList<NestedInteger> nestedList) {
        stack = new List<NestedInteger>(nestedList);
        stack.Reverse();
    }

    public int Next() {
        var val = stack[stack.Count - 1].GetInteger();
        stack.RemoveAt(stack.Count - 1);
        return val;
    }

    public bool HasNext() {
        while (stack.Count > 0) {
            var top = stack[stack.Count - 1];
            if (top.IsInteger()) {
                return true;
            }
            stack.RemoveAt(stack.Count - 1);
            var nestedList = top.GetList().ToList();
            nestedList.Reverse();
            stack.AddRange(nestedList);
        }
        return false;
    }
}
```

```go
type NestedIterator struct {
    stack []*NestedInteger
}

func Constructor(nestedList []*NestedInteger) *NestedIterator {
    stack := make([]*NestedInteger, len(nestedList))
    copy(stack, nestedList)
    for i, j := 0, len(stack)-1; i < j; i, j = i+1, j-1 {
        stack[i], stack[j] = stack[j], stack[i]
    }
    return &NestedIterator{stack: stack}
}

func (it *NestedIterator) Next() int {
    val := it.stack[len(it.stack)-1].GetInteger()
    it.stack = it.stack[:len(it.stack)-1]
    return val
}

func (it *NestedIterator) HasNext() bool {
    for len(it.stack) > 0 {
        top := it.stack[len(it.stack)-1]
        if top.IsInteger() {
            return true
        }
        it.stack = it.stack[:len(it.stack)-1]
        nestedList := top.GetList()
        for i := len(nestedList) - 1; i >= 0; i-- {
            it.stack = append(it.stack, nestedList[i])
        }
    }
    return false
}
```

```kotlin
class NestedIterator(nestedList: List<NestedInteger>) {
    private val stack = mutableListOf<NestedInteger>()

    init {
        stack.addAll(nestedList.reversed())
    }

    fun next(): Int {
        return stack.removeAt(stack.size - 1).getInteger()!!
    }

    fun hasNext(): Boolean {
        while (stack.isNotEmpty()) {
            val top = stack.last()
            if (top.isInteger()) {
                return true
            }
            stack.removeAt(stack.size - 1)
            val nestedList = top.getList()!!.reversed()
            stack.addAll(nestedList)
        }
        return false
    }
}
```

```swift
class NestedIterator {
    private var stack: [NestedInteger] = []

    init(_ nestedList: [NestedInteger]) {
        stack = nestedList.reversed()
    }

    func next() -> Int {
        return stack.removeLast().getInteger()
    }

    func hasNext() -> Bool {
        while !stack.isEmpty {
            let top = stack.last!
            if top.isInteger() {
                return true
            }
            stack.removeLast()
            let nestedList = top.getList()
            stack.append(contentsOf: nestedList.reversed())
        }
        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n)$

> Where $n$ is the number of integers and $d$ is the nesting depth.
