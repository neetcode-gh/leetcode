## 1. Convert To Array

### Intuition

A palindrome reads the same forwards and backwards. Linked lists only allow forward traversal, making direct comparison difficult. The simplest approach is to convert the linked list to an array where we can use random access.

Once we have an array, we can use two pointers from both ends moving toward the center, comparing values as we go.

### Algorithm

1. Traverse the linked list and store all node values in an array.
2. Initialize two pointers: `left` at the start and `right` at the end of the array.
3. While `left < right`, compare `arr[left]` and `arr[right]`. If they differ, return `false`.
4. Move `left` forward and `right` backward after each comparison.
5. If all comparisons pass, return `true`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        l, r = 0, len(arr) - 1
        while l < r:
            if arr[l] != arr[r]:
                return False
            l, r = l + 1, r - 1

        return True
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
    public boolean isPalindrome(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;
        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int l = 0, r = arr.size() - 1;
        while (l < r) {
            if (!arr.get(l).equals(arr.get(r))) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
    bool isPalindrome(ListNode* head) {
        std::vector<int> arr;
        ListNode* cur = head;
        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int l = 0, r = arr.size() - 1;
        while (l < r) {
            if (arr[l] != arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        const arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let l = 0,
            r = arr.length - 1;
        while (l < r) {
            if (arr[l] !== arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        List<int> arr = new List<int>();
        ListNode cur = head;
        while (cur != null) {
            arr.Add(cur.val);
            cur = cur.next;
        }

        int l = 0, r = arr.Count - 1;
        while (l < r) {
            if (arr[l] != arr[r]) {
                return false;
            }
            l++;
            r--;
        }

        return true;
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
func isPalindrome(head *ListNode) bool {
    arr := []int{}
    cur := head
    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    l, r := 0, len(arr)-1
    for l < r {
        if arr[l] != arr[r] {
            return false
        }
        l++
        r--
    }

    return true
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
    fun isPalindrome(head: ListNode?): Boolean {
        val arr = mutableListOf<Int>()
        var cur = head
        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        var l = 0
        var r = arr.size - 1
        while (l < r) {
            if (arr[l] != arr[r]) {
                return false
            }
            l++
            r--
        }

        return true
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
    func isPalindrome(_ head: ListNode?) -> Bool {
        var arr = [Int]()
        var cur = head
        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        var l = 0
        var r = arr.count - 1
        while l < r {
            if arr[l] != arr[r] {
                return false
            }
            l += 1
            r -= 1
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Recursion

### Intuition

We can use recursion to simulate traversing from the end of the list. By recursing to the end first and comparing on the way back, we effectively compare nodes from both ends simultaneously.

We maintain a pointer starting at the head. As recursion unwinds from the tail, we compare each node with the head pointer and advance the head pointer after each match.

### Algorithm

1. Initialize a pointer `cur` at the head of the list.
2. Define a recursive function `rec(node)` that:
   - Returns `true` if `node` is `null` (base case).
   - Recursively calls `rec(node.next)` first to reach the end.
   - Compares `cur.val` with `node.val`. If they differ, return `false`.
   - Advances `cur` to the next node.
   - Returns `true` if all comparisons pass.
3. Call `rec(head)` and return the result.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        self.cur = head

        def rec(node):
            if node is not None:
                if not rec(node.next):
                    return False
                if self.cur.val != node.val:
                    return False
                self.cur = self.cur.next
            return True

        return rec(head)
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
    private ListNode cur;

    public boolean isPalindrome(ListNode head) {
        cur = head;
        return rec(head);
    }

    private boolean rec(ListNode node) {
        if (node != null) {
            if (!rec(node.next)) {
                return false;
            }
            if (cur.val != node.val) {
                return false;
            }
            cur = cur.next;
        }
        return true;
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
    ListNode* cur;

    bool rec(ListNode* node) {
        if (node != nullptr) {
            if (!rec(node->next)) {
                return false;
            }
            if (cur->val != node->val) {
                return false;
            }
            cur = cur->next;
        }
        return true;
    }

public:
    bool isPalindrome(ListNode* head) {
        cur = head;
        return rec(head);
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
     * @return {boolean}
     */
    isPalindrome(head) {
        let cur = head;

        const rec = (node) => {
            if (node !== null) {
                if (!rec(node.next)) {
                    return false;
                }
                if (cur.val !== node.val) {
                    return false;
                }
                cur = cur.next;
            }
            return true;
        };

        return rec(head);
    }
}
```

```csharp
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
    private ListNode cur;

    public bool IsPalindrome(ListNode head) {
        cur = head;
        return Rec(head);
    }

    private bool Rec(ListNode node) {
        if (node != null) {
            if (!Rec(node.next)) {
                return false;
            }
            if (cur.val != node.val) {
                return false;
            }
            cur = cur.next;
        }
        return true;
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
func isPalindrome(head *ListNode) bool {
    cur := head

    var rec func(node *ListNode) bool
    rec = func(node *ListNode) bool {
        if node != nil {
            if !rec(node.Next) {
                return false
            }
            if cur.Val != node.Val {
                return false
            }
            cur = cur.Next
        }
        return true
    }

    return rec(head)
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
    private var cur: ListNode? = null

    fun isPalindrome(head: ListNode?): Boolean {
        cur = head
        return rec(head)
    }

    private fun rec(node: ListNode?): Boolean {
        if (node != null) {
            if (!rec(node.next)) {
                return false
            }
            if (cur?.`val` != node.`val`) {
                return false
            }
            cur = cur?.next
        }
        return true
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
    var cur: ListNode?

    func isPalindrome(_ head: ListNode?) -> Bool {
        cur = head
        return rec(head)
    }

    private func rec(_ node: ListNode?) -> Bool {
        if node != nil {
            if !rec(node?.next) {
                return false
            }
            if cur?.val != node?.val {
                return false
            }
            cur = cur?.next
        }
        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Stack

### Intuition

A stack provides LIFO (last-in-first-out) access. If we push all elements onto a stack and then traverse the list while popping, we compare elements from the front and back simultaneously.

This is similar to the array approach but uses a stack to reverse the order of comparison.

### Algorithm

1. Traverse the linked list and push all values onto a stack.
2. Traverse the list again from the head. For each node, pop from the stack and compare.
3. If any comparison fails, return `false`.
4. If we complete the traversal without mismatches, return `true`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: Optional[ListNode]) -> bool:
        stack = []
        cur = head

        while cur:
            stack.append(cur.val)
            cur = cur.next

        cur = head
        while cur and cur.val == stack.pop():
            cur = cur.next

        return not cur
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
    public boolean isPalindrome(ListNode head) {
        Stack<Integer> stack = new Stack<>();
        ListNode cur = head;

        while (cur != null) {
            stack.push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur != null && cur.val == stack.pop()) {
            cur = cur.next;
        }

        return cur == null;
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
    bool isPalindrome(ListNode* head) {
        stack<int> stack;
        ListNode* cur = head;

        while (cur != nullptr) {
            stack.push(cur->val);
            cur = cur->next;
        }

        cur = head;
        while (cur != nullptr && cur->val == stack.top()) {
            stack.pop();
            cur = cur->next;
        }

        return cur == nullptr;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        const stack = [];
        let cur = head;

        while (cur) {
            stack.push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur && cur.val === stack.pop()) {
            cur = cur.next;
        }

        return cur === null;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        Stack<int> stack = new Stack<int>();
        ListNode cur = head;

        while (cur != null) {
            stack.Push(cur.val);
            cur = cur.next;
        }

        cur = head;
        while (cur != null && cur.val == stack.Pop()) {
            cur = cur.next;
        }

        return cur == null;
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
func isPalindrome(head *ListNode) bool {
    stack := []int{}
    cur := head

    for cur != nil {
        stack = append(stack, cur.Val)
        cur = cur.Next
    }

    cur = head
    for cur != nil && cur.Val == stack[len(stack)-1] {
        stack = stack[:len(stack)-1]
        cur = cur.Next
    }

    return cur == nil
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
    fun isPalindrome(head: ListNode?): Boolean {
        val stack = ArrayDeque<Int>()
        var cur = head

        while (cur != null) {
            stack.addLast(cur.`val`)
            cur = cur.next
        }

        cur = head
        while (cur != null && cur.`val` == stack.removeLast()) {
            cur = cur.next
        }

        return cur == null
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
    func isPalindrome(_ head: ListNode?) -> Bool {
        var stack = [Int]()
        var cur = head

        while cur != nil {
            stack.append(cur!.val)
            cur = cur?.next
        }

        cur = head
        while cur != nil && cur!.val == stack.removeLast() {
            cur = cur?.next
        }

        return cur == nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Fast & Slow Pointers

### Intuition

To achieve O(1) extra space, we can reverse the second half of the list in place. Then we compare the first half with the reversed second half node by node.

We use the fast and slow pointer technique to find the middle of the list. The fast pointer moves twice as fast, so when it reaches the end, the slow pointer is at the middle.

### Algorithm

1. Use fast and slow pointers to find the middle of the list. When fast reaches the end, slow is at the middle.
2. Reverse the second half of the list starting from slow.
3. Compare nodes from the head and from the reversed second half. If any values differ, return `false`.
4. Continue until the reversed half is fully traversed.
5. Return `true` if all comparisons match.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def isPalindrome(self, head: ListNode) -> bool:
        fast = head
        slow = head

        # find middle (slow)
        while fast and fast.next:
            fast = fast.next.next
            slow = slow.next

        # reverse second half
        prev = None
        while slow:
            tmp = slow.next
            slow.next = prev
            prev = slow
            slow = tmp

        # check palindrome
        left, right = head, prev
        while right:
            if left.val != right.val:
                return False
            left = left.next
            right = right.next

        return True
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
    public boolean isPalindrome(ListNode head) {
        ListNode fast = head, slow = head;

        // find middle (slow)
        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // reverse second half
        ListNode prev = null;
        while (slow != null) {
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
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
    bool isPalindrome(ListNode* head) {
        ListNode *fast = head, *slow = head;

        // find middle (slow)
        while (fast && fast->next) {
            fast = fast->next->next;
            slow = slow->next;
        }

        // reverse second half
        ListNode *prev = nullptr;
        while (slow) {
            ListNode *tmp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        ListNode *left = head, *right = prev;
        while (right) {
            if (left->val != right->val) {
                return false;
            }
            left = left->next;
            right = right->next;
        }

        return true;
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
     * @return {boolean}
     */
    isPalindrome(head) {
        let fast = head,
            slow = head;

        // find middle (slow)
        while (fast && fast.next) {
            fast = fast.next.next;
            slow = slow.next;
        }

        // reverse second half
        let prev = null;
        while (slow) {
            let tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        // check palindrome
        let left = head,
            right = prev;
        while (right) {
            if (left.val !== right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
    }
}
```

```csharp
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
    public bool IsPalindrome(ListNode head) {
        ListNode fast = head, slow = head;

        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            slow = slow.next;
        }

        ListNode prev = null;
        while (slow != null) {
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        ListNode left = head, right = prev;
        while (right != null) {
            if (left.val != right.val) {
                return false;
            }
            left = left.next;
            right = right.next;
        }

        return true;
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
func isPalindrome(head *ListNode) bool {
    fast, slow := head, head

    // find middle (slow)
    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        slow = slow.Next
    }

    // reverse second half
    var prev *ListNode
    for slow != nil {
        tmp := slow.Next
        slow.Next = prev
        prev = slow
        slow = tmp
    }

    // check palindrome
    left, right := head, prev
    for right != nil {
        if left.Val != right.Val {
            return false
        }
        left = left.Next
        right = right.Next
    }

    return true
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
    fun isPalindrome(head: ListNode?): Boolean {
        var fast = head
        var slow = head

        // find middle (slow)
        while (fast != null && fast.next != null) {
            fast = fast.next?.next
            slow = slow?.next
        }

        // reverse second half
        var prev: ListNode? = null
        var curr = slow
        while (curr != null) {
            val tmp = curr.next
            curr.next = prev
            prev = curr
            curr = tmp
        }

        // check palindrome
        var left = head
        var right = prev
        while (right != null) {
            if (left?.`val` != right.`val`) {
                return false
            }
            left = left?.next
            right = right.next
        }

        return true
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
    func isPalindrome(_ head: ListNode?) -> Bool {
        var fast = head
        var slow = head

        // find middle (slow)
        while fast != nil && fast?.next != nil {
            fast = fast?.next?.next
            slow = slow?.next
        }

        // reverse second half
        var prev: ListNode? = nil
        var curr = slow
        while curr != nil {
            let tmp = curr?.next
            curr?.next = prev
            prev = curr
            curr = tmp
        }

        // check palindrome
        var left = head
        var right = prev
        while right != nil {
            if left?.val != right?.val {
                return false
            }
            left = left?.next
            right = right?.next
        }

        return true
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
