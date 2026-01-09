## 1. Brute Force (Sorting)

### Intuition
The simplest approach is to store all incoming numbers in a list and compute the intervals on demand. When `getIntervals()` is called, we sort the list and scan through it to identify consecutive sequences. Two numbers belong to the same interval if they differ by exactly 1.

### Algorithm
1. Initialize an empty list to store all added numbers.
2. For `addNum(value)`, append the value to the list.
3. For `getIntervals()`:
   - If the list is empty, return an empty result.
   - Sort the list.
   - Initialize `start` with the first element.
   - Iterate through the sorted list. When the current number differs from the previous by more than 1, close the current interval and start a new one.
   - After the loop, add the final interval.
4. Return the list of intervals.

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

```csharp
public class SummaryRanges {
    private List<int> arr;

    public SummaryRanges() {
        arr = new List<int>();
    }

    public void AddNum(int value) {
        arr.Add(value);
    }

    public int[][] GetIntervals() {
        if (arr.Count == 0) return new int[0][];

        arr.Sort();
        int start = arr[0];
        List<int[]> res = new List<int[]>();

        for (int i = 1; i < arr.Count; i++) {
            if (arr[i] - arr[i - 1] > 1) {
                res.Add(new int[] { start, arr[i - 1] });
                start = arr[i];
            }
        }
        res.Add(new int[] { start, arr[arr.Count - 1] });
        return res.ToArray();
    }
}
```

```go
type SummaryRanges struct {
    arr []int
}

func Constructor() SummaryRanges {
    return SummaryRanges{arr: []int{}}
}

func (this *SummaryRanges) AddNum(value int) {
    this.arr = append(this.arr, value)
}

func (this *SummaryRanges) GetIntervals() [][]int {
    if len(this.arr) == 0 {
        return [][]int{}
    }

    sort.Ints(this.arr)
    start := this.arr[0]
    res := [][]int{}

    for i := 1; i < len(this.arr); i++ {
        if this.arr[i]-this.arr[i-1] > 1 {
            res = append(res, []int{start, this.arr[i-1]})
            start = this.arr[i]
        }
    }
    res = append(res, []int{start, this.arr[len(this.arr)-1]})
    return res
}
```

```kotlin
class SummaryRanges() {
    private val arr = mutableListOf<Int>()

    fun addNum(value: Int) {
        arr.add(value)
    }

    fun getIntervals(): Array<IntArray> {
        if (arr.isEmpty()) return arrayOf()

        arr.sort()
        var start = arr[0]
        val res = mutableListOf<IntArray>()

        for (i in 1 until arr.size) {
            if (arr[i] - arr[i - 1] > 1) {
                res.add(intArrayOf(start, arr[i - 1]))
                start = arr[i]
            }
        }
        res.add(intArrayOf(start, arr[arr.size - 1]))
        return res.toTypedArray()
    }
}
```

```swift
class SummaryRanges {
    private var arr: [Int]

    init() {
        arr = []
    }

    func addNum(_ value: Int) {
        arr.append(value)
    }

    func getIntervals() -> [[Int]] {
        if arr.isEmpty { return [] }

        arr.sort()
        var start = arr[0]
        var res = [[Int]]()

        for i in 1..<arr.count {
            if arr[i] - arr[i - 1] > 1 {
                res.append([start, arr[i - 1]])
                start = arr[i]
            }
        }
        res.append([start, arr[arr.count - 1]])
        return res
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

### Intuition
The brute force approach stores duplicates, which wastes space and processing time during sorting. By using a hash set instead of a list, we automatically eliminate duplicates. This makes the interval computation cleaner since we only deal with unique values.

### Algorithm
1. Initialize a hash set to store unique numbers.
2. For `addNum(value)`, add the value to the set (duplicates are ignored).
3. For `getIntervals()`:
   - If the set is empty, return an empty result.
   - Convert the set to a sorted list.
   - Initialize `start` with the first element.
   - Iterate through the sorted list. When consecutive elements differ by more than 1, close the current interval and start a new one.
   - Add the final interval after the loop.
4. Return the list of intervals.

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

```csharp
public class SummaryRanges {
    private SortedSet<int> arr;

    public SummaryRanges() {
        arr = new SortedSet<int>();
    }

    public void AddNum(int value) {
        arr.Add(value);
    }

    public int[][] GetIntervals() {
        if (arr.Count == 0) return new int[0][];

        List<int> lst = new List<int>(arr);
        int start = lst[0];
        List<int[]> res = new List<int[]>();

        for (int i = 1; i < lst.Count; i++) {
            if (lst[i] - lst[i - 1] > 1) {
                res.Add(new int[] { start, lst[i - 1] });
                start = lst[i];
            }
        }
        res.Add(new int[] { start, lst[lst.Count - 1] });
        return res.ToArray();
    }
}
```

```go
type SummaryRanges struct {
    arr map[int]bool
}

