## 1. Brute Force

### Intuition

For each person in the queue, we want to count how many people they can see to their right. Person `i` can see person `j` if there's no one taller than both of them standing in between. We track the maximum height seen so far as we scan rightward. If the minimum of the current person's height and the person we're checking is greater than the max height between them, they can see each other.

### Algorithm

1. For each person at index `i`, initialize a counter and track the maximum height seen so far.
2. Iterate through all people to the right (from `j = i + 1` to `n - 1`):
   - If the minimum of `heights[i]` and `heights[j]` is greater than the max height between them, increment `cnt`.
   - Update the max height to include `heights[j]`.
3. Store `cnt` for person `i` and return `res`.

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

```go
func canSeePersonsCount(heights []int) []int {
    n := len(heights)
    res := make([]int, n)
    for i := 0; i < n; i++ {
        maxi, cnt := 0, 0
        for j := i + 1; j < n; j++ {
            if min(heights[i], heights[j]) > maxi {
                cnt++
            }
            maxi = max(maxi, heights[j])
        }
        res[i] = cnt
    }
    return res
}
```

```kotlin
class Solution {
    fun canSeePersonsCount(heights: IntArray): IntArray {
        val n = heights.size
        val res = IntArray(n)
        for (i in 0 until n) {
            var maxi = 0
            var cnt = 0
            for (j in i + 1 until n) {
                if (minOf(heights[i], heights[j]) > maxi) {
                    cnt++
                }
                maxi = maxOf(maxi, heights[j])
            }
            res[i] = cnt
        }
        return res
    }
}
```

```swift
class Solution {
    func canSeePersonsCount(_ heights: [Int]) -> [Int] {
        let n = heights.count
        var res = [Int](repeating: 0, count: n)
        for i in 0..<n {
            var maxi = 0, cnt = 0
            for j in (i + 1)..<n {
                if min(heights[i], heights[j]) > maxi {
                    cnt += 1
                }
                maxi = max(maxi, heights[j])
            }
            res[i] = cnt
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$ for the output array.

---

## 2. Stack - I

### Intuition

A monotonic decreasing stack helps us efficiently find visibility relationships. As we iterate left to right, we pop people who are shorter than the current person since they can now see this taller person as their last visible person. The person remaining on top of the stack (if any) can also see the current person since nothing blocks their view.

### Algorithm

1. Initialize `res` array with zeros and an empty stack to store indices.
2. Iterate through `heights` from left to right:
   - While the stack is not empty and `heights[stack[-1]] < h`, pop and increment their count (they can see the current person).
   - If the stack is not empty, the top person can see the current person, so increment their count.
   - Push the current index onto the stack.
3. Return `res`.

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

```go
func canSeePersonsCount(heights []int) []int {
    n := len(heights)
    res := make([]int, n)
    stack := []int{}

    for i := 0; i < n; i++ {
        h := heights[i]
        for len(stack) > 0 && heights[stack[len(stack)-1]] < h {
            res[stack[len(stack)-1]]++
            stack = stack[:len(stack)-1]
        }
        if len(stack) > 0 {
            res[stack[len(stack)-1]]++
        }
        stack = append(stack, i)
    }
    return res
}
```

```kotlin
class Solution {
    fun canSeePersonsCount(heights: IntArray): IntArray {
        val n = heights.size
        val res = IntArray(n)
        val stack = ArrayDeque<Int>()

        for (i in 0 until n) {
            val h = heights[i]
            while (stack.isNotEmpty() && heights[stack.last()] < h) {
                res[stack.removeLast()]++
            }
            if (stack.isNotEmpty()) {
                res[stack.last()]++
            }
            stack.addLast(i)
        }
        return res
    }
}
```

```swift
class Solution {
    func canSeePersonsCount(_ heights: [Int]) -> [Int] {
        let n = heights.count
        var res = [Int](repeating: 0, count: n)
        var stack = [Int]()

        for i in 0..<n {
            let h = heights[i]
            while !stack.isEmpty && heights[stack.last!] < h {
                res[stack.removeLast()] += 1
            }
            if !stack.isEmpty {
                res[stack.last!] += 1
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

## 3. Stack - II

### Intuition

We can also solve this by iterating from right to left. For each person, we count how many people they can see by popping shorter people from the stack (each popped person is visible). If someone taller remains on the stack after popping, that person is also visible since nothing blocks the view.

### Algorithm

1. Initialize `res` array with zeros and an empty stack to store heights.
2. Iterate through `heights` from right to left:
   - While the stack is not empty and `stack[-1] < heights[i]`, pop and increment `res[i]`.
   - If the stack is not empty after popping, increment `res[i]` by `1` (the first taller or equal person is visible).
   - Push `heights[i]` onto the stack.
3. Return `res`.

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

```go
func canSeePersonsCount(heights []int) []int {
    n := len(heights)
    res := make([]int, n)
    stack := []int{}

    for i := n - 1; i >= 0; i-- {
        for len(stack) > 0 && stack[len(stack)-1] < heights[i] {
            stack = stack[:len(stack)-1]
            res[i]++
        }
        if len(stack) > 0 {
            res[i]++
        }
        stack = append(stack, heights[i])
    }
    return res
}
```

```kotlin
class Solution {
    fun canSeePersonsCount(heights: IntArray): IntArray {
        val n = heights.size
        val res = IntArray(n)
        val stack = ArrayDeque<Int>()

        for (i in n - 1 downTo 0) {
            while (stack.isNotEmpty() && stack.last() < heights[i]) {
                stack.removeLast()
                res[i]++
            }
            if (stack.isNotEmpty()) {
                res[i]++
            }
            stack.addLast(heights[i])
        }
        return res
    }
}
```

```swift
class Solution {
    func canSeePersonsCount(_ heights: [Int]) -> [Int] {
        let n = heights.count
        var res = [Int](repeating: 0, count: n)
        var stack = [Int]()

        for i in stride(from: n - 1, through: 0, by: -1) {
            while !stack.isEmpty && stack.last! < heights[i] {
                stack.removeLast()
                res[i] += 1
            }
            if !stack.isEmpty {
                res[i] += 1
            }
            stack.append(heights[i])
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

### Using the Wrong Stack Order

This problem requires a monotonic decreasing stack. Using an increasing stack or getting the comparison direction wrong leads to incorrect visibility counts. When iterating left-to-right, pop elements shorter than the current person; when iterating right-to-left, pop elements shorter than the current person as well.

### Forgetting to Count the Blocking Person

When a taller person blocks the view, they are still visible to the current person. After popping all shorter people from the stack, if the stack is not empty, the person at the top is also visible. Forgetting to add 1 for this blocking person is a common mistake.

### Confusing What to Store on the Stack

You can store either indices or heights on the stack, but you must be consistent. Storing indices allows you to update the result array directly but requires looking up heights. Storing heights simplifies comparisons but requires a different approach to update results.

### Misunderstanding the Visibility Condition

Person `i` can see person `j` if there is no one between them who is taller than both. This is not the same as "no one taller than person `j`" or "no one taller than person `i`". The blocking condition depends on the minimum of the two heights being compared against the maximum height between them.
