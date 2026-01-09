## 1. Memoization

### Intuition

This is a generalization of the Paint House problem where we now have `k` colors instead of just 3. The core constraint remains the same: no two adjacent houses can have the same color.

We recursively try each valid color for the current house and find the minimum cost to paint all remaining houses. Since the same subproblems are solved multiple times, we use memoization to cache results.

### Algorithm

1. Define a recursive function `memoSolve(houseNumber, color)` that returns the minimum cost to paint from the current house to the end, given that the current house is painted with the specified color.
2. Base case: If at the last house, return the cost of painting it with the given color.
3. For each valid color choice for the next house (any color except the current one), recursively compute the minimum remaining cost.
4. Cache the result for each `(houseNumber, color)` pair to avoid recomputation.
5. Try all colors for house 0 and return the minimum total cost.

::tabs-start

```python
from functools import lru_cache

class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        # Start by defining n and k to make the following code cleaner.
        n = len(costs)
        if n == 0: return 0 # No houses is a valid test case!
        k = len(costs[0])

        # If you're not familiar with lru_cache, look it up in the docs as it's
        # essential to know about.
        @lru_cache(maxsize=None)
        def memo_solve(house_num, color):

            # Base case.
            if house_num == n - 1:
                return costs[house_num][color]

            # Recursive case.
            cost = math.inf
            for next_color in range(k):
                if next_color == color:
                    continue # Can't paint adjacent houses the same color!
                cost = min(cost, memo_solve(house_num + 1, next_color))
            return costs[house_num][color] + cost

        # Consider all options for painting house 0 and find the minimum.
        cost = math.inf
        for color in range(k):
            cost = min(cost, memo_solve(0, color))
        return cost
```

```java
class Solution {

    private int n;
    private int k;
    private int[][] costs;
    private Map<String, Integer> memo;

    public int minCostII(int[][] costs) {
        if (costs.length == 0) return 0;
        this.k = costs[0].length;
        this.n = costs.length;
        this.costs = costs;
        this.memo = new HashMap<>();
        int minCost = Integer.MAX_VALUE;
        for (int color = 0; color < k; color++) {
            minCost = Math.min(minCost, memoSolve(0, color));
        }
        return minCost;
    }

    private int memoSolve(int houseNumber, int color) {

        // Base case: There are no more houses after this one.
        if (houseNumber == n - 1) {
            return costs[houseNumber][color];
        }

        // Memoization lookup case: Have we already solved this subproblem?
        if (memo.containsKey(getKey(houseNumber, color))) {
            return memo.get(getKey(houseNumber, color));
        }

        // Recursive case: Determine the minimum cost for the remainder.
        int minRemainingCost = Integer.MAX_VALUE;
        for (int nextColor = 0; nextColor < k; nextColor++) {
            if (color == nextColor) continue;
            int currentRemainingCost = memoSolve(houseNumber + 1, nextColor);
            minRemainingCost = Math.min(currentRemainingCost, minRemainingCost);
        }
        int totalCost = costs[houseNumber][color] + minRemainingCost;
        memo.put(getKey(houseNumber, color), totalCost);
        return totalCost;
    }

    // Convert a house number and color into a simple string key for the memo.
    private String getKey(int n, int color) {
        return String.valueOf(n) + " " + String.valueOf(color);
    }
}
```

```cpp
class Solution {
private:
    int n, k;
    vector<vector<int>> costs;
    unordered_map<string, int> memo;

    int memoSolve(int houseNumber, int color) {
        if (houseNumber == n - 1) {
            return costs[houseNumber][color];
        }

        string key = to_string(houseNumber) + " " + to_string(color);
        if (memo.find(key) != memo.end()) {
            return memo[key];
        }

        int minRemainingCost = INT_MAX;
        for (int nextColor = 0; nextColor < k; nextColor++) {
            if (color == nextColor) continue;
            int currentRemainingCost = memoSolve(houseNumber + 1, nextColor);
            minRemainingCost = min(currentRemainingCost, minRemainingCost);
        }
        int totalCost = costs[houseNumber][color] + minRemainingCost;
        memo[key] = totalCost;
        return totalCost;
    }

public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        this->costs = costs;
        n = costs.size();
        k = costs[0].size();

        int minCost = INT_MAX;
        for (int color = 0; color < k; color++) {
            minCost = min(minCost, memoSolve(0, color));
        }
        return minCost;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        const k = costs[0].length;
        const memo = new Map();

        const memoSolve = (houseNumber, color) => {
            if (houseNumber === n - 1) {
                return costs[houseNumber][color];
            }

            const key = `${houseNumber} ${color}`;
            if (memo.has(key)) {
                return memo.get(key);
            }

            let minRemainingCost = Infinity;
            for (let nextColor = 0; nextColor < k; nextColor++) {
                if (color === nextColor) continue;
                let currentRemainingCost = memoSolve(houseNumber + 1, nextColor);
                minRemainingCost = Math.min(currentRemainingCost, minRemainingCost);
            }
            const totalCost = costs[houseNumber][color] + minRemainingCost;
            memo.set(key, totalCost);
            return totalCost;
        };

        let minCost = Infinity;
        for (let color = 0; color < k; color++) {
            minCost = Math.min(minCost, memoSolve(0, color));
        }
        return minCost;
    }
}
```