func Constructor() SummaryRanges {
    return SummaryRanges{arr: make(map[int]bool)}
}

func (this *SummaryRanges) AddNum(value int) {
    this.arr[value] = true
}

func (this *SummaryRanges) GetIntervals() [][]int {
    if len(this.arr) == 0 {
        return [][]int{}
    }

    lst := make([]int, 0, len(this.arr))
    for k := range this.arr {
        lst = append(lst, k)
    }
    sort.Ints(lst)

    start := lst[0]
    res := [][]int{}

    for i := 1; i < len(lst); i++ {
        if lst[i]-lst[i-1] > 1 {
            res = append(res, []int{start, lst[i-1]})
            start = lst[i]
        }
    }
    res = append(res, []int{start, lst[len(lst)-1]})
    return res
}
```

```kotlin
class SummaryRanges() {
    private val arr = sortedSetOf<Int>()

    fun addNum(value: Int) {
        arr.add(value)
    }

    fun getIntervals(): Array<IntArray> {
        if (arr.isEmpty()) return arrayOf()

        val lst = arr.toList()
        var start = lst[0]
        val res = mutableListOf<IntArray>()

        for (i in 1 until lst.size) {
            if (lst[i] - lst[i - 1] > 1) {
                res.add(intArrayOf(start, lst[i - 1]))
                start = lst[i]
            }
        }
        res.add(intArrayOf(start, lst[lst.size - 1]))
        return res.toTypedArray()
    }
}
```

```swift
class SummaryRanges {
    private var arr: Set<Int>

    init() {
        arr = Set<Int>()
    }

    func addNum(_ value: Int) {
        arr.insert(value)
    }

