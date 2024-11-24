## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n ^ 2)$
* Space complexity: $O(1)$

---

## 2. Prefix & Suffix Arrays

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 3. Stack

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
            while (stack.length > 0 && height[i] >= height[stack[stack.length - 1]]) {
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(n)$

---

## 4. Two Pointers

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$