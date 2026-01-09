## 1. Brute Force

### Intuition

The most straightforward approach is to check every node in the first list against every node in the second list. If two nodes are the same object (not just equal values), we found the intersection point. This works because intersection means the lists share actual node references, not just duplicate values.

### Algorithm

1. Start with `headA` and traverse the first list.
2. For each node in the first list, traverse the entire second list.
3. If any node in the second list matches the current node from the first list (by reference), return it.
4. If no intersection is found after checking all nodes, return `null`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        while headA:
            cur = headB
            while cur:
                if headA == cur:
                    return headA
                cur = cur.next
            headA = headA.next
        return None
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        while (headA != null) {
            ListNode cur = headB;
            while (cur != null) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        while (headA) {
            ListNode* cur = headB;
            while (cur) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur->next;
            }
            headA = headA->next;
        }
        return nullptr;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        while (headA) {
            let cur = headB;
            while (cur) {
                if (headA === cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        while (headA != null) {
            ListNode cur = headB;
            while (cur != null) {
                if (headA == cur) {
                    return headA;
                }
                cur = cur.next;
            }
            headA = headA.next;
        }
        return null;
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
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    for headA != nil {
        cur := headB
        for cur != nil {
            if headA == cur {
                return headA
            }
            cur = cur.Next
        }
        headA = headA.Next
    }
    return nil
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
    fun getIntersectionNode(headA: ListNode?, headB: ListNode?): ListNode? {
        var a = headA
        while (a != null) {
            var cur = headB
            while (cur != null) {
                if (a === cur) {
                    return a
                }
                cur = cur.next
            }
            a = a.next
        }
        return null
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */
class Solution {
    func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
        var a = headA
        while a != nil {
            var cur = headB
            while cur != nil {
                if a === cur {
                    return a
                }
                cur = cur?.next
            }
            a = a?.next
        }
        return nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 2. Hash Set

### Intuition

We can use a hash set to store all nodes from the first list. Then, as we traverse the second list, we check if each node exists in the set. The first node found in the set is the intersection point since it is the earliest shared node.

### Algorithm

1. Traverse the first list and add every node to a hash set.
2. Traverse the second list.
3. For each node in the second list, check if it exists in the set.
4. Return the first matching node, or `null` if no intersection exists.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        nodeSet = set()
        cur = headA
        while cur:
            nodeSet.add(cur)
            cur = cur.next

        cur = headB
        while cur:
            if cur in nodeSet:
                return cur
            cur = cur.next

        return None
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        HashSet<ListNode> nodeSet = new HashSet<>();

        ListNode cur = headA;
        while (cur != null) {
            nodeSet.add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur != null) {
            if (nodeSet.contains(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        unordered_set<ListNode*> nodeSet;

        ListNode* cur = headA;
        while (cur) {
            nodeSet.insert(cur);
            cur = cur->next;
        }

        cur = headB;
        while (cur) {
            if (nodeSet.find(cur) != nodeSet.end()) {
                return cur;
            }
            cur = cur->next;
        }

        return nullptr;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        const nodeSet = new Set();

        let cur = headA;
        while (cur) {
            nodeSet.add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur) {
            if (nodeSet.has(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        var nodeSet = new HashSet<ListNode>();
        var cur = headA;
        while (cur != null) {
            nodeSet.Add(cur);
            cur = cur.next;
        }

        cur = headB;
        while (cur != null) {
            if (nodeSet.Contains(cur)) {
                return cur;
            }
            cur = cur.next;
        }

        return null;
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
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    nodeSet := make(map[*ListNode]bool)
    cur := headA
    for cur != nil {
        nodeSet[cur] = true
        cur = cur.Next
    }

    cur = headB
    for cur != nil {
        if nodeSet[cur] {
            return cur
        }
        cur = cur.Next
    }

    return nil
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
    fun getIntersectionNode(headA: ListNode?, headB: ListNode?): ListNode? {
        val nodeSet = mutableSetOf<ListNode>()
        var cur = headA
        while (cur != null) {
            nodeSet.add(cur)
            cur = cur.next
        }

        cur = headB
        while (cur != null) {
            if (cur in nodeSet) {
                return cur
            }
            cur = cur.next
        }

        return null
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */
class Solution {
    func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
        var nodeSet = Set<ObjectIdentifier>()
        var cur = headA
        while cur != nil {
            nodeSet.insert(ObjectIdentifier(cur!))
            cur = cur?.next
        }

        cur = headB
        while cur != nil {
            if nodeSet.contains(ObjectIdentifier(cur!)) {
                return cur
            }
            cur = cur?.next
        }

        return nil
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(m)$

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 3. Two Pointers - I

### Intuition

If the two lists have different lengths, the intersection point is at the same distance from the end of both lists. By computing the lengths and advancing the pointer on the longer list by the difference, we align the two pointers. Then we move both forward together until they meet at the intersection or reach the end.

### Algorithm

1. Compute the lengths `m` and `n` of both lists.
2. Identify the longer list and advance its pointer by `|m - n|` nodes.
3. Move both pointers forward one step at a time.
4. When they point to the same node, return it. If they both reach `null`, return `null`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        def getLength(head):
            length, cur = 0, head
            while cur:
                length += 1
                cur = cur.next
            return length

        m = getLength(headA)
        n = getLength(headB)
        l1, l2 = headA, headB

        if m < n:
            m, n = n, m
            l1, l2 = headB, headA

        while m - n:
            m -= 1
            l1 = l1.next

        while l1 != l2:
            l1 = l1.next
            l2 = l2.next

        return l1
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    private int getLength(ListNode head) {
        int length = 0;
        while (head != null) {
            length++;
            head = head.next;
        }
        return length;
    }

    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        int m = getLength(headA);
        int n = getLength(headB);
        ListNode l1 = headA, l2 = headB;

        if (m < n) {
            int temp = m; m = n; n = temp;
            ListNode tempNode = l1; l1 = l2; l2 = tempNode;
        }

        while (m > n) {
            l1 = l1.next;
            m--;
        }

        while (l1 != null && l1 != l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
    int getLength(ListNode* head) {
        int length = 0;
        while (head) {
            length++;
            head = head->next;
        }
        return length;
    }

public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        int m = getLength(headA), n = getLength(headB);
        ListNode* l1 = headA, *l2 = headB;

        if (m < n) {
            swap(m, n);
            swap(l1, l2);
        }

        while (m-- > n) {
            l1 = l1->next;
        }

        while (l1 && l1 != l2) {
            l1 = l1->next;
            l2 = l2->next;
        }

        return l1;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        const getLength = (head) => {
            let length = 0,
                cur = head;
            while (cur) {
                length++;
                cur = cur.next;
            }
            return length;
        };

        let m = getLength(headA);
        let n = getLength(headB);
        let l1 = headA,
            l2 = headB;

        if (m < n) {
            [m, n] = [n, m];
            [l1, l2] = [l2, l1];
        }

        while (m-- > n) {
            l1 = l1.next;
        }

        while (l1 && l1 !== l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        int GetLength(ListNode head) {
            int length = 0;
            while (head != null) {
                length++;
                head = head.next;
            }
            return length;
        }

        int m = GetLength(headA);
        int n = GetLength(headB);
        ListNode l1 = headA, l2 = headB;

        if (m < n) {
            int temp = m; m = n; n = temp;
            l1 = headB;
            l2 = headA;
        }

        for (int i = 0; i < m - n; i++) {
            l1 = l1.next;
        }

        while (l1 != l2) {
            l1 = l1.next;
            l2 = l2.next;
        }

        return l1;
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
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    getLength := func(head *ListNode) int {
        length := 0
        for head != nil {
            length++
            head = head.Next
        }
        return length
    }

    m, n := getLength(headA), getLength(headB)
    l1, l2 := headA, headB

    if m < n {
        m, n = n, m
        l1, l2 = l2, l1
    }

    for m > n {
        l1 = l1.Next
        m--
    }

    for l1 != l2 {
        l1 = l1.Next
        l2 = l2.Next
    }

    return l1
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
    fun getIntersectionNode(headA: ListNode?, headB: ListNode?): ListNode? {
        fun getLength(head: ListNode?): Int {
            var length = 0
            var cur = head
            while (cur != null) {
                length++
                cur = cur.next
            }
            return length
        }

        var m = getLength(headA)
        var n = getLength(headB)
        var l1 = headA
        var l2 = headB

        if (m < n) {
            val temp = m; m = n; n = temp
            l1 = headB
            l2 = headA
        }

        repeat(m - n) {
            l1 = l1?.next
        }

        while (l1 !== l2) {
            l1 = l1?.next
            l2 = l2?.next
        }

        return l1
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */
class Solution {
    func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
        func getLength(_ head: ListNode?) -> Int {
            var length = 0
            var cur = head
            while cur != nil {
                length += 1
                cur = cur?.next
            }
            return length
        }

        var m = getLength(headA)
        var n = getLength(headB)
        var l1 = headA
        var l2 = headB

        if m < n {
            swap(&m, &n)
            l1 = headB
            l2 = headA
        }

        for _ in 0..<(m - n) {
            l1 = l1?.next
        }

        while l1 !== l2 {
            l1 = l1?.next
            l2 = l2?.next
        }

        return l1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.

---

## 4. Two Pointers - II

### Intuition

A clever approach avoids computing lengths explicitly. Two pointers start at the heads of each list. When a pointer reaches the end, it jumps to the head of the other list. After at most `m + n` steps, both pointers will have traversed the same total distance. If an intersection exists, they will meet there; otherwise, they both reach `null` simultaneously.

### Algorithm

1. Initialize `l1 = headA` and `l2 = headB`.
2. While `l1 != l2`:
   - If `l1` is `null`, set `l1 = headB`; otherwise advance `l1`.
   - If `l2` is `null`, set `l2 = headA`; otherwise advance `l2`.
3. Return `l1` (which equals `l2`), the intersection node or `null`.

::tabs-start

```python
# Definition for singly-linked list.
# class ListNode:
#     def __init__(self, x):
#         self.val = x
#         self.next = None
class Solution:
    def getIntersectionNode(self, headA: ListNode, headB: ListNode) -> Optional[ListNode]:
        l1, l2 = headA, headB
        while l1 != l2:
            l1 = l1.next if l1 else headB
            l2 = l2.next if l2 else headA
        return l1
```

```java
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     int val;
 *     ListNode next;
 *     ListNode(int x) {
 *         val = x;
 *         next = null;
 *     }
 * }
 */
public class Solution {
    public ListNode getIntersectionNode(ListNode headA, ListNode headB) {
        ListNode l1 = headA, l2 = headB;
        while (l1 != l2) {
            l1 = (l1 != null) ? l1.next : headB;
            l2 = (l2 != null) ? l2.next : headA;
        }
        return l1;
    }
}
```

```cpp
/**
 * Definition for singly-linked list.
 * struct ListNode {
 *     int val;
 *     ListNode *next;
 *     ListNode(int x) : val(x), next(NULL) {}
 * };
 */
class Solution {
public:
    ListNode* getIntersectionNode(ListNode* headA, ListNode* headB) {
        ListNode* l1 = headA;
        ListNode* l2 = headB;
        while (l1 != l2) {
            l1 = l1 ? l1->next : headB;
            l2 = l2 ? l2->next : headA;
        }
        return l1;
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
     * @param {ListNode} headA
     * @param {ListNode} headB
     * @return {ListNode}
     */
    getIntersectionNode(headA, headB) {
        let l1 = headA,
            l2 = headB;
        while (l1 !== l2) {
            l1 = l1 ? l1.next : headB;
            l2 = l2 ? l2.next : headA;
        }
        return l1;
    }
}
```

```csharp
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int x) { val = x; }
 * }
 */
public class Solution {
    public ListNode GetIntersectionNode(ListNode headA, ListNode headB) {
        ListNode l1 = headA, l2 = headB;

        while (l1 != l2) {
            l1 = (l1 != null) ? l1.next : headB;
            l2 = (l2 != null) ? l2.next : headA;
        }

        return l1;
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
func getIntersectionNode(headA, headB *ListNode) *ListNode {
    l1, l2 := headA, headB
    for l1 != l2 {
        if l1 != nil {
            l1 = l1.Next
        } else {
            l1 = headB
        }
        if l2 != nil {
            l2 = l2.Next
        } else {
            l2 = headA
        }
    }
    return l1
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
    fun getIntersectionNode(headA: ListNode?, headB: ListNode?): ListNode? {
        var l1 = headA
        var l2 = headB
        while (l1 !== l2) {
            l1 = if (l1 != null) l1.next else headB
            l2 = if (l2 != null) l2.next else headA
        }
        return l1
    }
}
```

```swift
/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public var val: Int
 *     public var next: ListNode?
 *     public init(_ val: Int) {
 *         self.val = val
 *         self.next = nil
 *     }
 * }
 */
class Solution {
    func getIntersectionNode(_ headA: ListNode?, _ headB: ListNode?) -> ListNode? {
        var l1 = headA
        var l2 = headB
        while l1 !== l2 {
            l1 = l1 != nil ? l1?.next : headB
            l2 = l2 != nil ? l2?.next : headA
        }
        return l1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m + n)$
- Space complexity: $O(1)$ extra space.

> Where $m$ is the length of the first list and $n$ is the length of the second list.
