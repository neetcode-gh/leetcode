## 1. Depth First Search

::tabs-start

```python
class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: List[int], rightChild: List[int]) -> bool:
        hasParent = set(leftChild + rightChild)
        hasParent.discard(-1)
        if len(hasParent) == n:
            return False

        root = -1
        for i in range(n):
            if i not in hasParent:
                root = i
                break

        visit = set()
        def dfs(i):
            if i == -1:
                return True
            if i in visit:
                return False
            visit.add(i)
            return dfs(leftChild[i]) and dfs(rightChild[i])

        return dfs(root) and len(visit) == n
```

```java
public class Solution {
    private Set<Integer> visit;

    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        Set<Integer> hasParent = new HashSet<>();
        for (int c : leftChild) if (c != -1) hasParent.add(c);
        for (int c : rightChild) if (c != -1) hasParent.add(c);
        if (hasParent.size() == n) return false;

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (!hasParent.contains(i)) {
                root = i;
                break;
            }
        }
        visit = new HashSet<>();
        return dfs(root, leftChild, rightChild) && visit.size() == n;
    }

    private boolean dfs(int i, int[] leftChild, int[] rightChild) {
        if (i == -1) return true;
        if (visit.contains(i)) return false;
        visit.add(i);
        return dfs(leftChild[i], leftChild, rightChild) &&
               dfs(rightChild[i], leftChild, rightChild);
    }
}
```

```cpp
class Solution {
public:
    unordered_set<int> visit;

    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
        unordered_set<int> hasParent;
        for (int c : leftChild) if (c != -1) hasParent.insert(c);
        for (int c : rightChild) if (c != -1) hasParent.insert(c);
        if (hasParent.size() == n) return false;

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (!hasParent.count(i)) {
                root = i;
                break;
            }
        }
        return dfs(root, leftChild, rightChild) && visit.size() == n;
    }

private:
    bool dfs(int i, vector<int>& leftChild, vector<int>& rightChild) {
        if (i == -1) return true;
        if (visit.count(i)) return false;
        visit.insert(i);
        return dfs(leftChild[i], leftChild, rightChild) &&
               dfs(rightChild[i], leftChild, rightChild);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} leftChild
     * @param {number[]} rightChild
     * @return {boolean}
     */
    validateBinaryTreeNodes(n, leftChild, rightChild) {
        let hasParent = new Set(
            [...leftChild, ...rightChild].filter((c) => c !== -1),
        );
        if (hasParent.size === n) return false;

        let root = 0;
        for (let i = 0; i < n; i++) {
            if (!hasParent.has(i)) {
                root = i;
                break;
            }
        }

        const visit = new Set();
        const dfs = (i) => {
            if (i === -1) return true;
            if (visit.has(i)) return false;
            visit.add(i);
            return dfs(leftChild[i]) && dfs(rightChild[i]);
        };

        return dfs(root) && visit.size === n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Breadth First Search

::tabs-start

```python
class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: list[int], rightChild: list[int]) -> bool:
        indegree = [0] * n
        for i in range(n):
            if leftChild[i] != -1:
                indegree[leftChild[i]] += 1
                if indegree[leftChild[i]] > 1:
                    return False
            if rightChild[i] != -1:
                indegree[rightChild[i]] += 1
                if indegree[rightChild[i]] > 1:
                    return False

        root = -1
        for i in range(n):
            if indegree[i] == 0:
                if root != -1:
                    return False
                root = i

        if root == -1:
            return False

        count = 0
        q = deque([root])
        while q:
            i = q.popleft()
            count += 1
            if leftChild[i] != -1:
                q.append(leftChild[i])
            if rightChild[i] != -1:
                q.append(rightChild[i])
        return count == n
