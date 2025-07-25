## 1. Brute FOrce

::tabs-start

```python
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        n, res = len(arr), 0
        MOD = 1000000007

        for i in range(n):
            minVal = arr[i]
            for j in range(i, n):
                minVal = min(minVal, arr[j])
                res = (res + minVal) % MOD

        return res
```

```java
public class Solution {
    public int sumSubarrayMins(int[] arr) {
        int n = arr.length, res = 0;
        int MOD = 1000000007;

        for (int i = 0; i < n; i++) {
            int minVal = arr[i];
            for (int j = i; j < n; j++) {
                minVal = Math.min(minVal, arr[j]);
                res = (res + minVal) % MOD;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        int n = arr.size(), res = 0;
        const int MOD = 1000000007;

        for (int i = 0; i < n; i++) {
            int minVal = arr[i];
            for (int j = i; j < n; j++) {
                minVal = min(minVal, arr[j]);
                res = (res + minVal) % MOD;
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    sumSubarrayMins(arr) {
        const n = arr.length;
        let res = 0;
        const MOD = 1000000007;

        for (let i = 0; i < n; i++) {
            let minVal = arr[i];
            for (let j = i; j < n; j++) {
                minVal = Math.min(minVal, arr[j]);
                res = (res + minVal) % MOD;
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Monotonically Increasing Stack (Two Pass)

::tabs-start

```python
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(arr)

        # Compute previous smaller
        prev_smaller = [-1] * n
        stack = []
        for i in range(n):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()
            prev_smaller[i] = stack[-1] if stack else -1
            stack.append(i)

        # Compute next smaller
        next_smaller = [n] * n
        stack = []
        for i in range(n - 1, -1, -1):
            while stack and arr[stack[-1]] >= arr[i]:
                stack.pop()
            next_smaller[i] = stack[-1] if stack else n
            stack.append(i)

        res = 0
        for i in range(n):
            left = i - prev_smaller[i]
            right = next_smaller[i] - i
            res = (res + arr[i] * left * right) % MOD

        return res
```

```java
public class Solution {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.length;

