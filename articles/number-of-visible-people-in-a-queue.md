## 1. Brute Force

::tabs-start

```python
class Solution:
    def canSeePersonsCount(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = []

        for i in range(n):
            maxi = cnt = 0
            for j in range(i + 1, n):
                if min(heights[i], heights[j]) > maxi:
                    cnt += 1
                maxi = max(maxi, heights[j])

            res.append(cnt)

        return res
```

```java
public class Solution {
    public int[] canSeePersonsCount(int[] heights) {
        int n = heights.length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int maxi = 0, cnt = 0;
            for (int j = i + 1; j < n; j++) {
                if (Math.min(heights[i], heights[j]) > maxi) {
                    cnt++;
                }
                maxi = Math.max(maxi, heights[j]);
            }
            res[i] = cnt;
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size();
        vector<int> res(n);
        for (int i = 0; i < n; i++) {
            int maxi = 0, cnt = 0;
            for (int j = i + 1; j < n; j++) {
                if (min(heights[i], heights[j]) > maxi) {
                    cnt++;
                }
                maxi = max(maxi, heights[j]);
            }
            res[i] = cnt;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    canSeePersonsCount(heights) {
        const n = heights.length;
        const res = [];
        for (let i = 0; i < n; i++) {
            let maxi = 0,
                cnt = 0;
            for (let j = i + 1; j < n; j++) {
                if (Math.min(heights[i], heights[j]) > maxi) {
                    cnt++;
                }
                maxi = Math.max(maxi, heights[j]);
            }
            res.push(cnt);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CanSeePersonsCount(int[] heights) {
        int n = heights.Length;
        int[] res = new int[n];
        for (int i = 0; i < n; i++) {
            int maxi = 0, cnt = 0;
            for (int j = i + 1; j < n; j++) {
                if (Math.Min(heights[i], heights[j]) > maxi) {
                    cnt++;
                }
                maxi = Math.Max(maxi, heights[j]);
            }
            res[i] = cnt;
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Stack - I

::tabs-start

```python
class Solution:
    def canSeePersonsCount(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = [0] * n
        stack = []

        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] < h:
                res[stack.pop()] += 1
            if stack:
                res[stack[-1]] += 1
            stack.append(i)

        return res
```

```java
public class Solution {
    public int[] canSeePersonsCount(int[] heights) {
        int n = heights.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            int h = heights[i];
            while (!stack.isEmpty() && heights[stack.peek()] < h) {
                res[stack.pop()]++;
            }
            if (!stack.isEmpty()) {
                res[stack.peek()]++;
            }
            stack.push(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size();
        vector<int> res(n);
        stack<int> st;
        for (int i = 0; i < n; i++) {
            int h = heights[i];
            while (!st.empty() && heights[st.top()] < h) {
                res[st.top()]++;
                st.pop();
            }
            if (!st.empty()) {
                res[st.top()]++;
            }
            st.push(i);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    canSeePersonsCount(heights) {
        const n = heights.length;
        const res = Array(n).fill(0);
        const stack = [];
        for (let i = 0; i < n; i++) {
            const h = heights[i];
            while (stack.length && heights[stack[stack.length - 1]] < h) {
                res[stack.pop()]++;
            }
            if (stack.length) {
                res[stack[stack.length - 1]]++;
            }
            stack.push(i);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CanSeePersonsCount(int[] heights) {
        int n = heights.Length;
        int[] res = new int[n];
        var stack = new Stack<int>();
        for (int i = 0; i < n; i++) {
            int h = heights[i];
            while (stack.Count > 0 && heights[stack.Peek()] < h) {
                res[stack.Pop()]++;
            }
            if (stack.Count > 0) {
                res[stack.Peek()]++;
            }
            stack.Push(i);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Stack - II

::tabs-start

```python
class Solution:
    def canSeePersonsCount(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = [0] * n
        stack = []

        for i in range(n - 1, -1, -1):
            while stack and stack[-1] < heights[i]:
                stack.pop()
                res[i] += 1

            if stack:
                res[i] += 1
            stack.append(heights[i])

        return res
```

```java
public class Solution {
    public int[] canSeePersonsCount(int[] heights) {
        int n = heights.length;
        int[] res = new int[n];
        Stack<Integer> stack = new Stack<>();

        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && stack.peek() < heights[i]) {
                stack.pop();
                res[i]++;
            }
            if (!stack.isEmpty()) {
                res[i]++;
            }
            stack.push(heights[i]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> canSeePersonsCount(vector<int>& heights) {
        int n = heights.size();
        vector<int> res(n, 0);
        stack<int> st;

        for (int i = n - 1; i >= 0; --i) {
            while (!st.empty() && st.top() < heights[i]) {
                st.pop();
                res[i]++;
            }
            if (!st.empty()) {
                res[i]++;
            }
            st.push(heights[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    canSeePersonsCount(heights) {
        const n = heights.length;
        const res = new Array(n).fill(0);
        const stack = [];
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length && stack[stack.length - 1] < heights[i]) {
                stack.pop();
                res[i]++;
            }
            if (stack.length) {
                res[i]++;
            }
            stack.push(heights[i]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[] CanSeePersonsCount(int[] heights) {
        int n = heights.Length;
        int[] res = new int[n];
        var stack = new Stack<int>();
        for (int i = n - 1; i >= 0; i--) {
            while (stack.Count > 0 && stack.Peek() < heights[i]) {
                stack.Pop();
                res[i]++;
            }
            if (stack.Count > 0) {
                res[i]++;
            }
            stack.Push(heights[i]);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
