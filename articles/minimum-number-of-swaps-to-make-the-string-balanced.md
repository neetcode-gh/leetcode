## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Stack Data Structure** - Used to track unmatched opening brackets during traversal
- **Bracket Matching** - Understanding how to pair opening and closing brackets in sequence
- **Greedy Algorithms** - The optimal solutions use greedy reasoning to count minimum swaps needed

---

## 1. Stack

### Intuition

A balanced string has every `]` matched with a preceding `[`. We use a `stack` to track unmatched opening brackets. When we see `[`, we push it. When we see `]` and the `stack` is not empty, we pop (the bracket is matched). If the `stack` is empty when we see `]`, that closing bracket is unmatched.

After processing, the `stack` contains only unmatched `[` brackets. Since the string has equal counts of `[` and `]`, the number of unmatched `[` equals the number of unmatched `]`. Each swap fixes two unmatched pairs, so we need `(unmatched + 1) / 2` swaps.

### Algorithm

1. Initialize an empty `stack`.
2. Iterate through the string:
   - If the character is `[`, push it onto the `stack`.
   - If the character is `]` and the `stack` is not empty, pop the `stack`.
3. The remaining `stack` size represents unmatched `[` brackets.
4. Return `(stack_size + 1) / 2`.

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        stack = []
        for c in s:
            if c == '[':
                stack.append(c)
            elif stack:
                stack.pop()
        return (len(stack) + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        Stack<Character> stack = new Stack<>();
        for (char c : s.toCharArray()) {
            if (c == '[') {
                stack.push(c);
            } else if (!stack.isEmpty()) {
                stack.pop();
            }
        }
        return (stack.size() + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        vector<char> stack;
        for (char c : s) {
            if (c == '[') {
                stack.push_back(c);
            } else if (!stack.empty()) {
                stack.pop_back();
            }
        }
        return (stack.size() + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let stack = [];
        for (const c of s) {
            if (c === '[') {
                stack.push(c);
            } else if (stack.length > 0) {
                stack.pop();
            }
        }
        return Math.floor((stack.length + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        Stack<char> stack = new Stack<char>();
        foreach (char c in s) {
            if (c == '[') {
                stack.Push(c);
            } else if (stack.Count > 0) {
                stack.Pop();
            }
        }
        return (stack.Count + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    stack := 0
    for _, c := range s {
        if c == '[' {
            stack++
        } else if stack > 0 {
            stack--
        }
    }
    return (stack + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        val stack = ArrayDeque<Char>()
        for (c in s) {
            if (c == '[') {
                stack.addLast(c)
            } else if (stack.isNotEmpty()) {
                stack.removeLast()
            }
        }
        return (stack.size + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var stack = [Character]()
        for c in s {
            if c == "[" {
                stack.append(c)
            } else if !stack.isEmpty {
                stack.removeLast()
            }
        }
        return (stack.count + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Greedy - I

### Intuition

Instead of tracking opening brackets, we can track the imbalance directly. We maintain a `close` counter that increases for `]` and decreases for `[`. The `max` value this counter reaches tells us the worst-case imbalance, meaning the maximum number of unmatched closing brackets at any point.

Since each swap can fix at most `2` unmatched brackets, the number of swaps needed is `(max_imbalance + 1) / 2`.

### Algorithm

1. Initialize `close = 0` and `maxClose = 0`.
2. Iterate through the string:
   - If the character is `[`, decrement `close`.
   - If the character is `]`, increment `close`.
   - Update `maxClose = max(maxClose, close)`.
3. Return `(maxClose + 1) / 2`.

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        close = maxClose = 0

        for c in s:
            if c == '[':
                close -= 1
            else:
                close += 1
            maxClose = max(maxClose, close)

        return (maxClose + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        int close = 0, maxClose = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '[') close--;
            else close++;
            maxClose = Math.max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        int close = 0, maxClose = 0;
        for (auto& c : s) {
            if (c == '[') close--;
            else close++;
            maxClose = max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let close = 0,
            maxClose = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) == '[') close--;
            else close++;
            maxClose = Math.max(maxClose, close);
        }
        return Math.floor((maxClose + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        int close = 0, maxClose = 0;
        foreach (char c in s) {
            if (c == '[') close--;
            else close++;
            maxClose = Math.Max(maxClose, close);
        }
        return (maxClose + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    close, maxClose := 0, 0
    for _, c := range s {
        if c == '[' {
            close--
        } else {
            close++
        }
        if close > maxClose {
            maxClose = close
        }
    }
    return (maxClose + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        var close = 0
        var maxClose = 0
        for (c in s) {
            if (c == '[') close--
            else close++
            maxClose = maxOf(maxClose, close)
        }
        return (maxClose + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var close = 0
        var maxClose = 0
        for c in s {
            if c == "[" {
                close -= 1
            } else {
                close += 1
            }
            maxClose = max(maxClose, close)
        }
        return (maxClose + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## 3. Greedy - II

### Intuition

This approach directly simulates the `stack` without actually using a `stack` data structure. We use a counter `stackSize` that increments for `[` and decrements for `]` only if there is something to match (`stackSize > 0`). The final counter value represents unmatched opening brackets.

This is equivalent to the `stack` approach but uses `O(1)` space since we only track the `count`, not the actual characters.

### Algorithm

1. Initialize `stackSize = 0`.
2. Iterate through the string:
   - If the character is `[`, increment `stackSize`.
   - If the character is `]` and `stackSize > 0`, decrement `stackSize`.
3. Return `(stackSize + 1) / 2`.

::tabs-start

```python
class Solution:
    def minSwaps(self, s: str) -> int:
        stackSize = 0
        for c in s:
            if c == '[':
                stackSize += 1
            elif stackSize > 0:
                stackSize -= 1
        return (stackSize + 1) // 2
```

```java
public class Solution {
    public int minSwaps(String s) {
        int stackSize = 0;
        for (int i = 0; i < s.length(); i++) {
            if (s.charAt(i) == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
}
```

```cpp
class Solution {
public:
    int minSwaps(string s) {
        int stackSize = 0;
        for (auto& c : s) {
            if (c == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
};
```

```javascript
class Solution {
    /**
     * @param {string} s
     * @return {number}
     */
    minSwaps(s) {
        let stackSize = 0;
        for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return Math.floor((stackSize + 1) / 2);
    }
}
```

```csharp
public class Solution {
    public int MinSwaps(string s) {
        int stackSize = 0;
        foreach (char c in s) {
            if (c == '[') stackSize++;
            else if (stackSize > 0) stackSize--;
        }
        return (stackSize + 1) / 2;
    }
}
```

```go
func minSwaps(s string) int {
    stackSize := 0
    for _, c := range s {
        if c == '[' {
            stackSize++
        } else if stackSize > 0 {
            stackSize--
        }
    }
    return (stackSize + 1) / 2
}
```

```kotlin
class Solution {
    fun minSwaps(s: String): Int {
        var stackSize = 0
        for (c in s) {
            if (c == '[') stackSize++
            else if (stackSize > 0) stackSize--
        }
        return (stackSize + 1) / 2
    }
}
```

```swift
class Solution {
    func minSwaps(_ s: String) -> Int {
        var stackSize = 0
        for c in s {
            if c == "[" {
                stackSize += 1
            } else if stackSize > 0 {
                stackSize -= 1
            }
        }
        return (stackSize + 1) / 2
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$

---

## Common Pitfalls

### Counting All Brackets Instead of Unmatched

The answer depends on unmatched brackets, not total brackets. Counting all `[` or `]` characters without first matching valid pairs will give an incorrect count. Only brackets that remain after matching contribute to the swap count.

### Forgetting That One Swap Fixes Two Pairs

Each swap can fix two unmatched bracket pairs simultaneously. Returning the unmatched count directly instead of dividing by 2 (with ceiling) will double the actual number of swaps needed.

### Popping From Empty Stack

When simulating with a stack, attempting to pop when encountering `]` without checking if the stack is empty will cause runtime errors. Only pop if there is a matching `[` available to pair with the current `]`.