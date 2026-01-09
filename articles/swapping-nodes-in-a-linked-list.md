## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        n = len(arr)
        arr[k - 1], arr[n - k] = arr[n - k], arr[k - 1]

        cur, i = head, 0
        while cur:
            cur.val = arr[i]
            cur = cur.next
            i += 1

        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int n = arr.size();
        int temp = arr.get(k - 1);
        arr.set(k - 1, arr.get(n - k));
        arr.set(n - k, temp);

        cur = head;
        int i = 0;
        while (cur != null) {
            cur.val = arr.get(i);
            cur = cur.next;
            i++;
        }

        return head;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int n = arr.size();
        swap(arr[k - 1], arr[n - k]);

        cur = head;
        int i = 0;
        while (cur) {
            cur->val = arr[i];
            cur = cur->next;
            i++;
        }

        return head;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    swapNodes(head, k) {
        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let n = arr.length;
        [arr[k - 1], arr[n - k]] = [arr[n - k], arr[k - 1]];

        cur = head;
        let i = 0;
        while (cur) {
            cur.val = arr[i];
            cur = cur.next;
            i++;
        }

        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode SwapNodes(ListNode head, int k) {
        var arr = new List<int>();
        var cur = head;

        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        int n = arr.Count;
        (arr[k - 1], arr[n - k]) = (arr[n - k], arr[k - 1]);

        cur = head;
        int i = 0;
        while (cur != null) {
            cur.val = arr[i];
            cur = cur.next;
            i++;
        }

        return head;
    }
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapNodes(head *ListNode, k int) *ListNode {
    arr := []int{}
    cur := head

    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    n := len(arr)
    arr[k-1], arr[n-k] = arr[n-k], arr[k-1]

    cur = head
    i := 0
    for cur != nil {
        cur.Val = arr[i]
        cur = cur.Next
        i++
    }

    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        val arr = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        val n = arr.size
        val temp = arr[k - 1]
        arr[k - 1] = arr[n - k]
        arr[n - k] = temp

        cur = head
        var i = 0
        while (cur != null) {
            cur.`val` = arr[i]
            cur = cur.next
            i++
        }

        return head
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func swapNodes(_ head: ListNode?, _ k: Int) -> ListNode? {
        var arr = [Int]()
        var cur = head

        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        let n = arr.count
        arr.swapAt(k - 1, n - k)

        cur = head
        var i = 0
        while cur != nil {
            cur!.val = arr[i]
            cur = cur?.next
            i += 1
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        left, right, startIdx = None, None, 0

        def dfs(node):
            nonlocal left, right, startIdx
            if not node:
                return 0

            startIdx += 1
            if startIdx == k:
                left = node

            endIdx = dfs(node.next) + 1
            if endIdx == k:
                right = node

            return endIdx

        dfs(head)
        if left and right:
            left.val, right.val = right.val, left.val

        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        ListNode[] left = new ListNode[1];
        ListNode[] right = new ListNode[1];
        int[] startIdx = {0};

        dfs(head, k, startIdx, left, right);

        if (left[0] != null && right[0] != null) {
            int temp = left[0].val;
            left[0].val = right[0].val;
            right[0].val = temp;
        }

        return head;
    }

    private int dfs(ListNode node, int k, int[] startIdx, ListNode[] left, ListNode[] right) {
        if (node == null) {
            return 0;
        }

        startIdx[0]++;
        if (startIdx[0] == k) {
            left[0] = node;
        }

        int endIdx = dfs(node.next, k, startIdx, left, right) + 1;
        if (endIdx == k) {
            right[0] = node;
        }

        return endIdx;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* left = nullptr;
        ListNode* right = nullptr;
        int startIdx = 0;

        dfs(head, k, startIdx, left, right);

        if (left && right) {
            swap(left->val, right->val);
        }

        return head;
    }

private:
    int dfs(ListNode* node, int k, int& startIdx, ListNode*& left, ListNode*& right) {
        if (!node) {
            return 0;
        }

        startIdx++;
        if (startIdx == k) {
            left = node;
        }

        int endIdx = dfs(node->next, k, startIdx, left, right) + 1;
        if (endIdx == k) {
            right = node;
        }

        return endIdx;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    swapNodes(head, k) {
        let left = null,
            right = null,
            startIdx = 0;

        const dfs = (node) => {
            if (!node) return 0;

            startIdx++;
            if (startIdx === k) left = node;

            let endIdx = dfs(node.next) + 1;
            if (endIdx === k) right = node;

            return endIdx;
        };

        dfs(head);
        if (left && right) {
            [left.val, right.val] = [right.val, left.val];
        }

        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    private ListNode left, right;
    private int startIdx;

    public ListNode SwapNodes(ListNode head, int k) {
        left = null;
        right = null;
        startIdx = 0;

        Dfs(head, k);

        if (left != null && right != null) {
            int temp = left.val;
            left.val = right.val;
            right.val = temp;
        }

        return head;
    }

    private int Dfs(ListNode node, int k) {
        if (node == null) return 0;

        startIdx++;
        if (startIdx == k) left = node;

        int endIdx = Dfs(node.next, k) + 1;
        if (endIdx == k) right = node;

        return endIdx;
    }
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapNodes(head *ListNode, k int) *ListNode {
    var left, right *ListNode
    startIdx := 0

    var dfs func(node *ListNode) int
    dfs = func(node *ListNode) int {
        if node == nil {
            return 0
        }

        startIdx++
        if startIdx == k {
            left = node
        }

        endIdx := dfs(node.Next) + 1
        if endIdx == k {
            right = node
        }

        return endIdx
    }

    dfs(head)
    if left != nil && right != nil {
        left.Val, right.Val = right.Val, left.Val
    }

    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    private var left: ListNode? = null
    private var right: ListNode? = null
    private var startIdx = 0

    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        left = null
        right = null
        startIdx = 0

        dfs(head, k)

        if (left != null && right != null) {
            val temp = left!!.`val`
            left!!.`val` = right!!.`val`
            right!!.`val` = temp
        }

        return head
    }

    private fun dfs(node: ListNode?, k: Int): Int {
        if (node == null) return 0

        startIdx++
        if (startIdx == k) left = node

        val endIdx = dfs(node.next, k) + 1
        if (endIdx == k) right = node

        return endIdx
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func swapNodes(_ head: ListNode?, _ k: Int) -> ListNode? {
        var left: ListNode? = nil
        var right: ListNode? = nil
        var startIdx = 0

        func dfs(_ node: ListNode?) -> Int {
            guard let node = node else { return 0 }

            startIdx += 1
            if startIdx == k { left = node }

            let endIdx = dfs(node.next) + 1
            if endIdx == k { right = node }

            return endIdx
        }

        dfs(head)
        if let l = left, let r = right {
            let temp = l.val
            l.val = r.val
            r.val = temp
        }

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Iteration (Two Pass)

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        n = 0
        cur = head
        while cur:
            n += 1
            cur = cur.next

        left, right = None, None
        cur = head
        for i in range(1, n + 1):
            if i == k:
                left = cur
            if i == (n - k + 1):
                right = cur
            cur = cur.next

        left.val, right.val = right.val, left.val
        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        int n = 0;
        ListNode cur = head;
        while (cur != null) {
            n++;
            cur = cur.next;
        }

        ListNode left = null, right = null;
        cur = head;
        for (int i = 1; i <= n; i++) {
            if (i == k) {
                left = cur;
            }
            if (i == (n - k + 1)) {
                right = cur;
            }
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        int n = 0;
        ListNode* cur = head;
        while (cur) {
            n++;
            cur = cur->next;
        }

        ListNode* left = nullptr;
        ListNode* right = nullptr;
        cur = head;
        for (int i = 1; i <= n; i++) {
            if (i == k) {
                left = cur;
            }
            if (i == (n - k + 1)) {
                right = cur;
            }
            cur = cur->next;
        }

        swap(left->val, right->val);
        return head;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    swapNodes(head, k) {
        let n = 0;
        let cur = head;
        while (cur) {
            n++;
            cur = cur.next;
        }

        let left = null,
            right = null;
        cur = head;
        for (let i = 1; i <= n; i++) {
            if (i === k) {
                left = cur;
            }
            if (i === n - k + 1) {
                right = cur;
            }
            cur = cur.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode SwapNodes(ListNode head, int k) {
        int n = 0;
        var cur = head;
        while (cur != null) {
            n++;
            cur = cur.next;
        }

        ListNode left = null, right = null;
        cur = head;
        for (int i = 1; i <= n; i++) {
            if (i == k) {
                left = cur;
            }
            if (i == (n - k + 1)) {
                right = cur;
            }
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapNodes(head *ListNode, k int) *ListNode {
    n := 0
    cur := head
    for cur != nil {
        n++
        cur = cur.Next
    }

    var left, right *ListNode
    cur = head
    for i := 1; i <= n; i++ {
        if i == k {
            left = cur
        }
        if i == (n - k + 1) {
            right = cur
        }
        cur = cur.Next
    }

    left.Val, right.Val = right.Val, left.Val
    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        var n = 0
        var cur = head
        while (cur != null) {
            n++
            cur = cur.next
        }

        var left: ListNode? = null
        var right: ListNode? = null
        cur = head
        for (i in 1..n) {
            if (i == k) {
                left = cur
            }
            if (i == (n - k + 1)) {
                right = cur
            }
            cur = cur?.next
        }

        val temp = left!!.`val`
        left.`val` = right!!.`val`
        right.`val` = temp

        return head
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func swapNodes(_ head: ListNode?, _ k: Int) -> ListNode? {
        var n = 0
        var cur = head
        while cur != nil {
            n += 1
            cur = cur?.next
        }

        var left: ListNode? = nil
        var right: ListNode? = nil
        cur = head
        for i in 1...n {
            if i == k {
                left = cur
            }
            if i == (n - k + 1) {
                right = cur
            }
            cur = cur?.next
        }

        let temp = left!.val
        left!.val = right!.val
        right!.val = temp

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 4. Iteration (One Pass) - I

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        cur = head
        for _ in range(k - 1):
            cur = cur.next

        left = cur
        right = head

        while cur.next:
            cur = cur.next
            right = right.next

        left.val, right.val = right.val, left.val
        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        ListNode cur = head;
        for (int i = 0; i < k - 1; i++) {
            cur = cur.next;
        }

        ListNode left = cur;
        ListNode right = head;

        while (cur.next != null) {
            cur = cur.next;
            right = right.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* cur = head;
        for (int i = 0; i < k - 1; i++) {
            cur = cur->next;
        }

        ListNode* left = cur;
        ListNode* right = head;

        while (cur->next) {
            cur = cur->next;
            right = right->next;
        }

        swap(left->val, right->val);
        return head;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    swapNodes(head, k) {
        let cur = head;
        for (let i = 0; i < k - 1; i++) {
            cur = cur.next;
        }

        let left = cur;
        let right = head;

        while (cur.next) {
            cur = cur.next;
            right = right.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode SwapNodes(ListNode head, int k) {
        var cur = head;
        for (int i = 0; i < k - 1; i++) {
            cur = cur.next;
        }

        var left = cur;
        var right = head;

        while (cur.next != null) {
            cur = cur.next;
            right = right.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapNodes(head *ListNode, k int) *ListNode {
    cur := head
    for i := 0; i < k-1; i++ {
        cur = cur.Next
    }

    left := cur
    right := head

    for cur.Next != nil {
        cur = cur.Next
        right = right.Next
    }

    left.Val, right.Val = right.Val, left.Val
    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        var cur = head
        for (i in 0 until k - 1) {
            cur = cur?.next
        }

        val left = cur
        var right = head

        while (cur?.next != null) {
            cur = cur.next
            right = right?.next
        }

        val temp = left!!.`val`
        left.`val` = right!!.`val`
        right.`val` = temp

        return head
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func swapNodes(_ head: ListNode?, _ k: Int) -> ListNode? {
        var cur = head
        for _ in 0..<(k - 1) {
            cur = cur?.next
        }

        let left = cur
        var right = head

        while cur?.next != nil {
            cur = cur?.next
            right = right?.next
        }

        let temp = left!.val
        left!.val = right!.val
        right!.val = temp

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 5. Iteration (One Pass) - II

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def swapNodes(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        left, right = None, None
        cur = head

        while cur:
            if right:
                right = right.next
            if k == 1:
                left = cur
                right = head
            k -= 1
            cur = cur.next

        left.val, right.val = right.val, left.val
        return head
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode() {}
 *     ListNode(int val) { this.val = val; }
 *     ListNode(int val, ListNode next) { this.val = val; this.next = next; }
 * }
 */
public class Solution {
    public ListNode swapNodes(ListNode head, int k) {
        ListNode left = null, right = null, cur = head;

        while (cur != null) {
            if (right != null) {
                right = right.next;
            }
            if (k == 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode() : val(0), next(nullptr) {}
 *     ListNode(int x) : val(x), next(nullptr) {}
 *     ListNode(int x, ListNode *next) : val(x), next(next) {}
 * };
 */
class Solution {
public:
    ListNode* swapNodes(ListNode* head, int k) {
        ListNode* left = nullptr;
        ListNode* right = nullptr;
        ListNode* cur = head;

        while (cur) {
            if (right) {
                right = right->next;
            }
            if (k == 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur->next;
        }

        swap(left->val, right->val);
        return head;
    }
};
```

```javascript
/**
 * Definition for singly-linked list.
 * class ListNode {
 *     constructor(val = 0, next = null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
class Solution {
    /**
     * @param {ListNode} head
     * @param {number} k
     * @return {ListNode}
     */
    swapNodes(head, k) {
        let left = null,
            right = null,
            cur = head;

        while (cur) {
            if (right) {
                right = right.next;
            }
            if (k === 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur.next;
        }

        [left.val, right.val] = [right.val, left.val];
        return head;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */
public class Solution {
    public ListNode SwapNodes(ListNode head, int k) {
        ListNode left = null, right = null, cur = head;

        while (cur != null) {
            if (right != null) {
                right = right.next;
            }
            if (k == 1) {
                left = cur;
                right = head;
            }
            k--;
            cur = cur.next;
        }

        int temp = left.val;
        left.val = right.val;
        right.val = temp;

        return head;
    }
}
```

```go
/**
 * Definition for singly-linked list.
 * type ListNode struct {
 *     Val int
 *     Next *ListNode
 * }
 */
func swapNodes(head *ListNode, k int) *ListNode {
    var left, right *ListNode
    cur := head

    for cur != nil {
        if right != nil {
            right = right.Next
        }
        if k == 1 {
            left = cur
            right = head
        }
        k--
        cur = cur.Next
    }

    left.Val, right.Val = right.Val, left.Val
    return head
}
```

```kotlin
/**
 * Example:
 * var li = ListNode(5)
 * var v = li.`val`
 * Definition for singly-linked list.
 * class ListNode(var `val`: Int) {
 *     var next: ListNode? = null
 * }
 */
class Solution {
    fun swapNodes(head: ListNode?, k: Int): ListNode? {
        var left: ListNode? = null
        var right: ListNode? = null
        var cur = head
        var kk = k

        while (cur != null) {
            if (right != null) {
                right = right.next
            }
            if (kk == 1) {
                left = cur
                right = head
            }
            kk--
            cur = cur.next
        }

        val temp = left!!.`val`
        left.`val` = right!!.`val`
        right.`val` = temp

        return head
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init() { self.val = 0; self.next = nil; }
 *     public init(_ val: Int) { self.val = val; self.next = nil; }
 *     public init(_ val: Int, _ next: ListNode?) { self.val = val; self.next = next; }
 * }
 */
class Solution {
    func swapNodes(_ head: ListNode?, _ k: Int) -> ListNode? {
        var left: ListNode? = nil
        var right: ListNode? = nil
        var cur = head
        var kk = k

        while cur != nil {
            if right != nil {
                right = right?.next
            }
            if kk == 1 {
                left = cur
                right = head
            }
            kk -= 1
            cur = cur?.next
        }

        let temp = left!.val
        left!.val = right!.val
        right!.val = temp

        return head
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
