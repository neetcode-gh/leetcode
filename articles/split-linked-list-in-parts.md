## 1. Convert To Array

### Intuition

To split the list into k parts as evenly as possible, we first need to know the total length. Converting the linked list to an array gives us random access, making it easy to determine where each part starts and ends. Each part gets `n / k` elements at minimum, and the first `n % k` parts get one extra element to distribute the remainder evenly.

### Algorithm

1. Traverse the linked list and store all nodes in an array.
2. Calculate `base_len = n / k` (minimum elements per part) and `remainder = n % k` (parts that get an extra element).
3. For each of the k parts:
   - If there are remaining elements, set the part's head to `arr[start]`.
   - Compute the tail index: `start + base_len - 1`, plus 1 if this part gets an extra element.
   - Sever the link by setting `arr[tail].next = null`.
   - Update `start` for the next part.
4. Return the array of part heads.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        arr, cur = [], head
        while cur:
            arr.append(cur)
            cur = cur.next

        N = len(arr)
        base_len, remainder = N // k, N % k

        res = [None] * k
        start = 0
        for i in range(k):
            if start < N:
                res[i] = arr[start]
                tail = start + base_len - 1
                if remainder:
                    tail += 1
                    remainder -= 1
                arr[tail].next = None
                start = tail + 1

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
    public ListNode[] splitListToParts(ListNode head, int k) {
        List<ListNode> arr = new ArrayList<>();
        for (ListNode cur = head; cur != null; cur = cur.next) {
            arr.add(cur);
        }

        int N = arr.size();
        int base_len = N / k, remainder = N % k;

        ListNode[] res = new ListNode[k];
        int start = 0;
        for (int i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr.get(start);
                int tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr.get(tail).next = null;
                start = tail + 1;
            }
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
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        vector<ListNode*> arr;
        for (ListNode* cur = head; cur != nullptr; cur = cur->next) {
            arr.push_back(cur);
        }

        int N = arr.size();
        int base_len = N / k, remainder = N % k;

        vector<ListNode*> res(k, nullptr);
        int start = 0;
        for (int i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr[start];
                int tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr[tail]->next = nullptr;
                start = tail + 1;
            }
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
     * @param {number} k
     * @return {ListNode[]}
     */
    splitListToParts(head, k) {
        let arr = [];
        for (let cur = head; cur !== null; cur = cur.next) {
            arr.push(cur);
        }

        let N = arr.length;
        let base_len = Math.floor(N / k),
            remainder = N % k;

        let res = new Array(k).fill(null);
        let start = 0;
        for (let i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr[start];
                let tail = start + base_len - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr[tail].next = null;
                start = tail + 1;
            }
        }

        return res;
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
    public ListNode[] SplitListToParts(ListNode head, int k) {
        List<ListNode> arr = new List<ListNode>();
        for (ListNode cur = head; cur != null; cur = cur.next) {
            arr.Add(cur);
        }

        int N = arr.Count;
        int baseLen = N / k, remainder = N % k;

        ListNode[] res = new ListNode[k];
        int start = 0;
        for (int i = 0; i < k; i++) {
            if (start < N) {
                res[i] = arr[start];
                int tail = start + baseLen - 1;
                if (remainder > 0) {
                    tail++;
                    remainder--;
                }
                arr[tail].next = null;
                start = tail + 1;
            }
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
func splitListToParts(head *ListNode, k int) []*ListNode {
    arr := []*ListNode{}
    for cur := head; cur != nil; cur = cur.Next {
        arr = append(arr, cur)
    }

    N := len(arr)
    baseLen, remainder := N/k, N%k

    res := make([]*ListNode, k)
    start := 0
    for i := 0; i < k; i++ {
        if start < N {
            res[i] = arr[start]
            tail := start + baseLen - 1
            if remainder > 0 {
                tail++
                remainder--
            }
            arr[tail].Next = nil
            start = tail + 1
        }
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
    fun splitListToParts(head: ListNode?, k: Int): Array<ListNode?> {
        val arr = mutableListOf<ListNode>()
        var cur = head
        while (cur != null) {
            arr.add(cur)
            cur = cur.next
        }

        val N = arr.size
        var baseLen = N / k
        var remainder = N % k

        val res = arrayOfNulls<ListNode>(k)
        var start = 0
        for (i in 0 until k) {
            if (start < N) {
                res[i] = arr[start]
                var tail = start + baseLen - 1
                if (remainder > 0) {
                    tail++
                    remainder--
                }
                arr[tail].next = null
                start = tail + 1
            }
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
    func splitListToParts(_ head: ListNode?, _ k: Int) -> [ListNode?] {
        var arr = [ListNode]()
        var cur = head
        while let node = cur {
            arr.append(node)
            cur = node.next
        }

        let N = arr.count
        let baseLen = N / k
        var remainder = N % k

        var res = [ListNode?](repeating: nil, count: k)
        var start = 0
        for i in 0..<k {
            if start < N {
                res[i] = arr[start]
                var tail = start + baseLen - 1
                if remainder > 0 {
                    tail += 1
                    remainder -= 1
                }
                arr[tail].next = nil
                start = tail + 1
            }
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

## 2. Iteration

### Intuition

We can avoid the extra array by working directly with the linked list. First, count the total nodes. Then traverse again, splitting the list into parts by tracking the current node and severing links at the appropriate positions. The first `remainder` parts each have one more node than the remaining parts.

### Algorithm

1. Count the total number of nodes in the list.
2. Calculate `base_len = length / k` and `remainder = length % k`.
3. Traverse the list to create k parts:
   - Record the current node as the head of this part.
   - Advance `base_len - 1 + (1 if remainder > 0 else 0)` steps to reach the tail.
   - Save `curr.next`, set `curr.next = null` to sever, then continue from the saved node.
   - Decrement remainder after each extra-length part.
4. Return the array of part heads.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, val=0, next=None):
#         self.val = val
#         self.next = next
class Solution:
    def splitListToParts(self, head: Optional[ListNode], k: int) -> List[Optional[ListNode]]:
        length, curr = 0, head
        while curr:
            curr = curr.next
            length += 1

        base_len, remainder = length // k, length % k
        curr, res = head, []

        for i in range(k):
            res.append(curr)
            for j in range(base_len - 1 + (1 if remainder else 0)):
                if not curr:
                    break
                curr = curr.next
            remainder -= 1 if remainder else 0
            if curr:
                curr.next, curr = None, curr.next

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
    public ListNode[] splitListToParts(ListNode head, int k) {
        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            curr = curr.next;
            length++;
        }

        int baseLen = length / k, remainder = length % k;
        ListNode[] res = new ListNode[k];
        curr = head;

        for (int i = 0; i < k; i++) {
            res[i] = curr;
            for (int j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (curr == null) break;
                curr = curr.next;
            }
            if (curr != null) {
                ListNode temp = curr.next;
                curr.next = null;
                curr = temp;
            }
            remainder--;
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
    vector<ListNode*> splitListToParts(ListNode* head, int k) {
        int length = 0;
        ListNode* curr = head;
        while (curr) {
            curr = curr->next;
            length++;
        }

        int baseLen = length / k, remainder = length % k;
        vector<ListNode*> res(k, nullptr);
        curr = head;

        for (int i = 0; i < k; i++) {
            res[i] = curr;
            for (int j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (!curr) break;
                curr = curr->next;
            }
            if (curr) {
                ListNode* temp = curr->next;
                curr->next = nullptr;
                curr = temp;
            }
            remainder--;
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
     * @param {number} k
     * @return {ListNode[]}
     */
    splitListToParts(head, k) {
        let length = 0,
            curr = head;
        while (curr) {
            curr = curr.next;
            length++;
        }

        let baseLen = Math.floor(length / k),
            remainder = length % k;
        let res = new Array(k).fill(null);
        curr = head;

        for (let i = 0; i < k; i++) {
            res[i] = curr;
            for (let j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (!curr) break;
                curr = curr.next;
            }
            if (curr) {
                let temp = curr.next;
                curr.next = null;
                curr = temp;
            }
            remainder--;
        }
        return res;
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
    public ListNode[] SplitListToParts(ListNode head, int k) {
        int length = 0;
        ListNode curr = head;
        while (curr != null) {
            curr = curr.next;
            length++;
        }

        int baseLen = length / k, remainder = length % k;
        ListNode[] res = new ListNode[k];
        curr = head;

        for (int i = 0; i < k; i++) {
            res[i] = curr;
            for (int j = 0; j < baseLen - 1 + (remainder > 0 ? 1 : 0); j++) {
                if (curr == null) break;
                curr = curr.next;
            }
            if (curr != null) {
                ListNode temp = curr.next;
                curr.next = null;
                curr = temp;
            }
            remainder--;
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
func splitListToParts(head *ListNode, k int) []*ListNode {
    length := 0
    curr := head
    for curr != nil {
        curr = curr.Next
        length++
    }

    baseLen, remainder := length/k, length%k
    res := make([]*ListNode, k)
    curr = head

    for i := 0; i < k; i++ {
        res[i] = curr
        extra := 0
        if remainder > 0 {
            extra = 1
        }
        for j := 0; j < baseLen-1+extra; j++ {
            if curr == nil {
                break
            }
            curr = curr.Next
        }
        if curr != nil {
            temp := curr.Next
            curr.Next = nil
            curr = temp
        }
        remainder--
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
    fun splitListToParts(head: ListNode?, k: Int): Array<ListNode?> {
        var length = 0
        var curr = head
        while (curr != null) {
            curr = curr.next
            length++
        }

        val baseLen = length / k
        var remainder = length % k
        val res = arrayOfNulls<ListNode>(k)
        curr = head

        for (i in 0 until k) {
            res[i] = curr
            val extra = if (remainder > 0) 1 else 0
            for (j in 0 until baseLen - 1 + extra) {
                if (curr == null) break
                curr = curr.next
            }
            if (curr != null) {
                val temp = curr.next
                curr.next = null
                curr = temp
            }
            remainder--
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
    func splitListToParts(_ head: ListNode?, _ k: Int) -> [ListNode?] {
        var length = 0
        var curr = head
        while curr != nil {
            curr = curr?.next
            length += 1
        }

        let baseLen = length / k
        var remainder = length % k
        var res = [ListNode?](repeating: nil, count: k)
        curr = head

        for i in 0..<k {
            res[i] = curr
            let extra = remainder > 0 ? 1 : 0
            for _ in 0..<(baseLen - 1 + extra) {
                if curr == nil { break }
                curr = curr?.next
            }
            if curr != nil {
                let temp = curr?.next
                curr?.next = nil
                curr = temp
            }
            remainder -= 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ space for the output array.