```csharp
public class Solution {
    private int n, k;
    private int[][] costs;
    private Dictionary<string, int> memo;

    public int MinCostII(int[][] costs) {
        if (costs.Length == 0) return 0;
        this.costs = costs;
        n = costs.Length;
        k = costs[0].Length;
        memo = new Dictionary<string, int>();

        int minCost = int.MaxValue;
        for (int color = 0; color < k; color++) {
            minCost = Math.Min(minCost, MemoSolve(0, color));
        }
        return minCost;
    }

    private int MemoSolve(int houseNumber, int color) {
        if (houseNumber == n - 1) {
            return costs[houseNumber][color];
        }

        string key = $"{houseNumber} {color}";
        if (memo.ContainsKey(key)) {
            return memo[key];
        }

        int minRemainingCost = int.MaxValue;
        for (int nextColor = 0; nextColor < k; nextColor++) {
            if (color == nextColor) continue;
            int currentRemainingCost = MemoSolve(houseNumber + 1, nextColor);
            minRemainingCost = Math.Min(currentRemainingCost, minRemainingCost);
        }
        int totalCost = costs[houseNumber][color] + minRemainingCost;
        memo[key] = totalCost;
        return totalCost;
    }
}
```

```go
func minCostII(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }
    k := len(costs[0])
    memo := make(map[string]int)

    var memoSolve func(houseNumber, color int) int
    memoSolve = func(houseNumber, color int) int {
        if houseNumber == n-1 {
            return costs[houseNumber][color]
        }

        key := fmt.Sprintf("%d %d", houseNumber, color)
        if val, ok := memo[key]; ok {
            return val
        }

        minRemainingCost := math.MaxInt32
        for nextColor := 0; nextColor < k; nextColor++ {
            if color == nextColor {
                continue
            }
            currentRemainingCost := memoSolve(houseNumber+1, nextColor)
            if currentRemainingCost < minRemainingCost {
                minRemainingCost = currentRemainingCost
            }
        }
        totalCost := costs[houseNumber][color] + minRemainingCost
        memo[key] = totalCost
        return totalCost
    }

    minCost := math.MaxInt32
    for color := 0; color < k; color++ {
        cost := memoSolve(0, color)
        if cost < minCost {
            minCost = cost
        }
    }
    return minCost
}
```

```kotlin
class Solution {
    fun minCostII(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0
        val k = costs[0].size
        val memo = HashMap<String, Int>()

        fun memoSolve(houseNumber: Int, color: Int): Int {
            if (houseNumber == n - 1) {
                return costs[houseNumber][color]
            }

            val key = "$houseNumber $color"
            if (key in memo) {
                return memo[key]!!
            }

            var minRemainingCost = Int.MAX_VALUE
            for (nextColor in 0 until k) {
                if (color == nextColor) continue
                val currentRemainingCost = memoSolve(houseNumber + 1, nextColor)
                minRemainingCost = minOf(currentRemainingCost, minRemainingCost)
            }
            val totalCost = costs[houseNumber][color] + minRemainingCost
            memo[key] = totalCost
            return totalCost
        }

        var minCost = Int.MAX_VALUE
        for (color in 0 until k) {
            minCost = minOf(minCost, memoSolve(0, color))
        }
        return minCost
    }
}
```

