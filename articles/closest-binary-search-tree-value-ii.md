## 1. Sort With Custom Comparator

### Intuition
The simplest approach is to collect all node values from the tree and then sort them based on their distance to the target. Once sorted, the first k elements are the closest values. This works because we just need the k values closest to the target, regardless of their original position in the tree.

### Algorithm
1. Perform a DFS traversal to collect all node values into an array.
2. Sort the array using a custom comparator that compares the absolute difference between each value and the target.
3. Return the first k elements from the sorted array.

::tabs-start

```python
class Solution:
    def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
        def dfs(node, arr):
            if not node:
                return
            
            arr.append(node.val)
            dfs(node.left, arr)
            dfs(node.right, arr)
        
        arr = []
        dfs(root, arr)
        
        arr.sort(key = lambda x: (abs(x - target), x))
        return arr[:k]
```

```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        List<Integer> arr = new ArrayList<>();
        dfs(root, arr);

        Collections.sort(arr, (o1, o2) -> Math.abs(o1 - target) <= Math.abs(o2 - target) ? -1 : 1);

        return arr.subList(0, k);

    }

    public void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }

        arr.add(node.val);
        dfs(node.left, arr);
        dfs(node.right, arr);
    }
}
```

```cpp
/**
 * Definition for a binary tree node.
 * struct TreeNode {
 *     int val;
 *     TreeNode *left;
 *     TreeNode *right;
 *     TreeNode() : val(0), left(nullptr), right(nullptr) {}
 *     TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
 *     TreeNode(int x, TreeNode *left, TreeNode *right) : val(x), left(left), right(right) {}
 * };
 */
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        vector<int> arr;
        dfs(root, arr);

        sort(arr.begin(), arr.end(), [&](int a, int b) {
            return abs(a - target) < abs(b - target);
        });

        return vector<int>(arr.begin(), arr.begin() + k);
    }

    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        arr.push_back(node->val);
        dfs(node->left, arr);
        dfs(node->right, arr);
    }
};
```

```javascript
/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     constructor(val = 0, left = null, right = null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @param {number} k
     * @return {number[]}
     */
    closestKValues(root, target, k) {
        const arr = [];
        this.dfs(root, arr);

        arr.sort((a, b) => Math.abs(a - target) - Math.abs(b - target));

        return arr.slice(0, k);
    }

    /**
     * @param {TreeNode} node
     * @param {number[]} arr
     */
    dfs(node, arr) {
        if (!node) return;
        arr.push(node.val);
        this.dfs(node.left, arr);
        this.dfs(node.right, arr);
    }
}
```

```csharp
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public int val;
 *     public TreeNode left;
 *     public TreeNode right;
 *     public TreeNode(int val=0, TreeNode left=null, TreeNode right=null) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
public class Solution {
    public IList<int> ClosestKValues(TreeNode root, double target, int k) {
        List<int> arr = new List<int>();
        Dfs(root, arr);

        arr.Sort((a, b) => Math.Abs(a - target).CompareTo(Math.Abs(b - target)));

        return arr.Take(k).ToList();
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        arr.Add(node.val);
        Dfs(node.left, arr);
        Dfs(node.right, arr);
    }
}
```

```go
/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func closestKValues(root *TreeNode, target float64, k int) []int {
    arr := []int{}
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        arr = append(arr, node.Val)
        dfs(node.Left)
        dfs(node.Right)
    }
    dfs(root)

    sort.Slice(arr, func(i, j int) bool {
        return math.Abs(float64(arr[i])-target) < math.Abs(float64(arr[j])-target)
    })

    return arr[:k]
}
```

```kotlin
/**
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int = 0) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun closestKValues(root: TreeNode?, target: Double, k: Int): List<Int> {
        val arr = mutableListOf<Int>()

        fun dfs(node: TreeNode?) {
            if (node == null) return
            arr.add(node.`val`)
            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        arr.sortBy { Math.abs(it - target) }

        return arr.take(k)
    }
}
```

