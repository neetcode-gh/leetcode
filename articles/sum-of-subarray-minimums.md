## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Monotonic Stack** - Used to efficiently find next/previous smaller elements for each position in O(n) time
- **Contribution Technique** - Understanding how to count each element's contribution across all subarrays rather than iterating through each subarray
- **Modular Arithmetic** - Applying modulo operations correctly to prevent integer overflow in the result

---

## 1. Brute Force

### Intuition

For each subarray, we need to find its minimum element and add it to the total sum. The straightforward approach is to enumerate all possible subarrays by their start and end positions, tracking the running minimum as we extend each subarray.

### Algorithm

1. Initialize `res = 0` to store the sum of minimums.
2. For each starting index `i`:
   - Initialize `minVal = arr[i]`.
   - For each ending index `j` from `i` to `n - 1`:
     - Update `minVal = min(minVal, arr[j])`.
     - Add `minVal` to `res` (modulo 10^9 + 7).
3. Return `res`.

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

```csharp
public class Solution {
    public int SumSubarrayMins(int[] arr) {
        int n = arr.Length;
        int res = 0;
        int MOD = 1000000007;

        for (int i = 0; i < n; i++) {
            int minVal = arr[i];
            for (int j = i; j < n; j++) {
                minVal = Math.Min(minVal, arr[j]);
                res = (res + minVal) % MOD;
            }
        }

        return res;
    }
}
```

```go
func sumSubarrayMins(arr []int) int {
    n := len(arr)
    res := 0
    MOD := 1000000007

    for i := 0; i < n; i++ {
        minVal := arr[i]
        for j := i; j < n; j++ {
            if arr[j] < minVal {
                minVal = arr[j]
            }
            res = (res + minVal) % MOD
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val n = arr.size
        var res = 0
        val MOD = 1000000007

        for (i in 0 until n) {
            var minVal = arr[i]
            for (j in i until n) {
                minVal = minOf(minVal, arr[j])
                res = (res + minVal) % MOD
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        let n = arr.count
        var res = 0
        let MOD = 1000000007

        for i in 0..<n {
            var minVal = arr[i]
            for j in i..<n {
                minVal = min(minVal, arr[j])
                res = (res + minVal) % MOD
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Monotonically Increasing Stack (Two Pass)

### Intuition

Instead of computing minimums for each subarray, we can ask: for each element, how many subarrays is it the minimum of? An element `arr[i]` is the minimum of all subarrays that start after the previous smaller element and end before the next smaller element. A monotonically increasing stack helps us efficiently find these boundaries.

### Algorithm

1. Use a stack to find `prevSmaller[i]`: the index of the previous smaller element (or -1 if none).
2. Use another stack pass to find `nextSmaller[i]`: the index of the next smaller or equal element (or `n` if none). We use "smaller or equal" on one side to avoid double counting.
3. For each element at index `i`:
   - `left = i - prevSmaller[i]` is the count of valid starting positions.
   - `right = nextSmaller[i] - i` is the count of valid ending positions.
   - Add `arr[i] * left * right` to the result.
4. Return `res` modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int SumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.Length;

        // Compute previous smaller
        int[] prevSmaller = new int[n];
        Stack<int> stack = new Stack<int>();
        for (int i = 0; i < n; i++) {
            while (stack.Count > 0 && arr[stack.Peek()] > arr[i]) {
                stack.Pop();
            }
            prevSmaller[i] = stack.Count == 0 ? -1 : stack.Peek();
            stack.Push(i);
        }

        // Compute next smaller
        int[] nextSmaller = new int[n];
        stack = new Stack<int>();
        for (int i = n - 1; i >= 0; i--) {
            while (stack.Count > 0 && arr[stack.Peek()] >= arr[i]) {
                stack.Pop();
            }
            nextSmaller[i] = stack.Count == 0 ? n : stack.Peek();
            stack.Push(i);
        }

        // Calculate result
        long res = 0;
        for (int i = 0; i < n; i++) {
            long left = i - prevSmaller[i];
            long right = nextSmaller[i] - i;
            res = (res + (long)arr[i] * left * right) % MOD;
        }

        return (int)res;
    }
}
```

```go
func sumSubarrayMins(arr []int) int {
    MOD := int(1e9 + 7)
    n := len(arr)

    // Compute previous smaller
    prevSmaller := make([]int, n)
    stack := []int{}
    for i := 0; i < n; i++ {
        for len(stack) > 0 && arr[stack[len(stack)-1]] > arr[i] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) == 0 {
            prevSmaller[i] = -1
        } else {
            prevSmaller[i] = stack[len(stack)-1]
        }
        stack = append(stack, i)
    }

    // Compute next smaller
    nextSmaller := make([]int, n)
    stack = []int{}
    for i := n - 1; i >= 0; i-- {
        for len(stack) > 0 && arr[stack[len(stack)-1]] >= arr[i] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) == 0 {
            nextSmaller[i] = n
        } else {
            nextSmaller[i] = stack[len(stack)-1]
        }
        stack = append(stack, i)
    }

    // Calculate result
    res := 0
    for i := 0; i < n; i++ {
        left := i - prevSmaller[i]
        right := nextSmaller[i] - i
        res = (res + arr[i]*left*right) % MOD
    }

    return res
}
```

