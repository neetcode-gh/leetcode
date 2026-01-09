## 1. Iteration

### Intuition

Two events overlap if one starts before the other ends and vice versa. For each new booking request, we need to check whether it conflicts with any existing event. We can store all booked events in a list and iterate through them to detect overlaps. If no conflict is found, we add the new event to the list.

### Algorithm

1. Maintain a list of booked events, where each event is stored as a `(start, end)` pair.
2. When `book(startTime, endTime)` is called:
   - Iterate through all existing events.
   - For each event `(start, end)`, check if `startTime < end` and `start < endTime`. If both conditions are `true`, there is an overlap, so return `false`.
3. If no overlap is found, append the new event to the list and return `true`.

::tabs-start

```python
class MyCalendar:

    def __init__(self):
        self.events = []

    def book(self, startTime: int, endTime: int) -> bool:
        for start, end in self.events:
            if startTime < end and start < endTime:
                return False

        self.events.append((startTime, endTime))
        return True
```

```java
public class MyCalendar {
    private List<int[]> events;

    public MyCalendar() {
        events = new ArrayList<>();
    }

    public boolean book(int startTime, int endTime) {
        for (int[] event : events) {
            if (startTime < event[1] && event[0] < endTime) {
                return false;
            }
        }
        events.add(new int[]{startTime, endTime});
        return true;
    }
}
```

```cpp
class MyCalendar {
private:
    vector<pair<int, int>> events;

public:
    MyCalendar() {}

    bool book(int startTime, int endTime) {
        for (const auto& event : events) {
            if (startTime < event.second && event.first < endTime) {
                return false;
            }
        }
        events.push_back({startTime, endTime});
        return true;
    }
};
```

```javascript
class MyCalendar {
    constructor() {
        this.events = [];
    }

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @return {boolean}
     */
    book(startTime, endTime) {
        for (const [start, end] of this.events) {
            if (startTime < end && start < endTime) {
                return false;
            }
        }
        this.events.push([startTime, endTime]);
        return true;
    }
}
```

```csharp
public class MyCalendar {
    private List<int[]> events;

    public MyCalendar() {
        events = new List<int[]>();
    }

    public bool Book(int startTime, int endTime) {
        foreach (var ev in events) {
            if (startTime < ev[1] && ev[0] < endTime) {
                return false;
            }
        }
        events.Add(new int[] { startTime, endTime });
        return true;
    }
}
```

```go
type MyCalendar struct {
    events [][2]int
}

func Constructor() MyCalendar {
    return MyCalendar{events: [][2]int{}}
}

func (mc *MyCalendar) Book(startTime int, endTime int) bool {
    for _, event := range mc.events {
        if startTime < event[1] && event[0] < endTime {
            return false
        }
    }
    mc.events = append(mc.events, [2]int{startTime, endTime})
    return true
}
```

```kotlin
class MyCalendar() {
    private val events = mutableListOf<IntArray>()

    fun book(startTime: Int, endTime: Int): Boolean {
        for (event in events) {
            if (startTime < event[1] && event[0] < endTime) {
                return false
            }
        }
        events.add(intArrayOf(startTime, endTime))
        return true
    }
}
```

```swift
class MyCalendar {
    private var events: [(Int, Int)]

    init() {
        events = []
    }

    func book(_ startTime: Int, _ endTime: Int) -> Bool {
        for (start, end) in events {
            if startTime < end && start < endTime {
                return false
            }
        }
        events.append((startTime, endTime))
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for each $book()$ function call.
- Space complexity: $O(n)$

---

## 2. Binary Search Tree

### Intuition

We can organize events in a binary search tree where each node represents a booked interval. The tree is ordered by start times: intervals that end before a node's start time go to the left subtree, and intervals that start after a node's end time go to the right subtree. When inserting a new interval, we traverse the tree to find where it fits without overlapping any existing node. If it overlaps with a node during traversal, we reject it.

### Algorithm

1. Each tree node stores `(start, end)` and has `left` and `right` children.
2. When `book(startTime, endTime)` is called:
   - If the tree is empty, create the root node with this interval and return `true`.
   - Otherwise, traverse from the root:
     - If `endTime <= node.start`, the new interval belongs in the `left` subtree.
     - If `startTime >= node.end`, the new interval belongs in the `right` subtree.
     - Otherwise, there is an overlap, so return `false`.
   - When reaching a `null` child pointer, insert the new node there and return `true`.

::tabs-start

```python
class TreeNode:
    def __init__(self, start: int, end: int):
        self.start = start
        self.end = end
        self.left = None
        self.right = None

