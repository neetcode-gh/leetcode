## 1. Recursion

### Intuition

At each question, we have two choices: solve it and skip the next few questions based on its brainpower requirement, or skip it entirely and move to the next question. This creates a decision tree where we want to maximize points. We recursively explore both choices at each position and return the maximum.

### Algorithm

1. Define a recursive function starting at index `0`.
2. Base case: if the index exceeds the array length, return `0`.
3. At each index, compute two options:
   - Skip: recursively call for `index + 1`.
   - Solve: add the current question's points and recursively call for `index + 1 + brainpower`.
4. Return the maximum of the two options.
5. The answer is the result of calling the function from index `0`.

::tabs-start

```python
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        def dfs(i):
            if i >= len(questions):
                return 0
            return max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
        return dfs(0)
```

```java
public class Solution {
    public long mostPoints(int[][] questions) {
        return dfs(0, questions);
    }

    private long dfs(int i, int[][] questions) {
        if (i >= questions.length) return 0;
        return Math.max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
    }
}
```

```cpp
class Solution {
public:
    long long mostPoints(vector<vector<int>>& questions) {
        return dfs(0, questions);
    }

private:
    long long dfs(int i, vector<vector<int>>& questions) {
        if (i >= questions.size()) return 0;
        return max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const dfs = (i) => {
            if (i >= questions.length) return 0;
            return Math.max(
                dfs(i + 1),
                questions[i][0] + dfs(i + 1 + questions[i][1]),
            );
        };
        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public long MostPoints(int[][] questions) {
        return Dfs(0, questions);
    }

    private long Dfs(int i, int[][] questions) {
        if (i >= questions.Length) return 0;
        return Math.Max(Dfs(i + 1, questions), questions[i][0] + Dfs(i + 1 + questions[i][1], questions));
    }
}
```

```go
func mostPoints(questions [][]int) int64 {
    var dfs func(i int) int64
    dfs = func(i int) int64 {
        if i >= len(questions) {
            return 0
        }
        skip := dfs(i + 1)
        take := int64(questions[i][0]) + dfs(i + 1 + questions[i][1])
        if skip > take {
            return skip
        }
        return take
    }
    return dfs(0)
}
```

```kotlin
class Solution {
    fun mostPoints(questions: Array<IntArray>): Long {
        fun dfs(i: Int): Long {
            if (i >= questions.size) return 0
            return maxOf(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
        }
        return dfs(0)
    }
}
```

```swift
class Solution {
    func mostPoints(_ questions: [[Int]]) -> Int {
        func dfs(_ i: Int) -> Int {
            if i >= questions.count { return 0 }
            return max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
        }
        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$

---

## 2. Dynamic Programming (Top-Down)

### Intuition

The plain recursion has overlapping subproblems since we may compute the maximum points from the same index multiple times. By storing results in a memoization table, we avoid redundant calculations. Each index is computed at most once, giving us linear time complexity.

### Algorithm

1. Create a memoization dictionary or array to cache results.
2. Define a recursive function that first checks if the result for the current index is already cached.
3. If cached, return the stored value.
4. Otherwise, compute the maximum of skipping versus solving the current question.
5. Store the result in the cache before returning.
6. Return the value computed from index `0`.

::tabs-start

```python
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        dp = {}
        def dfs(i):
            if i >= len(questions):
                return 0
            if i in dp:
                return dp[i]
            dp[i] = max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
            return dp[i]
        return dfs(0)
```

```java
public class Solution {
    private long[] dp;

    public long mostPoints(int[][] questions) {
        dp = new long[questions.length];
        return dfs(0, questions);
    }

    private long dfs(int i, int[][] questions) {
        if (i >= questions.length) return 0;
        if (dp[i] != 0) return dp[i];
        dp[i] = Math.max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
        return dp[i];
    }
}

