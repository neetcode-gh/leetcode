## 1. Brute Force

### Intuition

The grid contains numbers from 1 to n*n, but one number appears twice (repeated) and one is missing. The simplest approach is to check each number individually by scanning the entire grid for every possible value. For each number from 1 to n*n, we count how many times it appears. If a number appears twice, it is the repeated value. If it appears zero times, it is the missing value.

### Algorithm

1. For each number from 1 to n*n:
   - Count its occurrences by scanning every cell in the grid.
   - If the count equals 2, this is the repeated number.
   - If the count equals 0, this is the missing number.
2. Return the repeated and missing numbers as the result.

::tabs-start

```python
class Solution:
    def findMissingAndRepeatedValues(self, grid: List[List[int]]) -> List[int]:
        n = len(grid)
        double = missing = 0

        for num in range(1, n * n + 1):
            cnt = 0
            for i in range(n):
                for j in range(n):
                    if num == grid[i][j]:
                        cnt += 1

            if cnt == 2:
                double = num
            elif cnt == 0:
                missing = num

        return [double, missing]
```

```java
public class Solution {
    public int[] findMissingAndRepeatedValues(int[][] grid) {
        int n = grid.length;
        int doubleVal = 0, missing = 0;

        for (int num = 1; num <= n * n; num++) {
            int cnt = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (grid[i][j] == num) {
                        cnt++;
                    }
                }
            }

            if (cnt == 2) {
                doubleVal = num;
            } else if (cnt == 0) {
                missing = num;
            }
        }

        return new int[]{doubleVal, missing};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMissingAndRepeatedValues(vector<vector<int>>& grid) {
        int n = grid.size();
        int doubleVal = 0, missing = 0;

        for (int num = 1; num <= n * n; num++) {
            int cnt = 0;
            for (int i = 0; i < n; i++) {
                for (int j = 0; j < n; j++) {
                    if (grid[i][j] == num) {
                        cnt++;
                    }
                }
            }

            if (cnt == 2) {
                doubleVal = num;
            } else if (cnt == 0) {
                missing = num;
            }
        }

        return {doubleVal, missing};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number[]}
     */
    findMissingAndRepeatedValues(grid) {
        const n = grid.length;
        let doubleVal = 0,
            missing = 0;

        for (let num = 1; num <= n * n; num++) {
            let cnt = 0;
            for (let i = 0; i < n; i++) {
                for (let j = 0; j < n; j++) {
                    if (grid[i][j] === num) {
                        cnt++;
                    }
                }
            }

            if (cnt === 2) {
                doubleVal = num;
            } else if (cnt === 0) {
                missing = num;
            }
        }

        return [doubleVal, missing];
    }
}
```

```go
func findMissingAndRepeatedValues(grid [][]int) []int {
    n := len(grid)
    doubleVal, missing := 0, 0

    for num := 1; num <= n*n; num++ {
        cnt := 0
        for i := 0; i < n; i++ {
            for j := 0; j < n; j++ {
                if grid[i][j] == num {
                    cnt++
                }
            }
        }

        if cnt == 2 {
            doubleVal = num
        } else if cnt == 0 {
            missing = num
        }
    }

    return []int{doubleVal, missing}
}
```

```kotlin
class Solution {
    fun findMissingAndRepeatedValues(grid: Array<IntArray>): IntArray {
        val n = grid.size
        var doubleVal = 0
        var missing = 0

        for (num in 1..n * n) {
            var cnt = 0
            for (i in 0 until n) {
                for (j in 0 until n) {
                    if (grid[i][j] == num) {
                        cnt++
                    }
                }
            }

            if (cnt == 2) {
                doubleVal = num
            } else if (cnt == 0) {
                missing = num
            }
        }

        return intArrayOf(doubleVal, missing)
    }
}
```