        // Compute previous smaller
        int[] prevSmaller = new int[n];
        Stack<Integer> stack = new Stack<>();
        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }
            prevSmaller[i] = stack.isEmpty() ? -1 : stack.peek();
            stack.push(i);
        }

        // Compute next smaller
        int[] nextSmaller = new int[n];
        stack = new Stack<>();
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.isEmpty() && arr[stack.peek()] >= arr[i]) {
                stack.pop();
            }
            nextSmaller[i] = stack.isEmpty() ? n : stack.peek();
            stack.push(i);
        }

        // Calculate result
        long res = 0;
        for (int i = 0; i < n; i++) {
            long left = i - prevSmaller[i];
            long right = nextSmaller[i] - i;
            res = (res + arr[i] * left * right) % MOD;
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        const int MOD = 1e9 + 7;
        int n = arr.size();

        // Compute previous smaller
        vector<int> prevSmaller(n, -1);
        stack<int> stack;
        for (int i = 0; i < n; i++) {
            while (!stack.empty() && arr[stack.top()] > arr[i]) {
                stack.pop();
            }
            prevSmaller[i] = stack.empty() ? -1 : stack.top();
            stack.push(i);
        }

        // Compute next smaller
        vector<int> nextSmaller(n, n);
        stack = {};
        for (int i = n - 1; i >= 0; i--) {
            while (!stack.empty() && arr[stack.top()] >= arr[i]) {
                stack.pop();
            }
            nextSmaller[i] = stack.empty() ? n : stack.top();
            stack.push(i);
        }

        // Calculate result
        long long res = 0;
        for (int i = 0; i < n; i++) {
            long long left = i - prevSmaller[i];
            long long right = nextSmaller[i] - i;
            res = (res + arr[i] * left * right) % MOD;
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    sumSubarrayMins(arr) {
        const MOD = 1e9 + 7;
        const n = arr.length;

        // Compute previous smaller
        const prevSmaller = new Array(n).fill(-1);
        const stack = [];
        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
                stack.pop();
            }
            prevSmaller[i] = stack.length > 0 ? stack[stack.length - 1] : -1;
            stack.push(i);
        }

        // Compute next smaller
        const nextSmaller = new Array(n).fill(n);
        stack.length = 0;
        for (let i = n - 1; i >= 0; i--) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] >= arr[i]) {
                stack.pop();
            }
            nextSmaller[i] = stack.length > 0 ? stack[stack.length - 1] : n;
            stack.push(i);
        }

        // Calculate result
        let res = 0;
        for (let i = 0; i < n; i++) {
            const left = i - prevSmaller[i];
            const right = nextSmaller[i] - i;
            res = (res + arr[i] * left * right) % MOD;
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

## 3. Monotonically Increasing Stack (One Pass)

::tabs-start

```python
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        MOD = 10 ** 9 + 7
        res = 0
        arr = [float("-inf")] + arr + [float("-inf")]
        stack = []  # (index, num)

        for i, n in enumerate(arr):
            while stack and n < stack[-1][1]:
                j, m = stack.pop()
                left = j - stack[-1][0] if stack else j + 1
                right = i - j
                res = (res + m * left * right) % MOD
            stack.append((i, n))

        return res
```

```java
public class Solution {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int res = 0;
        int[] newArr = new int[arr.length + 2];
        newArr[0] = Integer.MIN_VALUE;
        newArr[newArr.length - 1] = Integer.MIN_VALUE;
        System.arraycopy(arr, 0, newArr, 1, arr.length);

        Stack<int[]> stack = new Stack<>();

        for (int i = 0; i < newArr.length; i++) {
            while (!stack.isEmpty() && newArr[i] < stack.peek()[1]) {
                int[] top = stack.pop();
                int j = top[0], m = top[1];
                int left = stack.isEmpty() ? j + 1 : j - stack.peek()[0];
                int right = i - j;
                res = (int) ((res + (long) m * left * right) % MOD);
            }
            stack.push(new int[]{i, newArr[i]});
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        const int MOD = 1e9 + 7;
        int res = 0;
        vector<int> newArr(arr.size() + 2, INT_MIN);
        copy(arr.begin(), arr.end(), newArr.begin() + 1);

        stack<pair<int, int>> stack;

        for (int i = 0; i < newArr.size(); i++) {
            while (!stack.empty() && newArr[i] < stack.top().second) {
                auto [j, m] = stack.top();
                stack.pop();
                int left = stack.empty() ? j + 1 : j - stack.top().first;
                int right = i - j;
                res = (res + (long long) m * left * right % MOD) % MOD;
            }
            stack.emplace(i, newArr[i]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    sumSubarrayMins(arr) {
        const MOD = 1e9 + 7;
        let res = 0;
        arr = [-Infinity, ...arr, -Infinity];
        let stack = [];

        for (let i = 0; i < arr.length; i++) {
            while (stack.length > 0 && arr[i] < stack[stack.length - 1][1]) {
                let [j, m] = stack.pop();
                let left =
                    stack.length > 0 ? j - stack[stack.length - 1][0] : j + 1;
                let right = i - j;
                res = (res + m * left * right) % MOD;
            }
            stack.push([i, arr[i]]);
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

## 4. Monotonically Increasing Stack (Optimal)

::tabs-start

```python
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        MOD = 10**9 + 7
        stack = []
        res, n = 0, len(arr)

        for i in range(n + 1):
            while stack and (i == n or arr[i] < arr[stack[-1]]):
                j = stack.pop()
                left = j - (stack[-1] if stack else -1)
                right = i - j
                res = (res + arr[j] * left * right) % MOD
            stack.append(i)

        return res
```

```java
public class Solution {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.length;
        Stack<Integer> stack = new Stack<>();
        long res = 0;

        for (int i = 0; i <= n; i++) {
            while (!stack.isEmpty() && (i == n || arr[i] < arr[stack.peek()])) {
                int j = stack.pop();
                int left = j - (stack.isEmpty() ? -1 : stack.peek());
                int right = i - j;
                res = (res + (long) arr[j] * left * right) % MOD;
            }
            stack.push(i);
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        const int MOD = 1e9 + 7;
        int n = arr.size();
        stack<int> stack;
        long long res = 0;

        for (int i = 0; i <= n; i++) {
            while (!stack.empty() && (i == n || arr[i] < arr[stack.top()])) {
                int j = stack.top();
                stack.pop();
                int left = j - (stack.empty() ? -1 : stack.top());
                int right = i - j;
                res = (res + (long long) arr[j] * left * right) % MOD;
            }
            stack.push(i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    sumSubarrayMins(arr) {
        const MOD = 1e9 + 7;
        const n = arr.length;
        const stack = [];
        let res = 0;

        for (let i = 0; i <= n; i++) {
            while (
                stack.length > 0 &&
                (i === n || arr[i] < arr[stack[stack.length - 1]])
            ) {
                const j = stack.pop();
                const left =
                    j - (stack.length > 0 ? stack[stack.length - 1] : -1);
                const right = i - j;
                res = (res + arr[j] * left * right) % MOD;
            }
            stack.push(i);
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

## 5. Dynamic Programming + Stack

::tabs-start

```python
class Solution:
    def sumSubarrayMins(self, arr: List[int]) -> int:
        MOD = 10**9 + 7
        n = len(arr)
        dp = [0] * n
        stack, res = [], 0

        for i in range(n):
            while stack and arr[stack[-1]] > arr[i]:
                stack.pop()

            j = stack[-1] if stack else -1
            dp[i] = (dp[j] if j != -1 else 0) + arr[i] * (i - j)
            dp[i] %= MOD
            res = (res + dp[i]) % MOD
            stack.append(i)

        return res
```

```java
public class Solution {
    public int sumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.length;
        int[] dp = new int[n];
        Stack<Integer> stack = new Stack<>();
        long res = 0;

        for (int i = 0; i < n; i++) {
            while (!stack.isEmpty() && arr[stack.peek()] > arr[i]) {
                stack.pop();
            }

            int j = stack.isEmpty() ? -1 : stack.peek();
            dp[i] = ((j != -1 ? dp[j] : 0) + arr[i] * (i - j)) % MOD;
            res = (res + dp[i]) % MOD;
            stack.push(i);
        }

        return (int) res;
    }
}
```

```cpp
class Solution {
public:
    int sumSubarrayMins(vector<int>& arr) {
        const int MOD = 1e9 + 7;
        int n = arr.size();
        vector<int> dp(n, 0);
        stack<int> stack;
        long long res = 0;

        for (int i = 0; i < n; i++) {
            while (!stack.empty() && arr[stack.top()] > arr[i]) {
                stack.pop();
            }

            int j = stack.empty() ? -1 : stack.top();
            dp[i] = ((j != -1 ? dp[j] : 0) + arr[i] * (i - j)) % MOD;
            res = (res + dp[i]) % MOD;
            stack.push(i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @return {number}
     */
    sumSubarrayMins(arr) {
        const MOD = 1e9 + 7;
        const n = arr.length;
        const dp = new Array(n).fill(0);
        const stack = [];
        let res = 0;

        for (let i = 0; i < n; i++) {
            while (stack.length > 0 && arr[stack[stack.length - 1]] > arr[i]) {
                stack.pop();
            }

            const j = stack.length > 0 ? stack[stack.length - 1] : -1;
            dp[i] = ((j !== -1 ? dp[j] : 0) + arr[i] * (i - j)) % MOD;
            res = (res + dp[i]) % MOD;
            stack.push(i);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