```swift
/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     public var val: Int
 *     public var left: TreeNode?
 *     public var right: TreeNode?
 *     public init() { self.val = 0; self.left = nil; self.right = nil; }
 *     public init(_ val: Int) { self.val = val; self.left = nil; self.right = nil; }
 *     public init(_ val: Int, _ left: TreeNode?, _ right: TreeNode?) {
 *         self.val = val
 *         self.left = left
 *         self.right = right
 *     }
 * }
 */
class Solution {
    func closestKValues(_ root: TreeNode?, _ target: Double, _ k: Int) -> [Int] {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            arr.append(node.val)
            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        arr.sort { abs(Double($0) - target) < abs(Double($1) - target) }

        return Array(arr.prefix(k))
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree

---

## 2. Traverse With Heap

### Intuition
Instead of sorting all values, we can use a max-heap of size k to track the k closest values seen so far. As we traverse the tree, we compare each node's distance to the target with the farthest element in our heap. If the current node is closer, we replace the farthest element. This avoids sorting the entire array.

### Algorithm
1. Create a max-heap that orders elements by their distance from the target (farthest at the top).
2. Traverse all nodes in the tree using DFS.
3. For each node, add its value to the heap. If the heap size exceeds `k`, remove the element with the largest distance.
4. Return all elements remaining in the heap.

::tabs-start

```python
class Solution:
    def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
        def dfs(node, heap):
            if not node:
                return

            if len(heap) < k:
                heappush(heap, (-abs(node.val - target), node.val))
            else:
                if abs(node.val - target) <= abs(heap[0][0]):
                    heappop(heap)
                    heappush(heap, (-abs(node.val - target), node.val))

            dfs(node.left, heap)
            dfs(node.right, heap)

        heap = []
        dfs(root, heap)
        return [x[1] for x in heap]
```

```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        Queue<Integer> heap = new PriorityQueue<>((a, b) -> Math.abs(a - target) > Math.abs(b - target) ? -1: 1);
        dfs(root, heap, k);

        return new ArrayList<>(heap);
    }

    public void dfs(TreeNode node, Queue<Integer> heap, int k) {
        if (node == null) {
            return;
        }

        heap.add(node.val);
        if (heap.size() > k) {
            heap.remove();
        }

        dfs(node.left, heap, k);
        dfs(node.right, heap, k);
    }
}
```

```cpp
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        auto cmp = [&](int a, int b) {
            return abs(a - target) < abs(b - target);
        };
        priority_queue<int, vector<int>, decltype(cmp)> heap(cmp);

        function<void(TreeNode*)> dfs = [&](TreeNode* node) {
            if (!node) return;

            heap.push(node->val);
            if (heap.size() > k) {
                heap.pop();
            }

            dfs(node->left);
            dfs(node->right);
        };

        dfs(root);

        vector<int> res;
        while (!heap.empty()) {
            res.push_back(heap.top());
            heap.pop();
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @param {number} k
     * @return {number[]}
     */
    closestKValues(root, target, k) {
        const heap = new MaxPriorityQueue({
            compare: (a, b) => Math.abs(b - target) - Math.abs(a - target)
        });

        const dfs = (node) => {
            if (!node) return;

            heap.enqueue(node.val);
            if (heap.size() > k) {
                heap.dequeue();
            }

            dfs(node.left);
            dfs(node.right);
        };

        dfs(root);
        return heap.toArray();
    }
}
```

```csharp
public class Solution {
    public IList<int> ClosestKValues(TreeNode root, double target, int k) {
        var heap = new PriorityQueue<int, double>();

        void Dfs(TreeNode node) {
            if (node == null) return;

            heap.Enqueue(node.val, -Math.Abs(node.val - target));
            if (heap.Count > k) {
                heap.Dequeue();
            }

            Dfs(node.left);
            Dfs(node.right);
        }

        Dfs(root);

        var res = new List<int>();
        while (heap.Count > 0) {
            res.Add(heap.Dequeue());
        }
        return res;
    }
}
```

```go
func closestKValues(root *TreeNode, target float64, k int) []int {
    heap := &maxHeap{target: target}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        hp.Push(heap, node.Val)
        if heap.Len() > k {
            hp.Pop(heap)
        }

        dfs(node.Left)
        dfs(node.Right)
    }

    dfs(root)

    res := make([]int, heap.Len())
    for i := len(res) - 1; i >= 0; i-- {
        res[i] = hp.Pop(heap).(int)
    }
    return res
}

type maxHeap struct {
    data   []int
    target float64
}

