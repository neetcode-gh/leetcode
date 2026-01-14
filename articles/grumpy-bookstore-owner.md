## 1. Brute Force

### Intuition

Customers are satisfied when the owner is not grumpy. The owner can use a secret technique to suppress grumpiness for a consecutive window of `minutes`. We want to find the best position for this window to maximize total satisfied customers.

The idea is straightforward: first count all customers who are already satisfied (when grumpy is `0`), then try every possible window position and see how many additional customers we can save by suppressing grumpiness during that window.

### Algorithm

1. Calculate the baseline satisfaction by summing customers at all indices where the owner is not grumpy.
2. For each possible starting position of the technique window (from `0` to `n - minutes`):
   - Count how many customers would be saved within this window (customers at grumpy minutes).
   - Track the maximum total satisfaction (baseline + saved customers).
3. Return the maximum satisfaction found.

::tabs-start

```python
class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        res, n = 0, len(customers)
        for i in range(n):
            if not grumpy[i]:
                res += customers[i]

        satisfied = res
        for i in range(n - minutes + 1):
            cur = 0
            for j in range(i, i + minutes):
                if grumpy[j]:
                    cur += customers[j]
            res = max(res, satisfied + cur)

        return res
```

```java
public class Solution {
    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int res = 0, n = customers.length;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = Math.max(res, satisfied + cur);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {
        int res = 0, n = customers.size();
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = max(res, satisfied + cur);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} customers
     * @param {number[]} grumpy
     * @param {number} minutes
     * @return {number}
     */
    maxSatisfied(customers, grumpy, minutes) {
        let res = 0, n = customers.length;
        for (let i = 0; i < n; i++) {
            if (grumpy[i] === 0) {
                res += customers[i];
            }
        }

        let satisfied = res;
        for (let i = 0; i <= n - minutes; i++) {
            let cur = 0;
            for (let j = i; j < i + minutes; j++) {
                if (grumpy[j] === 1) {
                    cur += customers[j];
                }
            }
            res = Math.max(res, satisfied + cur);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int res = 0, n = customers.Length;
        for (int i = 0; i < n; i++) {
            if (grumpy[i] == 0) {
                res += customers[i];
            }
        }

        int satisfied = res;
        for (int i = 0; i <= n - minutes; i++) {
            int cur = 0;
            for (int j = i; j < i + minutes; j++) {
                if (grumpy[j] == 1) {
                    cur += customers[j];
                }
            }
            res = Math.Max(res, satisfied + cur);
        }

        return res;
    }
}
```

```go
func maxSatisfied(customers []int, grumpy []int, minutes int) int {
    res, n := 0, len(customers)
    for i := 0; i < n; i++ {
        if grumpy[i] == 0 {
            res += customers[i]
        }
    }

    satisfied := res
    for i := 0; i <= n-minutes; i++ {
        cur := 0
        for j := i; j < i+minutes; j++ {
            if grumpy[j] == 1 {
                cur += customers[j]
            }
        }
        if satisfied+cur > res {
            res = satisfied + cur
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun maxSatisfied(customers: IntArray, grumpy: IntArray, minutes: Int): Int {
        var res = 0
        val n = customers.size
        for (i in 0 until n) {
            if (grumpy[i] == 0) {
                res += customers[i]
            }
        }

        val satisfied = res
        for (i in 0..n - minutes) {
            var cur = 0
            for (j in i until i + minutes) {
                if (grumpy[j] == 1) {
                    cur += customers[j]
                }
            }
            res = maxOf(res, satisfied + cur)
        }

        return res
    }
}
```

```swift
class Solution {
    func maxSatisfied(_ customers: [Int], _ grumpy: [Int], _ minutes: Int) -> Int {
        var res = 0
        let n = customers.count
        for i in 0..<n {
            if grumpy[i] == 0 {
                res += customers[i]
            }
        }

        let satisfied = res
        for i in 0...(n - minutes) {
            var cur = 0
            for j in i..<(i + minutes) {
                if grumpy[j] == 1 {
                    cur += customers[j]
                }
            }
            res = max(res, satisfied + cur)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m)$
* Space complexity: $O(1)$

> Where $n$ is the size of the input array and $m$ is the number of minutes.

---

## 2. Sliding Window

### Intuition

Instead of recalculating the saved customers for each window position from scratch, we can use a sliding window to efficiently update the count. As the window moves one position to the right, we add the contribution of the new element entering the window and remove the contribution of the element leaving.

This reduces redundant computation since we only need to track customers at grumpy minutes within the current window.

### Algorithm

1. Initialize two counters: `satisfied` for customers already happy (non-grumpy minutes) and `window` for customers saved within the current window.
2. Use two pointers `l` and `r` to represent the sliding window boundaries.
3. For each position `r`:
   - If grumpy at `r`, add those customers to the `window` count.
   - Otherwise, add them to the baseline `satisfied` count.
   - If the window exceeds `minutes`, shrink from the left by removing contributions at `l` (only if grumpy).
   - Track the maximum `window` value seen.
4. Return `satisfied + maxWindow`.

::tabs-start

```python
class Solution:
    def maxSatisfied(self, customers: List[int], grumpy: List[int], minutes: int) -> int:
        l = 0
        window = max_window = 0
        satisfied = 0

        for r in range(len(customers)):
            if grumpy[r]:
                window += customers[r]
            else:
                satisfied += customers[r]

            if r - l + 1 > minutes:
                if grumpy[l]:
                    window -= customers[l]
                l += 1

            max_window = max(window, max_window)

        return satisfied + max_window
