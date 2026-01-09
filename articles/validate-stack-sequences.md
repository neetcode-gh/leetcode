## 1. Stack

### Intuition
We can simulate the actual push and pop operations on a stack to verify if the sequences are valid. The key insight is that whenever we push an element, we should immediately try to pop as many elements as possible that match the expected pop sequence. If the simulation completes with an empty stack, the sequences are valid.

### Algorithm
1. Initialize an empty stack and a pointer `i` to track position in the `popped` array.
2. Iterate through each element in the `pushed` array and push it onto the stack.
3. After each push, check if the stack top matches the current element in `popped` (at index `i`).
4. While there is a match, pop from the stack and increment the pointer `i`.
5. Continue until no more matches are found or the stack is empty.
6. After processing all elements, return `true` if the stack is empty, indicating all elements were successfully popped in the correct order.

::tabs-start

```python
class Solution:
    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
        i = 0
        stack = []
        for n in pushed:
            stack.append(n)
            while i < len(popped) and stack and popped[i] == stack[-1]:
                stack.pop()
                i += 1
        return not stack
```

```java
public class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        Stack<Integer> stack = new Stack<>();
        int i = 0;
        for (int n : pushed) {
            stack.push(n);
            while (i < popped.length && !stack.isEmpty() && popped[i] == stack.peek()) {
                stack.pop();
                i++;
            }
        }
        return stack.isEmpty();
    }
}
```

```cpp
class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        stack<int> stk;
        int i = 0;
        for (int n : pushed) {
            stk.push(n);
            while (i < popped.size() && !stk.empty() && popped[i] == stk.top()) {
                stk.pop();
                i++;
            }
        }
        return stk.empty();
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pushed
     * @param {number[]} popped
     * @return {boolean}
     */
    validateStackSequences(pushed, popped) {
        const stack = [];
        let i = 0;
        for (const n of pushed) {
            stack.push(n);
            while (
                i < popped.length &&
                stack.length > 0 &&
                popped[i] === stack[stack.length - 1]
            ) {
                stack.pop();
                i++;
            }
        }
        return stack.length === 0;
    }
}
```

```csharp
public class Solution {
    public bool ValidateStackSequences(int[] pushed, int[] popped) {
        Stack<int> stack = new Stack<int>();
        int i = 0;
        foreach (int n in pushed) {
            stack.Push(n);
            while (i < popped.Length && stack.Count > 0 && popped[i] == stack.Peek()) {
                stack.Pop();
                i++;
            }
        }
        return stack.Count == 0;
    }
}
```

```go
func validateStackSequences(pushed []int, popped []int) bool {
    stack := []int{}
    i := 0
    for _, n := range pushed {
        stack = append(stack, n)
        for i < len(popped) && len(stack) > 0 && popped[i] == stack[len(stack)-1] {
            stack = stack[:len(stack)-1]
            i++
        }
    }
    return len(stack) == 0
}
```

```kotlin
class Solution {
    fun validateStackSequences(pushed: IntArray, popped: IntArray): Boolean {
        val stack = ArrayDeque<Int>()
        var i = 0
        for (n in pushed) {
            stack.addLast(n)
            while (i < popped.size && stack.isNotEmpty() && popped[i] == stack.last()) {
                stack.removeLast()
                i++
            }
        }
        return stack.isEmpty()
    }
}
```

```swift
class Solution {
    func validateStackSequences(_ pushed: [Int], _ popped: [Int]) -> Bool {
        var stack = [Int]()
        var i = 0
        for n in pushed {
            stack.append(n)
            while i < popped.count && !stack.isEmpty && popped[i] == stack.last! {
                stack.removeLast()
                i += 1
            }
        }
        return stack.isEmpty
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers

### Intuition
Instead of using a separate stack, we can reuse the `pushed` array itself as the stack. The left portion of the array acts as our stack, eliminating the need for extra space. This works because as we process elements, we overwrite positions that are no longer needed.

### Algorithm
1. Use two pointers: `l` represents the top of our simulated stack within `pushed`, and `r` tracks position in `popped`.
2. Iterate through each element in `pushed` and write it to position `l`, then increment `l`.
3. After each write, check if the element at position `l-1` matches `popped[r]`.
4. While there is a match and `l > 0`, increment `r` and decrement `l` to simulate popping.
5. Continue processing all elements in `pushed`.
6. Return `true` if `l` equals `0`, meaning all elements were successfully matched and popped.

::tabs-start

```python
class Solution:
    def validateStackSequences(self, pushed: List[int], popped: List[int]) -> bool:
        l = r = 0
        for num in pushed:
            pushed[l] = num
            l += 1
            while l > 0 and pushed[l - 1] == popped[r]:
                r += 1
                l -= 1
        return l == 0
```

```java
public class Solution {
    public boolean validateStackSequences(int[] pushed, int[] popped) {
        int l = 0, r = 0;
        for (int num : pushed) {
            pushed[l++] = num;
            while (l > 0 && pushed[l - 1] == popped[r]) {
                r++;
                l--;
            }
        }
        return l == 0;
    }
}
```

```cpp
class Solution {
public:
    bool validateStackSequences(vector<int>& pushed, vector<int>& popped) {
        int l = 0, r = 0;
        for (int& num : pushed) {
            pushed[l++] = num;
            while (l > 0 && pushed[l - 1] == popped[r]) {
                r++;
                l--;
            }
        }
        return l == 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} pushed
     * @param {number[]} popped
     * @return {boolean}
     */
    validateStackSequences(pushed, popped) {
        let l = 0,
            r = 0;
        for (const num of pushed) {
            pushed[l++] = num;
            while (l > 0 && pushed[l - 1] === popped[r]) {
                r++;
                l--;
            }
        }
        return l === 0;
    }
}
```

```csharp
public class Solution {
    public bool ValidateStackSequences(int[] pushed, int[] popped) {
        int l = 0, r = 0;
        foreach (int num in pushed) {
            pushed[l++] = num;
            while (l > 0 && pushed[l - 1] == popped[r]) {
                r++;
                l--;
            }
        }
        return l == 0;
    }
}
```

```go
func validateStackSequences(pushed []int, popped []int) bool {
    l, r := 0, 0
    for _, num := range pushed {
        pushed[l] = num
        l++
        for l > 0 && pushed[l-1] == popped[r] {
            r++
            l--
        }
    }
    return l == 0
}
```

```kotlin
class Solution {
    fun validateStackSequences(pushed: IntArray, popped: IntArray): Boolean {
        var l = 0
        var r = 0
        for (num in pushed) {
            pushed[l++] = num
            while (l > 0 && pushed[l - 1] == popped[r]) {
                r++
                l--
            }
        }
        return l == 0
    }
}
```

```swift
class Solution {
    func validateStackSequences(_ pushed: [Int], _ popped: [Int]) -> Bool {
        var pushed = pushed
        var l = 0
        var r = 0
        for num in pushed {
            pushed[l] = num
            l += 1
            while l > 0 && pushed[l - 1] == popped[r] {
                r += 1
                l -= 1
            }
        }
        return l == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
