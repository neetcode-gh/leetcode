## 1. Iteration

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for each $book()$ function call.
- Space complexity: $O(n)$

---

## 2. Binary Search Tree

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ in average case, $O(n)$ in worst case for each $book()$ function call.
- Space complexity: $O(n)$

---

## 3. Binary Search + Ordered Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(\log n)$ for each $book()$ function call.
- Space complexity: $O(n)$
