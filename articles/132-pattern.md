## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Monotonic Stacks** - The optimal solution uses a decreasing monotonic stack to efficiently track potential pattern candidates
- **Array Traversal Patterns** - Understanding both left-to-right and right-to-left traversal strategies
- **Tracking Running Minimum/Maximum** - Maintaining the minimum value seen so far while iterating through an array

---

## 1. Brute Force

### Intuition

The most straightforward way to find a 132 pattern is to check every possible triplet. We need indices `i < j < k` where `nums[i] < nums[k] < nums[j]`. For each position `k`, we look backward to find a valid `j` (where `nums[j] > nums[k]`), and then look further back to find a valid `i` (where `nums[i] < nums[k]`). If all three conditions are met, we found the pattern.

### Algorithm

1. Iterate `k` from index 2 to the end of the array.
2. For each `k`, iterate `j` backward from `k - 1` to 1.
   - Skip if `nums[j] <= nums[k]` since we need `nums[j] > nums[k]`.
3. For each valid `j`, iterate `i` backward from `j - 1` to 0.
   - If `nums[i] < nums[k]`, return `true`.
4. If no valid triplet is found, return `false`.

::tabs-start

```python
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        n = len(nums)

        for k in range(2, n):
            for j in range(k - 1, 0, -1):
                if nums[j] <= nums[k]:
                    continue

                for i in range(j - 1, -1, -1):
                    if nums[i] < nums[k]:
                        return True

        return False
```

```java
public class Solution {
    public boolean find132pattern(int[] nums) {
        int n = nums.length;

        for (int k = 2; k < n; k++) {
            for (int j = k - 1; j > 0; j--) {
                if (nums[j] <= nums[k]) {
                    continue;
                }

                for (int i = j - 1; i >= 0; i--) {
                    if (nums[i] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int n = nums.size();

        for (int k = 2; k < n; k++) {
            for (int j = k - 1; j > 0; j--) {
                if (nums[j] <= nums[k]) {
                    continue;
                }

                for (int i = j - 1; i >= 0; i--) {
                    if (nums[i] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    find132pattern(nums) {
        let n = nums.length;

        for (let k = 2; k < n; k++) {
            for (let j = k - 1; j > 0; j--) {
                if (nums[j] <= nums[k]) {
                    continue;
                }

                for (let i = j - 1; i >= 0; i--) {
                    if (nums[i] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Find132pattern(int[] nums) {
        int n = nums.Length;

        for (int k = 2; k < n; k++) {
            for (int j = k - 1; j > 0; j--) {
                if (nums[j] <= nums[k]) {
                    continue;
                }

                for (int i = j - 1; i >= 0; i--) {
                    if (nums[i] < nums[k]) {
                        return true;
                    }
                }
            }
        }

        return false;
    }
}
```

```go
func find132pattern(nums []int) bool {
    n := len(nums)

    for k := 2; k < n; k++ {
        for j := k - 1; j > 0; j-- {
            if nums[j] <= nums[k] {
                continue
            }

            for i := j - 1; i >= 0; i-- {
                if nums[i] < nums[k] {
                    return true
                }
            }
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun find132pattern(nums: IntArray): Boolean {
        val n = nums.size

        for (k in 2 until n) {
            for (j in k - 1 downTo 1) {
                if (nums[j] <= nums[k]) {
                    continue
                }

                for (i in j - 1 downTo 0) {
                    if (nums[i] < nums[k]) {
                        return true
                    }
                }
            }
        }

        return false
    }
}
```

