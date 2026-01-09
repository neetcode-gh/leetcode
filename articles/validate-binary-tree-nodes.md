## 1. Depth First Search

### Intuition
A valid binary tree must have exactly one root (a node with no parent), every other node must have exactly one parent, and all nodes must be reachable from the root without cycles. The key insight is that we can identify the root as the only node that never appears as a child, then use DFS to verify that we can reach all n nodes without revisiting any node.

### Algorithm
1. Build a set of all nodes that have a parent by collecting values from `leftChild` and `rightChild` arrays.
2. Find the root by identifying the node that is not in the `hasParent` set. If all nodes have parents, there is no root, so return `false`.
3. Perform `dfs` starting from the root, tracking visited nodes to detect cycles.
4. For each node, recursively visit its left and right children if they exist.
5. If we encounter a node that was already visited, a cycle exists, so return `false`.
6. After `dfs` completes, verify that we visited exactly `n` nodes to ensure all nodes are connected.

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

```csharp
public class Solution {
    private HashSet<int> visit;

    public bool ValidateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        HashSet<int> hasParent = new HashSet<int>();
        foreach (int c in leftChild) if (c != -1) hasParent.Add(c);
        foreach (int c in rightChild) if (c != -1) hasParent.Add(c);
        if (hasParent.Count == n) return false;

        int root = -1;
        for (int i = 0; i < n; i++) {
            if (!hasParent.Contains(i)) {
                root = i;
                break;
            }
        }
        visit = new HashSet<int>();
        return Dfs(root, leftChild, rightChild) && visit.Count == n;
    }

    private bool Dfs(int i, int[] leftChild, int[] rightChild) {
        if (i == -1) return true;
        if (visit.Contains(i)) return false;
        visit.Add(i);
        return Dfs(leftChild[i], leftChild, rightChild) &&
               Dfs(rightChild[i], leftChild, rightChild);
    }
}
```

```go
func validateBinaryTreeNodes(n int, leftChild []int, rightChild []int) bool {
    hasParent := make(map[int]bool)
    for _, c := range leftChild {
        if c != -1 {
            hasParent[c] = true
        }
    }
    for _, c := range rightChild {
        if c != -1 {
            hasParent[c] = true
        }
    }
    if len(hasParent) == n {
        return false
    }

    root := -1
    for i := 0; i < n; i++ {
        if !hasParent[i] {
            root = i
            break
        }
    }

    visit := make(map[int]bool)
    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == -1 {
            return true
        }
        if visit[i] {
            return false
        }
        visit[i] = true
        return dfs(leftChild[i]) && dfs(rightChild[i])
    }

    return dfs(root) && len(visit) == n
}
```

```kotlin
class Solution {
    private val visit = HashSet<Int>()

    fun validateBinaryTreeNodes(n: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        val hasParent = HashSet<Int>()
        for (c in leftChild) if (c != -1) hasParent.add(c)
        for (c in rightChild) if (c != -1) hasParent.add(c)
        if (hasParent.size == n) return false

        var root = -1
        for (i in 0 until n) {
            if (i !in hasParent) {
                root = i
                break
            }
        }
        visit.clear()
        return dfs(root, leftChild, rightChild) && visit.size == n
    }

    private fun dfs(i: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        if (i == -1) return true
        if (i in visit) return false
        visit.add(i)
        return dfs(leftChild[i], leftChild, rightChild) &&
               dfs(rightChild[i], leftChild, rightChild)
    }
}
```