```kotlin
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val MOD = 1000000007L
        val n = arr.size

        // Compute previous smaller
        val prevSmaller = IntArray(n)
        val stack = ArrayDeque<Int>()
        for (i in 0 until n) {
            while (stack.isNotEmpty() && arr[stack.last()] > arr[i]) {
                stack.removeLast()
            }
            prevSmaller[i] = if (stack.isEmpty()) -1 else stack.last()
            stack.addLast(i)
        }

        // Compute next smaller
        val nextSmaller = IntArray(n) { n }
        stack.clear()
        for (i in n - 1 downTo 0) {
            while (stack.isNotEmpty() && arr[stack.last()] >= arr[i]) {
                stack.removeLast()
            }
            nextSmaller[i] = if (stack.isEmpty()) n else stack.last()
            stack.addLast(i)
        }

        // Calculate result
        var res = 0L
        for (i in 0 until n) {
            val left = i - prevSmaller[i]
            val right = nextSmaller[i] - i
            res = (res + arr[i].toLong() * left * right) % MOD
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        let MOD = 1000000007
        let n = arr.count

        // Compute previous smaller
        var prevSmaller = [Int](repeating: -1, count: n)
        var stack = [Int]()
        for i in 0..<n {
            while !stack.isEmpty && arr[stack.last!] > arr[i] {
                stack.removeLast()
            }
            prevSmaller[i] = stack.isEmpty ? -1 : stack.last!
            stack.append(i)
        }

        // Compute next smaller
        var nextSmaller = [Int](repeating: n, count: n)
        stack = []
        for i in stride(from: n - 1, through: 0, by: -1) {
            while !stack.isEmpty && arr[stack.last!] >= arr[i] {
                stack.removeLast()
            }
            nextSmaller[i] = stack.isEmpty ? n : stack.last!
            stack.append(i)
        }

        // Calculate result
        var res = 0
        for i in 0..<n {
            let left = i - prevSmaller[i]
            let right = nextSmaller[i] - i
            res = (res + arr[i] * left * right) % MOD
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

## 3. Monotonically Increasing Stack (One Pass)

### Intuition

We can combine finding the previous smaller and next smaller into a single pass. By adding sentinel values (negative infinity) at both ends of the array, we ensure every element gets processed. When we pop an element from the stack upon finding a smaller value, we immediately know both its left boundary (from the new stack top) and right boundary (the current index).

### Algorithm

1. Pad the array with negative infinity at both ends.
2. Maintain a stack of `(index, value)` pairs.
3. For each element in the padded array:
   - While the stack is not empty and the current element is smaller than the stack top:
     - Pop the top element (index `j`, value `m`).
     - `left = j - stack_top_index` (or `j + 1` if stack is empty).
     - `right = i - j`.
     - Add `m * left * right` to the result.
   - Push the current `(index, value)` onto the stack.
4. Return `res` modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int SumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int res = 0;
        int[] newArr = new int[arr.Length + 2];
        newArr[0] = int.MinValue;
        newArr[newArr.Length - 1] = int.MinValue;
        Array.Copy(arr, 0, newArr, 1, arr.Length);

        Stack<int[]> stack = new Stack<int[]>();

        for (int i = 0; i < newArr.Length; i++) {
            while (stack.Count > 0 && newArr[i] < stack.Peek()[1]) {
                int[] top = stack.Pop();
                int j = top[0], m = top[1];
                int left = stack.Count == 0 ? j + 1 : j - stack.Peek()[0];
                int right = i - j;
                res = (int)((res + (long)m * left * right) % MOD);
            }
            stack.Push(new int[] { i, newArr[i] });
        }

        return res;
    }
}
```

```go
func sumSubarrayMins(arr []int) int {
    MOD := int(1e9 + 7)
    res := 0
    newArr := make([]int, len(arr)+2)
    newArr[0] = -1 << 31
    newArr[len(newArr)-1] = -1 << 31
    copy(newArr[1:], arr)

    stack := [][2]int{}

    for i := 0; i < len(newArr); i++ {
        for len(stack) > 0 && newArr[i] < stack[len(stack)-1][1] {
            top := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            j, m := top[0], top[1]
            left := j + 1
            if len(stack) > 0 {
                left = j - stack[len(stack)-1][0]
            }
            right := i - j
            res = (res + m*left*right) % MOD
        }
        stack = append(stack, [2]int{i, newArr[i]})
    }

    return res
}
```