func (h maxHeap) Len() int { return len(h.data) }
func (h maxHeap) Less(i, j int) bool {
    return math.Abs(float64(h.data[i])-h.target) > math.Abs(float64(h.data[j])-h.target)
}
func (h maxHeap) Swap(i, j int) { h.data[i], h.data[j] = h.data[j], h.data[i] }
func (h *maxHeap) Push(x interface{}) { h.data = append(h.data, x.(int)) }
func (h *maxHeap) Pop() interface{} {
    old := h.data
    n := len(old)
    x := old[n-1]
    h.data = old[:n-1]
    return x
}
```

```kotlin
class Solution {
    fun closestKValues(root: TreeNode?, target: Double, k: Int): List<Int> {
        val heap = PriorityQueue<Int> { a, b ->
            Math.abs(b - target).compareTo(Math.abs(a - target))
        }

        fun dfs(node: TreeNode?) {
            if (node == null) return

            heap.offer(node.`val`)
            if (heap.size > k) {
                heap.poll()
            }

            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        return heap.toList()
    }
}
```

```swift
class Solution {
    func closestKValues(_ root: TreeNode?, _ target: Double, _ k: Int) -> [Int] {
        var heap = [(diff: Double, val: Int)]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }

            let diff = abs(Double(node.val) - target)
            heap.append((diff, node.val))
            heap.sort { $0.diff > $1.diff }

            if heap.count > k {
                heap.removeFirst()
            }

            dfs(node.left)
            dfs(node.right)
        }

        dfs(root)
        return heap.map { $0.val }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log k)$
- Space complexity: $O(n+k)$

>  Where $n$ is the number of nodes in the tree and $k$ is the size of our heap

---

## 3. Inorder Traversal + Sliding Window

### Intuition
Since this is a BST, an inorder traversal gives us values in sorted order. With a sorted array, the `k` closest values to the target form a contiguous subarray. We can use binary search to find the position closest to the target, then expand outward using two pointers to collect the `k` nearest values.

### Algorithm
1. Perform an inorder traversal to get all values in sorted order.
2. Use binary search to find the position where the target would be inserted.
3. Initialize two pointers: `left` pointing to the element just before the insertion point, `right` pointing at the insertion point.
4. Compare distances at both pointers and pick the closer one, moving that pointer outward. Repeat until `k` elements are collected.

::tabs-start

```python
class Solution:
    def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
        def dfs(node, arr):
            if not node:
                return
            
            dfs(node.left, arr)
            arr.append(node.val)
            dfs(node.right, arr)
        
        arr = []
        dfs(root, arr)
        
        left = bisect_left(arr, target) - 1
        right = left + 1
        ans = []
        
        while len(ans) < k:
            if right == len(arr) or abs(arr[left] - target) <= abs(arr[right] - target):
                ans.append(arr[left])
                left -= 1
            else:
                ans.append(arr[right])
                right += 1
        
        return ans
```

```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        List<Integer> arr = new ArrayList<>();
        dfs(root, arr);

        int start = 0;
        double minDiff = Double.MAX_VALUE;

        for (int i = 0; i < arr.size(); i++) {
            if (Math.abs(arr.get(i) - target) < minDiff) {
                minDiff = Math.abs(arr.get(i) - target);
                start = i;
            }
        }

        int left = start;
        int right = start + 1;

        while (right - left - 1 < k) {
            if (left < 0) {
                right += 1;
                continue;
            }

            if (right == arr.size() || Math.abs(arr.get(left) - target) <= Math.abs(arr.get(right) - target)) {
                left -= 1;
            } else {
                right += 1;
            }
        }

        return arr.subList(left + 1, right);
    }

    public void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }

        dfs(node.left, arr);
        arr.add(node.val);
        dfs(node.right, arr);
    }
}
```

