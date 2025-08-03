## 1. Stack

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 2. Two Pointers

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.