```swift
class Solution {
    func validateBinaryTreeNodes(_ n: Int, _ leftChild: [Int], _ rightChild: [Int]) -> Bool {
        var hasParent = Set<Int>()
        for c in leftChild where c != -1 { hasParent.insert(c) }
        for c in rightChild where c != -1 { hasParent.insert(c) }
        if hasParent.count == n { return false }

        var root = -1
        for i in 0..<n {
            if !hasParent.contains(i) {
                root = i
                break
            }
        }

        var visit = Set<Int>()
        func dfs(_ i: Int) -> Bool {
            if i == -1 { return true }
            if visit.contains(i) { return false }
            visit.insert(i)
            return dfs(leftChild[i]) && dfs(rightChild[i])
        }

        return dfs(root) && visit.count == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Breadth First Search

### Intuition
Instead of using recursion, we can use BFS to traverse the tree level by level. The approach uses indegree counting: in a valid binary tree, every node except the root has exactly one incoming edge (one parent). By tracking indegrees, we can detect nodes with multiple parents and identify the unique root.

### Algorithm
1. Create an `indegree` array and count incoming edges for each node from both `leftChild` and `rightChild` arrays.
2. If any node has an `indegree` greater than `1` (multiple parents), return `false` immediately.
3. Find the root by locating the node with `indegree == 0`. If there are multiple such nodes or none, return `false`.
4. Perform `bfs` starting from the root using a queue, counting visited nodes.
5. For each node dequeued, add its valid children to the queue.
6. After `bfs` completes, return `true` only if the count of visited nodes equals `n`.

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

```csharp
public class Solution {
    public bool ValidateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
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
        Queue<int> q = new Queue<int>();
        q.Enqueue(root);