```cpp
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        vector<int> arr;
        dfs(root, arr);

        int left = lower_bound(arr.begin(), arr.end(), target) - arr.begin() - 1;
        int right = left + 1;
        vector<int> ans;

        while (ans.size() < k) {
            if (left < 0) {
                ans.push_back(arr[right++]);
            } else if (right >= arr.size()) {
                ans.push_back(arr[left--]);
            } else if (abs(arr[left] - target) <= abs(arr[right] - target)) {
                ans.push_back(arr[left--]);
            } else {
                ans.push_back(arr[right++]);
            }
        }

        return ans;
    }

    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        dfs(node->left, arr);
        arr.push_back(node->val);
        dfs(node->right, arr);
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @param {number} k
     * @return {number[]}
     */
    closestKValues(root, target, k) {
        const arr = [];
        this.dfs(root, arr);

        let left = this.bisectLeft(arr, target) - 1;
        let right = left + 1;
        const ans = [];

        while (ans.length < k) {
            if (left < 0) {
                ans.push(arr[right++]);
            } else if (right >= arr.length) {
                ans.push(arr[left--]);
            } else if (Math.abs(arr[left] - target) <= Math.abs(arr[right] - target)) {
                ans.push(arr[left--]);
            } else {
                ans.push(arr[right++]);
            }
        }

        return ans;
    }

    bisectLeft(arr, target) {
        let lo = 0, hi = arr.length;
        while (lo < hi) {
            const mid = Math.floor((lo + hi) / 2);
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    dfs(node, arr) {
        if (!node) return;
        this.dfs(node.left, arr);
        arr.push(node.val);
        this.dfs(node.right, arr);
    }
}
```

```csharp
public class Solution {
    public IList<int> ClosestKValues(TreeNode root, double target, int k) {
        var arr = new List<int>();
        Dfs(root, arr);

        int left = BinarySearch(arr, target) - 1;
        int right = left + 1;
        var ans = new List<int>();

        while (ans.Count < k) {
            if (left < 0) {
                ans.Add(arr[right++]);
            } else if (right >= arr.Count) {
                ans.Add(arr[left--]);
            } else if (Math.Abs(arr[left] - target) <= Math.Abs(arr[right] - target)) {
                ans.Add(arr[left--]);
            } else {
                ans.Add(arr[right++]);
            }
        }

        return ans;
    }

    private int BinarySearch(List<int> arr, double target) {
        int lo = 0, hi = arr.Count;
        while (lo < hi) {
            int mid = (lo + hi) / 2;
            if (arr[mid] < target) lo = mid + 1;
            else hi = mid;
        }
        return lo;
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        Dfs(node.left, arr);
        arr.Add(node.val);
        Dfs(node.right, arr);
    }
}
```

```go
func closestKValues(root *TreeNode, target float64, k int) []int {
    arr := []int{}
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        arr = append(arr, node.Val)
        dfs(node.Right)
    }
    dfs(root)

    left := sort.Search(len(arr), func(i int) bool {
        return float64(arr[i]) >= target
    }) - 1
    right := left + 1
    ans := []int{}

    for len(ans) < k {
        if left < 0 {
            ans = append(ans, arr[right])
            right++
        } else if right >= len(arr) {
            ans = append(ans, arr[left])
            left--
        } else if math.Abs(float64(arr[left])-target) <= math.Abs(float64(arr[right])-target) {
            ans = append(ans, arr[left])
            left--
        } else {
            ans = append(ans, arr[right])
            right++
        }
    }

    return ans
}
```

```kotlin
class Solution {
    fun closestKValues(root: TreeNode?, target: Double, k: Int): List<Int> {
        val arr = mutableListOf<Int>()

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            arr.add(node.`val`)
            dfs(node.right)
        }

        dfs(root)

        var left = arr.binarySearch(target.toInt()).let { if (it < 0) -it - 2 else it - 1 }
        var right = left + 1
        val ans = mutableListOf<Int>()

        while (ans.size < k) {
            if (left < 0) {
                ans.add(arr[right++])
            } else if (right >= arr.size) {
                ans.add(arr[left--])
            } else if (Math.abs(arr[left] - target) <= Math.abs(arr[right] - target)) {
                ans.add(arr[left--])
            } else {
                ans.add(arr[right++])
            }
        }

        return ans
    }
}
```