```

```java
public class Solution {
    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        int[] indegree = new int[n];
        for (int i = 0; i < n; i++) {
            if (leftChild[i] != -1) {
                if (++indegree[leftChild[i]] > 1) return false;
            }
            if (rightChild[i] != -1) {
                if (++indegree[rightChild[i]] > 1) return false;
            }
        }

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                if (root != -1) return false;
                root = i;
            }
        }

        if (root == -1) return false;

        int count = 0;
        Queue<Integer> q = new LinkedList<>();
        q.offer(root);

        while (!q.isEmpty()) {
            int i = q.poll();
            count++;
            if (leftChild[i] != -1) q.offer(leftChild[i]);
            if (rightChild[i] != -1) q.offer(rightChild[i]);
        }
        return count == n;
    }
}
```

```cpp
class Solution {
public:
    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
        vector<int> indegree(n, 0);
        for (int i = 0; i < n; i++) {
            if (leftChild[i] != -1) {
                if (++indegree[leftChild[i]] > 1) return false;
            }
            if (rightChild[i] != -1) {
                if (++indegree[rightChild[i]] > 1) return false;
            }
        }

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                if (root != -1) return false;
                root = i;
            }
        }

        if (root == -1) return false;

        int count = 0;
        queue<int> q;
        q.push(root);

        while (!q.empty()) {
            int i = q.front();q.pop();
            count++;
            if (leftChild[i] != -1) q.push(leftChild[i]);
            if (rightChild[i] != -1) q.push(rightChild[i]);
        }
        return count == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} leftChild
     * @param {number[]} rightChild
     * @return {boolean}
     */
    validateBinaryTreeNodes(n, leftChild, rightChild) {
        let indegree = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            if (leftChild[i] !== -1) {
                if (++indegree[leftChild[i]] > 1) return false;
            }
            if (rightChild[i] !== -1) {
                if (++indegree[rightChild[i]] > 1) return false;
            }
        }

        let root = -1;
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                if (root !== -1) return false;
                root = i;
            }
        }

        if (root === -1) return false;

        let count = 0;
        let q = new Queue([root]);

        while (!q.isEmpty()) {
            let i = q.pop();
            count++;
            if (leftChild[i] !== -1) q.push(leftChild[i]);
            if (rightChild[i] !== -1) q.push(rightChild[i]);
        }
        return count === n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

::tabs-start

```python
class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: list[int], rightChild: list[int]) -> bool:
        indegree = [0] * n
        for i in range(n):
            if leftChild[i] != -1:
                indegree[leftChild[i]] += 1
                if indegree[leftChild[i]] > 1:
                    return False
            if rightChild[i] != -1:
                indegree[rightChild[i]] += 1
                if indegree[rightChild[i]] > 1:
                    return False

        root = next((i for i in range(n) if indegree[i] == 0), -1)
        if root == -1:
            return False

        count, stack = 0, [root]
        while stack:
            node = stack.pop()
            count += 1
            if leftChild[node] != -1:
                stack.append(leftChild[node])
            if rightChild[node] != -1:
                stack.append(rightChild[node])

        return count == n
```

```java
public class Solution {
    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        int[] indegree = new int[n];
        for (int i = 0; i < n; i++) {
            if (leftChild[i] != -1) {
                if (++indegree[leftChild[i]] > 1) return false;
            }
            if (rightChild[i] != -1) {
                if (++indegree[rightChild[i]] > 1) return false;
            }
        }

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                if (root != -1) return false;
                root = i;
            }
        }

        if (root == -1) return false;

        int count = 0;
        Stack<Integer> stack = new Stack<>();
        stack.push(root);

        while (!stack.isEmpty()) {
            int node = stack.pop();
            count++;
            if (leftChild[node] != -1) stack.push(leftChild[node]);
            if (rightChild[node] != -1) stack.push(rightChild[node]);
        }
        return count == n;
    }
}
```

```cpp
class Solution {
public:
    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
        vector<int> indegree(n, 0);
        for (int i = 0; i < n; i++) {
            if (leftChild[i] != -1 && ++indegree[leftChild[i]] > 1) return false;
            if (rightChild[i] != -1 && ++indegree[rightChild[i]] > 1) return false;
        }

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (indegree[i] == 0) {
                if (root != -1) return false;
                root = i;
            }
        }

        if (root == -1) return false;

        int count = 0;
        stack<int> stk;
        stk.push(root);

        while (!stk.empty()) {
            int node = stk.top(); stk.pop();
            count++;
            if (leftChild[node] != -1) stk.push(leftChild[node]);
            if (rightChild[node] != -1) stk.push(rightChild[node]);
        }
        return count == n;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} leftChild
     * @param {number[]} rightChild
     * @return {boolean}
     */
    validateBinaryTreeNodes(n, leftChild, rightChild) {
        let indegree = new Array(n).fill(0);
        for (let i = 0; i < n; i++) {
            if (leftChild[i] !== -1) {
                if (++indegree[leftChild[i]] > 1) return false;
            }
            if (rightChild[i] !== -1) {
                if (++indegree[rightChild[i]] > 1) return false;
            }
        }

        let root = -1;
        for (let i = 0; i < n; i++) {
            if (indegree[i] === 0) {
                if (root !== -1) return false;
                root = i;
            }
        }

        if (root === -1) return false;

        let count = 0;
        let stack = [root];

        while (stack.length) {
            let node = stack.pop();
            count++;
            if (leftChild[node] !== -1) stack.push(leftChild[node]);
            if (rightChild[node] !== -1) stack.push(rightChild[node]);
        }
        return count === n;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Disjoint Set Union

::tabs-start

```python
class DSU:
    def __init__(self, n):
        self.Parent = list(range(n))
        self.Components = n

    def find(self, node):
        if self.Parent[node] != node:
            self.Parent[node] = self.find(self.Parent[node])
        return self.Parent[node]

    def union(self, parent, child):
        parentRoot = self.find(parent)
        childRoot = self.find(child)
        if childRoot != child or parentRoot == childRoot:
            return False

        self.Components -= 1
        self.Parent[childRoot] = parentRoot
        return True