```swift
class Solution {
    func minCostII(_ costs: [[Int]]) -> Int {
        let n = costs.count
        if n == 0 { return 0 }
        let k = costs[0].count
        var memo = [String: Int]()

        func memoSolve(_ houseNumber: Int, _ color: Int) -> Int {
            if houseNumber == n - 1 {
                return costs[houseNumber][color]
            }

            let key = "\(houseNumber) \(color)"
            if let val = memo[key] {
                return val
            }

            var minRemainingCost = Int.max
            for nextColor in 0..<k {
                if color == nextColor { continue }
                let currentRemainingCost = memoSolve(houseNumber + 1, nextColor)
                minRemainingCost = min(currentRemainingCost, minRemainingCost)
            }
            let totalCost = costs[houseNumber][color] + minRemainingCost
            memo[key] = totalCost
            return totalCost
        }

        var minCost = Int.max
        for color in 0..<k {
            minCost = min(minCost, memoSolve(0, color))
        }
        return minCost
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(n \cdot k)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 2. Dynamic Programming

### Intuition

We can solve this iteratively by building up the minimum costs house by house. For each house and each color, we need the minimum cost from the previous house excluding that same color.

The straightforward approach checks all `k` colors from the previous row to find the minimum, giving O(k) work per cell and O(n * k^2) overall.

### Algorithm

1. Process houses from index 1 to n-1. For house 0, the costs are just the given painting costs.
2. For each house and each color, find the minimum cost among all different colors from the previous house.
3. Add this minimum to the current painting cost and update the costs array in place.
4. After processing all houses, return the minimum value in the last row.

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:

        n = len(costs)
        if n == 0: return 0
        k = len(costs[0])

        for house in range(1, n):
            for color in range(k):
                best = math.inf
                for previous_color in range(k):
                    if color == previous_color: continue
                    best = min(best, costs[house - 1][previous_color])
                costs[house][color] += best

        return min(costs[-1])
```

```java
class Solution {
    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        for (int house = 1; house < n; house++) {
            for (int color = 0; color < k; color++) {
                int min = Integer.MAX_VALUE;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    min = Math.min(min, costs[house - 1][previousColor]);
                }
                costs[house][color] += min;
            }
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : costs[n - 1]) {
            min = Math.min(min, c);
        }

        return min;
    }
}
```

```cpp
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        int k = costs[0].size();
        int n = costs.size();

        for (int house = 1; house < n; house++) {
            for (int color = 0; color < k; color++) {
                int minCost = INT_MAX;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    minCost = min(minCost, costs[house - 1][previousColor]);
                }
                costs[house][color] += minCost;
            }
        }

        int minVal = INT_MAX;
        for (int c : costs[n - 1]) {
            minVal = min(minVal, c);
        }
        return minVal;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        const k = costs[0].length;

        for (let house = 1; house < n; house++) {
            for (let color = 0; color < k; color++) {
                let minCost = Infinity;
                for (let previousColor = 0; previousColor < k; previousColor++) {
                    if (color === previousColor) continue;
                    minCost = Math.min(minCost, costs[house - 1][previousColor]);
                }
                costs[house][color] += minCost;
            }
        }

        return Math.min(...costs[n - 1]);
    }
}
```

```csharp
public class Solution {
    public int MinCostII(int[][] costs) {
        if (costs.Length == 0) return 0;
        int k = costs[0].Length;
        int n = costs.Length;

        for (int house = 1; house < n; house++) {
            for (int color = 0; color < k; color++) {
                int minCost = int.MaxValue;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    minCost = Math.Min(minCost, costs[house - 1][previousColor]);
                }
                costs[house][color] += minCost;
            }
        }

        int minVal = int.MaxValue;
        foreach (int c in costs[n - 1]) {
            minVal = Math.Min(minVal, c);
        }
        return minVal;
    }
}
```

```go
func minCostII(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }
    k := len(costs[0])

    for house := 1; house < n; house++ {
        for color := 0; color < k; color++ {
            minCost := math.MaxInt32
            for previousColor := 0; previousColor < k; previousColor++ {
                if color == previousColor {
                    continue
                }
                if costs[house-1][previousColor] < minCost {
                    minCost = costs[house-1][previousColor]
                }
            }
            costs[house][color] += minCost
        }
    }

    minVal := math.MaxInt32
    for _, c := range costs[n-1] {
        if c < minVal {
            minVal = c
        }
    }
    return minVal
}
```

