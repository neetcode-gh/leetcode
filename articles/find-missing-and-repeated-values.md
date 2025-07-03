## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 4)$
- Space complexity: $O(1)$

---

## 2. Hash Map

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 3. Hash Set

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n ^ 2)$

---

## 4. Math

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$
