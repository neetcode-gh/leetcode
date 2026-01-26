## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Dynamic Programming (1D)** - Building up solutions using a DP array where each state depends on previous states
- **Optimization Problems** - Understanding how to maximize a value by choosing between different actions at each step
- **State Transition Analysis** - Reasoning about which previous states can lead to the current state

---

## 1. Dynamic Programming

### Intuition

With `n` key presses, we want to maximize the number of 'A's on screen. At any point, we can either type 'A' or use Ctrl-A, Ctrl-C, then Ctrl-V to copy and paste. The key observation is that after pressing 'A' some number of times, it becomes more efficient to copy what we have and paste it multiple times. For a given number of 'A's, using Ctrl-A + Ctrl-C + `k` pastes multiplies the count by `k + 1` (original + `k` copies). We use dynamic programming where `dp[i]` represents the maximum 'A's achievable with exactly `i` key presses.

### Algorithm

1. Initialize `dp` array where `dp[i] = i` (worst case: just pressing 'A' each time).
2. For each position `i` from 0 to `n - 3` (we need at least 3 keys for Ctrl-A, Ctrl-C, Ctrl-V):
   - Try different numbers of pastes from position `i + 3` to `min(n, i + 6)`.
   - For each `j` in this range, `dp[j] = max(dp[j], (j - i - 1) * dp[i])`.
   - The multiplier `(j - i - 1)` accounts for the original plus `j - i - 2` paste operations (after 2 keys for Ctrl-A and Ctrl-C).
3. Return `dp[n]`.

::tabs-start

```python
class Solution:
    def maxA(self, n: int) -> int:
        dp = list(range(n + 1))

        for i in range(n - 2):
            for j in range(i + 3, min(n, i + 6) + 1):
                dp[j] = max(dp[j], (j - i - 1) * dp[i])

        return dp[n]
```

```java
class Solution {
    public int maxA(int n) {
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = i;
        }

        for (int i = 0; i <= n - 3; i++) {
            for (int j = i + 3; j <= Math.min(n, i + 6); j++) {
                dp[j] = Math.max(dp[j], (j - i - 1) * dp[i]);
            }
        }

        return dp[n];
    }
}
```

```cpp
class Solution {
public:
    int maxA(int n) {
        vector<int> dp(n + 1);
        iota(dp.begin(), dp.end(), 0);
        
        for (int i = 0; i <= n - 3; i++) {
            for (int j = i + 3; j <= min(n, i + 6); j++) {
                dp[j] = max(dp[j], (j - i - 1) * dp[i]);
            }
        }

        return dp[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @return {number}
     */
    maxA(n) {
        const dp = Array.from({ length: n + 1 }, (_, i) => i);

        for (let i = 0; i < n - 2; i++) {
            for (let j = i + 3; j <= Math.min(n, i + 6); j++) {
                dp[j] = Math.max(dp[j], (j - i - 1) * dp[i]);
            }
        }

        return dp[n];
    }
}
```

```csharp
public class Solution {
    public int MaxA(int n) {
        int[] dp = new int[n + 1];
        for (int i = 0; i <= n; i++) {
            dp[i] = i;
        }

        for (int i = 0; i <= n - 3; i++) {
            for (int j = i + 3; j <= Math.Min(n, i + 6); j++) {
                dp[j] = Math.Max(dp[j], (j - i - 1) * dp[i]);
            }
        }

        return dp[n];
    }
}
```

```go
func maxA(n int) int {
    dp := make([]int, n+1)
    for i := 0; i <= n; i++ {
        dp[i] = i
    }

    for i := 0; i <= n-3; i++ {
        for j := i + 3; j <= min(n, i+6); j++ {
            dp[j] = max(dp[j], (j-i-1)*dp[i])
        }
    }

    return dp[n]
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
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
    fun maxA(n: Int): Int {
        val dp = IntArray(n + 1) { it }

        for (i in 0..n - 3) {
            for (j in i + 3..minOf(n, i + 6)) {
                dp[j] = maxOf(dp[j], (j - i - 1) * dp[i])
            }
        }

        return dp[n]
    }
}
```

```swift
class Solution {
    func maxA(_ n: Int) -> Int {
        var dp = Array(0...n)

        for i in 0...(n - 3) {
            for j in (i + 3)...min(n, i + 6) {
                dp[j] = max(dp[j], (j - i - 1) * dp[i])
            }
        }

        return dp[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$

- Space complexity: $O(n)$

>  Where $n$ is the maximum number of key presses allowed.

---

## Common Pitfalls

### Miscounting the Copy-Paste Cost
A complete copy-paste sequence requires 3 keys minimum: Ctrl-A, Ctrl-C, and one Ctrl-V. Each additional paste is just 1 more key. A common mistake is forgetting that the first paste after copying costs 3 total operations, not 2.
```python
# Wrong: assumes copy-paste costs 2 keys
for j in range(i + 2, n + 1):
# Correct: copy-paste needs at least 3 keys (Ctrl-A, Ctrl-C, Ctrl-V)
for j in range(i + 3, n + 1):
```

### Ignoring Small n Base Cases
For small values of `n` (typically n <= 6), just pressing 'A' repeatedly is optimal or nearly optimal. Trying to apply the copy-paste strategy too early wastes keystrokes on the copy operation when simply typing would yield more characters.

### Wrong Multiplier Calculation
When pasting `k` times after copying, the total becomes `(k+1) * original` (original plus k copies). A common error is calculating the multiplier as just `k` instead of `k+1`, or miscounting how many paste operations fit in the remaining keystrokes.