```

```java
public class Solution {
    public int maxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.length; r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

```cpp
class Solution {
public:
    int maxSatisfied(vector<int>& customers, vector<int>& grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.size(); r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} customers
     * @param {number[]} grumpy
     * @param {number} minutes
     * @return {number}
     */
    maxSatisfied(customers, grumpy, minutes) {
        let l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (let r = 0; r < customers.length; r++) {
            if (grumpy[r] === 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] === 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

```csharp
public class Solution {
    public int MaxSatisfied(int[] customers, int[] grumpy, int minutes) {
        int l = 0, window = 0, maxWindow = 0, satisfied = 0;

        for (int r = 0; r < customers.Length; r++) {
            if (grumpy[r] == 1) {
                window += customers[r];
            } else {
                satisfied += customers[r];
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l];
                }
                l++;
            }

            maxWindow = Math.Max(window, maxWindow);
        }

        return satisfied + maxWindow;
    }
}
```

```go
func maxSatisfied(customers []int, grumpy []int, minutes int) int {
    l, window, maxWindow, satisfied := 0, 0, 0, 0

    for r := 0; r < len(customers); r++ {
        if grumpy[r] == 1 {
            window += customers[r]
        } else {
            satisfied += customers[r]
        }

        if r-l+1 > minutes {
            if grumpy[l] == 1 {
                window -= customers[l]
            }
            l++
        }

        if window > maxWindow {
            maxWindow = window
        }
    }

    return satisfied + maxWindow
}
```

```kotlin
class Solution {
    fun maxSatisfied(customers: IntArray, grumpy: IntArray, minutes: Int): Int {
        var l = 0
        var window = 0
        var maxWindow = 0
        var satisfied = 0

        for (r in customers.indices) {
            if (grumpy[r] == 1) {
                window += customers[r]
            } else {
                satisfied += customers[r]
            }

            if (r - l + 1 > minutes) {
                if (grumpy[l] == 1) {
                    window -= customers[l]
                }
                l++
            }

            maxWindow = maxOf(window, maxWindow)
        }

        return satisfied + maxWindow
    }
}
```

```swift
class Solution {
    func maxSatisfied(_ customers: [Int], _ grumpy: [Int], _ minutes: Int) -> Int {
        var l = 0
        var window = 0
        var maxWindow = 0
        var satisfied = 0

        for r in 0..<customers.count {
            if grumpy[r] == 1 {
                window += customers[r]
            } else {
                satisfied += customers[r]
            }

            if r - l + 1 > minutes {
                if grumpy[l] == 1 {
                    window -= customers[l]
                }
                l += 1
            }

            maxWindow = max(window, maxWindow)
        }

        return satisfied + maxWindow
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$
* Space complexity: $O(1)$

---

## Common Pitfalls

### Counting Already-Satisfied Customers in the Window

A common mistake is including customers who are already satisfied (when `grumpy[i] = 0`) in the window's "saved" count. The technique only helps during grumpy minutes, so only customers at indices where `grumpy[i] = 1` should be added to the window sum. Counting non-grumpy customers in the window leads to double-counting since they are already part of the baseline satisfaction.

### Off-by-One Errors in Window Boundaries

When implementing the sliding window, it is easy to miscalculate when to shrink the window. The window should have exactly `minutes` elements, so the condition should check if `r - l + 1 > minutes` before removing the left element. Using `>=` instead of `>` or forgetting to increment the left pointer after removal causes incorrect window sizes.

### Forgetting to Track the Maximum Window Value

Some solutions correctly compute the window sum but forget to track the maximum value seen across all window positions. The final answer requires the best possible window, not just the last one computed. Always update `maxWindow` after each window adjustment to capture the optimal placement of the technique.