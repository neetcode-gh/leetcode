## 1. Sort With Custom Comparator

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree

---

## 2. Traverse With Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log k)$
- Space complexity: $O(n+k)$

>  Where $n$ is the number of nodes in the tree and $k$ is the size of our heap

---

## 3. Inorder Traversal + Sliding Window

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
            // Be careful to not go out of bounds
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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n+k)$
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree and $k$ is the size of our sliding window

---

## 4. Binary Search The Left Bound

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

::tabs-end

### Time & Space Complexity

- Time complexity: 
    - $O(n)$ in Java 
    - $O(n+k)$ in Python
- Space complexity: $O(n)$

>  Where $n$ is the number of nodes in the tree and $k$ is the number of closest values to return

---

## 5. Build The Window With Deque

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n+k)$

>  Where $n$ is the number of nodes in the tree and $k$ is the number of closest values to return
