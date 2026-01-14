## 1. Convert To Array

### Intuition

A twin sum pairs the `i`-th node from the start with the `i`-th node from the end. Since linked lists do not support random access, we first convert the list into an array. With an array, we can use two pointers starting at opposite ends to easily compute each twin sum and track the maximum.

### Algorithm

1. Traverse the linked list and store each node's value in an array `arr`.
2. Initialize two pointers: `i` at the start and `j` at the end of the array.
3. While `i < j`:
   - Compute `arr[i] + arr[j]` and update `res` if this sum is larger.
   - Move `i` forward and `j` backward.
4. Return `res`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        arr = []
        cur = head
        while cur:
            arr.append(cur.val)
            cur = cur.next

        i, j = 0, len(arr) - 1
        res = 0
        while i < j:
            res = max(res, arr[i] + arr[j])
            i, j = i + 1, j - 1

        return res
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
    public int pairSum(ListNode head) {
        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        int i = 0, j = arr.size() - 1, res = 0;
        while (i < j) {
            res = Math.max(res, arr.get(i) + arr.get(j));
            i++;
            j--;
        }

        return res;
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
    int pairSum(ListNode* head) {
        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        int i = 0, j = arr.size() - 1, res = 0;
        while (i < j) {
            res = max(res, arr[i] + arr[j]);
            i++;
            j--;
        }

        return res;
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
     * @return {number}
     */
    pairSum(head) {
        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        let i = 0,
            j = arr.length - 1,
            res = 0;
        while (i < j) {
            res = Math.max(res, arr[i] + arr[j]);
            i++;
            j--;
        }

        return res;
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
func pairSum(head *ListNode) int {
    arr := []int{}
    cur := head

    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    i, j := 0, len(arr)-1
    res := 0
    for i < j {
        if arr[i]+arr[j] > res {
            res = arr[i] + arr[j]
        }
        i++
        j--
    }

    return res
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
    fun pairSum(head: ListNode?): Int {
        val arr = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        var i = 0
        var j = arr.size - 1
        var res = 0
        while (i < j) {
            res = maxOf(res, arr[i] + arr[j])
            i++
            j--
        }

        return res
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
    func pairSum(_ head: ListNode?) -> Int {
        var arr = [Int]()
        var cur = head

        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        var i = 0
        var j = arr.count - 1
        var res = 0
        while i < j {
            res = max(res, arr[i] + arr[j])
            i += 1
            j -= 1
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Reverse the Second Half

### Intuition

To avoid extra space from converting to an array, we can modify the list itself. Using the `slow` and `fast` pointer technique, we find the middle of the list. Then we reverse the second half in place. Now the first half and the reversed second half can be traversed simultaneously, allowing us to compute twin sums directly without extra storage.

### Algorithm

1. Use `slow` and `fast` pointers to find the start of the second half. When `fast` reaches the end, `slow` is at the midpoint.
2. Reverse the second half of the list starting from `slow`.
3. Initialize `first` at the head and `second` at the head of the reversed second half.
4. While `second` is not null:
   - Compute `first.val + second.val` and update `res` if larger.
   - Advance both `first` and `second`.
5. Return `res`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow, fast = head, head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next

        prev, cur = None, slow
        while cur:
            nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt

        res = 0
        first, second = head, prev
        while second:
            res = max(res, first.val + second.val)
            first, second = first.next, second.next

        return res
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
    public int pairSum(ListNode head) {
        ListNode slow = head, fast = head;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }

        ListNode prev = null, cur = slow;
        while (cur != null) {
            ListNode nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }

        int res = 0;
        ListNode first = head, second = prev;
        while (second != null) {
            res = Math.max(res, first.val + second.val);
            first = first.next;
            second = second.next;
        }

        return res;
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
    int pairSum(ListNode* head) {
        ListNode* slow = head, *fast = head;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }

        ListNode* prev = nullptr, *cur = slow;
        while (cur) {
            ListNode* nxt = cur->next;
            cur->next = prev;
            prev = cur;
            cur = nxt;
        }

        int res = 0;
        ListNode* first = head, *second = prev;
        while (second) {
            res = max(res, first->val + second->val);
            first = first->next;
            second = second->next;
        }

        return res;
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
     * @return {number}
     */
    pairSum(head) {
        let slow = head,
            fast = head;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }

        let prev = null,
            cur = slow;
        while (cur) {
            let nxt = cur.next;
            cur.next = prev;
            prev = cur;
            cur = nxt;
        }

        let res = 0,
            first = head,
            second = prev;
        while (second) {
            res = Math.max(res, first.val + second.val);
            first = first.next;
            second = second.next;
        }

        return res;
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
func pairSum(head *ListNode) int {
    slow, fast := head, head
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }

    var prev *ListNode = nil
    cur := slow
    for cur != nil {
        nxt := cur.Next
        cur.Next = prev
        prev = cur
        cur = nxt
    }

    res := 0
    first, second := head, prev
    for second != nil {
        if first.Val+second.Val > res {
            res = first.Val + second.Val
        }
        first = first.Next
        second = second.Next
    }

    return res
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
    fun pairSum(head: ListNode?): Int {
        var slow = head
        var fast = head
        while (fast != null && fast.next != null) {
            slow = slow?.next
            fast = fast.next?.next
        }

        var prev: ListNode? = null
        var cur = slow
        while (cur != null) {
            val nxt = cur.next
            cur.next = prev
            prev = cur
            cur = nxt
        }

        var res = 0
        var first = head
        var second = prev
        while (second != null) {
            res = maxOf(res, first!!.`val` + second.`val`)
            first = first.next
            second = second.next
        }

        return res
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
    func pairSum(_ head: ListNode?) -> Int {
        var slow = head
        var fast = head
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }

        var prev: ListNode? = nil
        var cur = slow
        while cur != nil {
            let nxt = cur?.next
            cur?.next = prev
            prev = cur
            cur = nxt
        }

        var res = 0
        var first = head
        var second = prev
        while second != nil {
            res = max(res, first!.val + second!.val)
            first = first?.next
            second = second?.next
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## 3. Reverse the First Half

### Intuition

Instead of reversing the second half after finding the middle, we can reverse the first half as we go. While traversing with `slow` and `fast` pointers, we reverse the links behind `slow`. By the time `slow` reaches the middle, the first half is already reversed. Now `slow` points to the start of the second half, and `prev` points to the end of the reversed first half. We can traverse both halves in parallel to find the maximum twin sum.

### Algorithm

1. Initialize `slow` and `fast` at head, and `prev` as null.
2. While `fast` and `fast.next` are not null:
   - Move `fast` two steps ahead.
   - Reverse the link: save `slow.next`, point `slow.next` to `prev`, update `prev` to `slow`, and move `slow` forward.
3. Now `prev` points to the tail of the reversed first half, and `slow` points to the head of the second half.
4. Traverse both halves together, computing twin sums and tracking the maximum.
5. Return `res`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def pairSum(self, head: Optional[ListNode]) -> int:
        slow, fast = head, head
        prev = None

        while fast and fast.next:
            fast = fast.next.next
            tmp = slow.next
            slow.next = prev
            prev = slow
            slow = tmp

        res = 0
        while slow:
            res = max(res, prev.val + slow.val)
            prev = prev.next
            slow = slow.next

        return res
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
    public int pairSum(ListNode head) {
        ListNode slow = head, fast = head, prev = null;

        while (fast != null && fast.next != null) {
            fast = fast.next.next;
            ListNode tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        int res = 0;
        while (slow != null) {
            res = Math.max(res, prev.val + slow.val);
            prev = prev.next;
            slow = slow.next;
        }

        return res;
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
    int pairSum(ListNode* head) {
        ListNode* slow = head, *fast = head, *prev = nullptr;

        while (fast && fast->next) {
            fast = fast->next->next;
            ListNode* tmp = slow->next;
            slow->next = prev;
            prev = slow;
            slow = tmp;
        }

        int res = 0;
        while (slow) {
            res = max(res, prev->val + slow->val);
            prev = prev->next;
            slow = slow->next;
        }

        return res;
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
     * @return {number}
     */
    pairSum(head) {
        let slow = head,
            fast = head,
            prev = null;

        while (fast && fast.next) {
            fast = fast.next.next;
            let tmp = slow.next;
            slow.next = prev;
            prev = slow;
            slow = tmp;
        }

        let res = 0;
        while (slow) {
            res = Math.max(res, prev.val + slow.val);
            prev = prev.next;
            slow = slow.next;
        }

        return res;
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
func pairSum(head *ListNode) int {
    slow, fast := head, head
    var prev *ListNode = nil

    for fast != nil && fast.Next != nil {
        fast = fast.Next.Next
        tmp := slow.Next
        slow.Next = prev
        prev = slow
        slow = tmp
    }

    res := 0
    for slow != nil {
        if prev.Val+slow.Val > res {
            res = prev.Val + slow.Val
        }
        prev = prev.Next
        slow = slow.Next
    }

    return res
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
    fun pairSum(head: ListNode?): Int {
        var slow = head
        var fast = head
        var prev: ListNode? = null

        while (fast != null && fast.next != null) {
            fast = fast.next?.next
            val tmp = slow?.next
            slow?.next = prev
            prev = slow
            slow = tmp
        }

        var res = 0
        while (slow != null) {
            res = maxOf(res, prev!!.`val` + slow.`val`)
            prev = prev.next
            slow = slow.next
        }

        return res
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
    func pairSum(_ head: ListNode?) -> Int {
        var slow = head
        var fast = head
        var prev: ListNode? = nil

        while fast != nil && fast?.next != nil {
            fast = fast?.next?.next
            let tmp = slow?.next
            slow?.next = prev
            prev = slow
            slow = tmp
        }

        var res = 0
        while slow != nil {
            res = max(res, prev!.val + slow!.val)
            prev = prev?.next
            slow = slow?.next
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Incorrect Middle Detection with Fast/Slow Pointers

A common mistake is using the wrong loop condition for finding the middle. For this problem, when `fast` and `fast.next` are both not null, `slow` advances. If you use `fast.next` and `fast.next.next`, you may stop one node too early or too late, causing incorrect pairing of twin nodes.

### Reversing the Wrong Half

When reversing in-place, some developers accidentally reverse the first half when they intended to reverse the second half, or vice versa. This leads to incorrect twin pairings. Ensure you clearly track which portion of the list you are reversing and where the boundary lies after finding the middle.

### Losing Track of Pointers During Reversal

While reversing, failing to save the `next` pointer before modifying `cur.next` causes you to lose access to the rest of the list. Always store `nxt = cur.next` before setting `cur.next = prev`, then advance using the saved reference.