```kotlin
class Solution {
    fun minCostII(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0
        val k = costs[0].size

        for (house in 1 until n) {
            for (color in 0 until k) {
                var minCost = Int.MAX_VALUE
                for (previousColor in 0 until k) {
                    if (color == previousColor) continue
                    minCost = minOf(minCost, costs[house - 1][previousColor])
                }
                costs[house][color] += minCost
            }
        }

        return costs[n - 1].minOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func minCostII(_ costs: [[Int]]) -> Int {
        var costs = costs
        let n = costs.count
        if n == 0 { return 0 }
        let k = costs[0].count

        for house in 1..<n {
            for color in 0..<k {
                var minCost = Int.max
                for previousColor in 0..<k {
                    if color == previousColor { continue }
                    minCost = min(minCost, costs[house - 1][previousColor])
                }
                costs[house][color] += minCost
            }
        }

        return costs[n - 1].min() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(1)$ if done in-place, $O(n \cdot k)$ if input is copied.

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 3. Dynamic Programming with O(k) additional Space

### Intuition

The previous solution modifies the input array. If we want to preserve it, we can use a separate array of size `k` to track the costs from the previous row.

This approach maintains the same logic but uses an auxiliary array instead of modifying the input directly.

### Algorithm

1. Copy the first row of costs into `previousRow`.
2. For each subsequent house, create a new `currentRow` array.
3. For each color, find the minimum value in `previousRow` excluding the same color index, and add the current painting cost.
4. After processing each house, set `previousRow = currentRow`.
5. Return the minimum value in the final `previousRow`.

::tabs-start

```python
def minCostII(self, costs: List[List[int]]) -> int:

    n = len(costs)
    if n == 0: return 0
    k = len(costs[0])

    previous_row = costs[0]

    for house in range(1, n):
        current_row = [0] * k
        for color in range(k):
            best = math.inf
            for previous_color in range(k):
                if color == previous_color: continue
                best = min(best, previous_row[previous_color])
            current_row[color] += costs[house][color] + best
        previous_row = current_row

    return min(previous_row)
```

```java
class Solution {

    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        int[] previousRow = costs[0];

