## 1. Convert To Array

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: Optional[ListNode], k: int) -> Optional[ListNode]:
        if not head:
            return None

        arr, cur = [], head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        n = len(arr)
        k %= n
        cur = head
        for i in range(n - k, n):
            cur.val = arr[i]
            cur = cur.next

        for i in range(n - k):
            cur.val = arr[i]
            cur = cur.next

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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) return null;

        ArrayList<Integer> arr = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int n = arr.size();
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur.val = arr.get(i);
            cur = cur.next;
        }
        for (int i = 0; i < n - k; i++) {
            cur.val = arr.get(i);
            cur = cur.next;
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) return nullptr;

        vector<int> arr;
        ListNode* cur = head;
        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int n = arr.size();
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur->val = arr[i];
            cur = cur->next;
        }
        for (int i = 0; i < n - k; i++) {
            cur->val = arr[i];
            cur = cur->next;
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
    rotateRight(head, k) {
        if (!head) return null;

        let arr = [];
        let cur = head;
        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let n = arr.length;
        k %= n;
        cur = head;
        for (let i = n - k; i < n; i++) {
            cur.val = arr[i];
            cur = cur.next;
        }
        for (let i = 0; i < n - k; i++) {
            cur.val = arr[i];
            cur = cur.next;
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return null;
        }

        List<int> arr = new List<int>();
        ListNode cur = head;
        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        int n = arr.Count;
        k %= n;
        cur = head;
        for (int i = n - k; i < n; i++) {
            cur.val = arr[i];
            cur = cur.next;
        }

        for (int i = 0; i < n - k; i++) {
            cur.val = arr[i];
            cur = cur.next;
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
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil {
        return nil
    }

    arr := []int{}
    cur := head
    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    n := len(arr)
    k %= n
    cur = head
    for i := n - k; i < n; i++ {
        cur.Val = arr[i]
        cur = cur.Next
    }

    for i := 0; i < n - k; i++ {
        cur.Val = arr[i]
        cur = cur.Next
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
    fun rotateRight(head: ListNode?, k: Int): ListNode? {
        if (head == null) {
            return null
        }

        val arr = mutableListOf<Int>()
        var cur: ListNode? = head
        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        val n = arr.size
        val rotations = k % n
        cur = head
        for (i in n - rotations until n) {
            cur?.`val` = arr[i]
            cur = cur?.next
        }

        for (i in 0 until n - rotations) {
            cur?.`val` = arr[i]
            cur = cur?.next
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
    func rotateRight(_ head: ListNode?, _ k: Int) -> ListNode? {
        guard let head = head else {
            return nil
        }

        var arr = [Int]()
        var cur: ListNode? = head
        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        let n = arr.count
        let rotations = k % n
        cur = head
        for i in (n - rotations)..<n {
            cur?.val = arr[i]
            cur = cur?.next
        }

        for i in 0..<(n - rotations) {
            cur?.val = arr[i]
            cur = cur?.next
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

## 2. Iteration

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:
            return head

        length, tail = 1, head
        while tail.next:
            tail = tail.next
            length += 1

        k = k % length
        if k == 0:
            return head

        cur = head
        for i in range(length - k - 1):
            cur = cur.next
        newHead = cur.next
        cur.next = None
        tail.next = head

        return newHead
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }
        ListNode newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) {
            return head;
        }

        int length = 1;
        ListNode* tail = head;
        while (tail->next) {
            tail = tail->next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode* cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur->next;
        }
        ListNode* newHead = cur->next;
        cur->next = nullptr;
        tail->next = head;

        return newHead;
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
    rotateRight(head, k) {
        if (!head) {
            return head;
        }

        let length = 1,
            tail = head;
        while (tail.next) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k === 0) {
            return head;
        }

        let cur = head;
        for (let i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }
        let newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        int length = 1;
        ListNode tail = head;
        while (tail.next != null) {
            tail = tail.next;
            length++;
        }

        k = k % length;
        if (k == 0) {
            return head;
        }

        ListNode cur = head;
        for (int i = 0; i < length - k - 1; i++) {
            cur = cur.next;
        }

        ListNode newHead = cur.next;
        cur.next = null;
        tail.next = head;

        return newHead;
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
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil {
        return head
    }

    length := 1
    tail := head
    for tail.Next != nil {
        tail = tail.Next
        length++
    }

    k = k % length
    if k == 0 {
        return head
    }

    cur := head
    for i := 0; i < length - k - 1; i++ {
        cur = cur.Next
    }

    newHead := cur.Next
    cur.Next = nil
    tail.Next = head

    return newHead
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
    fun rotateRight(head: ListNode?, k: Int): ListNode? {
        if (head == null) {
            return head
        }

        var length = 1
        var tail = head
        while (tail?.next != null) {
            tail = tail.next
            length++
        }

        val rotations = k % length
        if (rotations == 0) {
            return head
        }

        var cur = head
        for (i in 0 until length - rotations - 1) {
            cur = cur?.next
        }

        val newHead = cur?.next
        cur?.next = null
        tail?.next = head

        return newHead
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
    func rotateRight(_ head: ListNode?, _ k: Int) -> ListNode? {
        guard let head = head else {
            return head
        }

        var length = 1
        var tail: ListNode? = head
        while tail?.next != nil {
            tail = tail?.next
            length += 1
        }

        let rotations = k % length
        if rotations == 0 {
            return head
        }

        var cur: ListNode? = head
        for _ in 0..<(length - rotations - 1) {
            cur = cur?.next
        }

        let newHead = cur?.next
        cur?.next = nil
        tail?.next = head

        return newHead
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Iteration (Using One Pointer)

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def rotateRight(self, head: ListNode, k: int) -> ListNode:
        if not head:
            return head

        cur, n = head, 1
        while cur.next:
            n += 1
            cur = cur.next

        cur.next = head
        k %= n
        for i in range(n - k):
            cur = cur.next

        head = cur.next
        cur.next = None
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
    public ListNode rotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        ListNode cur = head;
        int n = 1;
        while (cur.next != null) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
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
    ListNode* rotateRight(ListNode* head, int k) {
        if (!head) {
            return head;
        }

        ListNode* cur = head;
        int n = 1;
        while (cur->next) {
            n++;
            cur = cur->next;
        }

        cur->next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur->next;
        }

        head = cur->next;
        cur->next = nullptr;
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
    rotateRight(head, k) {
        if (!head) {
            return head;
        }

        let cur = head,
            n = 1;
        while (cur.next) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (let i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
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
    public ListNode RotateRight(ListNode head, int k) {
        if (head == null) {
            return head;
        }

        ListNode cur = head;
        int n = 1;
        while (cur.next != null) {
            n++;
            cur = cur.next;
        }

        cur.next = head;
        k %= n;
        for (int i = 0; i < n - k; i++) {
            cur = cur.next;
        }

        head = cur.next;
        cur.next = null;
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
func rotateRight(head *ListNode, k int) *ListNode {
    if head == nil {
        return head
    }

    cur := head
    n := 1
    for cur.Next != nil {
        n++
        cur = cur.Next
    }

    cur.Next = head
    k %= n
    for i := 0; i < n - k; i++ {
        cur = cur.Next
    }

    head = cur.Next
    cur.Next = nil
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
    fun rotateRight(head: ListNode?, k: Int): ListNode? {
        if (head == null) {
            return head
        }

        var cur = head
        var n = 1
        while (cur?.next != null) {
            n++
            cur = cur.next
        }

        cur?.next = head
        val rotations = k % n
        for (i in 0 until n - rotations) {
            cur = cur?.next
        }

        val newHead = cur?.next
        cur?.next = null
        return newHead
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
    func rotateRight(_ head: ListNode?, _ k: Int) -> ListNode? {
        guard let head = head else {
            return head
        }

        var cur: ListNode? = head
        var n = 1
        while cur?.next != nil {
            n += 1
            cur = cur?.next
        }

        cur?.next = head
        let rotations = k % n
        for _ in 0..<(n - rotations) {
            cur = cur?.next
        }

        let newHead = cur?.next
        cur?.next = nil
        return newHead
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