```swift
class Solution {
    func closestKValues(_ root: TreeNode?, _ target: Double, _ k: Int) -> [Int] {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)
        }

        dfs(root)

        var left = bisectLeft(arr, target) - 1
        var right = left + 1
        var ans = [Int]()

        while ans.count < k {
            if left < 0 {
                ans.append(arr[right])
                right += 1
            } else if right >= arr.count {
                ans.append(arr[left])
                left -= 1
            } else if abs(Double(arr[left]) - target) <= abs(Double(arr[right]) - target) {
                ans.append(arr[left])
                left -= 1
            } else {
                ans.append(arr[right])
                right += 1
            }
        }

        return ans
    }

    private func bisectLeft(_ arr: [Int], _ target: Double) -> Int {
        var lo = 0, hi = arr.count
        while lo < hi {
            let mid = (lo + hi) / 2
            if Double(arr[mid]) < target {
                lo = mid + 1
            } else {
                hi = mid
            }
        }
        return lo
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n+k)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree and $k$ is the size of our sliding window

---

## 4. Binary Search The Left Bound

### Intuition
Since the inorder traversal produces a sorted array and we need a contiguous subarray of size `k`, we can binary search for the optimal starting position of this window. For any starting position, we compare the distances of the leftmost and rightmost elements in the window to decide if shifting right would improve our answer.

### Algorithm
1. Perform an inorder traversal to get all values in sorted order.
2. Binary search for the left boundary of the `k`-element window. The search range is from index `0` to `n-k`.
3. At each midpoint, compare the distance of the element at `mid` with the element at `mid+k`. If the element at `mid+k` is closer, shift the window right; otherwise, keep searching left.
4. Return the subarray starting at the found left boundary with length `k`.

::tabs-start

```python
class Solution:
    def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
        def dfs(node, arr):
            if not node:
                return
            
            dfs(node.left, arr)
            arr.append(node.val)
            dfs(node.right, arr)
        
        arr = []
        dfs(root, arr)
        
        left = 0
        right = len(arr) - k
        
        while left < right:
            mid = (left + right) // 2
            if abs(target - arr[mid + k]) < abs(target - arr[mid]):
                left = mid + 1
            else:
                right = mid

        return arr[left:left + k]
```

```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        List<Integer> arr = new ArrayList<>();
        dfs(root, arr);

        int left = 0;
        int right = arr.size() - k;

        while (left < right) {
            int mid = (left + right) / 2;
            if (Math.abs(target - arr.get(mid + k)) < Math.abs(target - arr.get(mid))) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return arr.subList(left, left + k);
    }

    public void dfs(TreeNode node, List<Integer> arr) {
        if (node == null) {
            return;
        }

        dfs(node.left, arr);
        arr.add(node.val);
        dfs(node.right, arr);
    }
}
```

```cpp
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        vector<int> arr;
        dfs(root, arr);

        int left = 0;
        int right = arr.size() - k;

        while (left < right) {
            int mid = (left + right) / 2;
            if (abs(target - arr[mid + k]) < abs(target - arr[mid])) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return vector<int>(arr.begin() + left, arr.begin() + left + k);
    }

    void dfs(TreeNode* node, vector<int>& arr) {
        if (!node) return;
        dfs(node->left, arr);
        arr.push_back(node->val);
        dfs(node->right, arr);
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @param {number} k
     * @return {number[]}
     */
    closestKValues(root, target, k) {
        const arr = [];
        this.dfs(root, arr);

        let left = 0;
        let right = arr.length - k;

        while (left < right) {
            const mid = Math.floor((left + right) / 2);
            if (Math.abs(target - arr[mid + k]) < Math.abs(target - arr[mid])) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return arr.slice(left, left + k);
    }

    dfs(node, arr) {
        if (!node) return;
        this.dfs(node.left, arr);
        arr.push(node.val);
        this.dfs(node.right, arr);
    }
}
```

```csharp
public class Solution {
    public IList<int> ClosestKValues(TreeNode root, double target, int k) {
        var arr = new List<int>();
        Dfs(root, arr);

        int left = 0;
        int right = arr.Count - k;

        while (left < right) {
            int mid = (left + right) / 2;
            if (Math.Abs(target - arr[mid + k]) < Math.Abs(target - arr[mid])) {
                left = mid + 1;
            } else {
                right = mid;
            }
        }

        return arr.Skip(left).Take(k).ToList();
    }

    private void Dfs(TreeNode node, List<int> arr) {
        if (node == null) return;
        Dfs(node.left, arr);
        arr.Add(node.val);
        Dfs(node.right, arr);
    }
}
```

```go
func closestKValues(root *TreeNode, target float64, k int) []int {
    arr := []int{}
    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }
        dfs(node.Left)
        arr = append(arr, node.Val)
        dfs(node.Right)
    }
    dfs(root)

    left := 0
    right := len(arr) - k

    for left < right {
        mid := (left + right) / 2
        if math.Abs(target-float64(arr[mid+k])) < math.Abs(target-float64(arr[mid])) {
            left = mid + 1
        } else {
            right = mid
        }
    }

    return arr[left : left+k]
}
```

```kotlin
class Solution {
    fun closestKValues(root: TreeNode?, target: Double, k: Int): List<Int> {
        val arr = mutableListOf<Int>()

        fun dfs(node: TreeNode?) {
            if (node == null) return
            dfs(node.left)
            arr.add(node.`val`)
            dfs(node.right)
        }

        dfs(root)

        var left = 0
        var right = arr.size - k

        while (left < right) {
            val mid = (left + right) / 2
            if (Math.abs(target - arr[mid + k]) < Math.abs(target - arr[mid])) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        return arr.subList(left, left + k)
    }
}
```

```swift
class Solution {
    func closestKValues(_ root: TreeNode?, _ target: Double, _ k: Int) -> [Int] {
        var arr = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }
            dfs(node.left)
            arr.append(node.val)
            dfs(node.right)
        }

