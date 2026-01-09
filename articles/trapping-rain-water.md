## 1. Brute Force

### Intuition

For each position, the water trapped above it depends on the **tallest bar to its left** and the **tallest bar to its right**.  
If we know these two values, the water at index `i` is:

`min(leftMax, rightMax) - height[i]`

The brute-force method recomputes the left maximum and right maximum for every index by scanning the array each time.

### Algorithm

1. If the input list is empty, return `0`.
2. Let `n` be the length of the array and initialize `res = 0`.
3. For each index `i`:
   - Compute `leftMax` by scanning from index `0` to `i`.
   - Compute `rightMax` by scanning from index `i + 1` to the end.
   - Add `min(leftMax, rightMax) - height[i]` to `res`.
4. After processing all positions, return `res`.

<details>
<summary>Example - Dry Run</summary>

Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```markdown
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │  height
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```

═════════════════════════════════════════════════════════════

**Step-by-step execution:**

For each position, we scan left and right to find the maximum heights.


| i | height[i] | leftMax | rightMax | min(L,R) | Water = min(L,R) - height[i] |
|---|-----------|---------|----------|----------|------------------------------|
| 0 | 0         | 0       | 3        | 0        | 0 - 0 = 0                    |
| 1 | 1         | 1       | 3        | 1        | 1 - 1 = 0                    |
| 2 | 0         | 1       | 3        | 1        | 1 - 0 = **1**                |
| 3 | 2         | 2       | 3        | 2        | 2 - 2 = 0                    |
| 4 | 1         | 2       | 3        | 2        | 2 - 1 = **1**                |
| 5 | 0         | 2       | 3        | 2        | 2 - 0 = **2**                |
| 6 | 1         | 2       | 3        | 2        | 2 - 1 = **1**                |
| 7 | 3         | 3       | 3        | 3        | 3 - 3 = 0                    |
| 8 | 2         | 3       | 2        | 2        | 2 - 2 = 0                    |
| 9 | 1         | 3       | 2        | 2        | 2 - 1 = **1**                |
| 10| 2         | 3       | 2        | 2        | 2 - 2 = 0                    |
| 11| 1         | 3       | 1        | 1        | 1 - 1 = 0                    |


**Total water trapped = 1 + 1 + 2 + 1 + 1 = 6**

</details>

<br>

::tabs-start

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        n = len(height)
        res = 0

        for i in range(n):
            leftMax = rightMax = height[i]

            for j in range(i):
                leftMax = max(leftMax, height[j])
            for j in range(i + 1, n):
                rightMax = max(rightMax, height[j])

            res += min(leftMax, rightMax) - height[i]
        return res