    func getIntervals() -> [[Int]] {
        if arr.isEmpty { return [] }

        let lst = arr.sorted()
        var start = lst[0]
        var res = [[Int]]()

        for i in 1..<lst.count {
            if lst[i] - lst[i - 1] > 1 {
                res.append([start, lst[i - 1]])
                start = lst[i]
            }
        }
        res.append([start, lst[lst.count - 1]])
        return res
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

### Intuition
Using an ordered map (like TreeMap or SortedDict), we can maintain elements in sorted order as they are inserted. This eliminates the need to sort during `getIntervals()`. We simply iterate through the keys in order and merge consecutive numbers into intervals on the fly.

### Algorithm
1. Initialize an ordered map (TreeMap/SortedDict).
2. For `addNum(value)`, insert the value into the map.
3. For `getIntervals()`:
   - Initialize an empty result list.
   - Iterate through the keys of the ordered map in sorted order.
   - If the result is non-empty and the current number is exactly one more than the end of the last interval, extend that interval.
   - Otherwise, start a new interval `[n, n]`.
4. Return the list of intervals.

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

```javascript
class SummaryRanges {
    constructor() {
        this.treeMap = new Map();
    }

    /**
     * @param {number} value
     * @return {void}
     */
    addNum(value) {
        this.treeMap.set(value, true);
    }

    /**
     * @return {number[][]}
     */
    getIntervals() {
        const keys = Array.from(this.treeMap.keys()).sort((a, b) => a - b);
        const res = [];
        for (const n of keys) {
            if (res.length > 0 && res[res.length - 1][1] + 1 === n) {
                res[res.length - 1][1] = n;
            } else {
                res.push([n, n]);
            }
        }
        return res;
    }
}
```

```csharp
public class SummaryRanges {
    private SortedDictionary<int, bool> treeMap;

    public SummaryRanges() {
        treeMap = new SortedDictionary<int, bool>();
    }

    public void AddNum(int value) {
        treeMap[value] = true;
    }

    public int[][] GetIntervals() {
        List<int[]> res = new List<int[]>();
        foreach (int n in treeMap.Keys) {
            if (res.Count > 0 && res[res.Count - 1][1] + 1 == n) {
                res[res.Count - 1][1] = n;
            } else {
                res.Add(new int[] { n, n });
            }
        }
        return res.ToArray();
    }
}
```

```go
import "github.com/emirpasic/gods/maps/treemap"

type SummaryRanges struct {
    treeMap *treemap.Map
}

func Constructor() SummaryRanges {
    return SummaryRanges{treeMap: treemap.NewWithIntComparator()}
}

func (this *SummaryRanges) AddNum(value int) {
    this.treeMap.Put(value, true)
}

func (this *SummaryRanges) GetIntervals() [][]int {
    res := [][]int{}
    it := this.treeMap.Iterator()
    for it.Next() {
        n := it.Key().(int)
        if len(res) > 0 && res[len(res)-1][1]+1 == n {
            res[len(res)-1][1] = n
        } else {
            res = append(res, []int{n, n})
        }
    }
    return res
}
```

```kotlin
class SummaryRanges() {
    private val treeMap = sortedMapOf<Int, Boolean>()

    fun addNum(value: Int) {
        treeMap[value] = true
    }

    fun getIntervals(): Array<IntArray> {
        val res = mutableListOf<IntArray>()
        for (n in treeMap.keys) {
            if (res.isNotEmpty() && res.last()[1] + 1 == n) {
                res.last()[1] = n
            } else {
                res.add(intArrayOf(n, n))
            }
        }
        return res.toTypedArray()
    }
}
```

```swift
class SummaryRanges {
    private var treeMap: [Int: Bool]

    init() {
        treeMap = [:]
    }

    func addNum(_ value: Int) {
        treeMap[value] = true
    }

    func getIntervals() -> [[Int]] {
        var res = [[Int]]()
        let keys = treeMap.keys.sorted()
        for n in keys {
            if !res.isEmpty && res[res.count - 1][1] + 1 == n {
                res[res.count - 1][1] = n
            } else {
                res.append([n, n])
            }
        }
        return res
    }
}
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

### Intuition
An ordered set provides the same benefits as an ordered map but with simpler semantics when we only need to track the presence of numbers. Elements are kept sorted automatically, and duplicates are ignored. The interval construction logic remains the same: iterate in order and merge consecutive numbers.

### Algorithm
1. Initialize an ordered set (TreeSet/SortedSet).
2. For `addNum(value)`, insert the value into the set.
3. For `getIntervals()`:
   - Initialize an empty result list.
   - Iterate through the set in sorted order.
   - If the result is non-empty and the current number equals the last interval's end plus one, extend that interval.
   - Otherwise, create a new interval `[n, n]`.
4. Return the list of intervals.

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

```javascript
class SummaryRanges {
    constructor() {
        this.orderedSet = new Set();
    }

    /**
     * @param {number} value
     * @return {void}
     */
    addNum(value) {
        this.orderedSet.add(value);
    }

    /**
     * @return {number[][]}
     */
    getIntervals() {
        const sorted = Array.from(this.orderedSet).sort((a, b) => a - b);
        const res = [];
        for (const n of sorted) {
            if (res.length > 0 && res[res.length - 1][1] + 1 === n) {
                res[res.length - 1][1] = n;
            } else {
                res.push([n, n]);
            }
        }
        return res;
    }
}
```

```csharp
public class SummaryRanges {
    private SortedSet<int> orderedSet;

    public SummaryRanges() {
        orderedSet = new SortedSet<int>();
    }

    public void AddNum(int value) {
        orderedSet.Add(value);
    }

    public int[][] GetIntervals() {
        List<int[]> res = new List<int[]>();
        foreach (int n in orderedSet) {
            if (res.Count > 0 && res[res.Count - 1][1] + 1 == n) {
                res[res.Count - 1][1] = n;
            } else {
                res.Add(new int[] { n, n });
            }
        }
        return res.ToArray();
    }
}
```

```go
import "github.com/emirpasic/gods/sets/treeset"

type SummaryRanges struct {
    orderedSet *treeset.Set
}

func Constructor() SummaryRanges {
    return SummaryRanges{orderedSet: treeset.NewWithIntComparator()}
}

func (this *SummaryRanges) AddNum(value int) {
    this.orderedSet.Add(value)
}

func (this *SummaryRanges) GetIntervals() [][]int {
    res := [][]int{}
    it := this.orderedSet.Iterator()
    for it.Next() {
        n := it.Value().(int)
        if len(res) > 0 && res[len(res)-1][1]+1 == n {
            res[len(res)-1][1] = n
        } else {
            res = append(res, []int{n, n})
        }
    }
    return res
}
```

```kotlin
class SummaryRanges() {
    private val orderedSet = sortedSetOf<Int>()

    fun addNum(value: Int) {
        orderedSet.add(value)
    }

    fun getIntervals(): Array<IntArray> {
        val res = mutableListOf<IntArray>()
        for (n in orderedSet) {
            if (res.isNotEmpty() && res.last()[1] + 1 == n) {
                res.last()[1] = n
            } else {
                res.add(intArrayOf(n, n))
            }
        }
        return res.toTypedArray()
    }
}
```

```swift
class SummaryRanges {
    private var orderedSet: Set<Int>

    init() {
        orderedSet = Set<Int>()
    }

    func addNum(_ value: Int) {
        orderedSet.insert(value)
    }

    func getIntervals() -> [[Int]] {
        var res = [[Int]]()
        let sorted = orderedSet.sorted()
        for n in sorted {
            if !res.isEmpty && res[res.count - 1][1] + 1 == n {
                res[res.count - 1][1] = n
            } else {
                res.append([n, n])
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(\log n)$ time for each $addNum()$ function call.
    - $O(n)$ time for each $getIntervals()$ function call.
- Space complexity: $O(n)$