```kotlin
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val MOD = 1000000007
        var res = 0L
        val newArr = IntArray(arr.size + 2)
        newArr[0] = Int.MIN_VALUE
        newArr[newArr.size - 1] = Int.MIN_VALUE
        for (i in arr.indices) {
            newArr[i + 1] = arr[i]
        }

        val stack = ArrayDeque<IntArray>()

        for (i in newArr.indices) {
            while (stack.isNotEmpty() && newArr[i] < stack.last()[1]) {
                val top = stack.removeLast()
                val j = top[0]
                val m = top[1]
                val left = if (stack.isEmpty()) j + 1 else j - stack.last()[0]
                val right = i - j
                res = (res + m.toLong() * left * right) % MOD
            }
            stack.addLast(intArrayOf(i, newArr[i]))
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        let MOD = 1000000007
        var res = 0
        var newArr = [Int.min] + arr + [Int.min]
        var stack = [(Int, Int)]()

        for i in 0..<newArr.count {
            while !stack.isEmpty && newArr[i] < stack.last!.1 {
                let (j, m) = stack.removeLast()
                let left = stack.isEmpty ? j + 1 : j - stack.last!.0
                let right = i - j
                res = (res + m * left * right) % MOD
            }
            stack.append((i, newArr[i]))
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

## 4. Monotonically Increasing Stack (Optimal)

### Intuition

We can eliminate the sentinel values by handling the edge cases explicitly. Instead of padding the array, we iterate one position past the end and use a conditional check to treat the out-of-bounds position as having a smaller value than any element. This triggers final processing of remaining stack elements.

### Algorithm

1. Initialize an empty stack and `res = 0`.
2. Iterate from `i = 0` to `n` (inclusive):
   - While the stack is not empty and (we're at the end OR `arr[i] < arr[stack_top]`):
     - Pop index `j` from the stack.
     - `left = j - stack_top` (or `j + 1` if stack is empty).
     - `right = i - j`.
     - Add `arr[j] * left * right` to `res`.
   - Push `i` onto the stack.
3. Return `res` modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int SumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.Length;
        Stack<int> stack = new Stack<int>();
        long res = 0;

        for (int i = 0; i <= n; i++) {
            while (stack.Count > 0 && (i == n || arr[i] < arr[stack.Peek()])) {
                int j = stack.Pop();
                int left = j - (stack.Count == 0 ? -1 : stack.Peek());
                int right = i - j;
                res = (res + (long)arr[j] * left * right) % MOD;
            }
            stack.Push(i);
        }

        return (int)res;
    }
}
```

```go
func sumSubarrayMins(arr []int) int {
    MOD := int(1e9 + 7)
    n := len(arr)
    stack := []int{}
    res := 0

    for i := 0; i <= n; i++ {
        for len(stack) > 0 && (i == n || arr[i] < arr[stack[len(stack)-1]]) {
            j := stack[len(stack)-1]
            stack = stack[:len(stack)-1]
            left := j + 1
            if len(stack) > 0 {
                left = j - stack[len(stack)-1]
            }
            right := i - j
            res = (res + arr[j]*left*right) % MOD
        }
        stack = append(stack, i)
    }

    return res
}
```

