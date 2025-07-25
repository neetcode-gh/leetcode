## 1. Brute Force (Sorting)

::tabs-start

```python
class SummaryRanges:

    def __init__(self):
        self.arr = []

    def addNum(self, value: int) -> None:
        self.arr.append(value)

    def getIntervals(self) -> List[List[int]]:
        if not self.arr:
            return []

        self.arr.sort()
        n = len(self.arr)
        start = self.arr[0]
        res = []
        for i in range(1, n):
            if self.arr[i] - self.arr[i - 1] > 1:
                res.append([start, self.arr[i - 1]])
                start = self.arr[i]

        res.append([start, self.arr[n - 1]])
        return res
```

```java
public class SummaryRanges {
    private List<Integer> arr;

    public SummaryRanges() {
        arr = new ArrayList<>();
    }

    public void addNum(int value) {
        arr.add(value);
    }

    public List<int[]> getIntervals() {
        List<int[]> res = new ArrayList<>();
        if (arr.isEmpty()) return res;

        Collections.sort(arr);
        int start = arr.get(0);
        for (int i = 1; i < arr.size(); i++) {
            if (arr.get(i) - arr.get(i - 1) > 1) {
                res.add(new int[]{start, arr.get(i - 1)});
                start = arr.get(i);
            }
        }
        res.add(new int[]{start, arr.get(arr.size() - 1)});
        return res;
    }
}
```

```cpp
class SummaryRanges {
private:
    vector<int> arr;

public:
    SummaryRanges() {}

    void addNum(int value) {
        arr.push_back(value);
    }

    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        if (arr.empty()) return res;

        sort(arr.begin(), arr.end());
        int start = arr[0];
        for (int i = 1; i < arr.size(); i++) {
            if (arr[i] - arr[i - 1] > 1) {
                res.push_back({start, arr[i - 1]});
                start = arr[i];
            }
        }
        res.push_back({start, arr.back()});
        return res;
    }
};
```

```javascript
class SummaryRanges {
    constructor() {
        this.arr = [];
    }

    /**
     * @param {number} value
     * @return {void}
     */
    addNum(value) {
        this.arr.push(value);
    }

    /**
     * @return {number[][]}
     */
    getIntervals() {
        if (this.arr.length === 0) return [];

        this.arr.sort((a, b) => a - b);
        let start = this.arr[0];
        let res = [];

        for (let i = 1; i < this.arr.length; i++) {
            if (this.arr[i] - this.arr[i - 1] > 1) {
                res.push([start, this.arr[i - 1]]);
                start = this.arr[i];
            }
        }
        res.push([start, this.arr[this.arr.length - 1]]);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addNum()$ function call.
    - $O(n \log n)$ time for each $getIntervals()$ function call.
- Space complexity: $O(n)$

---

## 2. Hash Set + Sorting

::tabs-start

```python
class SummaryRanges:

    def __init__(self):
        self.arr = set()

    def addNum(self, value: int) -> None:
        self.arr.add(value)

    def getIntervals(self) -> List[List[int]]:
        if not self.arr:
            return []

        lst = sorted(list(self.arr))
        n = len(lst)
        start = lst[0]
        res = []
        for i in range(1, n):
            if lst[i] - lst[i - 1] > 1:
                res.append([start, lst[i - 1]])
                start = lst[i]

        res.append([start, lst[n - 1]])
        return res
```

```java
public class SummaryRanges {
    private Set<Integer> arr;

    public SummaryRanges() {
        arr = new TreeSet<>();
    }

    public void addNum(int value) {
        arr.add(value);
    }

    public List<int[]> getIntervals() {
        List<int[]> res = new ArrayList<>();
        if (arr.isEmpty()) return res;

        List<Integer> lst = new ArrayList<>(arr);
        int start = lst.get(0);
        for (int i = 1; i < lst.size(); i++) {
            if (lst.get(i) - lst.get(i - 1) > 1) {
                res.add(new int[]{start, lst.get(i - 1)});
                start = lst.get(i);
            }
        }
        res.add(new int[]{start, lst.get(lst.size() - 1)});
        return res;
    }
}
```

```cpp
class SummaryRanges {
private:
    set<int> arr;

public:
    SummaryRanges() {}

    void addNum(int value) {
        arr.insert(value);
    }

    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        if (arr.empty()) return res;

        vector<int> lst(arr.begin(), arr.end());
        int start = lst[0];