```swift
class Solution {
    func findMissingAndRepeatedValues(_ grid: [[Int]]) -> [Int] {
        let n = grid.count
        var doubleVal = 0
        var missing = 0

        for num in 1...(n * n) {
            var cnt = 0
            for i in 0..<n {
                for j in 0..<n {
                    if grid[i][j] == num {
                        cnt += 1
                    }
                }
            }

            if cnt == 2 {
                doubleVal = num
            } else if cnt == 0 {
                missing = num
            }
        }

        return [doubleVal, missing]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$

---

## 2. Hash Map

### Intuition

Instead of rescanning the grid for every number, we can count all occurrences in a single pass using a hash map. First, we iterate through the grid once and record how many times each value appears. Then, we check each number from 1 to n*n in the map: a frequency of 2 indicates the repeated number, and a frequency of 0 indicates the missing number.

### Algorithm

1. Traverse the entire grid and store the frequency of each number in a hash map.
2. Iterate through numbers from 1 to n*n:
   - If the frequency is 0, record it as the missing number.
   - If the frequency is 2, record it as the repeated number.
3. Return the repeated and missing numbers.

::tabs-start

```python
class Solution:
    def findMissingAndRepeatedValues(self, grid: List[List[int]]) -> List[int]:
        N = len(grid)
        count = defaultdict(int)

        for i in range(N):
            for j in range(N):
                count[grid[i][j]] += 1

        double = missing = 0

        for num in range(1, N * N + 1):
            if count[num] == 0:
                missing = num
            if count[num] == 2:
                double = num

        return [double, missing]