```kotlin
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val MOD = 1000000007
        val n = arr.size
        val stack = ArrayDeque<Int>()
        var res = 0L

        for (i in 0..n) {
            while (stack.isNotEmpty() && (i == n || arr[i] < arr[stack.last()])) {
                val j = stack.removeLast()
                val left = j - if (stack.isEmpty()) -1 else stack.last()
                val right = i - j
                res = (res + arr[j].toLong() * left * right) % MOD
            }
            stack.addLast(i)
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        let MOD = 1000000007
        let n = arr.count
        var stack = [Int]()
        var res = 0

        for i in 0...n {
            while !stack.isEmpty && (i == n || arr[i] < arr[stack.last!]) {
                let j = stack.removeLast()
                let left = j - (stack.isEmpty ? -1 : stack.last!)
                let right = i - j
                res = (res + arr[j] * left * right) % MOD
            }
            stack.append(i)
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

## 5. Dynamic Programming + Stack

### Intuition

We can think of this problem dynamically. Let `dp[i]` represent the sum of minimums of all subarrays ending at index `i`. When we add element `arr[i]`, we need to consider: for subarrays where `arr[i]` is not the minimum, we can reuse previously computed values; for subarrays where `arr[i]` is the minimum, we count how many such subarrays exist. The stack helps us find where `arr[i]` stops being the minimum.

### Algorithm

1. Initialize `dp` array and an empty stack.
2. For each index `i`:
   - Pop elements from the stack while `arr[stack_top] > arr[i]`.
   - Let `j` be the stack top after popping (or -1 if empty). This is the index of the previous smaller or equal element.
   - `dp[i] = dp[j] + arr[i] * (i - j)`:
     - `dp[j]` accounts for subarrays ending before `j` where `arr[i]` is not the minimum.
     - `arr[i] * (i - j)` accounts for subarrays from positions `j+1` to `i` where `arr[i]` is the minimum.
   - Add `dp[i]` to `res` and push `i` onto the stack.
3. Return `res` modulo 10^9 + 7.

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

```csharp
public class Solution {
    public int SumSubarrayMins(int[] arr) {
        int MOD = 1000000007;
        int n = arr.Length;
        long[] dp = new long[n];
        Stack<int> stack = new Stack<int>();
        long res = 0;

        for (int i = 0; i < n; i++) {
            while (stack.Count > 0 && arr[stack.Peek()] > arr[i]) {
                stack.Pop();
            }

            int j = stack.Count == 0 ? -1 : stack.Peek();
            dp[i] = ((j != -1 ? dp[j] : 0) + (long)arr[i] * (i - j)) % MOD;
            res = (res + dp[i]) % MOD;
            stack.Push(i);
        }

        return (int)res;
    }
}
```

```go
func sumSubarrayMins(arr []int) int {
    MOD := int(1e9 + 7)
    n := len(arr)
    dp := make([]int, n)
    stack := []int{}
    res := 0

    for i := 0; i < n; i++ {
        for len(stack) > 0 && arr[stack[len(stack)-1]] > arr[i] {
            stack = stack[:len(stack)-1]
        }

        j := -1
        if len(stack) > 0 {
            j = stack[len(stack)-1]
        }
        if j != -1 {
            dp[i] = (dp[j] + arr[i]*(i-j)) % MOD
        } else {
            dp[i] = (arr[i] * (i - j)) % MOD
        }
        res = (res + dp[i]) % MOD
        stack = append(stack, i)
    }

    return res
}
```

```kotlin
class Solution {
    fun sumSubarrayMins(arr: IntArray): Int {
        val MOD = 1000000007
        val n = arr.size
        val dp = LongArray(n)
        val stack = ArrayDeque<Int>()
        var res = 0L

        for (i in 0 until n) {
            while (stack.isNotEmpty() && arr[stack.last()] > arr[i]) {
                stack.removeLast()
            }

            val j = if (stack.isEmpty()) -1 else stack.last()
            dp[i] = ((if (j != -1) dp[j] else 0L) + arr[i].toLong() * (i - j)) % MOD
            res = (res + dp[i]) % MOD
            stack.addLast(i)
        }

        return res.toInt()
    }
}
```

```swift
class Solution {
    func sumSubarrayMins(_ arr: [Int]) -> Int {
        let MOD = 1000000007
        let n = arr.count
        var dp = [Int](repeating: 0, count: n)
        var stack = [Int]()
        var res = 0

        for i in 0..<n {
            while !stack.isEmpty && arr[stack.last!] > arr[i] {
                stack.removeLast()
            }

            let j = stack.isEmpty ? -1 : stack.last!
            dp[i] = ((j != -1 ? dp[j] : 0) + arr[i] * (i - j)) % MOD
            res = (res + dp[i]) % MOD
            stack.append(i)
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

## Common Pitfalls

### Double Counting with Duplicate Elements

When there are duplicate values in the array, using strict less-than (`<`) on both sides when finding previous and next smaller elements causes the same subarray to be counted multiple times. The solution is to use strict less-than (`<`) on one side and less-than-or-equal (`<=`) on the other side to ensure each subarray is counted exactly once.

### Integer Overflow in Contribution Calculation

The contribution formula `arr[i] * left * right` can overflow a 32-bit integer when the array is large. With `n` up to 30,000 and values up to 30,000, the product can reach approximately 2.7 * 10^13. Always use 64-bit integers for the multiplication and apply the modulo operation at each step.

### Incorrect Boundary Initialization

When no previous smaller element exists, `prevSmaller[i]` should be `-1` (not `0`), representing an imaginary boundary before the array. Similarly, when no next smaller element exists, `nextSmaller[i]` should be `n` (not `n-1`). Using wrong boundary values leads to incorrect counts for subarrays starting at the beginning or ending at the end of the array.

### Forgetting to Apply Modulo Operation

The problem requires returning the result modulo 10^9 + 7. A common mistake is only applying modulo at the final return statement. Since intermediate sums can overflow even with 64-bit integers after many additions, modulo should be applied after each addition to the result to keep values within bounds.