        while (q.Count > 0) {
            int node = q.Dequeue();
            count++;
            if (leftChild[node] != -1) q.Enqueue(leftChild[node]);
            if (rightChild[node] != -1) q.Enqueue(rightChild[node]);
        }
        return count == n;
    }
}
```

```go
func validateBinaryTreeNodes(n int, leftChild []int, rightChild []int) bool {
    indegree := make([]int, n)
    for i := 0; i < n; i++ {
        if leftChild[i] != -1 {
            indegree[leftChild[i]]++
            if indegree[leftChild[i]] > 1 {
                return false
            }
        }
        if rightChild[i] != -1 {
            indegree[rightChild[i]]++
            if indegree[rightChild[i]] > 1 {
                return false
            }
        }
    }

    root := -1
    for i := 0; i < n; i++ {
        if indegree[i] == 0 {
            if root != -1 {
                return false
            }
            root = i
        }
    }

    if root == -1 {
        return false
    }

    count := 0
    q := []int{root}

    for len(q) > 0 {
        node := q[0]
        q = q[1:]
        count++
        if leftChild[node] != -1 {
            q = append(q, leftChild[node])
        }
        if rightChild[node] != -1 {
            q = append(q, rightChild[node])
        }
    }
    return count == n
}
```

```kotlin
class Solution {
    fun validateBinaryTreeNodes(n: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        val indegree = IntArray(n)
        for (i in 0 until n) {
            if (leftChild[i] != -1) {
                if (++indegree[leftChild[i]] > 1) return false
            }
            if (rightChild[i] != -1) {
                if (++indegree[rightChild[i]] > 1) return false
            }
        }

        var root = -1
        for (i in 0 until n) {
            if (indegree[i] == 0) {
                if (root != -1) return false
                root = i
            }
        }

        if (root == -1) return false

        var count = 0
        val q: Queue<Int> = LinkedList()
        q.offer(root)

        while (q.isNotEmpty()) {
            val node = q.poll()
            count++
            if (leftChild[node] != -1) q.offer(leftChild[node])
            if (rightChild[node] != -1) q.offer(rightChild[node])
        }
        return count == n
    }
}
```

```swift
class Solution {
    func validateBinaryTreeNodes(_ n: Int, _ leftChild: [Int], _ rightChild: [Int]) -> Bool {
        var indegree = [Int](repeating: 0, count: n)
        for i in 0..<n {
            if leftChild[i] != -1 {
                indegree[leftChild[i]] += 1
                if indegree[leftChild[i]] > 1 { return false }
            }
            if rightChild[i] != -1 {
                indegree[rightChild[i]] += 1
                if indegree[rightChild[i]] > 1 { return false }
            }
        }

        var root = -1
        for i in 0..<n {
            if indegree[i] == 0 {
                if root != -1 { return false }
                root = i
            }
        }

        if root == -1 { return false }

        var count = 0
        var q = [root]

        while !q.isEmpty {
            let node = q.removeFirst()
            count += 1
            if leftChild[node] != -1 { q.append(leftChild[node]) }
            if rightChild[node] != -1 { q.append(rightChild[node]) }
        }
        return count == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Iterative DFS

### Intuition
This approach combines the indegree validation from BFS with an iterative stack-based traversal instead of recursion. Using a stack avoids potential stack overflow issues for deep trees while maintaining the same logical flow as recursive DFS.

### Algorithm
1. Create an `indegree` array and count incoming edges for each node.
2. Return `false` if any node has more than one parent.
3. Find the unique root node with `indegree == 0`. Return `false` if no root exists or multiple roots exist.
4. Initialize a stack with the root node and a counter for visited nodes.
5. Pop nodes from the stack, increment the counter, and push valid children onto the stack.
6. After the stack is empty, verify that the count equals `n` to confirm all nodes are reachable.

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

```csharp
public class Solution {
    public bool ValidateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
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
        Stack<int> stack = new Stack<int>();
        stack.Push(root);

        while (stack.Count > 0) {
            int node = stack.Pop();
            count++;
            if (leftChild[node] != -1) stack.Push(leftChild[node]);
            if (rightChild[node] != -1) stack.Push(rightChild[node]);
        }
        return count == n;
    }
}
```

```go
func validateBinaryTreeNodes(n int, leftChild []int, rightChild []int) bool {
    indegree := make([]int, n)
    for i := 0; i < n; i++ {
        if leftChild[i] != -1 {
            indegree[leftChild[i]]++
            if indegree[leftChild[i]] > 1 {
                return false
            }
        }
        if rightChild[i] != -1 {
            indegree[rightChild[i]]++
            if indegree[rightChild[i]] > 1 {
                return false
            }
        }
    }

    root := -1
    for i := 0; i < n; i++ {
        if indegree[i] == 0 {
            if root != -1 {
                return false
            }
            root = i
        }
    }

    if root == -1 {
        return false
    }

    count := 0
    stack := []int{root}

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        count++
        if leftChild[node] != -1 {
            stack = append(stack, leftChild[node])
        }
        if rightChild[node] != -1 {
            stack = append(stack, rightChild[node])
        }
    }
    return count == n
}
```

```kotlin
class Solution {
    fun validateBinaryTreeNodes(n: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        val indegree = IntArray(n)
        for (i in 0 until n) {
            if (leftChild[i] != -1) {
                if (++indegree[leftChild[i]] > 1) return false
            }
            if (rightChild[i] != -1) {
                if (++indegree[rightChild[i]] > 1) return false
            }
        }

        var root = -1
        for (i in 0 until n) {
            if (indegree[i] == 0) {
                if (root != -1) return false
                root = i
            }
        }

        if (root == -1) return false

        var count = 0
        val stack = ArrayDeque<Int>()
        stack.addLast(root)

        while (stack.isNotEmpty()) {
            val node = stack.removeLast()
            count++
            if (leftChild[node] != -1) stack.addLast(leftChild[node])
            if (rightChild[node] != -1) stack.addLast(rightChild[node])
        }
        return count == n
    }
}
```

```swift
class Solution {
    func validateBinaryTreeNodes(_ n: Int, _ leftChild: [Int], _ rightChild: [Int]) -> Bool {
        var indegree = [Int](repeating: 0, count: n)
        for i in 0..<n {
            if leftChild[i] != -1 {
                indegree[leftChild[i]] += 1
                if indegree[leftChild[i]] > 1 { return false }
            }
            if rightChild[i] != -1 {
                indegree[rightChild[i]] += 1
                if indegree[rightChild[i]] > 1 { return false }
            }
        }

        var root = -1
        for i in 0..<n {
            if indegree[i] == 0 {
                if root != -1 { return false }
                root = i
            }
        }

        if root == -1 { return false }

        var count = 0
        var stack = [root]

        while !stack.isEmpty {
            let node = stack.removeLast()
            count += 1
            if leftChild[node] != -1 { stack.append(leftChild[node]) }
            if rightChild[node] != -1 { stack.append(rightChild[node]) }
        }
        return count == n
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Disjoint Set Union

### Intuition
Union-Find provides an elegant way to detect cycles and verify connectivity. The key insight is that in a valid tree, connecting a parent to a child should always merge two separate components. If the child already has a parent (its root is not itself) or connecting them would create a cycle (same root), the structure is invalid.

### Algorithm
1. Initialize a DSU structure where each node is its own parent, with `n` separate components.
2. For each parent node, attempt to `union` it with its left and right children.
3. During `union`, check that the child's root equals itself (meaning it has no parent yet) and that the parent and child are not already in the same component.
4. If the `union` fails these checks, return `false` as it indicates multiple parents or a cycle.
5. For each successful `union`, decrement the component count.
6. After processing all edges, return `true` only if there is exactly one connected component.

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

```csharp
public class DSU {
    private int[] Parent;
    public int Components;

    public DSU(int n) {
        Parent = new int[n];
        for (int i = 0; i < n; i++) {
            Parent[i] = i;
        }
        Components = n;
    }

    public int Find(int node) {
        if (Parent[node] != node) {
            Parent[node] = Find(Parent[node]);
        }
        return Parent[node];
    }

    public bool Union(int parent, int child) {
        int parentRoot = Find(parent);
        int childRoot = Find(child);
        if (childRoot != child || parentRoot == childRoot) {
            return false;
        }

        Components--;
        Parent[childRoot] = parentRoot;
        return true;
    }
}

public class Solution {
    public bool ValidateBinaryTreeNodes(int n, int[] leftChild, int[] rightChild) {
        DSU dsu = new DSU(n);

        for (int parent = 0; parent < n; parent++) {
            foreach (int child in new int[] { leftChild[parent], rightChild[parent] }) {
                if (child == -1) continue;
                if (!dsu.Union(parent, child)) return false;
            }
        }

        return dsu.Components == 1;
    }
}
```

```go
type DSU struct {
    Parent     []int
    Components int
}

func NewDSU(n int) *DSU {
    parent := make([]int, n)
    for i := 0; i < n; i++ {
        parent[i] = i
    }
    return &DSU{Parent: parent, Components: n}
}

func (dsu *DSU) Find(node int) int {
    if dsu.Parent[node] != node {
        dsu.Parent[node] = dsu.Find(dsu.Parent[node])
    }
    return dsu.Parent[node]
}

func (dsu *DSU) Union(parent, child int) bool {
    parentRoot := dsu.Find(parent)
    childRoot := dsu.Find(child)
    if childRoot != child || parentRoot == childRoot {
        return false
    }

    dsu.Components--
    dsu.Parent[childRoot] = parentRoot
    return true
}

func validateBinaryTreeNodes(n int, leftChild []int, rightChild []int) bool {
    dsu := NewDSU(n)

    for parent := 0; parent < n; parent++ {
        for _, child := range []int{leftChild[parent], rightChild[parent]} {
            if child == -1 {
                continue
            }
            if !dsu.Union(parent, child) {
                return false
            }
        }
    }

    return dsu.Components == 1
}
```

```kotlin
class DSU(n: Int) {
    private val parent = IntArray(n) { it }
    var components = n
        private set

    fun find(node: Int): Int {
        if (parent[node] != node) {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    fun union(parentNode: Int, child: Int): Boolean {
        val parentRoot = find(parentNode)
        val childRoot = find(child)
        if (childRoot != child || parentRoot == childRoot) {
            return false
        }

        components--
        parent[childRoot] = parentRoot
        return true
    }
}

class Solution {
    fun validateBinaryTreeNodes(n: Int, leftChild: IntArray, rightChild: IntArray): Boolean {
        val dsu = DSU(n)

        for (parent in 0 until n) {
            for (child in listOf(leftChild[parent], rightChild[parent])) {
                if (child == -1) continue
                if (!dsu.union(parent, child)) return false
            }
        }

        return dsu.components == 1
    }
}
```

```swift
class DSU {
    var parent: [Int]
    var components: Int

    init(_ n: Int) {
        parent = Array(0..<n)
        components = n
    }

    func find(_ node: Int) -> Int {
        if parent[node] != node {
            parent[node] = find(parent[node])
        }
        return parent[node]
    }

    func union(_ parentNode: Int, _ child: Int) -> Bool {
        let parentRoot = find(parentNode)
        let childRoot = find(child)
        if childRoot != child || parentRoot == childRoot {
            return false
        }

        components -= 1
        parent[childRoot] = parentRoot
        return true
    }
}

class Solution {
    func validateBinaryTreeNodes(_ n: Int, _ leftChild: [Int], _ rightChild: [Int]) -> Bool {
        let dsu = DSU(n)

        for parent in 0..<n {
            for child in [leftChild[parent], rightChild[parent]] {
                if child == -1 { continue }
                if !dsu.union(parent, child) { return false }
            }
        }

        return dsu.components == 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