```

```cpp
class Solution {
    vector<long long> dp;

public:
    long long mostPoints(vector<vector<int>>& questions) {
        dp.assign(questions.size(), 0);
        return dfs(0, questions);
    }

private:
    long long dfs(int i, vector<vector<int>>& questions) {
        if (i >= questions.size()) return 0;
        if (dp[i] != 0) return dp[i];
        dp[i] = max(dfs(i + 1, questions), questions[i][0] + dfs(i + 1 + questions[i][1], questions));
        return dp[i];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const dp = new Array(questions.length).fill(-1);

        const dfs = (i) => {
            if (i >= questions.length) return 0;
            if (dp[i] !== -1) return dp[i];
            dp[i] = Math.max(
                dfs(i + 1),
                questions[i][0] + dfs(i + 1 + questions[i][1]),
            );
            return dp[i];
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    private long[] dp;

    public long MostPoints(int[][] questions) {
        dp = new long[questions.Length];
        return Dfs(0, questions);
    }

    private long Dfs(int i, int[][] questions) {
        if (i >= questions.Length) return 0;
        if (dp[i] != 0) return dp[i];
        dp[i] = Math.Max(Dfs(i + 1, questions), questions[i][0] + Dfs(i + 1 + questions[i][1], questions));
        return dp[i];
    }
}
```

```go
func mostPoints(questions [][]int) int64 {
    n := len(questions)
    dp := make([]int64, n)

    var dfs func(i int) int64
    dfs = func(i int) int64 {
        if i >= n {
            return 0
        }
        if dp[i] != 0 {
            return dp[i]
        }
        skip := dfs(i + 1)
        take := int64(questions[i][0]) + dfs(i + 1 + questions[i][1])
        if skip > take {
            dp[i] = skip
        } else {
            dp[i] = take
        }
        return dp[i]
    }
    return dfs(0)
}
```

```kotlin
class Solution {
    fun mostPoints(questions: Array<IntArray>): Long {
        val dp = LongArray(questions.size)

        fun dfs(i: Int): Long {
            if (i >= questions.size) return 0
            if (dp[i] != 0L) return dp[i]
            dp[i] = maxOf(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
            return dp[i]
        }
        return dfs(0)
    }
}
```

```swift
class Solution {
    func mostPoints(_ questions: [[Int]]) -> Int {
        var dp = [Int](repeating: -1, count: questions.count)

        func dfs(_ i: Int) -> Int {
            if i >= questions.count { return 0 }
            if dp[i] != -1 { return dp[i] }
            dp[i] = max(dfs(i + 1), questions[i][0] + dfs(i + 1 + questions[i][1]))
            return dp[i]
        }
        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Dynamic Programming (Bottom-Up)

### Intuition

Instead of recursion, we can fill a DP table iteratively from right to left. For each question, we compute the maximum points achievable starting from that position. Working backwards ensures that when we process question i, we already know the best outcomes for all questions after it.

### Algorithm

1. Create a `dp` array of size `n + 1`, initialized to `0`.
2. Iterate from the last question to the first (right to left).
3. For each question at index `i`:
   - Calculate the points if we solve it: `points[i] + dp[i + 1 + brainpower[i]]` (or `0` if out of bounds).
   - Calculate the points if we skip it: `dp[i + 1]`.
   - Set `dp[i]` to the maximum of these two values.
4. Return `dp[0]`, which contains the maximum points starting from the first question.

::tabs-start

```python
class Solution:
    def mostPoints(self, questions: List[List[int]]) -> int:
        dp = {}

        for i in range(len(questions) - 1, -1, -1):
            dp[i] = max(
                questions[i][0] + dp.get(i + 1 + questions[i][1], 0),
                dp.get(i + 1, 0)
            )
        return dp.get(0)
```

```java
public class Solution {
    public long mostPoints(int[][] questions) {
        int n = questions.length;
        long[] dp = new long[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = Math.max(
                questions[i][0] + (i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0),
                dp[i + 1]
            );
        }
        return dp[0];
    }
}
```

```cpp
class Solution {
public:
    long long mostPoints(vector<vector<int>>& questions) {
        int n = questions.size();
        vector<long long> dp(n + 1, 0);

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = max(
                (long long)questions[i][0] + (i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0),
                dp[i + 1]
            );
        }
        return dp[0];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} questions
     * @return {number}
     */
    mostPoints(questions) {
        const n = questions.length;
        const dp = new Array(n + 1).fill(0);

        for (let i = n - 1; i >= 0; i--) {
            dp[i] = Math.max(
                questions[i][0] +
                    (i + 1 + questions[i][1] < n
                        ? dp[i + 1 + questions[i][1]]
                        : 0),
                dp[i + 1],
            );
        }
        return dp[0];
    }
}
```

```csharp
public class Solution {
    public long MostPoints(int[][] questions) {
        int n = questions.Length;
        long[] dp = new long[n + 1];

        for (int i = n - 1; i >= 0; i--) {
            dp[i] = Math.Max(
                questions[i][0] + (i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0),
                dp[i + 1]
            );
        }
        return dp[0];
    }
}
```

```go
func mostPoints(questions [][]int) int64 {
    n := len(questions)
    dp := make([]int64, n+1)

    for i := n - 1; i >= 0; i-- {
        next := int64(0)
        if i + 1 + questions[i][1] < n {
            next = dp[i + 1 + questions[i][1]]
        }
        take := int64(questions[i][0]) + next
        skip := dp[i + 1]
        if take > skip {
            dp[i] = take
        } else {
            dp[i] = skip
        }
    }
    return dp[0]
}
```

```kotlin
class Solution {
    fun mostPoints(questions: Array<IntArray>): Long {
        val n = questions.size
        val dp = LongArray(n + 1)

        for (i in n - 1 downTo 0) {
            dp[i] = maxOf(
                questions[i][0] + if (i + 1 + questions[i][1] < n) dp[i + 1 + questions[i][1]] else 0,
                dp[i + 1]
            )
        }
        return dp[0]
    }
}
```

```swift
class Solution {
    func mostPoints(_ questions: [[Int]]) -> Int {
        let n = questions.count
        var dp = [Int](repeating: 0, count: n + 1)

        for i in stride(from: n - 1, through: 0, by: -1) {
            let next = i + 1 + questions[i][1] < n ? dp[i + 1 + questions[i][1]] : 0
            dp[i] = max(questions[i][0] + next, dp[i + 1])
        }
        return dp[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
