## 1. Top-Down Dynamic Programming (Recursion + Memoization)

### Intuition

The constraint is that no more than two consecutive posts can have the same color. For each post, we can either paint it a different color from the previous post, or paint it the same color (but only if the two previous posts are different).

This leads to a recurrence: `totalWays(i) = (k - 1) * (totalWays(i - 1) + totalWays(i - 2))`. The first term handles painting post `i` differently from post `i - 1` (k - 1 choices). The second term handles painting post `i` the same as post `i - 1`, which requires post `i - 1` to be different from post `i - 2`.

### Algorithm

1. Define `totalWays(i)` to return the number of valid ways to paint posts 1 through i.
2. Base cases: `totalWays(1) = k` and `totalWays(2) = k * k`.
3. For i > 2, use the recurrence: `totalWays(i) = (k - 1) * (totalWays(i - 1) + totalWays(i - 2))`.
4. Use memoization to cache results and avoid redundant computation.
5. Return `totalWays(n)`.

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        def total_ways(i):
            if i == 1:
                return k
            if i == 2:
                return k * k
            
            # Check if we have already calculated totalWays(i)
            if i in memo:
                return memo[i]
            
            # Use the recurrence relation to calculate total_ways(i)
            memo[i] = (k - 1) * (total_ways(i - 1) + total_ways(i - 2))
            return memo[i]

        memo = {}
        return total_ways(n)
```

```java
class Solution {
    private HashMap<Integer, Integer> memo = new HashMap<Integer, Integer>();
    
    private int totalWays(int i, int k) {
        if (i == 1) return k;
        if (i == 2) return k * k;
        
        // Check if we have already calculated totalWays(i)
        if (memo.containsKey(i)) {
            return memo.get(i);
        }
        
        // Use the recurrence relation to calculate totalWays(i)
        memo.put(i, (k - 1) * (totalWays(i - 1, k) + totalWays(i - 2, k)));
        return memo.get(i);
    }
    
    public int numWays(int n, int k) {
        return totalWays(n, k);
    }
}
```

```cpp
class Solution {
private:
    unordered_map<int, int> memo;
    
    int totalWays(int i, int k) {
        if (i == 1) return k;
        
        if (i == 2) return k * k;
        
        // Check if we have already calculated totalWays(i)
        if (memo.find(i) != memo.end()) {
            return memo[i];
        }
        
        // Use the recurrence relation to calculate totalWays(i)
        memo[i] = (k - 1) * (totalWays(i - 1, k) + totalWays(i - 2, k));
        return memo[i];
    }
    
public:
    int numWays(int n, int k) {
        return totalWays(n, k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        const memo = {};

        const total_ways = (i) => {
            if (i === 1) {
                return k;
            }

            if (i === 2) {
                return k * k;
            }

            // Check if we have already calculated total_ways(i)
            if (i in memo) {
                return memo[i];
            }

            // Use the recurrence relation to calculate total_ways(i)
            memo[i] = (k - 1) * (total_ways(i - 1) + total_ways(i - 2));
            return memo[i];
        };

        return total_ways(n);
    }
}
```

```csharp
public class Solution {
    private Dictionary<int, int> memo = new Dictionary<int, int>();

    private int TotalWays(int i, int k) {
        if (i == 1) return k;
        if (i == 2) return k * k;

        if (memo.ContainsKey(i)) {
            return memo[i];
        }

        memo[i] = (k - 1) * (TotalWays(i - 1, k) + TotalWays(i - 2, k));
        return memo[i];
    }