```

```java
public class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) {
            return 0;
        }
        int n = height.length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            int leftMax = height[i];
            int rightMax = height[i];

            for (int j = 0; j < i; j++) {
                leftMax = Math.max(leftMax, height[j]);
            }
            for (int j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, height[j]);
            }

            res += Math.min(leftMax, rightMax) - height[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) {
            return 0;
        }
        int n = height.size();
        int res = 0;

        for (int i = 0; i < n; i++) {
            int leftMax = height[i];
            int rightMax = height[i];

            for (int j = 0; j < i; j++) {
                leftMax = max(leftMax, height[j]);
            }
            for (int j = i + 1; j < n; j++) {
                rightMax = max(rightMax, height[j]);
            }

            res += min(leftMax, rightMax) - height[i];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height.length) {
            return 0;
        }
        let n = height.length;
        let res = 0;

        for (let i = 0; i < n; i++) {
            let leftMax = height[i];
            let rightMax = height[i];

            for (let j = 0; j < i; j++) {
                leftMax = Math.max(leftMax, height[j]);
            }
            for (let j = i + 1; j < n; j++) {
                rightMax = Math.max(rightMax, height[j]);
            }

            res += Math.min(leftMax, rightMax) - height[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Trap(int[] height) {
        if (height == null || height.Length == 0) {
            return 0;
        }
        int n = height.Length;
        int res = 0;

        for (int i = 0; i < n; i++) {
            int leftMax = height[i];
            int rightMax = height[i];

            for (int j = 0; j < i; j++) {
                leftMax = Math.Max(leftMax, height[j]);
            }
            for (int j = i + 1; j < n; j++) {
                rightMax = Math.Max(rightMax, height[j]);
            }

            res += Math.Min(leftMax, rightMax) - height[i];
        }

        return res;
    }
}
```

```go
func trap(height []int) int {
    if len(height) == 0 {
        return 0
    }
    n := len(height)
    res := 0

    for i := 0; i < n; i++ {
        leftMax := height[i]
        rightMax := height[i]

        for j := 0; j < i; j++ {
            if height[j] > leftMax {
                leftMax = height[j]
            }
        }
        for j := i + 1; j < n; j++ {
            if height[j] > rightMax {
                rightMax = height[j]
            }
        }

        res += min(leftMax, rightMax) - height[i]
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun trap(height: IntArray): Int {
        if (height.isEmpty()) return 0
        val n = height.size
        var res = 0

        for (i in 0 until n) {
            var leftMax = height[i]
            var rightMax = height[i]

            for (j in 0 until i) {
                leftMax = maxOf(leftMax, height[j])
            }
            for (j in i + 1 until n) {
                rightMax = maxOf(rightMax, height[j])
            }

            res += minOf(leftMax, rightMax) - height[i]
        }
        return res
    }
}
```

```swift
class Solution {
    func trap(_ height: [Int]) -> Int {
        if height.isEmpty {
            return 0
        }
        let n = height.count
        var res = 0

        for i in 0..<n {
            var leftMax = height[i]
            var rightMax = height[i]

            for j in 0..<i {
                leftMax = max(leftMax, height[j])
            }
            for j in (i + 1)..<n {
                rightMax = max(rightMax, height[j])
            }

            res += min(leftMax, rightMax) - height[i]
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

## 2. Prefix & Suffix Arrays

### Intuition

Instead of recomputing the tallest bar to the left and right for every index, we can precompute these values once.  
We build two arrays:

- `leftMax[i]` = tallest bar from the start up to index `i`
- `rightMax[i]` = tallest bar from the end up to index `i`

Once we have these, the trapped water at position `i` is simply:

`min(leftMax[i], rightMax[i]) - height[i]`

This removes the repeated work from the brute-force approach and makes the solution more efficient and easier to understand.

### Algorithm

1. If the array is empty, return `0`.
2. Create two arrays:
   - `leftMax` of size `n`
   - `rightMax` of size `n`
3. Fill `leftMax`:
   - `leftMax[0] = height[0]`
   - For each `i` from `1` to `n - 1`,  
     `leftMax[i] = max(leftMax[i - 1], height[i])`
4. Fill `rightMax`:
   - `rightMax[n - 1] = height[n - 1]`
   - For each `i` from `n - 2` down to `0`,  
     `rightMax[i] = max(rightMax[i + 1], height[i])`
5. Compute trapped water:
   - For each index `i`, add `min(leftMax[i], rightMax[i]) - height[i]` to the result.
6. Return the total trapped water.

<details>
<summary>Example - Dry Run</summary>

Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```markdown
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │  height
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```

═════════════════════════════════════════════════════════════

**Step 1: Build leftMax array (scan left to right)**

```markdown
  leftMax[i] = max height from index 0 to i

  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 1 │ 2 │ 2 │ 2 │ 2 │ 3 │ 3 │ 3 │ 3 │ 3 │  leftMax
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```


═══════════════════════════════════════════════════════════


**Step 2: Build rightMax array (scan right to left)**

```markdown
  rightMax[i] = max height from index i to n-1

  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 3 │ 3 │ 3 │ 3 │ 3 │ 3 │ 3 │ 3 │ 2 │ 2 │ 2 │ 1 │  rightMax
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```


═══════════════════════════════════════════════════════════


**Step 3: Calculate water at each position**

Water at index i = min(leftMax[i], rightMax[i]) - height[i]


| i | height[i] | leftMax[i] | rightMax[i] | min(L,R) | Water |
|---|-----------|------------|-------------|----------|-------|
| 0 | 0 | 0 | 3 | 0 | 0 |
| 1 | 1 | 1 | 3 | 1 | 0 |
| 2 | 0 | 1 | 3 | 1 | **1** |
| 3 | 2 | 2 | 3 | 2 | 0 |
| 4 | 1 | 2 | 3 | 2 | **1** |
| 5 | 0 | 2 | 3 | 2 | **2** |
| 6 | 1 | 2 | 3 | 2 | **1** |
| 7 | 3 | 3 | 3 | 3 | 0 |
| 8 | 2 | 3 | 2 | 2 | 0 |
| 9 | 1 | 3 | 2 | 2 | **1** |
| 10 | 2 | 3 | 2 | 2 | 0 |
| 11 | 1 | 3 | 1 | 1 | 0 |


**Total water trapped = 1 + 1 + 2 + 1 + 1 = 6**

</details>

<br>

::tabs-start

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        n = len(height)
        if n == 0:
            return 0

        leftMax = [0] * n
        rightMax = [0] * n

        leftMax[0] = height[0]
        for i in range(1, n):
            leftMax[i] = max(leftMax[i - 1], height[i])

        rightMax[n - 1] = height[n - 1]
        for i in range(n - 2, -1, -1):
            rightMax[i] = max(rightMax[i + 1], height[i])

        res = 0
        for i in range(n):
            res += min(leftMax[i], rightMax[i]) - height[i]
        return res
```

```java
public class Solution {
    public int trap(int[] height) {
        int n = height.length;
        if (n == 0) {
            return 0;
        }

        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res += Math.min(leftMax[i], rightMax[i]) - height[i];
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        int n = height.size();
        if (n == 0) {
            return 0;
        }

        vector<int> leftMax(n);
        vector<int> rightMax(n);

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = max(rightMax[i + 1], height[i]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res += min(leftMax[i], rightMax[i]) - height[i];
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        let n = height.length;
        if (n === 0) {
            return 0;
        }

        let leftMax = new Array(n).fill(0);
        let rightMax = new Array(n).fill(0);

        leftMax[0] = height[0];
        for (let i = 1; i < n; i++) {
            leftMax[i] = Math.max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (let i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.max(rightMax[i + 1], height[i]);
        }

        let res = 0;
        for (let i = 0; i < n; i++) {
            res += Math.min(leftMax[i], rightMax[i]) - height[i];
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Trap(int[] height) {
        int n = height.Length;
        if (n == 0) {
            return 0;
        }

        int[] leftMax = new int[n];
        int[] rightMax = new int[n];

        leftMax[0] = height[0];
        for (int i = 1; i < n; i++) {
            leftMax[i] = Math.Max(leftMax[i - 1], height[i]);
        }

        rightMax[n - 1] = height[n - 1];
        for (int i = n - 2; i >= 0; i--) {
            rightMax[i] = Math.Max(rightMax[i + 1], height[i]);
        }

        int res = 0;
        for (int i = 0; i < n; i++) {
            res += Math.Min(leftMax[i], rightMax[i]) - height[i];
        }
        return res;
    }
}
```

```go
func trap(height []int) int {
    n := len(height)
    if n == 0 {
        return 0
    }

    leftMax := make([]int, n)
    rightMax := make([]int, n)

    leftMax[0] = height[0]
    for i := 1; i < n; i++ {
        leftMax[i] = max(leftMax[i-1], height[i])
    }

    rightMax[n-1] = height[n-1]
    for i := n - 2; i >= 0; i-- {
        rightMax[i] = max(rightMax[i+1], height[i])
    }

    res := 0
    for i := 0; i < n; i++ {
        res += min(leftMax[i], rightMax[i]) - height[i]
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun trap(height: IntArray): Int {
        val n = height.size
        if (n == 0) return 0

        val leftMax = IntArray(n)
        val rightMax = IntArray(n)

        leftMax[0] = height[0]
        for (i in 1 until n) {
            leftMax[i] = maxOf(leftMax[i - 1], height[i])
        }

        rightMax[n - 1] = height[n - 1]
        for (i in n - 2 downTo 0) {
            rightMax[i] = maxOf(rightMax[i + 1], height[i])
        }

        var res = 0
        for (i in 0 until n) {
            res += minOf(leftMax[i], rightMax[i]) - height[i]
        }
        return res
    }
}
```

```swift
class Solution {
    func trap(_ height: [Int]) -> Int {
        let n = height.count
        if n == 0 {
            return 0
        }

        var leftMax = [Int](repeating: 0, count: n)
        var rightMax = [Int](repeating: 0, count: n)

        leftMax[0] = height[0]
        for i in 1..<n {
            leftMax[i] = max(leftMax[i - 1], height[i])
        }

        rightMax[n - 1] = height[n - 1]
        for i in stride(from: n - 2, through: 0, by: -1) {
            rightMax[i] = max(rightMax[i + 1], height[i])
        }

        var res = 0
        for i in 0..<n {
            res += min(leftMax[i], rightMax[i]) - height[i]
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

## 3. Stack

### Intuition

The stack helps us find places where water can collect.  
When we see a bar that is taller than the bar on top of the stack, it means we’ve found a **right wall** for a container.  
The bar we pop is the **bottom**, and the new top of the stack becomes the **left wall**.  
With a left wall, bottom, and right wall, we can calculate how much water fits in between.  
We keep doing this as long as the current bar keeps forming valid containers.

### Algorithm

1. Create an empty stack and set `res = 0`.
2. Loop through each index `i`:
   - While the stack is not empty and `height[i]` is taller than the bar at the stack’s top:
     - Pop the top index — that’s the **bottom**.
     - If the stack is not empty:
       - Compute the trapped water between the new top (left wall) and the current bar (right wall).
       - Add it to `res`.
   - Push the current index onto the stack.
3. Return `res` after the loop finishes.

<details>
<summary>Example - Dry Run</summary>

Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```markdown
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │  height
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```

═════════════════════════════════════════════════════════════

**Stack-based approach: Process horizontally layer by layer**

The stack stores indices. When we find a taller bar, we pop and calculate water trapped.


**Step 4: i = 3, height[3] = 2**

Found right wall at index 3, pop index 2 (bottom = 0), left wall at index 1 (height = 1)

```markdown
            ┌───┐
       ┌───┐│   │
       │   │≈≈≈≈│       Water: h=min(1,2)-0=1, w=3-1-1=1, area=1
  ─────┴───┴────┴────
       0   1   0   2
               ↑   ↑
             bottom right
```

Water added: **1**


═══════════════════════════════════════════════════════════


**Step 7: i = 6, height[6] = 1**

Found right wall at index 6, pop index 5 (bottom = 0), left wall at index 4 (height = 1)

```markdown
                        ┌───┐
            ┌───┐       │   │
            │   │ ┌───┐ │   │ ┌───┐
  ──────────┴───┴─┴───┴─≈≈≈≈┴─┴───┴────
            2   1   0   1   3   2
                    ↑   ↑
                  bottom right
```

Water added: **1**


═══════════════════════════════════════════════════════════


**Step 8: i = 7, height[7] = 3**

Pop multiple times to fill the pool between index 3 and 7

```markdown
                        ┌───┐
            ┌───┐ ≈ ≈ ≈ │   │
            │   │ ≈ ≈ ≈ │   │       Water: h=min(2,3)-1=1, w=7-3-1=3, area=3
  ──────────┴───┴─≈─≈─≈─┴───┴────
            2   1   0   1   3
            ↑               ↑
          left            right
```

Water added: **3**


═══════════════════════════════════════════════════════════


**Step 11: i = 10, height[10] = 2**

Found right wall at index 10, pop index 9 (bottom = 1), left wall at index 8 (height = 2)

```markdown
       ┌───┐     ┌───┐
       │   │ ≈ ≈ │   │       Water: h=min(2,2)-1=1, w=10-8-1=1, area=1
  ─────┴───┴──≈──┴───┴────
       3   2   1   2
           ↑   ↑   ↑
         left bottom right
```

Water added: **1**


═══════════════════════════════════════════════════════════


**Complete step-by-step trace:**

| Step | i | height[i] | Stack (indices) | Action | Water |
|------|---|-----------|-----------------|--------|-------|
| 1 | 0 | 0 | [] | Push 0 | 0 |
| 2 | 1 | 1 | [0] | Pop 0, no left wall; Push 1 | 0 |
| 3 | 2 | 0 | [1] | Push 2 | 0 |
| 4 | 3 | 2 | [1,2] | Pop 2, calculate water; Push 3 | **1** |
| 5 | 4 | 1 | [3] | Push 4 | 0 |
| 6 | 5 | 0 | [3,4] | Push 5 | 0 |
| 7 | 6 | 1 | [3,4,5] | Pop 5, calculate water; Push 6 | **1** |
| 8 | 7 | 3 | [3,4,6] | Pop 6,4,3, calculate water; Push 7 | **3** |
| 9 | 8 | 2 | [7] | Push 8 | 0 |
| 10 | 9 | 1 | [7,8] | Push 9 | 0 |
| 11 | 10 | 2 | [7,8,9] | Pop 9, calculate water; Push 10 | **1** |
| 12 | 11 | 1 | [7,8,10] | Push 11 | 0 |


**Total water trapped = 1 + 1 + 3 + 1 = 6**

</details>

<br>

::tabs-start

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0
        stack = []
        res = 0

        for i in range(len(height)):
            while stack and height[i] >= height[stack[-1]]:
                mid = height[stack.pop()]
                if stack:
                    right = height[i]
                    left = height[stack[-1]]
                    h = min(right, left) - mid
                    w = i - stack[-1] - 1
                    res += h * w
            stack.append(i)
        return res
```

```java
public class Solution {
    public int trap(int[] height) {
        if (height.length == 0) {
            return 0;
        }

        Stack<Integer> stack = new Stack<>();
        int res = 0;

        for (int i = 0; i < height.length; i++) {
            while (!stack.isEmpty() && height[i] >= height[stack.peek()]) {
                int mid = height[stack.pop()];
                if (!stack.isEmpty()) {
                    int right = height[i];
                    int left = height[stack.peek()];
                    int h = Math.min(right, left) - mid;
                    int w = i - stack.peek() - 1;
                    res += h * w;
                }
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
    int trap(vector<int>& height) {
        if (height.empty()) {
            return 0;
        }

        stack<int> stk;
        int res = 0;

        for (int i = 0; i < height.size(); i++) {
            while (!stk.empty() && height[i] >= height[stk.top()]) {
                int mid = height[stk.top()];
                stk.pop();
                if (!stk.empty()) {
                    int right = height[i];
                    int left = height[stk.top()];
                    int h = min(right, left) - mid;
                    int w = i - stk.top() - 1;
                    res += h * w;
                }
            }
            stk.push(i);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (height.length === 0) {
            return 0;
        }

        const stack = [];
        let res = 0;

        for (let i = 0; i < height.length; i++) {
            while (
                stack.length > 0 &&
                height[i] >= height[stack[stack.length - 1]]
            ) {
                const mid = height[stack.pop()];
                if (stack.length > 0) {
                    const right = height[i];
                    const left = height[stack[stack.length - 1]];
                    const h = Math.min(right, left) - mid;
                    const w = i - stack[stack.length - 1] - 1;
                    res += h * w;
                }
            }
            stack.push(i);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Trap(int[] height) {
        if (height.Length == 0) {
            return 0;
        }

        Stack<int> stack = new Stack<int>();
        int res = 0;

        for (int i = 0; i < height.Length; i++) {
            while (stack.Count > 0 && height[i] >= height[stack.Peek()]) {
                int mid = height[stack.Pop()];
                if (stack.Count > 0) {
                    int right = height[i];
                    int left = height[stack.Peek()];
                    int h = Math.Min(right, left) - mid;
                    int w = i - stack.Peek() - 1;
                    res += h * w;
                }
            }
            stack.Push(i);
        }
        return res;
    }
}
```

```go
func trap(height []int) int {
    if len(height) == 0 {
        return 0
    }

    stack := linkedliststack.New()
    res := 0

    for i := 0; i < len(height); i++ {
        for !stack.Empty() {
            topIndex, _ := stack.Peek()
            if height[i] >= height[topIndex.(int)] {
                midIndex, _ := stack.Pop()
                mid := height[midIndex.(int)]
                if !stack.Empty() {
                    topIndex, _ := stack.Peek()
                    right := height[i]
                    left := height[topIndex.(int)]
                    h := min(right, left) - mid
                    w := i - topIndex.(int) - 1
                    res += h * w
                }
            } else {
                break
            }
        }
        stack.Push(i)
    }
    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun trap(height: IntArray): Int {
        if (height.isEmpty()) return 0

        val stack = ArrayDeque<Int>()
        var res = 0

        for (i in height.indices) {
            while (stack.isNotEmpty() && height[i] >= height[stack.first()]) {
                val mid = stack.removeFirst()
                if (stack.isNotEmpty()) {
                    val left = stack.first()
                    val right = height[i]
                    val h = minOf(right, height[left]) - height[mid]
                    val w = i - left - 1
                    res += h * w
                }
            }
            stack.addFirst(i)
        }
        return res
    }
}
```

```swift
class Solution {
    func trap(_ height: [Int]) -> Int {
        if height.isEmpty {
            return 0
        }
        var stack = [Int]()
        var res = 0

        for i in 0..<height.count {
            while !stack.isEmpty && height[i] >= height[stack.last!] {
                let mid = height[stack.removeLast()]
                if !stack.isEmpty {
                    let right = height[i]
                    let left = height[stack.last!]
                    let h = min(right, left) - mid
                    let w = i - stack.last! - 1
                    res += h * w
                }
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

## 4. Two Pointers

### Intuition

Water at any position depends on the **shorter** wall between the left and right sides.  
So if the left wall is shorter, the right wall can’t help us—water is limited by the left side.  
That means we safely move the **left pointer** inward and calculate how much water can be trapped there.  
Similarly, if the right wall is shorter, we move the **right pointer** left.

As we move the pointers, we keep track of the highest wall seen so far on each side (`leftMax` and `rightMax`).  
The water at each position is simply:

`max wall on that side – height at that position`

### Algorithm

1. Set two pointers:
   - `l` at the start  
   - `r` at the end  
   Track `leftMax` and `rightMax` as the tallest walls seen.
2. While `l < r`:
   - If `leftMax < rightMax`:
     - Move `l` right.
     - Update `leftMax`.
     - Add `leftMax - height[l]` to the result.
   - Else:
     - Move `r` left.
     - Update `rightMax`.
     - Add `rightMax - height[r]` to the result.
3. Return the total trapped water.

<details>
<summary>Example - Dry Run</summary>

Input: `height = [0,1,0,2,1,0,1,3,2,1,2,1]`

```markdown
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │  height
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```

═════════════════════════════════════════════════════════════

**Two Pointers Approach**


**Step 1: Initial State**

```markdown
   L                                           R
   ↓                                           ↓
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11

  leftMax = 0    rightMax = 1    water = 0
```


═══════════════════════════════════════════════════════════


**Step 3: Water trapped at index 2**

leftMax < rightMax, so process left side. Water = leftMax - height[2] = 1 - 0 = 1

```markdown
           L                                   R
           ↓                                   ↓
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
            ≈

  leftMax = 1    rightMax = 2    water = 1
```


═══════════════════════════════════════════════════════════


**Step 5: Water trapped at index 9**

leftMax >= rightMax, so process right side. Water = rightMax - height[9] = 2 - 1 = 1

```markdown
               L                       R
               ↓                       ↓
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
            ≈                           ≈

  leftMax = 2    rightMax = 2    water = 2
```


═══════════════════════════════════════════════════════════


**Steps 8-10: Water trapped at indices 4, 5, 6**

Processing left side as leftMax < rightMax

```markdown
                           L       R
                           ↓       ↓
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
            ≈       ≈   ≈   ≈           ≈

  leftMax = 2    rightMax = 3    water = 6
```


═══════════════════════════════════════════════════════════


**Complete step-by-step trace:**

| Step | l | r | height[l] | height[r] | leftMax | rightMax | Action | Water | Total |
|------|---|---|-----------|-----------|---------|----------|--------|-------|-------|
| 1 | 0 | 11 | 0 | 1 | 0 | 1 | l++ | 0 | 0 |
| 2 | 1 | 11 | 1 | 1 | 1 | 1 | r-- | 0 | 0 |
| 3 | 1 | 10 | 1 | 2 | 1 | 2 | l++ | **1** | 1 |
| 4 | 2 | 10 | 0 | 2 | 1 | 2 | l++ | 0 | 1 |
| 5 | 3 | 10 | 2 | 2 | 2 | 2 | r-- | **1** | 2 |
| 6 | 3 | 9 | 2 | 1 | 2 | 2 | r-- | 0 | 2 |
| 7 | 3 | 8 | 2 | 2 | 2 | 2 | r-- | 0 | 2 |
| 8 | 3 | 7 | 2 | 3 | 2 | 3 | l++ | **1** | 3 |
| 9 | 4 | 7 | 1 | 3 | 2 | 3 | l++ | **2** | 5 |
| 10 | 5 | 7 | 0 | 3 | 2 | 3 | l++ | **1** | 6 |
| 11 | 6 | 7 | 1 | 3 | 2 | 3 | l++ | 0 | 6 |


Loop ends when l = 7 = r


**Final Result:**

```markdown
  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 1 │ 0 │ 2 │ 1 │ 0 │ 1 │ 3 │ 2 │ 1 │ 2 │ 1 │  height
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11

  ┌───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┬───┐
  │ 0 │ 0 │ 1 │ 0 │ 1 │ 2 │ 1 │ 0 │ 0 │ 1 │ 0 │ 0 │  water
  └───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┴───┘
    0   1   2   3   4   5   6   7   8   9  10  11
```

**Total water trapped = 0 + 0 + 1 + 0 + 1 + 2 + 1 + 0 + 0 + 1 + 0 + 0 = 6**

</details>

<br>

::tabs-start

```python
class Solution:
    def trap(self, height: List[int]) -> int:
        if not height:
            return 0

        l, r = 0, len(height) - 1
        leftMax, rightMax = height[l], height[r]
        res = 0
        while l < r:
            if leftMax < rightMax:
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            else:
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
        return res
```

```java
public class Solution {
    public int trap(int[] height) {
        if (height == null || height.length == 0) {
            return 0;
        }

        int l = 0, r = height.length - 1;
        int leftMax = height[l], rightMax = height[r];
        int res = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int trap(vector<int>& height) {
        if (height.empty()) {
            return 0;
        }

        int l = 0, r = height.size() - 1;
        int leftMax = height[l], rightMax = height[r];
        int res = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} height
     * @return {number}
     */
    trap(height) {
        if (!height || height.length === 0) {
            return 0;
        }

        let l = 0;
        let r = height.length - 1;
        let leftMax = height[l];
        let rightMax = height[r];
        let res = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int Trap(int[] height) {
        if (height == null || height.Length == 0) {
            return 0;
        }

        int l = 0, r = height.Length - 1;
        int leftMax = height[l], rightMax = height[r];
        int res = 0;
        while (l < r) {
            if (leftMax < rightMax) {
                l++;
                leftMax = Math.Max(leftMax, height[l]);
                res += leftMax - height[l];
            } else {
                r--;
                rightMax = Math.Max(rightMax, height[r]);
                res += rightMax - height[r];
            }
        }
        return res;
    }
}
```

```go
func trap(height []int) int {
    if len(height) == 0 {
        return 0
    }

    l, r := 0, len(height)-1
    leftMax, rightMax := height[l], height[r]
    res := 0

    for l < r {
        if leftMax < rightMax {
            l++
            leftMax = max(leftMax, height[l])
            res += leftMax - height[l]
        } else {
            r--
            rightMax = max(rightMax, height[r])
            res += rightMax - height[r]
        }
    }
    return res
}

func max(a, b int) int {
    if a > b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun trap(height: IntArray): Int {
        if (height.isEmpty()) return 0

        var l = 0
        var r = height.size - 1
        var leftMax = height[l]
        var rightMax = height[r]
        var res = 0

        while (l < r) {
            if (leftMax < rightMax) {
                l++
                leftMax = maxOf(leftMax, height[l])
                res += leftMax - height[l]
            } else {
                r--
                rightMax = maxOf(rightMax, height[r])
                res += rightMax - height[r]
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func trap(_ height: [Int]) -> Int {
        if height.isEmpty {
            return 0
        }

        var l = 0, r = height.count - 1
        var leftMax = height[l], rightMax = height[r]
        var res = 0

        while l < r {
            if leftMax < rightMax {
                l += 1
                leftMax = max(leftMax, height[l])
                res += leftMax - height[l]
            } else {
                r -= 1
                rightMax = max(rightMax, height[r])
                res += rightMax - height[r]
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$
