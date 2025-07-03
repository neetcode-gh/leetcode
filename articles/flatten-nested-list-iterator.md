## 1. Recursion (Flatten And Store Into Global List )

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 2. Recursion (Flatten And Return)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 3. Recursion + Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n + d)$

> Where $n$ is the number of integers and $d$ is the nesting depth.

---

## 4. Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + d)$
- Space complexity: $O(n)$

> Where $n$ is the number of integers and $d$ is the nesting depth.
