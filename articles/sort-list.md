## Prerequisites

Before attempting this problem, you should be comfortable with:

- **Linked List Traversal** - Iterating through nodes and manipulating pointers
- **Merge Sort Algorithm** - Understanding divide-and-conquer sorting with O(n log n) complexity
- **Two Pointers (Slow/Fast)** - Finding the middle of a linked list using the tortoise and hare technique
- **Merging Two Sorted Lists** - Combining two sorted sequences into one sorted sequence

---

## 1. Convert To Array

### Intuition

Linked lists are notoriously difficult to sort in place due to lack of random access. A straightforward workaround is to extract all node values into an array, sort the array using a built-in sorting algorithm, and then write the sorted values back into the linked list nodes. This leverages efficient array sorting while preserving the original list structure.

### Algorithm

1. Traverse the linked list and collect all node values into an array.
2. Sort the array using a standard sorting algorithm.
3. Traverse the linked list again, updating each node's value with the corresponding sorted value from the array.
4. Return the head of the list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        arr = []
        cur = head

        while cur:
            arr.append(cur.val)
            cur = cur.next

        arr.sort()
        cur = head
        for val in arr:
            cur.val = val
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
    public ListNode sortList(ListNode head) {
        if (head == null) return null;

        List<Integer> arr = new ArrayList<>();
        ListNode cur = head;

        while (cur != null) {
            arr.add(cur.val);
            cur = cur.next;
        }

        Collections.sort(arr);
        cur = head;
        for (int val : arr) {
            cur.val = val;
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
    ListNode* sortList(ListNode* head) {
        if (!head) return nullptr;

        vector<int> arr;
        ListNode* cur = head;

        while (cur) {
            arr.push_back(cur->val);
            cur = cur->next;
        }

        sort(arr.begin(), arr.end());
        cur = head;
        for (int val : arr) {
            cur->val = val;
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
     * @return {ListNode}
     */
    sortList(head) {
        if (!head) return null;

        let arr = [];
        let cur = head;

        while (cur) {
            arr.push(cur.val);
            cur = cur.next;
        }

        arr.sort((a, b) => a - b);
        cur = head;
        for (let val of arr) {
            cur.val = val;
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
func sortList(head *ListNode) *ListNode {
    if head == nil {
        return nil
    }

    arr := []int{}
    cur := head

    for cur != nil {
        arr = append(arr, cur.Val)
        cur = cur.Next
    }

    sort.Ints(arr)
    cur = head
    for _, val := range arr {
        cur.Val = val
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
    fun sortList(head: ListNode?): ListNode? {
        if (head == null) return null

        val arr = mutableListOf<Int>()
        var cur = head

        while (cur != null) {
            arr.add(cur.`val`)
            cur = cur.next
        }

        arr.sort()
        cur = head
        for (value in arr) {
            cur!!.`val` = value
            cur = cur.next
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
    func sortList(_ head: ListNode?) -> ListNode? {
        guard head != nil else { return nil }

        var arr = [Int]()
        var cur = head

        while cur != nil {
            arr.append(cur!.val)
            cur = cur?.next
        }

        arr.sort()
        cur = head
        for val in arr {
            cur?.val = val
            cur = cur?.next
        }

        return head
    }
}
```

```rust
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
impl Solution {
    pub fn sort_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut arr = vec![];
        let mut cur = &head;
        while let Some(node) = cur {
            arr.push(node.val);
            cur = &node.next;
        }
        arr.sort();
        let mut cur = head;
        let mut dummy = Box::new(ListNode::new(0));
        let mut tail = &mut dummy;
        for val in arr {
            tail.next = Some(Box::new(ListNode::new(val)));
            tail = tail.next.as_mut().unwrap();
        }
        dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Recursive Merge Sort

### Intuition

Merge sort is well suited for linked lists because merging two sorted lists can be done efficiently without extra space by rearranging pointers. We recursively split the list in half using the slow and fast pointer technique to find the middle, sort each half, and then merge the two sorted halves together. This divide-and-conquer approach achieves O(n log n) time complexity.

### Algorithm

1. Base case: if the list is empty or has one node, return it as is.
2. Use `slow` and `fast` pointers to find the middle of the list. The `slow` pointer will end at the node before the midpoint.
3. Split the list into two halves by setting the next pointer of the middle node to `null`.
4. Recursively sort the `left` half and `right` half.
5. Merge the two sorted halves by comparing node values and linking nodes in sorted order.
6. Return the merged sorted list.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        left = head
        right = self.getMid(head)
        tmp = right.next
        right.next = None
        right = tmp

        left = self.sortList(left)
        right = self.sortList(right)
        return self.merge(left, right)

    def getMid(self, head):
        slow, fast = head, head.next
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
        return slow

    def merge(self, list1, list2):
        tail = dummy = ListNode()
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        if list1:
            tail.next = list1
        if list2:
            tail.next = list2

        return dummy.next
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
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode left = head;
        ListNode right = getMid(head);
        ListNode temp = right.next;
        right.next = null;
        right = temp;

        left = sortList(left);
        right = sortList(right);
        return merge(left, right);
    }

    private ListNode getMid(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private ListNode merge(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1 != null) {
            tail.next = list1;
        }
        if (list2 != null) {
            tail.next = list2;
        }

        return dummy.next;
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
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }

        ListNode* left = head;
        ListNode* right = getMid(head);
        ListNode* temp = right->next;
        right->next = nullptr;
        right = temp;

        left = sortList(left);
        right = sortList(right);
        return merge(left, right);
    }

private:
    ListNode* getMid(ListNode* head) {
        ListNode* slow = head;
        ListNode* fast = head->next;
        while (fast && fast->next) {
            slow = slow->next;
            fast = fast->next->next;
        }
        return slow;
    }

    ListNode* merge(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }

        if (list1) {
            tail->next = list1;
        }
        if (list2) {
            tail->next = list2;
        }

        return dummy.next;
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
     * @return {ListNode}
     */
    sortList(head) {
        if (!head || !head.next) {
            return head;
        }

        let left = head;
        let right = this.getMid(head);
        let temp = right.next;
        right.next = null;
        right = temp;

        left = this.sortList(left);
        right = this.sortList(right);
        return this.merge(left, right);
    }

    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    getMid(head) {
        let slow = head,
            fast = head.next;
        while (fast && fast.next) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    /**
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    merge(list1, list2) {
        let dummy = new ListNode(0);
        let tail = dummy;

        while (list1 && list2) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1) {
            tail.next = list1;
        }
        if (list2) {
            tail.next = list2;
        }

        return dummy.next;
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
    public ListNode SortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        ListNode left = head;
        ListNode right = GetMid(head);
        ListNode temp = right.next;
        right.next = null;
        right = temp;

        left = SortList(left);
        right = SortList(right);
        return Merge(left, right);
    }

    private ListNode GetMid(ListNode head) {
        ListNode slow = head, fast = head.next;
        while (fast != null && fast.next != null) {
            slow = slow.next;
            fast = fast.next.next;
        }
        return slow;
    }

    private ListNode Merge(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        if (list1 != null) {
            tail.next = list1;
        }
        if (list2 != null) {
            tail.next = list2;
        }

        return dummy.next;
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
func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    left := head
    right := getMid(head)
    temp := right.Next
    right.Next = nil
    right = temp

    left = sortList(left)
    right = sortList(right)
    return merge(left, right)
}

func getMid(head *ListNode) *ListNode {
    slow, fast := head, head.Next
    for fast != nil && fast.Next != nil {
        slow = slow.Next
        fast = fast.Next.Next
    }
    return slow
}

func merge(list1, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy

    for list1 != nil && list2 != nil {
        if list1.Val < list2.Val {
            tail.Next = list1
            list1 = list1.Next
        } else {
            tail.Next = list2
            list2 = list2.Next
        }
        tail = tail.Next
    }

    if list1 != nil {
        tail.Next = list1
    }
    if list2 != nil {
        tail.Next = list2
    }

    return dummy.Next
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
    fun sortList(head: ListNode?): ListNode? {
        if (head?.next == null) {
            return head
        }

        var left = head
        var right = getMid(head)
        val temp = right?.next
        right?.next = null
        right = temp

        left = sortList(left)
        right = sortList(right)
        return merge(left, right)
    }

    private fun getMid(head: ListNode?): ListNode? {
        var slow = head
        var fast = head?.next
        while (fast?.next != null) {
            slow = slow?.next
            fast = fast.next?.next
        }
        return slow
    }

    private fun merge(list1: ListNode?, list2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var tail: ListNode? = dummy
        var l1 = list1
        var l2 = list2

        while (l1 != null && l2 != null) {
            if (l1.`val` < l2.`val`) {
                tail?.next = l1
                l1 = l1.next
            } else {
                tail?.next = l2
                l2 = l2.next
            }
            tail = tail?.next
        }

        if (l1 != null) {
            tail?.next = l1
        }
        if (l2 != null) {
            tail?.next = l2
        }

        return dummy.next
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
    func sortList(_ head: ListNode?) -> ListNode? {
        guard head != nil && head?.next != nil else {
            return head
        }

        var left = head
        var right = getMid(head)
        let temp = right?.next
        right?.next = nil
        right = temp

        left = sortList(left)
        right = sortList(right)
        return merge(left, right)
    }

    private func getMid(_ head: ListNode?) -> ListNode? {
        var slow = head
        var fast = head?.next
        while fast != nil && fast?.next != nil {
            slow = slow?.next
            fast = fast?.next?.next
        }
        return slow
    }

    private func merge(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
        let dummy = ListNode(0)
        var tail: ListNode? = dummy
        var l1 = list1
        var l2 = list2

        while l1 != nil && l2 != nil {
            if l1!.val < l2!.val {
                tail?.next = l1
                l1 = l1?.next
            } else {
                tail?.next = l2
                l2 = l2?.next
            }
            tail = tail?.next
        }

        if l1 != nil {
            tail?.next = l1
        }
        if l2 != nil {
            tail?.next = l2
        }

        return dummy.next
    }
}
```

```rust
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
impl Solution {
    pub fn sort_list(head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        if head.is_none() || head.as_ref().unwrap().next.is_none() {
            return head;
        }
        let (left, right) = Self::split(head);
        let left = Self::sort_list(left);
        let right = Self::sort_list(right);
        Self::merge(left, right)
    }

    fn split(mut head: Option<Box<ListNode>>) -> (Option<Box<ListNode>>, Option<Box<ListNode>>) {
        let mut len = 0;
        let mut cur = &head;
        while let Some(node) = cur {
            len += 1;
            cur = &node.next;
        }
        let mid = len / 2;
        let mut cur = &mut head;
        for _ in 0..mid - 1 {
            cur = &mut cur.as_mut().unwrap().next;
        }
        let right = cur.as_mut().unwrap().next.take();
        (head, right)
    }

    fn merge(mut l1: Option<Box<ListNode>>, mut l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode::new(0));
        let mut tail = &mut dummy;
        while l1.is_some() && l2.is_some() {
            if l1.as_ref().unwrap().val < l2.as_ref().unwrap().val {
                let next = l1.as_mut().unwrap().next.take();
                tail.next = l1;
                l1 = next;
            } else {
                let next = l2.as_mut().unwrap().next.take();
                tail.next = l2;
                l2 = next;
            }
            tail = tail.next.as_mut().unwrap();
        }
        tail.next = if l1.is_some() { l1 } else { l2 };
        dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(\log n)$ for recursion stack.

---

## 3. Iterative Merge Sort

### Intuition

The recursive merge sort uses O(log n) space for the call stack. To achieve true O(1) extra space, we can implement merge sort iteratively using a bottom-up approach. Instead of recursively splitting the list, we start by treating each node as a sorted sublist of size 1, then merge adjacent pairs into sorted sublists of size 2, then 4, and so on until the entire list is sorted.

### Algorithm

1. Count the total length of the linked list.
2. Use a `dummy` node to simplify head management during merges.
3. Start with a `step` size of `1` and double it each iteration until it reaches the list length.
4. For each `step` size, traverse the list and split off pairs of sublists of that size.
5. Merge each pair of sublists and attach the merged result to the previous portion of the list.
6. After all iterations complete, return the sorted list starting from `dummy.next`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def sortList(self, head: Optional[ListNode]) -> Optional[ListNode]:
        if not head or not head.next:
            return head

        length = 0
        cur = head
        while cur:
            length += 1
            cur = cur.next

        dummy = ListNode(0)
        dummy.next = head
        step = 1

        while step < length:
            prev, curr = dummy, dummy.next
            while curr:
                left = curr
                right = self.split(left, step)
                curr = self.split(right, step)
                merged = self.merge(left, right)
                prev.next = merged
                while prev.next:
                    prev = prev.next
            step *= 2

        return dummy.next

    def split(self, head, step):
        if not head:
            return None
        for _ in range(step - 1):
            if not head.next:
                break
            head = head.next
        next_part = head.next
        head.next = None
        return next_part

    def merge(self, list1, list2):
        tail = dummy = ListNode(0)
        while list1 and list2:
            if list1.val < list2.val:
                tail.next = list1
                list1 = list1.next
            else:
                tail.next = list2
                list2 = list2.next
            tail = tail.next

        tail.next = list1 or list2
        return dummy.next
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
    public ListNode sortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        int length = 0;
        ListNode cur = head;
        while (cur != null) {
            length++;
            cur = cur.next;
        }

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        int step = 1;

        while (step < length) {
            ListNode prev = dummy, curr = dummy.next;
            while (curr != null) {
                ListNode left = curr;
                ListNode right = split(left, step);
                curr = split(right, step);
                ListNode merged = merge(left, right);
                prev.next = merged;
                while (prev.next != null) {
                    prev = prev.next;
                }
            }
            step *= 2;
        }

        return dummy.next;
    }

    private ListNode split(ListNode head, int step) {
        if (head == null) return null;
        for (int i = 0; i < step - 1 && head.next != null; i++) {
            head = head.next;
        }
        ListNode nextPart = head.next;
        head.next = null;
        return nextPart;
    }

    private ListNode merge(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
    }
}
```

```cpp
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
class Solution {
public:
    ListNode* sortList(ListNode* head) {
        if (!head || !head->next) {
            return head;
        }

        int length = 0;
        ListNode* cur = head;
        while (cur) {
            length++;
            cur = cur->next;
        }

        ListNode dummy(0);
        dummy.next = head;
        int step = 1;

        while (step < length) {
            ListNode* prev = &dummy, *curr = dummy.next;
            while (curr) {
                ListNode* left = curr;
                ListNode* right = split(left, step);
                curr = split(right, step);
                ListNode* merged = merge(left, right);
                prev->next = merged;
                while (prev->next) {
                    prev = prev->next;
                }
            }
            step *= 2;
        }

        return dummy.next;
    }

private:
    ListNode* split(ListNode* head, int step) {
        if (!head) return nullptr;
        for (int i = 0; i < step - 1 && head->next; i++) {
            head = head->next;
        }
        ListNode* nextPart = head->next;
        head->next = nullptr;
        return nextPart;
    }

    ListNode* merge(ListNode* list1, ListNode* list2) {
        ListNode dummy(0);
        ListNode* tail = &dummy;

        while (list1 && list2) {
            if (list1->val < list2->val) {
                tail->next = list1;
                list1 = list1->next;
            } else {
                tail->next = list2;
                list2 = list2->next;
            }
            tail = tail->next;
        }

        tail->next = list1 ? list1 : list2;
        return dummy.next;
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
     * @return {ListNode}
     */
    sortList(head) {
        if (!head || !head.next) {
            return head;
        }

        let length = 0;
        let cur = head;
        while (cur) {
            length++;
            cur = cur.next;
        }

        let dummy = new ListNode(0);
        dummy.next = head;
        let step = 1;

        while (step < length) {
            let prev = dummy,
                curr = dummy.next;
            while (curr) {
                let left = curr;
                let right = this.split(left, step);
                curr = this.split(right, step);
                let merged = this.merge(left, right);
                prev.next = merged;
                while (prev.next) {
                    prev = prev.next;
                }
            }
            step *= 2;
        }

        return dummy.next;
    }

    /**
     * @param {ListNode} head
     * @param {number} step
     * @return {ListNode}
     */
    split(head, step) {
        if (!head) return null;
        for (let i = 0; i < step - 1 && head.next; i++) {
            head = head.next;
        }
        let nextPart = head.next;
        head.next = null;
        return nextPart;
    }

    /**
     * @param {ListNode} list1
     * @param {ListNode} list2
     * @return {ListNode}
     */
    merge(list1, list2) {
        let dummy = new ListNode(0);
        let tail = dummy;

        while (list1 && list2) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        tail.next = list1 || list2;
        return dummy.next;
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
    public ListNode SortList(ListNode head) {
        if (head == null || head.next == null) {
            return head;
        }

        int length = 0;
        ListNode cur = head;
        while (cur != null) {
            length++;
            cur = cur.next;
        }

        ListNode dummy = new ListNode(0);
        dummy.next = head;
        int step = 1;

        while (step < length) {
            ListNode prev = dummy, curr = dummy.next;
            while (curr != null) {
                ListNode left = curr;
                ListNode right = Split(left, step);
                curr = Split(right, step);
                ListNode merged = Merge(left, right);
                prev.next = merged;
                while (prev.next != null) {
                    prev = prev.next;
                }
            }
            step *= 2;
        }

        return dummy.next;
    }

    private ListNode Split(ListNode head, int step) {
        if (head == null) return null;
        for (int i = 0; i < step - 1 && head.next != null; i++) {
            head = head.next;
        }
        ListNode nextPart = head.next;
        head.next = null;
        return nextPart;
    }

    private ListNode Merge(ListNode list1, ListNode list2) {
        ListNode dummy = new ListNode(0);
        ListNode tail = dummy;

        while (list1 != null && list2 != null) {
            if (list1.val < list2.val) {
                tail.next = list1;
                list1 = list1.next;
            } else {
                tail.next = list2;
                list2 = list2.next;
            }
            tail = tail.next;
        }

        tail.next = (list1 != null) ? list1 : list2;
        return dummy.next;
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
func sortList(head *ListNode) *ListNode {
    if head == nil || head.Next == nil {
        return head
    }

    length := 0
    cur := head
    for cur != nil {
        length++
        cur = cur.Next
    }

    dummy := &ListNode{Val: 0, Next: head}
    step := 1

    for step < length {
        prev, curr := dummy, dummy.Next
        for curr != nil {
            left := curr
            right := split(left, step)
            curr = split(right, step)
            merged := merge(left, right)
            prev.Next = merged
            for prev.Next != nil {
                prev = prev.Next
            }
        }
        step *= 2
    }

    return dummy.Next
}

func split(head *ListNode, step int) *ListNode {
    if head == nil {
        return nil
    }
    for i := 0; i < step-1 && head.Next != nil; i++ {
        head = head.Next
    }
    nextPart := head.Next
    head.Next = nil
    return nextPart
}

func merge(list1, list2 *ListNode) *ListNode {
    dummy := &ListNode{}
    tail := dummy

    for list1 != nil && list2 != nil {
        if list1.Val < list2.Val {
            tail.Next = list1
            list1 = list1.Next
        } else {
            tail.Next = list2
            list2 = list2.Next
        }
        tail = tail.Next
    }

    if list1 != nil {
        tail.Next = list1
    } else {
        tail.Next = list2
    }
    return dummy.Next
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
    fun sortList(head: ListNode?): ListNode? {
        if (head?.next == null) {
            return head
        }

        var length = 0
        var cur = head
        while (cur != null) {
            length++
            cur = cur.next
        }

        val dummy = ListNode(0)
        dummy.next = head
        var step = 1

        while (step < length) {
            var prev: ListNode? = dummy
            var curr = dummy.next
            while (curr != null) {
                val left = curr
                val right = split(left, step)
                curr = split(right, step)
                val merged = merge(left, right)
                prev?.next = merged
                while (prev?.next != null) {
                    prev = prev.next
                }
            }
            step *= 2
        }

        return dummy.next
    }

    private fun split(head: ListNode?, step: Int): ListNode? {
        var h = head
        if (h == null) return null
        for (i in 0 until step - 1) {
            if (h?.next == null) break
            h = h.next
        }
        val nextPart = h?.next
        h?.next = null
        return nextPart
    }

    private fun merge(list1: ListNode?, list2: ListNode?): ListNode? {
        val dummy = ListNode(0)
        var tail: ListNode? = dummy
        var l1 = list1
        var l2 = list2

        while (l1 != null && l2 != null) {
            if (l1.`val` < l2.`val`) {
                tail?.next = l1
                l1 = l1.next
            } else {
                tail?.next = l2
                l2 = l2.next
            }
            tail = tail?.next
        }

        tail?.next = l1 ?: l2
        return dummy.next
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
    func sortList(_ head: ListNode?) -> ListNode? {
        guard head != nil && head?.next != nil else {
            return head
        }

        var length = 0
        var cur = head
        while cur != nil {
            length += 1
            cur = cur?.next
        }

        let dummy = ListNode(0)
        dummy.next = head
        var step = 1

        while step < length {
            var prev: ListNode? = dummy
            var curr = dummy.next
            while curr != nil {
                let left = curr
                let right = split(left, step)
                curr = split(right, step)
                let merged = merge(left, right)
                prev?.next = merged
                while prev?.next != nil {
                    prev = prev?.next
                }
            }
            step *= 2
        }

        return dummy.next
    }

    private func split(_ head: ListNode?, _ step: Int) -> ListNode? {
        guard var h = head else { return nil }
        for _ in 0..<(step - 1) {
            guard h.next != nil else { break }
            h = h.next!
        }
        let nextPart = h.next
        h.next = nil
        return nextPart
    }

    private func merge(_ list1: ListNode?, _ list2: ListNode?) -> ListNode? {
        let dummy = ListNode(0)
        var tail: ListNode? = dummy
        var l1 = list1
        var l2 = list2

        while l1 != nil && l2 != nil {
            if l1!.val < l2!.val {
                tail?.next = l1
                l1 = l1?.next
            } else {
                tail?.next = l2
                l2 = l2?.next
            }
            tail = tail?.next
        }

        tail?.next = l1 ?? l2
        return dummy.next
    }
}
```

```rust
// Definition for singly-linked list.
// #[derive(PartialEq, Eq, Clone, Debug)]
// pub struct ListNode {
//   pub val: i32,
//   pub next: Option<Box<ListNode>>
// }
impl Solution {
    pub fn sort_list(mut head: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut length = 0;
        let mut cur = &head;
        while let Some(node) = cur {
            length += 1;
            cur = &node.next;
        }
        if length <= 1 {
            return head;
        }

        let mut dummy = Box::new(ListNode { val: 0, next: head });
        let mut step = 1;

        while step < length {
            let mut curr = dummy.next.take();
            let mut tail = &mut *dummy;

            while curr.is_some() {
                let (left, rest) = Self::split_at(curr, step);
                let (right, remaining) = Self::split_at(rest, step);
                curr = remaining;
                tail.next = Self::merge(left, right);
                while tail.next.is_some() {
                    tail = tail.next.as_mut().unwrap();
                }
            }
            step *= 2;
        }
        dummy.next
    }

    fn split_at(mut head: Option<Box<ListNode>>, step: usize) -> (Option<Box<ListNode>>, Option<Box<ListNode>>) {
        let mut cur = &mut head;
        for _ in 0..step - 1 {
            if cur.is_none() || cur.as_ref().unwrap().next.is_none() {
                break;
            }
            cur = &mut cur.as_mut().unwrap().next;
        }
        let rest = cur.as_mut().and_then(|node| node.next.take());
        (head, rest)
    }

    fn merge(mut l1: Option<Box<ListNode>>, mut l2: Option<Box<ListNode>>) -> Option<Box<ListNode>> {
        let mut dummy = Box::new(ListNode::new(0));
        let mut tail = &mut dummy;
        while l1.is_some() && l2.is_some() {
            if l1.as_ref().unwrap().val < l2.as_ref().unwrap().val {
                let next = l1.as_mut().unwrap().next.take();
                tail.next = l1;
                l1 = next;
            } else {
                let next = l2.as_mut().unwrap().next.take();
                tail.next = l2;
                l2 = next;
            }
            tail = tail.next.as_mut().unwrap();
        }
        tail.next = if l1.is_some() { l1 } else { l2 };
        dummy.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$

## Common Pitfalls

### Incorrect Mid-Point Calculation for List Splitting

When finding the middle of the linked list, starting `fast` at `head` instead of `head.next` can lead to incorrect splitting, especially for lists with two elements. This causes infinite recursion as the list never gets properly divided.

### Forgetting to Disconnect the Two Halves

After finding the middle node, you must set `mid.next = null` to properly split the list into two separate halves. Failing to disconnect them results in the merge sort operating on overlapping lists, causing incorrect results or infinite loops.

### Not Handling Edge Cases for Empty or Single-Node Lists

The base case must return immediately if `head` is null or `head.next` is null. Missing this check leads to null pointer exceptions or infinite recursion when the algorithm tries to split a list that cannot be divided further.