        for (int i = 1; i < lst.size(); i++) {
            if (lst[i] - lst[i - 1] > 1) {
                res.push_back({start, lst[i - 1]});
                start = lst[i];
            }
        }
        res.push_back({start, lst.back()});
        return res;
    }
};
```

```javascript
class SummaryRanges {
    constructor() {
        this.arr = new Set();
    }

    /**
     * @param {number} value
     * @return {number[][]}
     */
    addNum(value) {
        this.arr.add(value);
    }

    /**
     * @return {number[][]}
     */
    getIntervals() {
        if (this.arr.size === 0) return [];

        let lst = Array.from(this.arr).sort((a, b) => a - b);
        let start = lst[0];
        let res = [];

        for (let i = 1; i < lst.length; i++) {
            if (lst[i] - lst[i - 1] > 1) {
                res.push([start, lst[i - 1]]);
                start = lst[i];
            }
        }
        res.push([start, lst[lst.length - 1]]);
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $addNum()$ function call.
    - $O(n \log n)$ time for each $getIntervals()$ function call.
- Space complexity: $O(n)$

---

## 3. Ordered Map

::tabs-start

```python
from sortedcontainers import SortedDict

class SummaryRanges:
    def __init__(self):
        self.treeMap = SortedDict()

    def addNum(self, value: int) -> None:
        self.treeMap[value] = True

    def getIntervals(self) -> List[List[int]]:
        res = []
        for n in self.treeMap:
            if res and res[-1][1] + 1 == n:
                res[-1][1] = n
            else:
                res.append([n, n])
        return res
```

```java
public class SummaryRanges {
    private TreeMap<Integer, Boolean> treeMap;

    public SummaryRanges() {
        treeMap = new TreeMap<>();
    }

    public void addNum(int value) {
        treeMap.put(value, true);
    }

    public List<int[]> getIntervals() {
        List<int[]> res = new ArrayList<>();
        for (int n : treeMap.keySet()) {
            if (!res.isEmpty() && res.get(res.size() - 1)[1] + 1 == n) {
                res.get(res.size() - 1)[1] = n;
            } else {
                res.add(new int[]{n, n});
            }
        }
        return res;
    }
}
```

```cpp
class SummaryRanges {
private:
    map<int, bool> treeMap;

public:
    SummaryRanges() {}

    void addNum(int value) {
        treeMap[value] = true;
    }

    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        for (auto& [n, _] : treeMap) {
            if (!res.empty() && res.back()[1] + 1 == n) {
                res.back()[1] = n;
            } else {
                res.push_back({n, n});
            }
        }
        return res;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(\log n)$ time for each $addNum()$ function call.
    - $O(n)$ time for each $getIntervals()$ function call.
- Space complexity: $O(n)$

---

## 4. Ordered Set

::tabs-start

```python
from sortedcontainers import SortedSet

class SummaryRanges:
    def __init__(self):
        self.orderedSet = SortedSet()

    def addNum(self, value: int) -> None:
        self.orderedSet.add(value)

    def getIntervals(self) -> List[List[int]]:
        res = []
        for n in self.orderedSet:
            if res and res[-1][1] + 1 == n:
                res[-1][1] = n
            else:
                res.append([n, n])
        return res
```

```java
public class SummaryRanges {
    private TreeSet<Integer> orderedSet;

    public SummaryRanges() {
        orderedSet = new TreeSet<>();
    }

    public void addNum(int value) {
        orderedSet.add(value);
    }

    public List<int[]> getIntervals() {
        List<int[]> res = new ArrayList<>();
        for (int n : orderedSet) {
            if (!res.isEmpty() && res.get(res.size() - 1)[1] + 1 == n) {
                res.get(res.size() - 1)[1] = n;
            } else {
                res.add(new int[]{n, n});
            }
        }
        return res;
    }
}
```

```cpp
class SummaryRanges {
private:
    set<int> orderedSet;

public:
    SummaryRanges() {}

    void addNum(int value) {
        orderedSet.insert(value);
    }

    vector<vector<int>> getIntervals() {
        vector<vector<int>> res;
        for (int n : orderedSet) {
            if (!res.empty() && res.back()[1] + 1 == n) {
                res.back()[1] = n;
            } else {
                res.push_back({n, n});
            }
        }
        return res;
    }
};
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(\log n)$ time for each $addNum()$ function call.
    - $O(n)$ time for each $getIntervals()$ function call.
- Space complexity: $O(n)$