        for (int house = 1; house < n; house++) {
            int[] currentRow = new int[k];
            for (int color = 0; color < k; color++) {
                int min = Integer.MAX_VALUE;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    min = Math.min(min, previousRow[previousColor]);
                }
                currentRow[color] += costs[house][color] += min;
            }
            previousRow = currentRow;
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : previousRow) {
            min = Math.min(min, c);
        }
        return min;
    }
}
```

```cpp
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        int k = costs[0].size();
        int n = costs.size();

        vector<int> previousRow = costs[0];

        for (int house = 1; house < n; house++) {
            vector<int> currentRow(k, 0);
            for (int color = 0; color < k; color++) {
                int minCost = INT_MAX;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    minCost = min(minCost, previousRow[previousColor]);
                }
                currentRow[color] = costs[house][color] + minCost;
            }
            previousRow = currentRow;
        }

        int minVal = INT_MAX;
        for (int c : previousRow) {
            minVal = min(minVal, c);
        }
        return minVal;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        const k = costs[0].length;

        let previousRow = [...costs[0]];

        for (let house = 1; house < n; house++) {
            const currentRow = new Array(k).fill(0);
            for (let color = 0; color < k; color++) {
                let minCost = Infinity;
                for (let previousColor = 0; previousColor < k; previousColor++) {
                    if (color === previousColor) continue;
                    minCost = Math.min(minCost, previousRow[previousColor]);
                }
                currentRow[color] = costs[house][color] + minCost;
            }
            previousRow = currentRow;
        }

        return Math.min(...previousRow);
    }
}
```

```csharp
public class Solution {
    public int MinCostII(int[][] costs) {
        if (costs.Length == 0) return 0;
        int k = costs[0].Length;
        int n = costs.Length;

        int[] previousRow = (int[])costs[0].Clone();

        for (int house = 1; house < n; house++) {
            int[] currentRow = new int[k];
            for (int color = 0; color < k; color++) {
                int minCost = int.MaxValue;
                for (int previousColor = 0; previousColor < k; previousColor++) {
                    if (color == previousColor) continue;
                    minCost = Math.Min(minCost, previousRow[previousColor]);
                }
                currentRow[color] = costs[house][color] + minCost;
            }
            previousRow = currentRow;
        }

        int minVal = int.MaxValue;
        foreach (int c in previousRow) {
            minVal = Math.Min(minVal, c);
        }
        return minVal;
    }
}
```

```go
func minCostII(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }
    k := len(costs[0])

    previousRow := make([]int, k)
    copy(previousRow, costs[0])

    for house := 1; house < n; house++ {
        currentRow := make([]int, k)
        for color := 0; color < k; color++ {
            minCost := math.MaxInt32
            for previousColor := 0; previousColor < k; previousColor++ {
                if color == previousColor {
                    continue
                }
                if previousRow[previousColor] < minCost {
                    minCost = previousRow[previousColor]
                }
            }
            currentRow[color] = costs[house][color] + minCost
        }
        previousRow = currentRow
    }

    minVal := math.MaxInt32
    for _, c := range previousRow {
        if c < minVal {
            minVal = c
        }
    }
    return minVal
}
```

```kotlin
class Solution {
    fun minCostII(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0
        val k = costs[0].size

        var previousRow = costs[0].clone()

        for (house in 1 until n) {
            val currentRow = IntArray(k)
            for (color in 0 until k) {
                var minCost = Int.MAX_VALUE
                for (previousColor in 0 until k) {
                    if (color == previousColor) continue
                    minCost = minOf(minCost, previousRow[previousColor])
                }
                currentRow[color] = costs[house][color] + minCost
            }
            previousRow = currentRow
        }

        return previousRow.minOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func minCostII(_ costs: [[Int]]) -> Int {
        let n = costs.count
        if n == 0 { return 0 }
        let k = costs[0].count

        var previousRow = costs[0]

        for house in 1..<n {
            var currentRow = [Int](repeating: 0, count: k)
            for color in 0..<k {
                var minCost = Int.max
                for previousColor in 0..<k {
                    if color == previousColor { continue }
                    minCost = min(minCost, previousRow[previousColor])
                }
                currentRow[color] = costs[house][color] + minCost
            }
            previousRow = currentRow
        }

        return previousRow.min() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k^2)$

- Space complexity: $O(k)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 4. Dynamic programming with Optimized Time

### Intuition

The O(k^2) time per house comes from finding the minimum in the previous row for each color. But notice: for all colors except one, we just need the global minimum of the previous row. The exception is when the current color matches the minimum color from the previous row, in which case we need the second minimum.

By precomputing the minimum and second minimum colors from each row, we can update each cell in O(1) time, reducing the overall complexity to O(n * k).

### Algorithm

1. For each house (starting from index 1), first find the indices of the minimum and second minimum costs in the previous row.
2. For each color in the current row:
   - If this color matches the minimum color from the previous row, add the second minimum cost.
   - Otherwise, add the minimum cost.
3. Repeat until all houses are processed.
4. Return the minimum value in the final row.

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:

        n = len(costs)
        if n == 0: return 0
        k = len(costs[0])

        for house in range(1, n):
            # Find the colors with the minimum and second to minimum
            # in the previous row.
            min_color = second_min_color = None
            for color in range(k):
                cost = costs[house - 1][color]
                if min_color is None or cost < costs[house - 1][min_color]:
                    second_min_color = min_color
                    min_color = color
                elif second_min_color is None or cost < costs[house - 1][second_min_color]:
                    second_min_color = color
            # And now update the costs for the current row.
            for color in range(k):
                if color == min_color:
                    costs[house][color] += costs[house - 1][second_min_color]
                else:
                    costs[house][color] += costs[house - 1][min_color]

        # The answer will now be the minimum of the last row.
        return min(costs[-1])
```

```java
class Solution {
    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;

        for (int house = 1; house < n; house++) {

            // Find the minimum and second minimum color in the PREVIOUS row.
            int minColor = -1; int secondMinColor = -1;
            for (int color = 0; color < k; color++) {
                int cost = costs[house - 1][color];
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }

            // And now calculate the new costs for the current row.
            for (int color = 0; color < k; color++) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }

        // Find the minimum in the last row.
        int min = Integer.MAX_VALUE;
        for (int c : costs[n - 1]) {
            min = Math.min(min, c);
        }
        return min;
    }
}
```

```cpp
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.size() == 0) return 0;
        
        int k = costs[0].size();
        int n = costs.size();
        
        for (int house = 1; house < n; house++) {
            // Find the minimum and second minimum color in the PREVIOUS row.
            int minColor = -1;
            int secondMinColor = -1;
            
            for (int color = 0; color < k; color++) {
                int cost = costs[house - 1][color];
                
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }
            
            // And now calculate the new costs for the current row.
            for (int color = 0; color < k; color++) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }
        
        // Find the minimum in the last row.
        int min = INT_MAX;
        for (int c : costs[n - 1]) {
            min = std::min(min, c);
        }
        
        return min;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;

        const k = costs[0].length;

        for (let house = 1; house < n; house++) {
            // Find the colors with the minimum and second to minimum
            // in the previous row.
            let minColor = null;
            let secondMinColor = null;

            for (let color = 0; color < k; color++) {
                const cost = costs[house - 1][color];

                if (minColor === null || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor === null || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }

            // And now update the costs for the current row.
            for (let color = 0; color < k; color++) {
                if (color === minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }

        // The answer will now be the minimum of the last row.
        return Math.min(...costs[n - 1]);
    }
}
```

```csharp
public class Solution {
    public int MinCostII(int[][] costs) {
        if (costs.Length == 0) return 0;
        int k = costs[0].Length;
        int n = costs.Length;

        for (int house = 1; house < n; house++) {
            int minColor = -1, secondMinColor = -1;
            for (int color = 0; color < k; color++) {
                int cost = costs[house - 1][color];
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor;
                    minColor = color;
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color;
                }
            }

            for (int color = 0; color < k; color++) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor];
                } else {
                    costs[house][color] += costs[house - 1][minColor];
                }
            }
        }

        int minVal = int.MaxValue;
        foreach (int c in costs[n - 1]) {
            minVal = Math.Min(minVal, c);
        }
        return minVal;
    }
}
```

```go
func minCostII(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }
    k := len(costs[0])

    for house := 1; house < n; house++ {
        minColor, secondMinColor := -1, -1
        for color := 0; color < k; color++ {
            cost := costs[house-1][color]
            if minColor == -1 || cost < costs[house-1][minColor] {
                secondMinColor = minColor
                minColor = color
            } else if secondMinColor == -1 || cost < costs[house-1][secondMinColor] {
                secondMinColor = color
            }
        }

        for color := 0; color < k; color++ {
            if color == minColor {
                costs[house][color] += costs[house-1][secondMinColor]
            } else {
                costs[house][color] += costs[house-1][minColor]
            }
        }
    }

    minVal := math.MaxInt32
    for _, c := range costs[n-1] {
        if c < minVal {
            minVal = c
        }
    }
    return minVal
}
```

```kotlin
class Solution {
    fun minCostII(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0
        val k = costs[0].size

        for (house in 1 until n) {
            var minColor = -1
            var secondMinColor = -1
            for (color in 0 until k) {
                val cost = costs[house - 1][color]
                if (minColor == -1 || cost < costs[house - 1][minColor]) {
                    secondMinColor = minColor
                    minColor = color
                } else if (secondMinColor == -1 || cost < costs[house - 1][secondMinColor]) {
                    secondMinColor = color
                }
            }

            for (color in 0 until k) {
                if (color == minColor) {
                    costs[house][color] += costs[house - 1][secondMinColor]
                } else {
                    costs[house][color] += costs[house - 1][minColor]
                }
            }
        }

        return costs[n - 1].minOrNull() ?: 0
    }
}
```

```swift
class Solution {
    func minCostII(_ costs: [[Int]]) -> Int {
        var costs = costs
        let n = costs.count
        if n == 0 { return 0 }
        let k = costs[0].count

        for house in 1..<n {
            var minColor = -1
            var secondMinColor = -1
            for color in 0..<k {
                let cost = costs[house - 1][color]
                if minColor == -1 || cost < costs[house - 1][minColor] {
                    secondMinColor = minColor
                    minColor = color
                } else if secondMinColor == -1 || cost < costs[house - 1][secondMinColor] {
                    secondMinColor = color
                }
            }

            for color in 0..<k {
                if color == minColor {
                    costs[house][color] += costs[house - 1][secondMinColor]
                } else {
                    costs[house][color] += costs[house - 1][minColor]
                }
            }
        }

        return costs[n - 1].min() ?? 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k)$

- Space complexity: $O(1)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.

---

## 5. Dynamic programming with Optimized Time and Space

### Intuition

Building on the previous optimization, we realize we do not actually need to store the entire previous row. We only need three pieces of information: the minimum cost, the second minimum cost, and which color achieved the minimum.

By tracking just these three values as we process each house, we can compute everything in O(1) space while maintaining O(n * k) time complexity.

### Algorithm

1. Initialize by finding the minimum cost, second minimum cost, and minimum color index from the first row.
2. For each subsequent house, iterate through all colors:
   - If the current color equals the previous minimum color, the cost is `current_cost + prev_second_min`.
   - Otherwise, the cost is `current_cost + prev_min`.
3. Track the new minimum, second minimum, and minimum color as you process each color.
4. After processing all houses, the final minimum cost is the answer.

::tabs-start

```python
class Solution:
    def minCostII(self, costs: List[List[int]]) -> int:
        n = len(costs)
        if n == 0: return 0 # This is a valid case.
        k = len(costs[0])

        # Firstly, we need to determine the 2 lowest costs of
        # the first row. We also need to remember the color of
        # the lowest.
        prev_min_cost = prev_second_min_cost = prev_min_color = None
        for color, cost in enumerate(costs[0]):
            if prev_min_cost is None or cost < prev_min_cost:
                prev_second_min_cost = prev_min_cost
                prev_min_color = color
                prev_min_cost = cost
            elif prev_second_min_cost is None or cost < prev_second_min_cost:
                prev_second_min_cost = cost

        # And now, we need to work our way down, keeping track of the minimums.
        for house in range(1, n):
            min_cost = second_min_cost = min_color = None
            for color in range(k):
                # Determime cost for this cell (without writing it into input array.)
                cost = costs[house][color]
                if color == prev_min_color:
                    cost += prev_second_min_cost
                else:
                    cost += prev_min_cost
                # And work out whether or not it is a current minimum.
                if min_cost is None or cost < min_cost:
                    second_min_cost = min_cost
                    min_color = color
                    min_cost = cost
                elif second_min_cost is None or cost < second_min_cost:
                    second_min_cost = cost
            # Transfer currents to be prevs.
            prev_min_cost = min_cost
            prev_min_color = min_color
            prev_second_min_cost = second_min_cost

        return prev_min_cost
```

```java
class Solution {

    public int minCostII(int[][] costs) {

        if (costs.length == 0) return 0;
        int k = costs[0].length;
        int n = costs.length;


        /* Firstly, we need to determine the 2 lowest costs of
         * the first row. We also need to remember the color of
         * the lowest. */
        int prevMin = -1; int prevSecondMin = -1; int prevMinColor = -1;
        for (int color = 0; color < k; color++) {
            int cost = costs[0][color];
            if (prevMin == -1 || cost < prevMin) {
                prevSecondMin = prevMin;
                prevMinColor = color;
                prevMin = cost;
            } else if (prevSecondMin == -1 || cost < prevSecondMin) {
                prevSecondMin = cost;
            }
        }

        // And now, we need to work our way down, keeping track of the minimums.
        for (int house = 1; house < n; house++) {
            int min = -1; int secondMin = -1; int minColor = -1;
            for (int color = 0; color < k; color++) {
                // Determine the cost for this cell (without writing it in).
                int cost = costs[house][color];
                if (color == prevMinColor) {
                    cost += prevSecondMin;
                } else {
                    cost += prevMin;
                }
                // Determine whether or not this current cost is also a minimum.
                if (min == -1 || cost < min) {
                    secondMin = min;
                    minColor = color;
                    min = cost;
                } else if (secondMin == -1 || cost < secondMin) {
                    secondMin = cost;
                }
            }
            // Transfer current mins to be previous mins.
            prevMin = min;
            prevSecondMin = secondMin;
            prevMinColor = minColor;
        }

        return prevMin;
    }
}
```

```cpp
class Solution {
public:
    int minCostII(vector<vector<int>>& costs) {
        if (costs.empty()) return 0;
        int k = costs[0].size();
        int n = costs.size();

        int prevMin = -1, prevSecondMin = -1, prevMinColor = -1;
        for (int color = 0; color < k; color++) {
            int cost = costs[0][color];
            if (prevMin == -1 || cost < prevMin) {
                prevSecondMin = prevMin;
                prevMinColor = color;
                prevMin = cost;
            } else if (prevSecondMin == -1 || cost < prevSecondMin) {
                prevSecondMin = cost;
            }
        }

        for (int house = 1; house < n; house++) {
            int minCost = -1, secondMin = -1, minColor = -1;
            for (int color = 0; color < k; color++) {
                int cost = costs[house][color];
                if (color == prevMinColor) {
                    cost += prevSecondMin;
                } else {
                    cost += prevMin;
                }
                if (minCost == -1 || cost < minCost) {
                    secondMin = minCost;
                    minColor = color;
                    minCost = cost;
                } else if (secondMin == -1 || cost < secondMin) {
                    secondMin = cost;
                }
            }
            prevMin = minCost;
            prevSecondMin = secondMin;
            prevMinColor = minColor;
        }

        return prevMin;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} costs
     * @return {number}
     */
    minCostII(costs) {
        const n = costs.length;
        if (n === 0) return 0;
        const k = costs[0].length;

        let prevMin = null, prevSecondMin = null, prevMinColor = null;
        for (let color = 0; color < k; color++) {
            const cost = costs[0][color];
            if (prevMin === null || cost < prevMin) {
                prevSecondMin = prevMin;
                prevMinColor = color;
                prevMin = cost;
            } else if (prevSecondMin === null || cost < prevSecondMin) {
                prevSecondMin = cost;
            }
        }

        for (let house = 1; house < n; house++) {
            let min = null, secondMin = null, minColor = null;
            for (let color = 0; color < k; color++) {
                let cost = costs[house][color];
                if (color === prevMinColor) {
                    cost += prevSecondMin;
                } else {
                    cost += prevMin;
                }
                if (min === null || cost < min) {
                    secondMin = min;
                    minColor = color;
                    min = cost;
                } else if (secondMin === null || cost < secondMin) {
                    secondMin = cost;
                }
            }
            prevMin = min;
            prevSecondMin = secondMin;
            prevMinColor = minColor;
        }

        return prevMin;
    }
}
```

```csharp
public class Solution {
    public int MinCostII(int[][] costs) {
        if (costs.Length == 0) return 0;
        int k = costs[0].Length;
        int n = costs.Length;

        int prevMin = -1, prevSecondMin = -1, prevMinColor = -1;
        for (int color = 0; color < k; color++) {
            int cost = costs[0][color];
            if (prevMin == -1 || cost < prevMin) {
                prevSecondMin = prevMin;
                prevMinColor = color;
                prevMin = cost;
            } else if (prevSecondMin == -1 || cost < prevSecondMin) {
                prevSecondMin = cost;
            }
        }

        for (int house = 1; house < n; house++) {
            int minCost = -1, secondMin = -1, minColor = -1;
            for (int color = 0; color < k; color++) {
                int cost = costs[house][color];
                if (color == prevMinColor) {
                    cost += prevSecondMin;
                } else {
                    cost += prevMin;
                }
                if (minCost == -1 || cost < minCost) {
                    secondMin = minCost;
                    minColor = color;
                    minCost = cost;
                } else if (secondMin == -1 || cost < secondMin) {
                    secondMin = cost;
                }
            }
            prevMin = minCost;
            prevSecondMin = secondMin;
            prevMinColor = minColor;
        }

        return prevMin;
    }
}
```

```go
func minCostII(costs [][]int) int {
    n := len(costs)
    if n == 0 {
        return 0
    }
    k := len(costs[0])

    prevMin, prevSecondMin, prevMinColor := -1, -1, -1
    for color := 0; color < k; color++ {
        cost := costs[0][color]
        if prevMin == -1 || cost < prevMin {
            prevSecondMin = prevMin
            prevMinColor = color
            prevMin = cost
        } else if prevSecondMin == -1 || cost < prevSecondMin {
            prevSecondMin = cost
        }
    }

    for house := 1; house < n; house++ {
        minCost, secondMin, minColor := -1, -1, -1
        for color := 0; color < k; color++ {
            cost := costs[house][color]
            if color == prevMinColor {
                cost += prevSecondMin
            } else {
                cost += prevMin
            }
            if minCost == -1 || cost < minCost {
                secondMin = minCost
                minColor = color
                minCost = cost
            } else if secondMin == -1 || cost < secondMin {
                secondMin = cost
            }
        }
        prevMin = minCost
        prevSecondMin = secondMin
        prevMinColor = minColor
    }

    return prevMin
}
```

```kotlin
class Solution {
    fun minCostII(costs: Array<IntArray>): Int {
        val n = costs.size
        if (n == 0) return 0
        val k = costs[0].size

        var prevMin = -1
        var prevSecondMin = -1
        var prevMinColor = -1
        for (color in 0 until k) {
            val cost = costs[0][color]
            if (prevMin == -1 || cost < prevMin) {
                prevSecondMin = prevMin
                prevMinColor = color
                prevMin = cost
            } else if (prevSecondMin == -1 || cost < prevSecondMin) {
                prevSecondMin = cost
            }
        }

        for (house in 1 until n) {
            var minCost = -1
            var secondMin = -1
            var minColor = -1
            for (color in 0 until k) {
                var cost = costs[house][color]
                cost += if (color == prevMinColor) prevSecondMin else prevMin
                if (minCost == -1 || cost < minCost) {
                    secondMin = minCost
                    minColor = color
                    minCost = cost
                } else if (secondMin == -1 || cost < secondMin) {
                    secondMin = cost
                }
            }
            prevMin = minCost
            prevSecondMin = secondMin
            prevMinColor = minColor
        }

        return prevMin
    }
}
```

```swift
class Solution {
    func minCostII(_ costs: [[Int]]) -> Int {
        let n = costs.count
        if n == 0 { return 0 }
        let k = costs[0].count

        var prevMin = -1
        var prevSecondMin = -1
        var prevMinColor = -1
        for color in 0..<k {
            let cost = costs[0][color]
            if prevMin == -1 || cost < prevMin {
                prevSecondMin = prevMin
                prevMinColor = color
                prevMin = cost
            } else if prevSecondMin == -1 || cost < prevSecondMin {
                prevSecondMin = cost
            }
        }

        for house in 1..<n {
            var minCost = -1
            var secondMin = -1
            var minColor = -1
            for color in 0..<k {
                var cost = costs[house][color]
                cost += (color == prevMinColor) ? prevSecondMin : prevMin
                if minCost == -1 || cost < minCost {
                    secondMin = minCost
                    minColor = color
                    minCost = cost
                } else if secondMin == -1 || cost < secondMin {
                    secondMin = cost
                }
            }
            prevMin = minCost
            prevSecondMin = secondMin
            prevMinColor = minColor
        }

        return prevMin
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \cdot k)$

- Space complexity: $O(1)$

>  Where $n$ is the number of houses in a row, and $k$ is the number of colors available for painting.