```

```java
public class Solution {
    public int[] findMissingAndRepeatedValues(int[][] grid) {
        int N = grid.length;
        Map<Integer, Integer> count = new HashMap<>();

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                count.put(grid[i][j], count.getOrDefault(grid[i][j], 0) + 1);
            }
        }

        int doubleVal = 0, missing = 0;

        for (int num = 1; num <= N * N; num++) {
            int freq = count.getOrDefault(num, 0);
            if (freq == 0) missing = num;
            if (freq == 2) doubleVal = num;
        }

        return new int[]{doubleVal, missing};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMissingAndRepeatedValues(vector<vector<int>>& grid) {
        int N = grid.size();
        unordered_map<int, int> count;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                count[grid[i][j]]++;
            }
        }

        int doubleVal = 0, missing = 0;

        for (int num = 1; num <= N * N; num++) {
            int freq = count[num];
            if (freq == 0) missing = num;
            if (freq == 2) doubleVal = num;
        }

        return {doubleVal, missing};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number[]}
     */
    findMissingAndRepeatedValues(grid) {
        const N = grid.length;
        const count = {};

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                let val = grid[i][j];
                count[val] = (count[val] || 0) + 1;
            }
        }

        let doubleVal = 0,
            missing = 0;

        for (let num = 1; num <= N * N; num++) {
            let freq = count[num] || 0;
            if (freq === 0) missing = num;
            if (freq === 2) doubleVal = num;
        }

        return [doubleVal, missing];
    }
}
```

```go
func findMissingAndRepeatedValues(grid [][]int) []int {
    N := len(grid)
    count := make(map[int]int)

    for i := 0; i < N; i++ {
        for j := 0; j < N; j++ {
            count[grid[i][j]]++
        }
    }

    doubleVal, missing := 0, 0

    for num := 1; num <= N*N; num++ {
        freq := count[num]
        if freq == 0 {
            missing = num
        }
        if freq == 2 {
            doubleVal = num
        }
    }

    return []int{doubleVal, missing}
}
```

```kotlin
class Solution {
    fun findMissingAndRepeatedValues(grid: Array<IntArray>): IntArray {
        val N = grid.size
        val count = mutableMapOf<Int, Int>()

        for (i in 0 until N) {
            for (j in 0 until N) {
                count[grid[i][j]] = count.getOrDefault(grid[i][j], 0) + 1
            }
        }

        var doubleVal = 0
        var missing = 0

        for (num in 1..N * N) {
            val freq = count.getOrDefault(num, 0)
            if (freq == 0) missing = num
            if (freq == 2) doubleVal = num
        }

        return intArrayOf(doubleVal, missing)
    }
}
```

```swift
class Solution {
    func findMissingAndRepeatedValues(_ grid: [[Int]]) -> [Int] {
        let N = grid.count
        var count = [Int: Int]()

        for i in 0..<N {
            for j in 0..<N {
                count[grid[i][j], default: 0] += 1
            }
        }

        var doubleVal = 0
        var missing = 0

        for num in 1...(N * N) {
            let freq = count[num] ?? 0
            if freq == 0 { missing = num }
            if freq == 2 { doubleVal = num }
        }

        return [doubleVal, missing]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Hash Set

### Intuition

A hash set can detect duplicates efficiently. As we scan the grid, we add each number to a set. If we try to add a number that already exists in the set, we have found the repeated value. After processing the grid, we iterate from 1 to n*n and check which number is not in the set; that is the missing value.

### Algorithm

1. Initialize an empty hash set.
2. Traverse the grid:
   - If the current number is already in the set, it is the repeated number.
   - Otherwise, add the number to the set.
3. Iterate from 1 to n*n and find the number not present in the set; this is the missing number.
4. Return the repeated and missing numbers.

::tabs-start

```python
class Solution:
    def findMissingAndRepeatedValues(self, grid: List[List[int]]) -> List[int]:
        N = len(grid)
        seen = set()
        double = missing = 0

        for i in range(N):
            for j in range(N):
                if grid[i][j] in seen:
                    double = grid[i][j]
                seen.add(grid[i][j])

        for num in range(1, N * N + 1):
            if num not in seen:
                missing = num
                break

        return [double, missing]
```

```java
public class Solution {
    public int[] findMissingAndRepeatedValues(int[][] grid) {
        int N = grid.length;
        Set<Integer> seen = new HashSet<>();
        int doubleVal = 0, missing = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (seen.contains(grid[i][j])) {
                    doubleVal = grid[i][j];
                }
                seen.add(grid[i][j]);
            }
        }

        for (int num = 1; num <= N * N; num++) {
            if (!seen.contains(num)) {
                missing = num;
                break;
            }
        }

        return new int[]{doubleVal, missing};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMissingAndRepeatedValues(vector<vector<int>>& grid) {
        int N = grid.size();
        unordered_set<int> seen;
        int doubleVal = 0, missing = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (seen.count(grid[i][j])) {
                    doubleVal = grid[i][j];
                }
                seen.insert(grid[i][j]);
            }
        }

        for (int num = 1; num <= N * N; num++) {
            if (!seen.count(num)) {
                missing = num;
                break;
            }
        }

        return {doubleVal, missing};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number[]}
     */
    findMissingAndRepeatedValues(grid) {
        const N = grid.length;
        const seen = new Set();
        let doubleVal = 0,
            missing = 0;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                const val = grid[i][j];
                if (seen.has(val)) {
                    doubleVal = val;
                }
                seen.add(val);
            }
        }

        for (let num = 1; num <= N * N; num++) {
            if (!seen.has(num)) {
                missing = num;
                break;
            }
        }

        return [doubleVal, missing];
    }
}
```

```csharp
public class Solution {
    public int[] FindMissingAndRepeatedValues(int[][] grid) {
        int N = grid.Length;
        HashSet<int> seen = new HashSet<int>();
        int doubleVal = 0, missing = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                if (seen.Contains(grid[i][j])) {
                    doubleVal = grid[i][j];
                }
                seen.Add(grid[i][j]);
            }
        }

        for (int num = 1; num <= N * N; num++) {
            if (!seen.Contains(num)) {
                missing = num;
                break;
            }
        }

        return new int[] { doubleVal, missing };
    }
}
```

```go
func findMissingAndRepeatedValues(grid [][]int) []int {
    N := len(grid)
    seen := make(map[int]bool)
    doubleVal, missing := 0, 0

    for i := 0; i < N; i++ {
        for j := 0; j < N; j++ {
            if seen[grid[i][j]] {
                doubleVal = grid[i][j]
            }
            seen[grid[i][j]] = true
        }
    }

    for num := 1; num <= N*N; num++ {
        if !seen[num] {
            missing = num
            break
        }
    }

    return []int{doubleVal, missing}
}
```

```kotlin
class Solution {
    fun findMissingAndRepeatedValues(grid: Array<IntArray>): IntArray {
        val N = grid.size
        val seen = mutableSetOf<Int>()
        var doubleVal = 0
        var missing = 0

        for (i in 0 until N) {
            for (j in 0 until N) {
                if (grid[i][j] in seen) {
                    doubleVal = grid[i][j]
                }
                seen.add(grid[i][j])
            }
        }

        for (num in 1..N * N) {
            if (num !in seen) {
                missing = num
                break
            }
        }

        return intArrayOf(doubleVal, missing)
    }
}
```

```swift
class Solution {
    func findMissingAndRepeatedValues(_ grid: [[Int]]) -> [Int] {
        let N = grid.count
        var seen = Set<Int>()
        var doubleVal = 0
        var missing = 0

        for i in 0..<N {
            for j in 0..<N {
                if seen.contains(grid[i][j]) {
                    doubleVal = grid[i][j]
                }
                seen.insert(grid[i][j])
            }
        }

        for num in 1...(N * N) {
            if !seen.contains(num) {
                missing = num
                break
            }
        }

        return [doubleVal, missing]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Math

### Intuition

We can solve this without extra data structures using mathematical formulas. Let `a` be the repeated number and `b` be the missing number. The sum of the grid differs from the expected sum (1 + 2 + ... + n*n) by exactly `a - b`. Similarly, the sum of squares differs by `a^2 - b^2`. From these two equations, we can derive `a + b` (since `a^2 - b^2 = (a - b)(a + b)`), and then solve for both values.

### Algorithm

1. Compute the sum and sum of squares of all elements in the grid.
2. Calculate the expected sum using the formula: `n*n * (n*n + 1) / 2`.
3. Calculate the expected sum of squares using: `n*n * (n*n + 1) * (2*n*n + 1) / 6`.
4. Let `diff = gridSum - expectedSum`, which equals `a - b`.
5. Let `sqDiff = gridSqSum - expectedSqSum`, which equals `a^2 - b^2`.
6. Compute `sum = sqDiff / diff`, which equals `a + b`.
7. Solve: `a = (sum + diff) / 2` and `b = sum - a`.
8. Return `[a, b]`.

::tabs-start

```python
class Solution:
    def findMissingAndRepeatedValues(self, grid: List[List[int]]) -> List[int]:
        N = len(grid)
        gridSum = 0
        gridSqSum = 0

        for i in range(N):
            for j in range(N):
                gridSum += grid[i][j]
                gridSqSum += grid[i][j] * grid[i][j]

        totSum = (N * N * (N * N + 1)) // 2
        diff = gridSum - totSum  # a - b

        totSqSum = (N * N * (N * N + 1) * (2 * N * N + 1)) // 6
        sqDiff = gridSqSum - totSqSum  # (a^2) - (b^2)

        sum = sqDiff // diff  # a + b

        a = (sum + diff) // 2
        b = sum - a
        return [a, b]
```

```java
public class Solution {
    public int[] findMissingAndRepeatedValues(int[][] grid) {
        int N = grid.length;
        long gridSum = 0;
        long gridSqSum = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                gridSum += grid[i][j];
                gridSqSum += 1L * grid[i][j] * grid[i][j];
            }
        }

        long totSum = (long) N * N * (N * N + 1) / 2;
        long diff = gridSum - totSum; // a - b

        long totSqSum = (long) N * N * (N * N + 1) * (2L * N * N + 1) / 6;
        long sqDiff = gridSqSum - totSqSum; // (a^2) - (b^2)

        long sum = sqDiff / diff; // a + b

        long a = (sum + diff) / 2;
        long b = sum - a;

        return new int[]{(int) a, (int) b};
    }
}
```

```cpp
class Solution {
public:
    vector<int> findMissingAndRepeatedValues(vector<vector<int>>& grid) {
        int N = grid.size();
        long long gridSum = 0;
        long long gridSqSum = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                gridSum += grid[i][j];
                gridSqSum += 1LL * grid[i][j] * grid[i][j];
            }
        }

        long long totSum = 1LL * N * N * (N * N + 1) / 2;
        long long diff = gridSum - totSum; // a - b

        long long totSqSum = 1LL * N * N * (N * N + 1) * (2 * N * N + 1) / 6;
        long long sqDiff = gridSqSum - totSqSum; // (a^2) - (b^2)

        long long sum = sqDiff / diff; // a + b

        int a = (sum + diff) / 2;
        int b = sum - a;

        return {a, b};
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} grid
     * @return {number[]}
     */
    findMissingAndRepeatedValues(grid) {
        const N = grid.length;
        let gridSum = 0;
        let gridSqSum = 0;

        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                gridSum += grid[i][j];
                gridSqSum += grid[i][j] * grid[i][j];
            }
        }

        let totSum = (N * N * (N * N + 1)) / 2;
        let diff = gridSum - totSum; // a - b

        let totSqSum = (N * N * (N * N + 1) * (2 * N * N + 1)) / 6;
        let sqDiff = gridSqSum - totSqSum; // (a^2) - (b^2)

        let sum = sqDiff / diff; // a + b

        let a = (sum + diff) / 2;
        let b = sum - a;

        return [a, b];
    }
}
```

```csharp
public class Solution {
    public int[] FindMissingAndRepeatedValues(int[][] grid) {
        int N = grid.Length;
        long gridSum = 0;
        long gridSqSum = 0;

        for (int i = 0; i < N; i++) {
            for (int j = 0; j < N; j++) {
                gridSum += grid[i][j];
                gridSqSum += (long)grid[i][j] * grid[i][j];
            }
        }

        long totSum = (long)N * N * (N * N + 1) / 2;
        long diff = gridSum - totSum; // a - b

        long totSqSum = (long)N * N * (N * N + 1) * (2L * N * N + 1) / 6;
        long sqDiff = gridSqSum - totSqSum; // (a^2) - (b^2)

        long sum = sqDiff / diff; // a + b

        long a = (sum + diff) / 2;
        long b = sum - a;

        return new int[] { (int)a, (int)b };
    }
}
```

```go
func findMissingAndRepeatedValues(grid [][]int) []int {
    N := len(grid)
    gridSum := 0
    gridSqSum := 0

    for i := 0; i < N; i++ {
        for j := 0; j < N; j++ {
            gridSum += grid[i][j]
            gridSqSum += grid[i][j] * grid[i][j]
        }
    }

    totSum := N * N * (N*N + 1) / 2
    diff := gridSum - totSum // a - b

    totSqSum := N * N * (N*N + 1) * (2*N*N + 1) / 6
    sqDiff := gridSqSum - totSqSum // (a^2) - (b^2)

    sum := sqDiff / diff // a + b

    a := (sum + diff) / 2
    b := sum - a

    return []int{a, b}
}
```

```kotlin
class Solution {
    fun findMissingAndRepeatedValues(grid: Array<IntArray>): IntArray {
        val N = grid.size
        var gridSum = 0L
        var gridSqSum = 0L

        for (i in 0 until N) {
            for (j in 0 until N) {
                gridSum += grid[i][j]
                gridSqSum += grid[i][j].toLong() * grid[i][j]
            }
        }

        val totSum = N.toLong() * N * (N * N + 1) / 2
        val diff = gridSum - totSum // a - b

        val totSqSum = N.toLong() * N * (N * N + 1) * (2L * N * N + 1) / 6
        val sqDiff = gridSqSum - totSqSum // (a^2) - (b^2)

        val sum = sqDiff / diff // a + b

        val a = ((sum + diff) / 2).toInt()
        val b = (sum - a).toInt()

        return intArrayOf(a, b)
    }
}
```

```swift
class Solution {
    func findMissingAndRepeatedValues(_ grid: [[Int]]) -> [Int] {
        let N = grid.count
        var gridSum = 0
        var gridSqSum = 0

        for i in 0..<N {
            for j in 0..<N {
                gridSum += grid[i][j]
                gridSqSum += grid[i][j] * grid[i][j]
            }
        }

        let totSum = N * N * (N * N + 1) / 2
        let diff = gridSum - totSum // a - b

        let totSqSum = N * N * (N * N + 1) * (2 * N * N + 1) / 6
        let sqDiff = gridSqSum - totSqSum // (a^2) - (b^2)

        let sum = sqDiff / diff // a + b

        let a = (sum + diff) / 2
        let b = sum - a

        return [a, b]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$