class Solution:
    def validateBinaryTreeNodes(self, n: int, leftChild: list[int], rightChild: list[int]) -> bool:
        dsu = DSU(n)

        for parent in range(n):
            for child in (leftChild[parent], rightChild[parent]):
                if child == -1:
                    continue
                if not dsu.union(parent, child):
                    return False

        return dsu.Components == 1
```

```java
class DSU {
    int[] Parent;
    int Components;

    public DSU(int n) {
        Parent = new int[n];
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
        }
        Components = n;
    }

    public int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    public boolean union(int parent, int child) {
        int parentRoot = find(parent);
        int childRoot = find(child);
        if (childRoot != child || parentRoot == childRoot) {
            return false;
        }

        Components--;
        Parent[childRoot] = parentRoot;
        return true;
    }
}

class Solution {
    public boolean validateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        DSU dsu = new DSU(n);

        for (int parent = 0; parent < n; parent++) {
            for (int child : new int[]{leftChild[parent], rightChild[parent]}) {
                if (child == -1) continue;
                if (!dsu.union(parent, child)) return false;
            }
        }

        return dsu.Components == 1;
    }
}
```

```cpp
class DSU {
public:
    vector<int> Parent;
    int Components;

    DSU(int n) {
        Parent.resize(n);
        iota(Parent.begin(), Parent.end(), 0);
        Components = n;
    }

    int find(int node) {
        if (Parent[node] != node) {
            Parent[node] = find(Parent[node]);
        }
        return Parent[node];
    }

    bool unionSets(int parent, int child) {
        int parentRoot = find(parent);
        int childRoot = find(child);
        if (childRoot != child || parentRoot == childRoot) {
            return false;
        }

        Components--;
        Parent[childRoot] = parentRoot;
        return true;
    }
};

class Solution {
public:
    bool validateBinaryTreeNodes(int n, vector<int>& leftChild, vector<int>& rightChild) {
        DSU dsu(n);

        for (int parent = 0; parent < n; parent++) {
            for (int child : {leftChild[parent], rightChild[parent]}) {
                if (child == -1) continue;
                if (!dsu.unionSets(parent, child)) return false;
            }
        }

        return dsu.Components == 1;
    }
};
```

```javascript
class DSU {
    /**
     * @constructor
     * @param {number} n
     */
    constructor(n) {
        this.Parent = Array.from({ length: n }, (_, i) => i);
        this.Components = n;
    }

    /**
     * @param {number} node
     * @return {number}
     */
    find(node) {
        if (this.Parent[node] !== node) {
            this.Parent[node] = this.find(this.Parent[node]);
        }
        return this.Parent[node];
    }

    /**
     * @param {number} parent
     * @param {number} child
     * @return {boolean}
     */
    union(parent, child) {
        let parentRoot = this.find(parent);
        let childRoot = this.find(child);
        if (childRoot !== child || parentRoot === childRoot) {
            return false;
        }

        this.Components--;
        this.Parent[childRoot] = parentRoot;
        return true;
    }
}

class Solution {
    /**
     * @param {number} n
     * @param {number[]} leftChild
     * @param {number[]} rightChild
     * @return {boolean}
     */
    validateBinaryTreeNodes(n, leftChild, rightChild) {
        let dsu = new DSU(n);

        for (let parent = 0; parent < n; parent++) {
            for (let child of [leftChild[parent], rightChild[parent]]) {
                if (child === -1) continue;
                if (!dsu.union(parent, child)) return false;
            }
        }

        return dsu.Components === 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
