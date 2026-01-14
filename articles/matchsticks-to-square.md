## 1. Backtracking (Brute Force)

### Intuition

To form a square, we need to partition matchsticks into `4` groups with equal sums. Each matchstick must be assigned to exactly one side. We try placing each matchstick on each of the `4` sides recursively. If we successfully place all matchsticks and all `4` sides have equal length, we found a valid square.

### Algorithm

1. Calculate the total length. If not divisible by `4`, return `false` immediately.
2. Create an array `sides` of size `4` to track the current length of each side.
3. Use backtracking: for each matchstick, try adding it to each of the `4` sides.
4. After placing a matchstick, recurse to place the next one.
5. If we place all matchsticks and all sides are equal, return `true`.
6. Backtrack by removing the matchstick from the current side before trying the next side.

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        if sum(matchsticks) % 4 != 0:
            return False

        sides = [0] * 4

        def dfs(i):
            if i == len(matchsticks):
                return sides[0] == sides[1] == sides[2] == sides[3]

            for side in range(4):
                sides[side] += matchsticks[i]
                if dfs(i + 1):
                    return True
                sides[side] -= matchsticks[i]

            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean makesquare(int[] matchsticks) {
        int sum = Arrays.stream(matchsticks).sum();
        if (sum % 4 != 0) return false;

        int[] sides = new int[4];
        return dfs(matchsticks, sides, 0);
    }

    private boolean dfs(int[] matchsticks, int[] sides, int i) {
        if (i == matchsticks.length) {
            return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
        }

        for (int j = 0; j < 4; j++) {
            sides[j] += matchsticks[i];
            if (dfs(matchsticks, sides, i + 1)) return true;
            sides[j] -= matchsticks[i];
        }

        return false;
    }
}
```

```cpp
class Solution {
public:
    bool makesquare(vector<int>& matchsticks) {
        int sum = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (sum % 4 != 0) return false;

        vector<int> sides(4, 0);
        return dfs(matchsticks, sides, 0);
    }

private:
    bool dfs(vector<int>& matchsticks, vector<int>& sides, int i) {
        if (i == matchsticks.size()) {
            return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
        }

        for (int j = 0; j < 4; j++) {
            sides[j] += matchsticks[i];
            if (dfs(matchsticks, sides, i + 1)) return true;
            sides[j] -= matchsticks[i];
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const sum = matchsticks.reduce((a, b) => a + b, 0);
        if (sum % 4 !== 0) return false;

        const sides = Array(4).fill(0);
        const dfs = (i) => {
            if (i === matchsticks.length) {
                return (
                    sides[0] === sides[1] &&
                    sides[1] === sides[2] &&
                    sides[2] === sides[3]
                );
            }

            for (let j = 0; j < 4; j++) {
                sides[j] += matchsticks[i];
                if (dfs(i + 1)) return true;
                sides[j] -= matchsticks[i];
            }

            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int total = 0;
        foreach (int stick in matchsticks) {
            total += stick;
        }
        if (total % 4 != 0) return false;

        int target = total / 4;
        int[] sides = new int[4];

        bool Dfs(int i) {
            if (i == matchsticks.Length) {
                return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3];
            }

            for (int side = 0; side < 4; side++) {
                sides[side] += matchsticks[i];
                if (sides[side] <= target && Dfs(i + 1)) {
                    return true;
                }
                sides[side] -= matchsticks[i];
            }

            return false;
        }

        return Dfs(0);
    }
}
```

```go
func makesquare(matchsticks []int) bool {
    sum := 0
    for _, m := range matchsticks {
        sum += m
    }
    if sum%4 != 0 {
        return false
    }

    sides := make([]int, 4)

    var dfs func(i int) bool
    dfs = func(i int) bool {
        if i == len(matchsticks) {
            return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3]
        }

        for j := 0; j < 4; j++ {
            sides[j] += matchsticks[i]
            if dfs(i + 1) {
                return true
            }
            sides[j] -= matchsticks[i]
        }

        return false
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun makesquare(matchsticks: IntArray): Boolean {
        val sum = matchsticks.sum()
        if (sum % 4 != 0) return false

        val sides = IntArray(4)

        fun dfs(i: Int): Boolean {
            if (i == matchsticks.size) {
                return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3]
            }

            for (j in 0 until 4) {
                sides[j] += matchsticks[i]
                if (dfs(i + 1)) return true
                sides[j] -= matchsticks[i]
            }

            return false
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func makesquare(_ matchsticks: [Int]) -> Bool {
        let sum = matchsticks.reduce(0, +)
        if sum % 4 != 0 {
            return false
        }

        var sides = [Int](repeating: 0, count: 4)

        func dfs(_ i: Int) -> Bool {
            if i == matchsticks.count {
                return sides[0] == sides[1] && sides[1] == sides[2] && sides[2] == sides[3]
            }

            for j in 0..<4 {
                sides[j] += matchsticks[i]
                if dfs(i + 1) {
                    return true
                }
                sides[j] -= matchsticks[i]
            }

            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Backtracking (Pruning)

### Intuition

The brute force approach explores many redundant paths. We can prune significantly with two optimizations. First, sort matchsticks in descending order so larger sticks are placed first, failing faster when a configuration is impossible. Second, skip trying to place a matchstick on an empty side if we already tried another empty side, since empty sides are interchangeable.

### Algorithm

1. Calculate the total length and target side length. Return `false` if total is not divisible by `4`.
2. Sort matchsticks in descending order for early pruning.
3. In the recursive function, try placing the current matchstick on each side:
   - Skip if adding the matchstick would exceed the target length.
   - If placement succeeds recursively, return `true`.
   - Backtrack by removing the matchstick.
   - If the current side is empty after backtracking, stop trying other sides (they are equivalent).
4. Return `true` if all matchsticks are placed successfully.

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total_length = sum(matchsticks)
        if total_length % 4 != 0:
            return False

        length = total_length // 4
        sides = [0] * 4
        matchsticks.sort(reverse=True)

        def dfs(i):
            if i == len(matchsticks):
                return True

            for side in range(4):
                if sides[side] + matchsticks[i] <= length:
                    sides[side] += matchsticks[i]
                    if dfs(i + 1):
                        return True
                    sides[side] -= matchsticks[i]

                if sides[side] == 0:
                    break

            return False

        return dfs(0)
```

```java
public class Solution {
    public boolean makesquare(int[] matchsticks) {
        int totalLength = Arrays.stream(matchsticks).sum();
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        int[] sides = new int[4];
        Arrays.sort(matchsticks);
        reverse(matchsticks);

        return dfs(matchsticks, sides, 0, length);
    }

    private boolean dfs(int[] matchsticks, int[] sides, int index, int length) {
        if (index == matchsticks.length) {
            return true;
        }

        for (int i = 0; i < 4; i++) {
            if (sides[i] + matchsticks[index] <= length) {
                sides[i] += matchsticks[index];
                if (dfs(matchsticks, sides, index + 1, length)) return true;
                sides[i] -= matchsticks[index];
            }

            if (sides[i] == 0) break;
        }

        return false;
    }

    private void reverse(int[] matchsticks) {
        for (int i = 0, j = matchsticks.length - 1; i < j; i++, j--) {
            int temp = matchsticks[i];
            matchsticks[i] = matchsticks[j];
            matchsticks[j] = temp;
        }
    }
}
```

```cpp
class Solution {
public:
    bool makesquare(vector<int>& matchsticks) {
        int totalLength = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        vector<int> sides(4, 0);
        sort(matchsticks.rbegin(), matchsticks.rend());

        return dfs(matchsticks, sides, 0, length);
    }

private:
    bool dfs(vector<int>& matchsticks, vector<int>& sides, int index, int length) {
        if (index == matchsticks.size()) {
            return true;
        }

        for (int i = 0; i < 4; i++) {
            if (sides[i] + matchsticks[index] <= length) {
                sides[i] += matchsticks[index];
                if (dfs(matchsticks, sides, index + 1, length)) return true;
                sides[i] -= matchsticks[index];
            }

            if (sides[i] == 0) break;
        }

        return false;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const totalLength = matchsticks.reduce((a, b) => a + b, 0);
        if (totalLength % 4 !== 0) return false;

        const length = totalLength / 4;
        const sides = Array(4).fill(0);
        matchsticks.sort((a, b) => b - a);

        const dfs = (index) => {
            if (index === matchsticks.length) {
                return true;
            }

            for (let i = 0; i < 4; i++) {
                if (sides[i] + matchsticks[index] <= length) {
                    sides[i] += matchsticks[index];
                    if (dfs(index + 1)) return true;
                    sides[i] -= matchsticks[index];
                }

                if (sides[i] === 0) break;
            }

            return false;
        };

        return dfs(0);
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int totalLength = 0;
        foreach (int stick in matchsticks) {
            totalLength += stick;
        }

        if (totalLength % 4 != 0) {
            return false;
        }

        int length = totalLength / 4;
        int[] sides = new int[4];
        Array.Sort(matchsticks, (a, b) => b.CompareTo(a)); // Sort in descending order

        bool Dfs(int i) {
            if (i == matchsticks.Length) {
                return true;
            }

            for (int side = 0; side < 4; side++) {
                if (sides[side] + matchsticks[i] <= length) {
                    sides[side] += matchsticks[i];
                    if (Dfs(i + 1)) return true;
                    sides[side] -= matchsticks[i];
                }

                if (sides[side] == 0) break;
            }

            return false;
        }

        return Dfs(0);
    }
}
```

```go
func makesquare(matchsticks []int) bool {
    totalLength := 0
    for _, m := range matchsticks {
        totalLength += m
    }
    if totalLength%4 != 0 {
        return false
    }

    length := totalLength / 4
    sides := make([]int, 4)
    sort.Sort(sort.Reverse(sort.IntSlice(matchsticks)))

    var dfs func(index int) bool
    dfs = func(index int) bool {
        if index == len(matchsticks) {
            return true
        }

        for i := 0; i < 4; i++ {
            if sides[i]+matchsticks[index] <= length {
                sides[i] += matchsticks[index]
                if dfs(index + 1) {
                    return true
                }
                sides[i] -= matchsticks[index]
            }

            if sides[i] == 0 {
                break
            }
        }

        return false
    }

    return dfs(0)
}
```

```kotlin
class Solution {
    fun makesquare(matchsticks: IntArray): Boolean {
        val totalLength = matchsticks.sum()
        if (totalLength % 4 != 0) return false

        val length = totalLength / 4
        val sides = IntArray(4)
        matchsticks.sortDescending()

        fun dfs(index: Int): Boolean {
            if (index == matchsticks.size) {
                return true
            }

            for (i in 0 until 4) {
                if (sides[i] + matchsticks[index] <= length) {
                    sides[i] += matchsticks[index]
                    if (dfs(index + 1)) return true
                    sides[i] -= matchsticks[index]
                }

                if (sides[i] == 0) break
            }

            return false
        }

        return dfs(0)
    }
}
```

```swift
class Solution {
    func makesquare(_ matchsticks: [Int]) -> Bool {
        let totalLength = matchsticks.reduce(0, +)
        if totalLength % 4 != 0 {
            return false
        }

        let length = totalLength / 4
        var sides = [Int](repeating: 0, count: 4)
        let sortedMatchsticks = matchsticks.sorted(by: >)

        func dfs(_ index: Int) -> Bool {
            if index == sortedMatchsticks.count {
                return true
            }

            for i in 0..<4 {
                if sides[i] + sortedMatchsticks[index] <= length {
                    sides[i] += sortedMatchsticks[index]
                    if dfs(index + 1) {
                        return true
                    }
                    sides[i] -= sortedMatchsticks[index]
                }

                if sides[i] == 0 {
                    break
                }
            }

            return false
        }

        return dfs(0)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(4 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 3. Dynamic Programming (Bit Mask)

### Intuition

We can represent which matchsticks have been used with a bitmask. For each subset of matchsticks, we track the current "partial side" length (sum modulo target side length). If we can use all matchsticks such that each completed side reaches exactly the target length, we have a valid square. Memoization avoids recomputing results for the same subset.

### Algorithm

1. Validate that the total length is divisible by `4` and no single matchstick exceeds the target side length.
2. Sort matchsticks in descending order for better pruning.
3. Use a DP array where `dp[mask]` stores the partial sum of the current incomplete side for that subset of used matchsticks.
4. Starting from the full bitmask, recursively try removing each matchstick:
   - If the resulting partial sum plus the matchstick does not exceed the target, update `dp[mask]`.
   - Use modulo to reset when a side is completed.
5. Return `true` if `dp[fullMask] == 0`, meaning all sides completed perfectly.

::tabs-start

```python
class Solution:
    def makesquare(self, matchsticks: List[int]) -> bool:
        total_length = sum(matchsticks)
        if total_length % 4 != 0:
            return False

        length = total_length // 4
        if max(matchsticks) > length:
            return False

        n = len(matchsticks)
        dp = [float("-inf")] * (1 << n)
        matchsticks.sort(reverse=True)

        def dfs(mask):
            if mask == 0:
                return 0
            if dp[mask] != float("-inf"):
                return dp[mask]

            for i in range(n):
                if mask & (1 << i):
                    res = dfs(mask ^ (1 << i))
                    if res >= 0 and res + matchsticks[i] <= length:
                        dp[mask] = (res + matchsticks[i]) % length
                        return dp[mask]
                    if mask == (1 << n) - 1:
                        dp[mask] = -1
                        return -1

            dp[mask] = -1
            return -1

        return not dfs((1 << n) - 1)
```

```java
public class Solution {
    private int[] dp;
    private int length;
    private int n;

    public boolean makesquare(int[] matchsticks) {
        int totalLength = Arrays.stream(matchsticks).sum();
        if (totalLength % 4 != 0) return false;

        length = totalLength / 4;
        if (Arrays.stream(matchsticks).max().getAsInt() > length) {
            return false;
        }

        Arrays.sort(matchsticks);
        reverse(matchsticks);
        this.n = matchsticks.length;
        this.dp = new int[1 << n];
        Arrays.fill(dp, Integer.MIN_VALUE);

        return dfs((1 << n) - 1, matchsticks) == 0;
    }

    private int dfs(int mask, int[] matchsticks) {
        if (mask == 0) return 0;
        if (dp[mask] != Integer.MIN_VALUE) return dp[mask];

        for (int i = 0; i < n; i++) {
            if ((mask & (1 << i)) != 0) {
                int res = dfs(mask ^ (1 << i), matchsticks);
                if (res >= 0 && res + matchsticks[i] <= length) {
                    dp[mask] = (res + matchsticks[i]) % length;
                    return dp[mask];
                }

                if (mask == (1 << n) - 1) {
                    dp[mask] = -1;
                    return -1;
                }
            }
        }

        dp[mask] = -1;
        return dp[mask];
    }

    private void reverse(int[] matchsticks) {
        for (int i = 0, j = matchsticks.length - 1; i < j; i++, j--) {
            int temp = matchsticks[i];
            matchsticks[i] = matchsticks[j];
            matchsticks[j] = temp;
        }
    }
}
```

```cpp
class Solution {
    vector<int> dp;
    int length, n;

public:
    bool makesquare(vector<int>& matchsticks) {
        int totalLength = accumulate(matchsticks.begin(), matchsticks.end(), 0);
        if (totalLength % 4 != 0) return false;

        length = totalLength / 4;
        if (*max_element(matchsticks.begin(), matchsticks.end()) > length) {
            return false;
        }

        sort(matchsticks.rbegin(), matchsticks.rend());
        n = matchsticks.size();
        dp.resize(1 << n, INT_MIN);

        return dfs((1 << n) - 1, matchsticks) == 0;
    }

private:
    int dfs(int mask, vector<int>& matchsticks) {
        if (mask == 0) return 0;
        if (dp[mask] != INT_MIN) return dp[mask];

        for (int i = 0; i < n; i++) {
            if (mask & (1 << i)) {
                int res = dfs(mask ^ (1 << i), matchsticks);
                if (res >= 0 && res + matchsticks[i] <= length) {
                    dp[mask] = (res + matchsticks[i]) % length;
                    return dp[mask];
                }

                if (mask == (1 << n) - 1) {
                    dp[mask] = -1;
                    return -1;
                }
            }
        }

        dp[mask] = -1;
        return dp[mask];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} matchsticks
     * @return {boolean}
     */
    makesquare(matchsticks) {
        const totalLength = matchsticks.reduce((a, b) => a + b, 0);
        if (totalLength % 4 !== 0) return false;

        const length = totalLength / 4;
        if (Math.max(...matchsticks) > length) return false;

        matchsticks.sort((a, b) => b - a);
        const n = matchsticks.length;
        const dp = new Array(1 << n).fill(-Infinity);

        const dfs = (mask) => {
            if (mask === 0) return 0;
            if (dp[mask] !== -Infinity) return dp[mask];

            for (let i = 0; i < n; i++) {
                if (mask & (1 << i)) {
                    const res = dfs(mask ^ (1 << i));
                    if (res >= 0 && res + matchsticks[i] <= length) {
                        dp[mask] = (res + matchsticks[i]) % length;
                        return dp[mask];
                    }

                    if (mask === (1 << n) - 1) {
                        dp[mask] = -1;
                        return -1;
                    }
                }
            }

            dp[mask] = -1;
            return dp[mask];
        };

        return dfs((1 << n) - 1) === 0;
    }
}
```

```csharp
public class Solution {
    public bool Makesquare(int[] matchsticks) {
        int totalLength = matchsticks.Sum();
        if (totalLength % 4 != 0) return false;

        int length = totalLength / 4;
        if (matchsticks.Max() > length) return false;

        int n = matchsticks.Length;
        int[] dp = Enumerable.Repeat(int.MinValue, 1 << n).ToArray();
        Array.Sort(matchsticks, (a, b) => b.CompareTo(a)); // Sort descending

        int Dfs(int mask) {
            if (mask == 0) return 0;
            if (dp[mask] != int.MinValue) return dp[mask];

            for (int i = 0; i < n; i++) {
                if ((mask & (1 << i)) != 0) {
                    int res = Dfs(mask ^ (1 << i));
                    if (res >= 0 && res + matchsticks[i] <= length) {
                        dp[mask] = (res + matchsticks[i]) % length;
                        return dp[mask];
                    }
                    if (mask == (1 << n) - 1) {
                        dp[mask] = -1;
                        return -1;
                    }
                }
            }

            dp[mask] = -1;
            return -1;
        }

        return Dfs((1 << n) - 1) != -1;
    }
}
```

```go
func makesquare(matchsticks []int) bool {
    totalLength := 0
    maxVal := 0
    for _, m := range matchsticks {
        totalLength += m
        if m > maxVal {
            maxVal = m
        }
    }
    if totalLength%4 != 0 {
        return false
    }

    length := totalLength / 4
    if maxVal > length {
        return false
    }

    n := len(matchsticks)
    dp := make([]int, 1<<n)
    for i := range dp {
        dp[i] = math.MinInt32
    }
    sort.Sort(sort.Reverse(sort.IntSlice(matchsticks)))

    var dfs func(mask int) int
    dfs = func(mask int) int {
        if mask == 0 {
            return 0
        }
        if dp[mask] != math.MinInt32 {
            return dp[mask]
        }

        for i := 0; i < n; i++ {
            if mask&(1<<i) != 0 {
                res := dfs(mask ^ (1 << i))
                if res >= 0 && res+matchsticks[i] <= length {
                    dp[mask] = (res + matchsticks[i]) % length
                    return dp[mask]
                }
                if mask == (1<<n)-1 {
                    dp[mask] = -1
                    return -1
                }
            }
        }

        dp[mask] = -1
        return dp[mask]
    }

    return dfs((1<<n)-1) == 0
}
```

```kotlin
class Solution {
    fun makesquare(matchsticks: IntArray): Boolean {
        val totalLength = matchsticks.sum()
        if (totalLength % 4 != 0) return false

        val length = totalLength / 4
        if (matchsticks.max() > length) return false

        val n = matchsticks.size
        val dp = IntArray(1 shl n) { Int.MIN_VALUE }
        matchsticks.sortDescending()

        fun dfs(mask: Int): Int {
            if (mask == 0) return 0
            if (dp[mask] != Int.MIN_VALUE) return dp[mask]

            for (i in 0 until n) {
                if (mask and (1 shl i) != 0) {
                    val res = dfs(mask xor (1 shl i))
                    if (res >= 0 && res + matchsticks[i] <= length) {
                        dp[mask] = (res + matchsticks[i]) % length
                        return dp[mask]
                    }
                    if (mask == (1 shl n) - 1) {
                        dp[mask] = -1
                        return -1
                    }
                }
            }

            dp[mask] = -1
            return dp[mask]
        }

        return dfs((1 shl n) - 1) == 0
    }
}
```

```swift
class Solution {
    func makesquare(_ matchsticks: [Int]) -> Bool {
        let totalLength = matchsticks.reduce(0, +)
        if totalLength % 4 != 0 {
            return false
        }

        let length = totalLength / 4
        if matchsticks.max()! > length {
            return false
        }

        let sortedMatchsticks = matchsticks.sorted(by: >)
        let n = sortedMatchsticks.count
        var dp = [Int](repeating: Int.min, count: 1 << n)

        func dfs(_ mask: Int) -> Int {
            if mask == 0 {
                return 0
            }
            if dp[mask] != Int.min {
                return dp[mask]
            }

            for i in 0..<n {
                if mask & (1 << i) != 0 {
                    let res = dfs(mask ^ (1 << i))
                    if res >= 0 && res + sortedMatchsticks[i] <= length {
                        dp[mask] = (res + sortedMatchsticks[i]) % length
                        return dp[mask]
                    }
                    if mask == (1 << n) - 1 {
                        dp[mask] = -1
                        return -1
                    }
                }
            }

            dp[mask] = -1
            return dp[mask]
        }

        return dfs((1 << n) - 1) == 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * 2 ^ n)$
- Space complexity: $O(n + 2 ^ n)$

---

## Common Pitfalls

### Not Checking If Total Length Is Divisible by 4

Before attempting any backtracking, verify that the total sum of matchsticks is divisible by 4. Without this early check, the algorithm wastes time exploring configurations that can never form a valid square.

### Missing the Single Matchstick Length Check

If any single matchstick is longer than the target side length (`total / 4`), it is impossible to form a square. Failing to check this upfront leads to unnecessary recursion and potential timeout.

### Not Sorting Matchsticks in Descending Order

Sorting matchsticks in descending order significantly improves pruning efficiency. Placing larger matchsticks first causes invalid configurations to fail faster, reducing the search space dramatically. Without sorting, the algorithm may explore many more branches.

### Redundant Exploration of Empty Sides

When backtracking, if placing a matchstick on an empty side fails, there is no need to try other empty sides since they are equivalent. Breaking out of the loop when `sides[i] == 0` after backtracking prevents exploring symmetric, redundant configurations.

### Integer Overflow in Bitmask DP

When using bitmask DP, ensure the DP array size `(1 << n)` does not cause integer overflow. For `n` up to 15, this creates arrays of size 32768, which is manageable, but larger values can cause memory issues.