class MyCalendar:

    def __init__(self):
        self.root = None

    def _insert(self, node: TreeNode, start: int, end: int) -> bool:
        if end <= node.start:
            if not node.left:
                node.left = TreeNode(start, end)
                return True
            return self._insert(node.left, start, end)
        elif start >= node.end:
            if not node.right:
                node.right = TreeNode(start, end)
                return True
            return self._insert(node.right, start, end)
        else:
            return False

    def book(self, startTime: int, endTime: int) -> bool:
        if not self.root:
            self.root = TreeNode(startTime, endTime)
            return True
        return self._insert(self.root, startTime, endTime)
```

```java
class TreeNode {
    int start, end;
    TreeNode left, right;

    TreeNode(int start, int end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}

public class MyCalendar {
    private TreeNode root;

    public MyCalendar() {
        root = null;
    }

    private boolean insert(TreeNode node, int start, int end) {
        if (end <= node.start) {
            if (node.left == null) {
                node.left = new TreeNode(start, end);
                return true;
            }
            return insert(node.left, start, end);
        } else if (start >= node.end) {
            if (node.right == null) {
                node.right = new TreeNode(start, end);
                return true;
            }
            return insert(node.right, start, end);
        }
        return false;
    }

    public boolean book(int startTime, int endTime) {
        if (root == null) {
            root = new TreeNode(startTime, endTime);
            return true;
        }
        return insert(root, startTime, endTime);
    }
}
```

```cpp
class MyCalendar {
private:
    struct TreeNode {
        int start, end;
        TreeNode *left, *right;

        TreeNode(int start, int end) : start(start), end(end), left(nullptr), right(nullptr) {}
    };
    TreeNode *root;

    bool insert(TreeNode *node, int start, int end) {
        if (end <= node->start) {
            if (!node->left) {
                node->left = new TreeNode(start, end);
                return true;
            }
            return insert(node->left, start, end);
        } else if (start >= node->end) {
            if (!node->right) {
                node->right = new TreeNode(start, end);
                return true;
            }
            return insert(node->right, start, end);
        }
        return false;
    }

public:
    MyCalendar() : root(nullptr) {}

    bool book(int startTime, int endTime) {
        if (!root) {
            root = new TreeNode(startTime, endTime);
            return true;
        }
        return insert(root, startTime, endTime);
    }
};
```

```javascript
class TreeNode {
    /**
     * @constructor
     * @param {number} start
     * @param {number} end
     */
    constructor(start, end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}

class MyCalendar {
    constructor() {
        this.root = null;
    }

    /**
     * @param {TreeNode} node
     * @param {number} start
     * @param {number} end
     * @return {boolean}
     */
    insert(node, start, end) {
        if (end <= node.start) {
            if (!node.left) {
                node.left = new TreeNode(start, end);
                return true;
            }
            return this.insert(node.left, start, end);
        } else if (start >= node.end) {
            if (!node.right) {
                node.right = new TreeNode(start, end);
                return true;
            }
            return this.insert(node.right, start, end);
        }
        return false;
    }

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @return {boolean}
     */
    book(startTime, endTIme) {
        if (!this.root) {
            this.root = new TreeNode(startTime, endTime);
            return true;
        }
        return this.insert(this.root, startTime, endTime);
    }
}
```

```csharp
public class TreeNode {
    public int start, end;
    public TreeNode left, right;

    public TreeNode(int start, int end) {
        this.start = start;
        this.end = end;
        this.left = null;
        this.right = null;
    }
}

public class MyCalendar {
    private TreeNode root;

    public MyCalendar() {
        root = null;
    }

    private bool Insert(TreeNode node, int start, int end) {
        if (end <= node.start) {
            if (node.left == null) {
                node.left = new TreeNode(start, end);
                return true;
            }
            return Insert(node.left, start, end);
        } else if (start >= node.end) {
            if (node.right == null) {
                node.right = new TreeNode(start, end);
                return true;
            }
            return Insert(node.right, start, end);
        }
        return false;
    }