    public int NumWays(int n, int k) {
        return TotalWays(n, k);
    }
}
```

```go
func numWays(n int, k int) int {
    memo := make(map[int]int)

    var totalWays func(i int) int
    totalWays = func(i int) int {
        if i == 1 {
            return k
        }
        if i == 2 {
            return k * k
        }

        if val, ok := memo[i]; ok {
            return val
        }

        memo[i] = (k - 1) * (totalWays(i-1) + totalWays(i-2))
        return memo[i]
    }

    return totalWays(n)
}
```

```kotlin
class Solution {
    fun numWays(n: Int, k: Int): Int {
        val memo = HashMap<Int, Int>()

        fun totalWays(i: Int): Int {
            if (i == 1) return k
            if (i == 2) return k * k

            if (i in memo) return memo[i]!!

            memo[i] = (k - 1) * (totalWays(i - 1) + totalWays(i - 2))
            return memo[i]!!
        }

        return totalWays(n)
    }
}
```

```swift
class Solution {
    func numWays(_ n: Int, _ k: Int) -> Int {
        var memo = [Int: Int]()

        func totalWays(_ i: Int) -> Int {
            if i == 1 { return k }
            if i == 2 { return k * k }

            if let val = memo[i] { return val }

            memo[i] = (k - 1) * (totalWays(i - 1) + totalWays(i - 2))
            return memo[i]!
        }

        return totalWays(n)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of fence posts.

---

## 2. Bottom-Up Dynamic Programming (Tabulation)

### Intuition

The same recurrence can be computed iteratively instead of recursively. We fill an array from the base cases up to n, which avoids recursion overhead and stack depth issues.

This approach is often more efficient in practice since it avoids function call overhead and naturally iterates through states in order.

### Algorithm

1. Handle base cases: if n is 1, return k. If n is 2, return k * k.
2. Create an array `totalWays` of size n + 1.
3. Set `totalWays[1] = k` and `totalWays[2] = k * k`.
4. For i from 3 to n, compute `totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2])`.
5. Return `totalWays[n]`.

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        # Base cases for the problem to avoid index out of bound issues
        if n == 1:
            return k
        if n == 2:
            return k * k

        total_ways = [0] * (n + 1)
        total_ways[1] = k
        total_ways[2] = k * k
        
        for i in range(3, n + 1):
            total_ways[i] = (k - 1) * (total_ways[i - 1] + total_ways[i - 2])
        
        return total_ways[n]
```

```java
class Solution {
    public int numWays(int n, int k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n == 1) return k;
        if (n == 2) return k * k;
        
        int totalWays[] = new int[n + 1];
        totalWays[1] = k;
        totalWays[2] = k * k;
        
        for (int i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }
        
        return totalWays[n];
    }
}
```

```cpp
class Solution {
public:
    int numWays(int n, int k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n == 1) return k;
        if (n == 2) return k * k;
        
        int totalWays[n + 1];
        totalWays[1] = k;
        totalWays[2] = k * k;
        
        for (int i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }
        
        return totalWays[n];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        // Base cases for the problem to avoid index out of bound issues
        if (n === 1) return k;
        if (n === 2) return k * k;

        let totalWays = new Array(n + 1);
        totalWays[1] = k;
        totalWays[2] = k * k;

        for (let i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }

