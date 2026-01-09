## 1. Dynamic Programming

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