        dfs(root)

        var left = 0
        var right = arr.count - k

        while left < right {
            let mid = (left + right) / 2
            if abs(target - Double(arr[mid + k])) < abs(target - Double(arr[mid])) {
                left = mid + 1
            } else {
                right = mid
            }
        }

        return Array(arr[left..<(left + k)])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(n)$ in Java
    - $O(n+k)$ in Python
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree and $k$ is the number of closest values to return

---

## 5. Build The Window With Deque

### Intuition
During inorder traversal, values are visited in sorted order. We can maintain a sliding window of size `k` using a deque. As we visit each node, we add it to the window. When the window exceeds `k` elements, we compare the distances of the first and last elements and remove the one farther from the target. Once the first element is closer, all subsequent elements will be even farther, so we can stop early.

### Algorithm
1. Perform an inorder traversal of the tree.
2. Maintain a deque to store the current window of candidates.
3. For each visited node, append its value to the deque.
4. If the deque size exceeds `k`, compare the front and back elements. If the front is closer or equal, remove the back and stop traversing the right subtree. Otherwise, remove the front and continue.
5. Return the elements in the deque as the result.

::tabs-start

```python
class Solution:
    def closestKValues(self, root: TreeNode, target: float, k: int) -> List[int]:
        def dfs(node, queue):
            if not node:
                return
            
            dfs(node.left, queue)
            queue.append(node.val)
            if len(queue) > k:
                if (abs(target - queue[0]) <= abs(target - queue[-1])):
                    queue.pop()
                    return
                else:
                    queue.popleft()
                    
            dfs(node.right, queue)
        
        queue = deque()
        dfs(root, queue)
        return list(queue)
```

```java
class Solution {
    public List<Integer> closestKValues(TreeNode root, double target, int k) {
        Deque<Integer> queue = new LinkedList<>();
        dfs(root, queue, k, target);
        return new ArrayList<>(queue);
    }
    
    public void dfs(TreeNode node, Deque<Integer> queue, int k, double target) {
        if (node == null) {
            return;
        }
        
        dfs(node.left, queue, k, target);
        queue.add(node.val);
        if (queue.size() > k) {
            if (Math.abs(target - queue.peekFirst()) <= Math.abs(target - queue.peekLast())) {
                queue.removeLast();
                return;
            } else {
                queue.removeFirst();
            }
        }

        dfs(node.right, queue, k, target);
    }
}
```

```cpp
class Solution {
public:
    vector<int> closestKValues(TreeNode* root, double target, int k) {
        deque<int> queue;
        dfs(root, queue, k, target);
        return vector<int>(queue.begin(), queue.end());
    }
    
private:
    void dfs(TreeNode* node, deque<int>& queue, int k, double target) {
        if (node == nullptr) {
            return;
        }
        
        dfs(node->left, queue, k, target);
        
        queue.push_back(node->val);
        if (queue.size() > k) {
            if (abs(target - queue.front()) <= abs(target - queue.back())) {
                queue.pop_back();
                return;
            } else {
                queue.pop_front();
            }
        }
        
        dfs(node->right, queue, k, target);
    }
};
```

```javascript
class Solution {
    /**
     * @param {TreeNode} root
     * @param {number} target
     * @param {number} k
     * @return {number[]}
     */
    closestKValues(root, target, k) {
        const queue = new Deque();
        this.dfs(root, queue, k, target);

        return queue.toArray();
    }
    
    /**
     * @param {TreeNode} node
     * @param {Deque} queue
     * @param {number} k
     * @param {number} target
     * @return {void}
     */
    dfs(node, queue, k, target) {
        if (node === null) {
            return;
        }
        
        this.dfs(node.left, queue, k, target);

        queue.pushBack(node.val);

        if (queue.size() > k) {
            const first = queue.front();
            const last = queue.back();

            if (Math.abs(target - first) <= Math.abs(target - last)) {
                queue.popBack();
                return;
            } else {
                queue.popFront();
            }
        }
        
        this.dfs(node.right, queue, k, target);
    }
}
```

```csharp
public class Solution {
    public IList<int> ClosestKValues(TreeNode root, double target, int k) {
        var queue = new LinkedList<int>();
        Dfs(root, queue, k, target);
        return queue.ToList();
    }

    private void Dfs(TreeNode node, LinkedList<int> queue, int k, double target) {
        if (node == null) return;

        Dfs(node.left, queue, k, target);

        queue.AddLast(node.val);
        if (queue.Count > k) {
            if (Math.Abs(target - queue.First.Value) <= Math.Abs(target - queue.Last.Value)) {
                queue.RemoveLast();
                return;
            } else {
                queue.RemoveFirst();
            }
        }

        Dfs(node.right, queue, k, target);
    }
}
```

```go
func closestKValues(root *TreeNode, target float64, k int) []int {
    queue := []int{}

    var dfs func(node *TreeNode)
    dfs = func(node *TreeNode) {
        if node == nil {
            return
        }

        dfs(node.Left)

        queue = append(queue, node.Val)
        if len(queue) > k {
            if math.Abs(target-float64(queue[0])) <= math.Abs(target-float64(queue[len(queue)-1])) {
                queue = queue[:len(queue)-1]
                return
            } else {
                queue = queue[1:]
            }
        }

        dfs(node.Right)
    }

    dfs(root)
    return queue
}
```

```kotlin
class Solution {
    fun closestKValues(root: TreeNode?, target: Double, k: Int): List<Int> {
        val queue = ArrayDeque<Int>()

        fun dfs(node: TreeNode?) {
            if (node == null) return

            dfs(node.left)

            queue.addLast(node.`val`)
            if (queue.size > k) {
                if (Math.abs(target - queue.first()) <= Math.abs(target - queue.last())) {
                    queue.removeLast()
                    return
                } else {
                    queue.removeFirst()
                }
            }

            dfs(node.right)
        }

        dfs(root)
        return queue.toList()
    }
}
```

```swift
class Solution {
    func closestKValues(_ root: TreeNode?, _ target: Double, _ k: Int) -> [Int] {
        var queue = [Int]()

        func dfs(_ node: TreeNode?) {
            guard let node = node else { return }

            dfs(node.left)

            queue.append(node.val)
            if queue.count > k {
                if abs(target - Double(queue.first!)) <= abs(target - Double(queue.last!)) {
                    queue.removeLast()
                    return
                } else {
                    queue.removeFirst()
                }
            }

            dfs(node.right)
        }

        dfs(root)
        return queue
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n+k)$

>  Where $n$ is the number of nodes in the tree and $k$ is the number of closest values to return

---

## Common Pitfalls

### Not Exploiting BST Property
Using a generic tree traversal and sorting all values works but misses the O(n + k) optimization possible with BST. Inorder traversal gives sorted values, enabling efficient sliding window approaches.

### Off-by-One Errors in Binary Search
When using binary search to find the starting position for the sliding window, the insertion point may be at index 0 or n, causing out-of-bounds access when initializing the left pointer.

```python
# Wrong: Can cause index -1 access
left = bisect_left(arr, target) - 1  # If target < all elements, left = -1
# Must check: if left < 0 before accessing arr[left]
```

### Using Wrong Heap Type
When using a heap to track k closest values, a max-heap is needed to evict the farthest element. Using a min-heap evicts the closest element instead, producing incorrect results.

```python
# Wrong: Min-heap evicts closest values
heappush(heap, (abs(node.val - target), node.val))

# Correct: Max-heap (negate distance) evicts farthest
heappush(heap, (-abs(node.val - target), node.val))
```

### Incorrect Tie-Breaking for Equal Distances
When two values have equal distance to target, the problem may require returning the smaller value. Failing to handle ties correctly can produce wrong results.

### Stopping Early Without Checking Both Sides
In the sliding window approach, stopping as soon as one pointer goes out of bounds forgets to collect remaining elements from the other side.