```swift
class Solution {
    func find132pattern(_ nums: [Int]) -> Bool {
        let n = nums.count

        for k in 2..<n {
            for j in stride(from: k - 1, through: 1, by: -1) {
                if nums[j] <= nums[k] {
                    continue
                }

                for i in stride(from: j - 1, through: 0, by: -1) {
                    if nums[i] < nums[k] {
                        return true
                    }
                }
            }
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Stack

### Intuition

Instead of checking every triplet, we can use a monotonic decreasing stack to efficiently track potential `j` candidates along with their corresponding minimum values to the left (potential `i` values). As we scan from left to right, we maintain a stack of pairs `[nums[j], minLeft]` where `minLeft` is the smallest element seen before index `j`. When we encounter a new element, if it's greater than the `minLeft` of any stack entry but less than that entry's value, we found a valid 132 pattern.

### Algorithm

1. Initialize a stack to store pairs `[num, minLeft]` and track `curMin` as the running minimum.
2. For each element starting from index 1:
   - Pop elements from the stack while the current element is greater than or equal to the top.
   - If the stack is not empty and the current element is greater than `stack.top().minLeft`, return `true`.
   - Push the current element with `curMin` onto the stack.
   - Update `curMin` to be the minimum of itself and the current element.
3. Return `false` if no pattern is found.

::tabs-start

```python
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        stack = []  # pair [num, minLeft], mono decreasing
        curMin = nums[0]

        for i in range(1, len(nums)):
            while stack and nums[i] >= stack[-1][0]:
                stack.pop()
            if stack and nums[i] > stack[-1][1]:
                return True

            stack.append([nums[i], curMin])
            curMin = min(curMin, nums[i])

        return False