    public bool Book(int startTime, int endTime) {
        if (root == null) {
            root = new TreeNode(startTime, endTime);
            return true;
        }
        return Insert(root, startTime, endTime);
    }
}
```

```go
type TreeNode struct {
    start, end int
    left, right *TreeNode
}

type MyCalendar struct {
    root *TreeNode
}

func Constructor() MyCalendar {
    return MyCalendar{root: nil}
}

func (mc *MyCalendar) insert(node *TreeNode, start, end int) bool {
    if end <= node.start {
        if node.left == nil {
            node.left = &TreeNode{start: start, end: end}
            return true
        }
        return mc.insert(node.left, start, end)
    } else if start >= node.end {
        if node.right == nil {
            node.right = &TreeNode{start: start, end: end}
            return true
        }
        return mc.insert(node.right, start, end)
    }
    return false
}

func (mc *MyCalendar) Book(startTime int, endTime int) bool {
    if mc.root == nil {
        mc.root = &TreeNode{start: startTime, end: endTime}
        return true
    }
    return mc.insert(mc.root, startTime, endTime)
}
```

```kotlin
class TreeNode(var start: Int, var end: Int) {
    var left: TreeNode? = null
    var right: TreeNode? = null
}

class MyCalendar() {
    private var root: TreeNode? = null

    private fun insert(node: TreeNode, start: Int, end: Int): Boolean {
        return if (end <= node.start) {
            if (node.left == null) {
                node.left = TreeNode(start, end)
                true
            } else {
                insert(node.left!!, start, end)
            }
        } else if (start >= node.end) {
            if (node.right == null) {
                node.right = TreeNode(start, end)
                true
            } else {
                insert(node.right!!, start, end)
            }
        } else {
            false
        }
    }

    fun book(startTime: Int, endTime: Int): Boolean {
        if (root == null) {
            root = TreeNode(startTime, endTime)
            return true
        }
        return insert(root!!, startTime, endTime)
    }
}
```

```swift
class TreeNode {
    var start: Int
    var end: Int
    var left: TreeNode?
    var right: TreeNode?

    init(_ start: Int, _ end: Int) {
        self.start = start
        self.end = end
        self.left = nil
        self.right = nil
    }
}

class MyCalendar {
    private var root: TreeNode?

    init() {
        root = nil
    }

    private func insert(_ node: TreeNode, _ start: Int, _ end: Int) -> Bool {
        if end <= node.start {
            if node.left == nil {
                node.left = TreeNode(start, end)
                return true
            }
            return insert(node.left!, start, end)
        } else if start >= node.end {
            if node.right == nil {
                node.right = TreeNode(start, end)
                return true
            }
            return insert(node.right!, start, end)
        }
        return false
    }

