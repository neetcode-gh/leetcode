## 1. Recursion

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        if head is not None:
            self.printLinkedListInReverse(head.getNext())
            head.printValue()
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        if (head != null) {
            printLinkedListInReverse(head.getNext());
            head.printValue();
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        if (head != NULL) {
            printLinkedListInReverse(head->getNext());
            head->printValue();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        if (head !== null) {
            this.printLinkedListInReverse(head.getNext());
            head.printValue();
        }
    }
}
```

```csharp
public class Solution {
    public void PrintLinkedListInReverse(ImmutableListNode head) {
        if (head != null) {
            PrintLinkedListInReverse(head.GetNext());
            head.PrintValue();
        }
    }
}
```

```go
func printLinkedListInReverse(head ImmutableListNode) {
    if head != nil {
        printLinkedListInReverse(head.GetNext())
        head.PrintValue()
    }
}
```

```kotlin
class Solution {
    fun printLinkedListInReverse(head: ImmutableListNode?) {
        if (head != null) {
            printLinkedListInReverse(head.getNext())
            head.printValue()
        }
    }
}
```

```swift
class Solution {
    func printLinkedListInReverse(_ head: ImmutableListNode?) {
        if head != nil {
            printLinkedListInReverse(head?.getNext())
            head?.printValue()
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the size of the linked list.

---

## 2. Using Stack

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        stack = []
        while head:
            stack.append(head)
            head = head.getNext()

        while stack:
            node = stack.pop()
            node.printValue()
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        Stack<ImmutableListNode> stack = new Stack<>();
        while (head != null) {
            stack.push(head);
            head = head.getNext();
        }

        while (!stack.empty()) {
            ImmutableListNode node = stack.pop();
            node.printValue();
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        stack<ImmutableListNode*> s;
        while (head) {
            s.push(head);
            head = head->getNext();
        }

        while (!s.empty()) {
            ImmutableListNode* node = s.top();
            s.pop();
            node->printValue();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        const stack = [];
        while (head !== null) {
            stack.push(head);
            head = head.getNext();
        }

        while (stack.length > 0) {
            const node = stack.pop();
            node.printValue();
        }
    }
}
```

```csharp
public class Solution {
    public void PrintLinkedListInReverse(ImmutableListNode head) {
        Stack<ImmutableListNode> stack = new Stack<ImmutableListNode>();
        while (head != null) {
            stack.Push(head);
            head = head.GetNext();
        }

        while (stack.Count > 0) {
            ImmutableListNode node = stack.Pop();
            node.PrintValue();
        }
    }
}
```

```go
func printLinkedListInReverse(head ImmutableListNode) {
    stack := []ImmutableListNode{}
    for head != nil {
        stack = append(stack, head)
        head = head.GetNext()
    }

    for len(stack) > 0 {
        node := stack[len(stack)-1]
        stack = stack[:len(stack)-1]
        node.PrintValue()
    }
}
```

```kotlin
class Solution {
    fun printLinkedListInReverse(head: ImmutableListNode?) {
        val stack = java.util.Stack<ImmutableListNode>()
        var curr = head
        while (curr != null) {
            stack.push(curr)
            curr = curr.getNext()
        }

        while (!stack.isEmpty()) {
            val node = stack.pop()
            node.printValue()
        }
    }
}
```

```swift
class Solution {
    func printLinkedListInReverse(_ head: ImmutableListNode?) {
        var stack = [ImmutableListNode]()
        var curr = head
        while curr != nil {
            stack.append(curr!)
            curr = curr?.getNext()
        }

        while !stack.isEmpty {
            let node = stack.removeLast()
            node.printValue()
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the size of the linked list.

---

## 3. Square Root Decomposition

::tabs-start

```python
class Solution:
    def printLinkedListInReverseRecursively(self, head: 'ImmutableListNode', size: int) -> None:
        if size > 0 and head is not None:
            self.printLinkedListInReverseRecursively(head.getNext(), size - 1)
            head.printValue()

    def getLinkedListSize(self, head: 'ImmutableListNode') -> int:
        size = 0
        while head is not None:
            size += 1
            head = head.getNext()
        return size

    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        linked_list_size = self.getLinkedListSize(head)
        block_size = math.ceil(math.sqrt(linked_list_size))

        blocks = []
        curr = head
        for i in range(linked_list_size):
            if i % block_size == 0:
                blocks.append(curr)
            curr = curr.getNext()

        while blocks:
            self.printLinkedListInReverseRecursively(blocks.pop(), block_size)
```

```java
class Solution {
    private void printLinkedListInReverseRecursively(ImmutableListNode head, int size) {
        if (size > 0 && head != null) {
            printLinkedListInReverseRecursively(head.getNext(), size - 1);
            head.printValue();
        }
    }

    private int getLinkedListSize(ImmutableListNode head) {
        int size = 0;
        while (head != null) {
            size += 1;
            head = head.getNext();
        }
        return size;
    }

    public void printLinkedListInReverse(ImmutableListNode head) {
        int linkedListSize = getLinkedListSize(head);
        int blockSize = (int) Math.ceil(Math.sqrt(linkedListSize));

        Stack<ImmutableListNode> blocks = new Stack<>();
        ImmutableListNode curr = head;
        for (int i = 0; i < linkedListSize; i++) {
            if (i % blockSize == 0) {
                blocks.push(curr);
            }
            curr = curr.getNext();
        }

        while (!blocks.empty()) {
            printLinkedListInReverseRecursively(blocks.pop(), blockSize);
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverseRecursively(ImmutableListNode* head, int size) {
        if (size && head) {
            printLinkedListInReverseRecursively(head->getNext(), size - 1);
            head->printValue();
        }
    }

    int getLinkedListSize(ImmutableListNode* head) {
        int size = 0;
        while (head) {
            size += 1;
            head = head->getNext();
        }
        return size;
    }

    void printLinkedListInReverse(ImmutableListNode* head) {
        int linkedListSize = getLinkedListSize(head);
        int blockSize = ceil(sqrt(linkedListSize));

        stack<ImmutableListNode*> blocks;
        ImmutableListNode* curr = head;
        for (int i = 0; i < linkedListSize; i++) {
            if (i % blockSize == 0) {
                blocks.push(curr);
            }
            curr = curr->getNext();
        }

        while (!blocks.empty()) {
            printLinkedListInReverseRecursively(blocks.top(), blockSize);
            blocks.pop();
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} head
     * @param {number} size
     * @return {void}
     */
    printLinkedListInReverseRecursively(head, size) {
        if (size > 0 && head !== null) {
            this.printLinkedListInReverseRecursively(head.getNext(), size - 1);
            head.printValue();
        }
    }

    /**
     * @param {ImmutableListNode} head
     * @return {number}
     */
    getLinkedListSize(head) {
        let size = 0;
        while (head !== null) {
            size++;
            head = head.getNext();
        }
        return size;
    }

    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        const linkedListSize = this.getLinkedListSize(head);
        const blockSize = Math.ceil(Math.sqrt(linkedListSize));

        const blocks = [];
        let curr = head;
        for (let i = 0; i < linkedListSize; i++) {
            if (i % blockSize === 0) {
                blocks.push(curr);
            }
            curr = curr.getNext();
        }

        while (blocks.length > 0) {
            this.printLinkedListInReverseRecursively(blocks.pop(), blockSize);
        }
    }
}
```

```csharp
public class Solution {
    private void PrintLinkedListInReverseRecursively(ImmutableListNode head, int size) {
        if (size > 0 && head != null) {
            PrintLinkedListInReverseRecursively(head.GetNext(), size - 1);
            head.PrintValue();
        }
    }

    private int GetLinkedListSize(ImmutableListNode head) {
        int size = 0;
        while (head != null) {
            size++;
            head = head.GetNext();
        }
        return size;
    }

    public void PrintLinkedListInReverse(ImmutableListNode head) {
        int linkedListSize = GetLinkedListSize(head);
        int blockSize = (int)Math.Ceiling(Math.Sqrt(linkedListSize));

        Stack<ImmutableListNode> blocks = new Stack<ImmutableListNode>();
        ImmutableListNode curr = head;
        for (int i = 0; i < linkedListSize; i++) {
            if (i % blockSize == 0) {
                blocks.Push(curr);
            }
            curr = curr.GetNext();
        }

        while (blocks.Count > 0) {
            PrintLinkedListInReverseRecursively(blocks.Pop(), blockSize);
        }
    }
}
```

```go
func printLinkedListInReverseRecursively(head ImmutableListNode, size int) {
    if size > 0 && head != nil {
        printLinkedListInReverseRecursively(head.GetNext(), size-1)
        head.PrintValue()
    }
}

func getLinkedListSize(head ImmutableListNode) int {
    size := 0
    for head != nil {
        size++
        head = head.GetNext()
    }
    return size
}

func printLinkedListInReverse(head ImmutableListNode) {
    linkedListSize := getLinkedListSize(head)
    blockSize := int(math.Ceil(math.Sqrt(float64(linkedListSize))))

    blocks := []ImmutableListNode{}
    curr := head
    for i := 0; i < linkedListSize; i++ {
        if i%blockSize == 0 {
            blocks = append(blocks, curr)
        }
        curr = curr.GetNext()
    }

    for len(blocks) > 0 {
        block := blocks[len(blocks)-1]
        blocks = blocks[:len(blocks)-1]
        printLinkedListInReverseRecursively(block, blockSize)
    }
}
```

```kotlin
class Solution {
    private fun printLinkedListInReverseRecursively(head: ImmutableListNode?, size: Int) {
        if (size > 0 && head != null) {
            printLinkedListInReverseRecursively(head.getNext(), size - 1)
            head.printValue()
        }
    }

    private fun getLinkedListSize(head: ImmutableListNode?): Int {
        var size = 0
        var curr = head
        while (curr != null) {
            size++
            curr = curr.getNext()
        }
        return size
    }

    fun printLinkedListInReverse(head: ImmutableListNode?) {
        val linkedListSize = getLinkedListSize(head)
        val blockSize = kotlin.math.ceil(kotlin.math.sqrt(linkedListSize.toDouble())).toInt()

        val blocks = java.util.Stack<ImmutableListNode>()
        var curr = head
        for (i in 0 until linkedListSize) {
            if (i % blockSize == 0) {
                blocks.push(curr)
            }
            curr = curr?.getNext()
        }

        while (!blocks.isEmpty()) {
            printLinkedListInReverseRecursively(blocks.pop(), blockSize)
        }
    }
}
```

```swift
class Solution {
    private func printLinkedListInReverseRecursively(_ head: ImmutableListNode?, _ size: Int) {
        if size > 0 && head != nil {
            printLinkedListInReverseRecursively(head?.getNext(), size - 1)
            head?.printValue()
        }
    }

    private func getLinkedListSize(_ head: ImmutableListNode?) -> Int {
        var size = 0
        var curr = head
        while curr != nil {
            size += 1
            curr = curr?.getNext()
        }
        return size
    }

    func printLinkedListInReverse(_ head: ImmutableListNode?) {
        let linkedListSize = getLinkedListSize(head)
        let blockSize = Int(ceil(sqrt(Double(linkedListSize))))

        var blocks = [ImmutableListNode]()
        var curr = head
        for i in 0..<linkedListSize {
            if i % blockSize == 0 {
                blocks.append(curr!)
            }
            curr = curr?.getNext()
        }

        while !blocks.isEmpty {
            printLinkedListInReverseRecursively(blocks.removeLast(), blockSize)
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(\sqrt n)$

>  Where $n$ is the size of the linked list.

---

## 4. Divide and Conquer

::tabs-start

```python
class Solution:
    def helper(self, start: 'ImmutableListNode', end: 'ImmutableListNode') -> None:
        if start is None or start == end:
            return
        if start.getNext() == end:
            start.printValue()
            return

        slow = start
        fast = start

        while fast != end and fast.getNext() != end:
            slow = slow.getNext()
            fast = fast.getNext().getNext()

        self.helper(slow, end)
        self.helper(start, slow)

    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        self.helper(head, None)
```

```java
class Solution {
    private void helper(ImmutableListNode start, ImmutableListNode end) {
        if (start == null || start == end) {
            return;
        }
        if (start.getNext() == end) {
            start.printValue();
            return;
        }

        ImmutableListNode slow = start;
        ImmutableListNode fast = start;

        while (fast != end && fast.getNext() != end) {
            slow = slow.getNext();
            fast = fast.getNext().getNext();
        }

        helper(slow, end);
        helper(start, slow);
    }

    public void printLinkedListInReverse(ImmutableListNode head) {
        helper(head, null);
    }
}
```

```cpp
class Solution {
public:
    void helper(ImmutableListNode* start, ImmutableListNode* end) {
        if (start == NULL || start == end) {
            return;
        }
        if (start->getNext() == end) {
            start->printValue();
            return;
        }

        ImmutableListNode* slow = start;
        ImmutableListNode* fast = start;

        while (fast != end && fast->getNext() != end) {
            slow = slow->getNext();
            fast = fast->getNext()->getNext();
        }

        helper(slow, end);
        helper(start, slow);
    }

    void printLinkedListInReverse(ImmutableListNode* head) {
        helper(head, NULL);
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} start
     * @param {ImmutableListNode} end
     * @return {void}
     */
    helper(start, end) {
        if (start === null || start === end) {
            return;
        }
        if (start.getNext() === end) {
            start.printValue();
            return;
        }

        let slow = start;
        let fast = start;

        while (fast !== end && fast.getNext() !== end) {
            slow = slow.getNext();
            fast = fast.getNext().getNext();
        }

        this.helper(slow, end);
        this.helper(start, slow);
    }

    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        this.helper(head, null);
    }
}
```

```csharp
public class Solution {
    private void Helper(ImmutableListNode start, ImmutableListNode end) {
        if (start == null || start == end) {
            return;
        }
        if (start.GetNext() == end) {
            start.PrintValue();
            return;
        }

        ImmutableListNode slow = start;
        ImmutableListNode fast = start;

        while (fast != end && fast.GetNext() != end) {
            slow = slow.GetNext();
            fast = fast.GetNext().GetNext();
        }

        Helper(slow, end);
        Helper(start, slow);
    }

    public void PrintLinkedListInReverse(ImmutableListNode head) {
        Helper(head, null);
    }
}
```

```go
func helper(start, end ImmutableListNode) {
    if start == nil || start == end {
        return
    }
    if start.GetNext() == end {
        start.PrintValue()
        return
    }

    slow := start
    fast := start

    for fast != end && fast.GetNext() != end {
        slow = slow.GetNext()
        fast = fast.GetNext().GetNext()
    }

    helper(slow, end)
    helper(start, slow)
}

func printLinkedListInReverse(head ImmutableListNode) {
    helper(head, nil)
}
```

```kotlin
class Solution {
    private fun helper(start: ImmutableListNode?, end: ImmutableListNode?) {
        if (start == null || start == end) {
            return
        }
        if (start.getNext() == end) {
            start.printValue()
            return
        }

        var slow: ImmutableListNode? = start
        var fast: ImmutableListNode? = start

        while (fast != end && fast?.getNext() != end) {
            slow = slow?.getNext()
            fast = fast?.getNext()?.getNext()
        }

        helper(slow, end)
        helper(start, slow)
    }

    fun printLinkedListInReverse(head: ImmutableListNode?) {
        helper(head, null)
    }
}
```

```swift
class Solution {
    private func helper(_ start: ImmutableListNode?, _ end: ImmutableListNode?) {
        if start == nil || start === end {
            return
        }
        if start?.getNext() === end {
            start?.printValue()
            return
        }

        var slow = start
        var fast = start

        while fast !== end && fast?.getNext() !== end {
            slow = slow?.getNext()
            fast = fast?.getNext()?.getNext()
        }

        helper(slow, end)
        helper(start, slow)
    }

    func printLinkedListInReverse(_ head: ImmutableListNode?) {
        helper(head, nil)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot \log n)$
- Space complexity: $O(\log n)$

>  Where $n$ is the size of the linked list.

---

## 5. Constant Space

::tabs-start

```python
class Solution:
    def printLinkedListInReverse(self, head: 'ImmutableListNode') -> None:
        end = None

        while head != end:
            curr = head
            while curr.getNext() != end:
                curr = curr.getNext()
            curr.printValue()
            end = curr
```

```java
class Solution {
    public void printLinkedListInReverse(ImmutableListNode head) {
        ImmutableListNode curr;
        ImmutableListNode end = null;

        while (head != end) {
            curr = head;
            while (curr.getNext() != end) {
                curr = curr.getNext();
            }
            curr.printValue();
            end = curr;
        }
    }
}
```

```cpp
class Solution {
public:
    void printLinkedListInReverse(ImmutableListNode* head) {
        ImmutableListNode* curr;
        ImmutableListNode* end = NULL;

        while (head != end) {
            curr = head;
            while (curr->getNext() != end) {
                curr = curr->getNext();
            }
            curr->printValue();
            end = curr;
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {ImmutableListNode} head
     * @return {void}
     */
    printLinkedListInReverse(head) {
        let curr;
        let end = null;

        while (head !== end) {
            curr = head;
            while (curr.getNext() !== end) {
                curr = curr.getNext();
            }
            curr.printValue();
            end = curr;
        }
    }
}
```

```csharp
public class Solution {
    public void PrintLinkedListInReverse(ImmutableListNode head) {
        ImmutableListNode curr;
        ImmutableListNode end = null;

        while (head != end) {
            curr = head;
            while (curr.GetNext() != end) {
                curr = curr.GetNext();
            }
            curr.PrintValue();
            end = curr;
        }
    }
}
```

```go
func printLinkedListInReverse(head ImmutableListNode) {
    var end ImmutableListNode = nil

    for head != end {
        curr := head
        for curr.GetNext() != end {
            curr = curr.GetNext()
        }
        curr.PrintValue()
        end = curr
    }
}
```

```kotlin
class Solution {
    fun printLinkedListInReverse(head: ImmutableListNode?) {
        var end: ImmutableListNode? = null

        var h = head
        while (h != end) {
            var curr = h
            while (curr?.getNext() != end) {
                curr = curr?.getNext()
            }
            curr?.printValue()
            end = curr
        }
    }
}
```

```swift
class Solution {
    func printLinkedListInReverse(_ head: ImmutableListNode?) {
        var end: ImmutableListNode? = nil

        var h = head
        while h !== end {
            var curr = h
            while curr?.getNext() !== end {
                curr = curr?.getNext()
            }
            curr?.printValue()
            end = curr
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n^2)$
- Space complexity: $O(1)$

>  Where $n$ is the size of the linked list.
