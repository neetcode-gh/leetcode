## 1. Brute Force

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        n = len(heights)
        res = []

        for i in range(n):
            flag = True
            for j in range(i + 1, n):
                if heights[i] <= heights[j]:
                    flag = False
                    break
            if flag:
                res.append(i)

        return res
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        int n = heights.length;
        List<Integer> temp = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            boolean flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) temp.add(i);
        }

        int[] res = new int[temp.size()];
        for (int i = 0; i < temp.size(); i++) {
            res[i] = temp.get(i);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        int n = heights.size();
        vector<int> res;

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) res.push_back(i);
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
    findBuildings(heights) {
        const n = heights.length;
        const res = [];

        for (let i = 0; i < n; i++) {
            let flag = true;
            for (let j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) res.push(i);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        int n = heights.Length;
        List<int> temp = new List<int>();

        for (int i = 0; i < n; i++) {
            bool flag = true;
            for (int j = i + 1; j < n; j++) {
                if (heights[i] <= heights[j]) {
                    flag = false;
                    break;
                }
            }
            if (flag) temp.Add(i);
        }

        return temp.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Monotonic Stack

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        stack = []

        for i, h in enumerate(heights):
            while stack and heights[stack[-1]] <= h:
                stack.pop()
            stack.append(i)

        return stack
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        int n = heights.length;
        Stack<Integer> stack = new Stack<>();

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && heights[stack.peek()] <= heights[i]) {
                stack.pop();
            }
            stack.push(i);
        }

        int[] res = new int[stack.size()];
        for (int i = stack.size() - 1; i >= 0; i--) {
            res[i] = stack.get(i);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        vector<int> stack;

        for (int i = 0; i < heights.size(); i++) {
            while (!stack.empty() && heights[stack.back()] <= heights[i]) {
                stack.pop_back();
            }
            stack.push_back(i);
        }

        return stack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @return {number[]}
     */
    findBuildings(heights) {
        const stack = [];

        for (let i = 0; i < heights.length; i++) {
            while (
                stack.length &&
                heights[stack[stack.length - 1]] <= heights[i]
            ) {
                stack.pop();
            }
            stack.push(i);
        }

        return stack;
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        List<int> stack = new List<int>();

        for (int i = 0; i < heights.Length; i++) {
            while (stack.Count > 0 && heights[stack[stack.Count - 1]] <= heights[i]) {
                stack.RemoveAt(stack.Count - 1);
            }
            stack.Add(i);
        }

        return stack.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Greedy

::tabs-start

```python
class Solution:
    def findBuildings(self, heights: List[int]) -> List[int]:
        res = [len(heights) - 1]
        for i in range(len(heights) - 2, -1, -1):
            if heights[i] > heights[res[-1]]:
                res.append(i)
        res.reverse()
        return res
```

```java
public class Solution {
    public int[] findBuildings(int[] heights) {
        List<Integer> res = new ArrayList<>();
        int n = heights.length;
        res.add(n - 1);

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res.get(res.size() - 1)]) {
                res.add(i);
            }
        }

        Collections.reverse(res);
        int[] ans = new int[res.size()];
        for (int i = 0; i < res.size(); i++) {
            ans[i] = res.get(i);
        }

        return ans;
    }
}
```

```cpp
class Solution {
public:
    vector<int> findBuildings(vector<int>& heights) {
        vector<int> res;
        int n = heights.size();
        res.push_back(n - 1);

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res.back()]) {
                res.push_back(i);
            }
        }

        reverse(res.begin(), res.end());
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
    findBuildings(heights) {
        const n = heights.length;
        const res = [n - 1];

        for (let i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res[res.length - 1]]) {
                res.push(i);
            }
        }

        return res.reverse();
    }
}
```

```csharp
public class Solution {
    public int[] FindBuildings(int[] heights) {
        int n = heights.Length;
        List<int> res = new List<int> { n - 1 };

        for (int i = n - 2; i >= 0; i--) {
            if (heights[i] > heights[res[res.Count - 1]]) {
                res.Add(i);
            }
        }

        res.Reverse();
        return res.ToArray();
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity:
    - $O(1)$ extra space.
    - $O(n)$ for the output array.
