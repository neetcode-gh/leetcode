## 1. Sentinel Head + Textbook Addition

::tabs-start

```python
class Solution:
    def plusOne(self, head: ListNode) -> ListNode:
        # sentinel head
        sentinel = ListNode(0)
        sentinel.next = head
        not_nine = sentinel

        # find the rightmost not-nine digit
        while head:
            if head.val != 9:
                not_nine = head
            head = head.next

        # increase this rightmost not-nine digit by 1
        not_nine.val += 1
        not_nine = not_nine.next

        # set all the following nines to zeros
        while not_nine:
            not_nine.val = 0
            not_nine = not_nine.next

        return sentinel if sentinel.val else sentinel.next
```

```java
class Solution {
    public ListNode plusOne(ListNode head) {
        // sentinel head
        ListNode sentinel = new ListNode(0);
        sentinel.next = head;
        ListNode notNine = sentinel;

        // find the rightmost not-nine digit
        while (head != null) {
            if (head.val != 9) {
                notNine = head;
            }
            head = head.next;
        }

        // increase this rightmost not-nine digit by 1
        notNine.val++;
        notNine = notNine.next;

        // set all the following nines to zeros
        while (notNine != null) {
            notNine.val = 0;
            notNine = notNine.next;
        }

        return sentinel.val != 0 ? sentinel : sentinel.next;
    }
}
```

```cpp
class Solution {
public:
    ListNode* plusOne(ListNode* head) {
        // sentinel head
        ListNode* sentinel = new ListNode(0);
        sentinel->next = head;
        ListNode* notNine = sentinel;

        // find the rightmost not-nine digit
        while (head != nullptr) {
            if (head->val != 9) notNine = head;
            head = head->next;
        }
        // increase this rightmost not-nine digit by 1
        notNine->val++;
        notNine = notNine->next;
        // set all the following nines to zeros
        while (notNine != nullptr) {
            notNine->val = 0;
            notNine = notNine->next;
        }

        delete notNine;
        return sentinel->val != 0 ? sentinel : sentinel->next;
    }
};
```

```javascript
class Solution {
    /**
     * @param {ListNode} head
     * @return {ListNode}
     */
    plusOne(head) {
        // sentinel head
        const sentinel = new ListNode(0);
        sentinel.next = head;
        let notNine = sentinel;

        // find the rightmost not-nine digit
        while (head) {
            if (head.val !== 9) {
                notNine = head;
            }
            head = head.next;
        }

        // increase this rightmost not-nine digit by 1
        notNine.val += 1;
        notNine = notNine.next;

        // set all the following nines to zeros
        while (notNine) {
            notNine.val = 0;
            notNine = notNine.next;
        }

        return sentinel.val !== 0 ? sentinel : sentinel.next;
    }
}
```

```csharp
public class Solution {
    public ListNode PlusOne(ListNode head) {
        // sentinel head
        ListNode sentinel = new ListNode(0);
        sentinel.next = head;
        ListNode notNine = sentinel;

        // find the rightmost not-nine digit
        while (head != null) {
            if (head.val != 9) {
                notNine = head;
            }
            head = head.next;
        }

        // increase this rightmost not-nine digit by 1
        notNine.val++;
        notNine = notNine.next;

        // set all the following nines to zeros
        while (notNine != null) {
            notNine.val = 0;
            notNine = notNine.next;
        }

        return sentinel.val != 0 ? sentinel : sentinel.next;
    }
}
```

```go
func plusOne(head *ListNode) *ListNode {
    // sentinel head
    sentinel := &ListNode{Val: 0, Next: head}
    notNine := sentinel

    // find the rightmost not-nine digit
    for head != nil {
        if head.Val != 9 {
            notNine = head
        }
        head = head.Next
    }

    // increase this rightmost not-nine digit by 1
    notNine.Val++
    notNine = notNine.Next

    // set all the following nines to zeros
    for notNine != nil {
        notNine.Val = 0
        notNine = notNine.Next
    }

    if sentinel.Val != 0 {
        return sentinel
    }
    return sentinel.Next
}
```

```kotlin
class Solution {
    fun plusOne(head: ListNode?): ListNode? {
        // sentinel head
        val sentinel = ListNode(0)
        sentinel.next = head
        var notNine: ListNode? = sentinel
        var curr = head

        // find the rightmost not-nine digit
        while (curr != null) {
            if (curr.`val` != 9) {
                notNine = curr
            }
            curr = curr.next
        }

        // increase this rightmost not-nine digit by 1
        notNine!!.`val`++
        notNine = notNine.next

        // set all the following nines to zeros
        while (notNine != null) {
            notNine.`val` = 0
            notNine = notNine.next
        }

        return if (sentinel.`val` != 0) sentinel else sentinel.next
    }
}
```

```swift
class Solution {
    func plusOne(_ head: ListNode?) -> ListNode? {
        // sentinel head
        let sentinel = ListNode(0)
        sentinel.next = head
        var notNine: ListNode? = sentinel
        var curr = head

        // find the rightmost not-nine digit
        while curr != nil {
            if curr!.val != 9 {
                notNine = curr
            }
            curr = curr?.next
        }

        // increase this rightmost not-nine digit by 1
        notNine!.val += 1
        notNine = notNine?.next

        // set all the following nines to zeros
        while notNine != nil {
            notNine!.val = 0
            notNine = notNine?.next
        }

        return sentinel.val != 0 ? sentinel : sentinel.next
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(1)$

>  Where $N$ is the length of the input list