        return totalWays[n];
    }
}
```

```csharp
public class Solution {
    public int NumWays(int n, int k) {
        if (n == 1) return k;
        if (n == 2) return k * k;

        int[] totalWays = new int[n + 1];
        totalWays[1] = k;
        totalWays[2] = k * k;

        for (int i = 3; i <= n; i++) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2]);
        }

        return totalWays[n];
    }
}
```

```go
func numWays(n int, k int) int {
    if n == 1 {
        return k
    }
    if n == 2 {
        return k * k
    }

    totalWays := make([]int, n+1)
    totalWays[1] = k
    totalWays[2] = k * k

    for i := 3; i <= n; i++ {
        totalWays[i] = (k - 1) * (totalWays[i-1] + totalWays[i-2])
    }

    return totalWays[n]
}
```

```kotlin
class Solution {
    fun numWays(n: Int, k: Int): Int {
        if (n == 1) return k
        if (n == 2) return k * k

        val totalWays = IntArray(n + 1)
        totalWays[1] = k
        totalWays[2] = k * k

        for (i in 3..n) {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2])
        }

        return totalWays[n]
    }
}
```

```swift
class Solution {
    func numWays(_ n: Int, _ k: Int) -> Int {
        if n == 1 { return k }
        if n == 2 { return k * k }

        var totalWays = [Int](repeating: 0, count: n + 1)
        totalWays[1] = k
        totalWays[2] = k * k

        for i in 3...n {
            totalWays[i] = (k - 1) * (totalWays[i - 1] + totalWays[i - 2])
        }

        return totalWays[n]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

>  Where $n$ is the number of fence posts.

---

## 3. Bottom-Up, Constant Space

### Intuition

Since the recurrence only depends on the previous two values, we do not need to store the entire array. We can use two variables to track `totalWays(i - 1)` and `totalWays(i - 2)`, updating them as we iterate.

This optimization reduces space complexity from O(n) to O(1).

### Algorithm

1. If n is 1, return k.
2. Initialize `twoPostsBack = k` and `onePostBack = k * k`.
3. For i from 3 to n:
   - Compute `curr = (k - 1) * (onePostBack + twoPostsBack)`.
   - Shift: `twoPostsBack = onePostBack`, `onePostBack = curr`.
4. Return `onePostBack`.

::tabs-start

```python
class Solution:
    def numWays(self, n: int, k: int) -> int:
        if n == 1:
            return k
        
        two_posts_back = k
        one_post_back = k * k
        
        for i in range(3, n + 1):
            curr = (k - 1) * (one_post_back + two_posts_back)
            two_posts_back = one_post_back
            one_post_back = curr

        return one_post_back
```

```java
class Solution {
    public int numWays(int n, int k) {
        if (n == 1) return k;
        
        int twoPostsBack = k;
        int onePostBack = k * k;
        
        for (int i = 3; i <= n; i++) {
            int curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }
        
        return onePostBack;
    }
}
```

```cpp
class Solution {
public:
    int numWays(int n, int k) {
        if (n == 1) return k;

        int twoPostsBack = k;
        int onePostBack = k * k;

        for (int i = 3; i <= n; i++) {
            int curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }

        return onePostBack;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number} k
     * @return {number}
     */
    numWays(n, k) {
        if (n === 1) return k;

        let twoPostsBack = k;
        let onePostBack = k * k;

        for (let i = 3; i <= n; i++) {
            let curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }

        return onePostBack;
    }
}
```

```csharp
public class Solution {
    public int NumWays(int n, int k) {
        if (n == 1) return k;

        int twoPostsBack = k;
        int onePostBack = k * k;

        for (int i = 3; i <= n; i++) {
            int curr = (k - 1) * (onePostBack + twoPostsBack);
            twoPostsBack = onePostBack;
            onePostBack = curr;
        }

        return onePostBack;
    }
}
```

```go
func numWays(n int, k int) int {
    if n == 1 {
        return k
    }

    twoPostsBack := k
    onePostBack := k * k

    for i := 3; i <= n; i++ {
        curr := (k - 1) * (onePostBack + twoPostsBack)
        twoPostsBack = onePostBack
        onePostBack = curr
    }

    return onePostBack
}
```

```kotlin
class Solution {
    fun numWays(n: Int, k: Int): Int {
        if (n == 1) return k

        var twoPostsBack = k
        var onePostBack = k * k

        for (i in 3..n) {
            val curr = (k - 1) * (onePostBack + twoPostsBack)
            twoPostsBack = onePostBack
            onePostBack = curr
        }

        return onePostBack
    }
}
```

```swift
class Solution {
    func numWays(_ n: Int, _ k: Int) -> Int {
        if n == 1 { return k }

        var twoPostsBack = k
        var onePostBack = k * k

        for _ in 3...n {
            let curr = (k - 1) * (onePostBack + twoPostsBack)
            twoPostsBack = onePostBack
            onePostBack = curr
        }

        return onePostBack
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(1)$ constant space

>  Where $n$ is the number of fence posts.