```

```java
public class Solution {
    public boolean find132pattern(int[] nums) {
        Stack<int[]> stack = new Stack<>(); // pair [num, minLeft]
        int curMin = nums[0];

        for (int i = 1; i < nums.length; i++) {
            while (!stack.isEmpty() && nums[i] >= stack.peek()[0]) {
                stack.pop();
            }
            if (!stack.isEmpty() && nums[i] > stack.peek()[1]) {
                return true;
            }

            stack.push(new int[]{nums[i], curMin});
            curMin = Math.min(curMin, nums[i]);
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        stack<pair<int, int>> stack; // pair<num, minLeft>
        int curMin = nums[0];

        for (int i = 1; i < nums.size(); i++) {
            while (!stack.empty() && nums[i] >= stack.top().first) {
                stack.pop();
            }
            if (!stack.empty() && nums[i] > stack.top().second) {
                return true;
            }

            stack.push({nums[i], curMin});
            curMin = min(curMin, nums[i]);
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    find132pattern(nums) {
        const stack = []; // pair [num, minLeft]
        let curMin = nums[0];

        for (let i = 1; i < nums.length; i++) {
            while (stack.length > 0 && nums[i] >= stack[stack.length - 1][0]) {
                stack.pop();
            }
            if (stack.length > 0 && nums[i] > stack[stack.length - 1][1]) {
                return true;
            }

            stack.push([nums[i], curMin]);
            curMin = Math.min(curMin, nums[i]);
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Find132pattern(int[] nums) {
        Stack<int[]> stack = new Stack<int[]>(); // pair [num, minLeft]
        int curMin = nums[0];

        for (int i = 1; i < nums.Length; i++) {
            while (stack.Count > 0 && nums[i] >= stack.Peek()[0]) {
                stack.Pop();
            }
            if (stack.Count > 0 && nums[i] > stack.Peek()[1]) {
                return true;
            }

            stack.Push(new int[]{nums[i], curMin});
            curMin = Math.Min(curMin, nums[i]);
        }

        return false;
    }
}
```

```go
func find132pattern(nums []int) bool {
    stack := [][2]int{} // pair [num, minLeft]
    curMin := nums[0]

    for i := 1; i < len(nums); i++ {
        for len(stack) > 0 && nums[i] >= stack[len(stack)-1][0] {
            stack = stack[:len(stack)-1]
        }
        if len(stack) > 0 && nums[i] > stack[len(stack)-1][1] {
            return true
        }

        stack = append(stack, [2]int{nums[i], curMin})
        if nums[i] < curMin {
            curMin = nums[i]
        }
    }

    return false
}
```

```kotlin
class Solution {
    fun find132pattern(nums: IntArray): Boolean {
        val stack = ArrayDeque<IntArray>() // pair [num, minLeft]
        var curMin = nums[0]

        for (i in 1 until nums.size) {
            while (stack.isNotEmpty() && nums[i] >= stack.last()[0]) {
                stack.removeLast()
            }
            if (stack.isNotEmpty() && nums[i] > stack.last()[1]) {
                return true
            }

            stack.addLast(intArrayOf(nums[i], curMin))
            curMin = minOf(curMin, nums[i])
        }

        return false
    }
}
```

```swift
class Solution {
    func find132pattern(_ nums: [Int]) -> Bool {
        var stack = [[Int]]() // pair [num, minLeft]
        var curMin = nums[0]

        for i in 1..<nums.count {
            while !stack.isEmpty && nums[i] >= stack.last![0] {
                stack.removeLast()
            }
            if !stack.isEmpty && nums[i] > stack.last![1] {
                return true
            }

            stack.append([nums[i], curMin])
            curMin = min(curMin, nums[i])
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Stack (Optimal)

### Intuition

We can solve this more elegantly by iterating from right to left. The key insight is to track `k`, which represents the largest valid "2" in a potential 132 pattern (the middle value that's smaller than some "3" to its right). We use a stack to maintain elements in decreasing order. When we find an element larger than the stack top, we pop elements and update `k` to be the largest popped value. If we ever find an element smaller than `k`, we've found our "1", completing the pattern.

### Algorithm

1. Initialize an empty stack and set `k` to negative infinity.
2. Iterate from the end of the array to the beginning:
   - If the current element is less than `k`, return `true` (we found the "1").
   - While the stack is not empty and the top is less than the current element:
     - Pop and update `k` to the popped value (this becomes a candidate for "2").
   - Push the current element onto the stack (candidate for "3").
3. Return `false` if no pattern is found.

::tabs-start

```python
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        stack, k = [], float('-inf')

        for i in range(len(nums) - 1, -1, -1):
            if nums[i] < k:
                return True

            while stack and stack[-1] < nums[i]:
                k = stack.pop()
            stack.append(nums[i])

        return False
```

```java
public class Solution {
    public boolean find132pattern(int[] nums) {
        Stack<Integer> stack = new Stack<>();
        int k = Integer.MIN_VALUE;

        for (int i = nums.length - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (!stack.isEmpty() && stack.peek() < nums[i]) {
                k = stack.pop();
            }
            stack.push(nums[i]);
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        stack<int> stack;
        int k = INT_MIN;

        for (int i = nums.size() - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (!stack.empty() && stack.top() < nums[i]) {
                k = stack.top();
                stack.pop();
            }
            stack.push(nums[i]);
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    find132pattern(nums) {
        const stack = [];
        let k = -Infinity;

        for (let i = nums.length - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stack.length > 0 && stack[stack.length - 1] < nums[i]) {
                k = stack.pop();
            }
            stack.push(nums[i]);
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Find132pattern(int[] nums) {
        Stack<int> stack = new Stack<int>();
        int k = int.MinValue;

        for (int i = nums.Length - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stack.Count > 0 && stack.Peek() < nums[i]) {
                k = stack.Pop();
            }
            stack.Push(nums[i]);
        }

        return false;
    }
}
```

```go
func find132pattern(nums []int) bool {
    stack := []int{}
    k := math.MinInt32

    for i := len(nums) - 1; i >= 0; i-- {
        if nums[i] < k {
            return true
        }

        for len(stack) > 0 && stack[len(stack)-1] < nums[i] {
            k = stack[len(stack)-1]
            stack = stack[:len(stack)-1]
        }
        stack = append(stack, nums[i])
    }

    return false
}
```

```kotlin
class Solution {
    fun find132pattern(nums: IntArray): Boolean {
        val stack = ArrayDeque<Int>()
        var k = Int.MIN_VALUE

        for (i in nums.size - 1 downTo 0) {
            if (nums[i] < k) {
                return true
            }

            while (stack.isNotEmpty() && stack.last() < nums[i]) {
                k = stack.removeLast()
            }
            stack.addLast(nums[i])
        }

        return false
    }
}
```

```swift
class Solution {
    func find132pattern(_ nums: [Int]) -> Bool {
        var stack = [Int]()
        var k = Int.min

        for i in stride(from: nums.count - 1, through: 0, by: -1) {
            if nums[i] < k {
                return true
            }

            while !stack.isEmpty && stack.last! < nums[i] {
                k = stack.removeLast()
            }
            stack.append(nums[i])
        }

        return false
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

We can achieve O(1) extra space by reusing the input array itself as a stack. The idea is the same as the optimal stack approach, but instead of using a separate stack, we use a pointer `stkTop` to track where our "stack" ends within the array. Elements from `stkTop` to `n-1` form our virtual stack. This works because as we iterate from right to left, we no longer need the original values at those positions.

### Algorithm

1. Initialize `stkTop` to `n` (stack starts empty) and `k` to negative infinity.
2. Iterate from the end of the array to the beginning:
   - If the current element is less than `k`, return `true`.
   - While `stkTop < n` and the current element is greater than `nums[stkTop]`:
     - Update `k` to `nums[stkTop]` and increment `stkTop` (pop from virtual stack).
   - Decrement `stkTop` and store the current element at that position (push to virtual stack).
3. Return `false` if no pattern is found.

::tabs-start

```python
class Solution:
    def find132pattern(self, nums: List[int]) -> bool:
        n = len(nums)
        stkTop, k = n, float('-inf')

        for i in range(n - 1, -1, -1):
            if nums[i] < k:
                return True

            while stkTop < n and nums[i] > nums[stkTop]:
                k = nums[stkTop]
                stkTop += 1

            stkTop -= 1
            nums[stkTop] = nums[i]

        return False
```

```java
public class Solution {
    public boolean find132pattern(int[] nums) {
        int n = nums.length;
        int stkTop = n;
        int k = Integer.MIN_VALUE;

        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stkTop < n && nums[i] > nums[stkTop]) {
                k = nums[stkTop++];
            }

            nums[--stkTop] = nums[i];
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool find132pattern(vector<int>& nums) {
        int n = nums.size();
        int stkTop = n;
        int k = INT_MIN;

        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stkTop < n && nums[i] > nums[stkTop]) {
                k = nums[stkTop++];
            }

            nums[--stkTop] = nums[i];
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {boolean}
     */
    find132pattern(nums) {
        const n = nums.length;
        let stkTop = n;
        let k = -Infinity;

        for (let i = n - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stkTop < n && nums[i] > nums[stkTop]) {
                k = nums[stkTop++];
            }

            nums[--stkTop] = nums[i];
        }

        return false;
    }
}
```

```csharp
public class Solution {
    public bool Find132pattern(int[] nums) {
        int n = nums.Length;
        int stkTop = n;
        int k = int.MinValue;

        for (int i = n - 1; i >= 0; i--) {
            if (nums[i] < k) {
                return true;
            }

            while (stkTop < n && nums[i] > nums[stkTop]) {
                k = nums[stkTop++];
            }

            nums[--stkTop] = nums[i];
        }

        return false;
    }
}
```

```go
func find132pattern(nums []int) bool {
    n := len(nums)
    stkTop := n
    k := math.MinInt32

    for i := n - 1; i >= 0; i-- {
        if nums[i] < k {
            return true
        }

        for stkTop < n && nums[i] > nums[stkTop] {
            k = nums[stkTop]
            stkTop++
        }

        stkTop--
        nums[stkTop] = nums[i]
    }

    return false
}
```

```kotlin
class Solution {
    fun find132pattern(nums: IntArray): Boolean {
        val n = nums.size
        var stkTop = n
        var k = Int.MIN_VALUE

        for (i in n - 1 downTo 0) {
            if (nums[i] < k) {
                return true
            }

            while (stkTop < n && nums[i] > nums[stkTop]) {
                k = nums[stkTop++]
            }

            nums[--stkTop] = nums[i]
        }

        return false
    }
}
```

```swift
class Solution {
    func find132pattern(_ nums: inout [Int]) -> Bool {
        let n = nums.count
        var stkTop = n
        var k = Int.min

        for i in stride(from: n - 1, through: 0, by: -1) {
            if nums[i] < k {
                return true
            }

            while stkTop < n && nums[i] > nums[stkTop] {
                k = nums[stkTop]
                stkTop += 1
            }

            stkTop -= 1
            nums[stkTop] = nums[i]
        }

        return false
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ extra space.

---

## Common Pitfalls

### Confusing the Pattern Order
The "132 pattern" refers to the relative ordering of values, not indices. You need `nums[i] < nums[k] < nums[j]` where `i < j < k`. A common mistake is looking for values in the wrong order or confusing which index maps to which part of the pattern name.

### Using Wrong Comparison Operators
The pattern requires strict inequalities: `nums[i] < nums[k] < nums[j]`. Using `<=` instead of `<` will incorrectly accept patterns where two elements are equal.
```python
# Wrong: allows equal values
if nums[i] <= nums[k] <= nums[j]:
# Correct: requires strict inequalities
if nums[i] < nums[k] < nums[j]:
```

### Forgetting to Track the Minimum Correctly
In the stack-based approach, you must track the minimum value to the left of each potential "3" (middle element). Failing to update the minimum correctly or associating it with the wrong stack element leads to missing valid patterns or false positives.