    func book(_ startTime: Int, _ endTime: Int) -> Bool {
        if root == nil {
            root = TreeNode(startTime, endTime)
            return true
        }
        return insert(root!, startTime, endTime)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ in average case, $O(n)$ in worst case for each $book()$ function call.
- Space complexity: $O(n)$

---

## 3. Binary Search + Ordered Set

### Intuition

By keeping events sorted by start time, we can use binary search to quickly find where a new event would be inserted. We only need to check the immediate neighbors (the event just before and just after the insertion point) for potential overlaps. If the previous event ends after our start time, or the next event starts before our end time, we have a conflict. This gives us logarithmic search time per booking.

### Algorithm

1. Maintain a sorted collection of events ordered by start time.
2. When `book(startTime, endTime)` is called:
   - Use binary search to find the `idx` for the new event.
   - Check the event at the previous index (if it exists): if its end time is greater than `startTime`, return `false`.
   - Check the event at the current `idx` (if it exists): if its start time is less than `endTime`, return `false`.
3. If no conflicts, insert the new event at the correct position and return `true`.

::tabs-start

```python
class MyCalendar:

    def __init__(self):
        self.events = SortedList()

    def book(self, startTime: int, endTime: int) -> bool:
        idx = self.events.bisect_left((startTime, endTime))
        if idx > 0 and self.events[idx - 1][1] > startTime:
            return False
        if idx < len(self.events) and self.events[idx][0] < endTime:
            return False
        self.events.add((startTime, endTime))
        return True
```

```java
public class MyCalendar {
    private TreeSet<int[]> events;

    public MyCalendar() {
        events = new TreeSet<>((a, b) -> a[0] - b[0]);
    }

    public boolean book(int startTime, int endTime) {
        int[] event = new int[]{startTime, endTime};
        int[] prev = events.floor(event);
        int[] next = events.ceiling(event);

        if ((prev != null && prev[1] > startTime) || (next != null && next[0] < endTime)) {
            return false;
        }
        events.add(event);
        return true;
    }
}
```

```cpp
class MyCalendar {
private:
    set<pair<int, int>> events;

public:
    MyCalendar() {}

    bool book(int startTime, int endTime) {
        if (startTime >= endTime) {
            return false;
        }

        auto next = events.lower_bound({startTime, startTime});
        if (next != events.end() && next->first < endTime) {
            return false;
        }
        if (next != events.begin()) {
            auto prev = std::prev(next);
            if (prev->second > startTime) {
                return false;
            }
        }

        events.insert({startTime, endTime});
        return true;
    }
};
```

```javascript
class MyCalendar {
    constructor() {
        this.events = [];
    }

    /**
     * @param {number} startTime
     * @param {number} endTime
     * @return {boolean}
     */
    book(startTime, endTIme) {
        if (startTime >= endTime) {
            return false;
        }

        const binarySearch = (target) => {
            let left = 0,
                right = this.events.length;

            while (left < right) {
                let mid = Math.floor((left + right) / 2);
                if (this.events[mid][0] < target) {
                    left = mid + 1;
                } else {
                    right = mid;
                }
            }
            return left;
        };

        const idx = binarySearch(startTime);
        if (idx > 0 && this.events[idx - 1][1] > startTime) {
            return false;
        }
        if (idx < this.events.length && this.events[idx][0] < endTime) {
            return false;
        }
        this.events.splice(idx, 0, [startTime, endTime]);
        return true;
    }
}
```

```csharp
public class MyCalendar {
    private List<int[]> events;

    public MyCalendar() {
        events = new List<int[]>();
    }

    public bool Book(int startTime, int endTime) {
        int idx = BinarySearch(startTime);
        if (idx > 0 && events[idx - 1][1] > startTime) {
            return false;
        }
        if (idx < events.Count && events[idx][0] < endTime) {
            return false;
        }
        events.Insert(idx, new int[] { startTime, endTime });
        return true;
    }

    private int BinarySearch(int target) {
        int left = 0, right = events.Count;
        while (left < right) {
            int mid = (left + right) / 2;
            if (events[mid][0] < target) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }
        return left;
    }
}
```

```go
import "sort"

type MyCalendar struct {
    events [][2]int
}

func Constructor() MyCalendar {
    return MyCalendar{events: [][2]int{}}
}

func (mc *MyCalendar) Book(startTime int, endTime int) bool {
    idx := sort.Search(len(mc.events), func(i int) bool {
        return mc.events[i][0] >= startTime
    })
    if idx > 0 && mc.events[idx-1][1] > startTime {
        return false
    }
    if idx < len(mc.events) && mc.events[idx][0] < endTime {
        return false
    }
    mc.events = append(mc.events[:idx], append([][2]int{{startTime, endTime}}, mc.events[idx:]...)...)
    return true
}
```

```kotlin
class MyCalendar() {
    private val events = mutableListOf<IntArray>()

    fun book(startTime: Int, endTime: Int): Boolean {
        val idx = binarySearch(startTime)
        if (idx > 0 && events[idx - 1][1] > startTime) {
            return false
        }
        if (idx < events.size && events[idx][0] < endTime) {
            return false
        }
        events.add(idx, intArrayOf(startTime, endTime))
        return true
    }

    private fun binarySearch(target: Int): Int {
        var left = 0
        var right = events.size
        while (left < right) {
            val mid = (left + right) / 2
            if (events[mid][0] < target) {
                left = mid + 1
            } else {
                right = mid
            }
        }
        return left
    }
}
```

```swift
class MyCalendar {
    private var events: [(Int, Int)]

    init() {
        events = []
    }

    func book(_ startTime: Int, _ endTime: Int) -> Bool {
        let idx = binarySearch(startTime)
        if idx > 0 && events[idx - 1].1 > startTime {
            return false
        }
        if idx < events.count && events[idx].0 < endTime {
            return false
        }
        events.insert((startTime, endTime), at: idx)
        return true
    }

    private func binarySearch(_ target: Int) -> Int {
        var left = 0
        var right = events.count
        while left < right {
            let mid = (left + right) / 2
            if events[mid].0 < target {
                left = mid + 1
            } else {
                right = mid
            }
        }
        return left
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ for each $book()$ function call.
- Space complexity: $O(n)$
