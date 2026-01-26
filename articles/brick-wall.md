## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Map** - Using hash maps to count frequencies and find the most common element efficiently
- **Prefix Sum** - Computing cumulative sums to track edge positions between bricks

---

## 1. Brute Force

### Intuition

The goal is to draw a vertical line through the wall that crosses the fewest bricks. A line crosses a brick only if it doesn't pass through a gap between bricks. So we need to find the vertical position where the most gaps align across all rows.

The brute force approach is straightforward: for every possible vertical position (from 1 to wall width minus 1), count how many rows do NOT have a gap at that position. The position with the fewest cuts is our answer.

### Algorithm

1. Calculate the total width of the wall by summing the bricks in the first row.
2. For each row, compute the cumulative positions where gaps exist (edges between bricks).
3. For each possible vertical line position from `1` to `width - 1`:
   - Count how many rows do not have a gap at this position (these are the bricks that would be cut).
   - Track the minimum number of cuts found.
4. Return the minimum cut count.

::tabs-start

```python
class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        n = len(wall)
        m = 0
        for brick in wall[0]:
            m += brick

        gaps = [[] for _ in range(n)]
        for i in range(n):
            gap = 0
            for brick in wall[i]:
                gap += brick
                gaps[i].append(gap)

        res = n
        for line in range(1, m):
            cuts = 0
            for i in range(n):
                if line not in gaps[i]:
                    cuts += 1

            res = min(res, cuts)
        return res
```

```java
public class Solution {
    public int leastBricks(List<List<Integer>> wall) {
        int n = wall.size();
        int m = 0;
        for (int brick : wall.get(0)) {
            m += brick;
        }

        List<List<Integer>> gaps = new ArrayList<>();
        for (int i = 0; i < n; i++) {
            gaps.add(new ArrayList<>());
            int gap = 0;
            for (int brick : wall.get(i)) {
                gap += brick;
                gaps.get(i).add(gap);
            }
        }

        int res = n;
        for (int line = 1; line < m; line++) {
            int cuts = 0;
            for (int i = 0; i < n; i++) {
                if (!gaps.get(i).contains(line)) {
                    cuts++;
                }
            }
            res = Math.min(res, cuts);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        int n = wall.size();
        int m = 0;
        for (int brick : wall[0]) {
            m += brick;
        }

        vector<vector<int>> gaps(n);
        for (int i = 0; i < n; i++) {
            int gap = 0;
            for (int brick : wall[i]) {
                gap += brick;
                gaps[i].push_back(gap);
            }
        }

        int res = n;
        for (int line = 1; line < m; line++) {
            int cuts = 0;
            for (int i = 0; i < n; i++) {
                if (find(gaps[i].begin(), gaps[i].end(), line) == gaps[i].end()) {
                    cuts++;
                }
            }
            res = min(res, cuts);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} wall
     * @return {number}
     */
    leastBricks(wall) {
        const n = wall.length;
        let m = 0;
        for (const brick of wall[0]) {
            m += brick;
        }

        const gaps = Array.from({ length: n }, () => []);
        for (let i = 0; i < n; i++) {
            let gap = 0;
            for (const brick of wall[i]) {
                gap += brick;
                gaps[i].push(gap);
            }
        }

        let res = n;
        for (let line = 1; line < m; line++) {
            let cuts = 0;
            for (let i = 0; i < n; i++) {
                if (!gaps[i].includes(line)) {
                    cuts++;
                }
            }
            res = Math.min(res, cuts);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LeastBricks(IList<IList<int>> wall) {
        int n = wall.Count;
        int m = 0;
        foreach (int brick in wall[0]) {
            m += brick;
        }

        List<HashSet<int>> gaps = new List<HashSet<int>>();
        for (int i = 0; i < n; i++) {
            gaps.Add(new HashSet<int>());
            int gap = 0;
            foreach (int brick in wall[i]) {
                gap += brick;
                gaps[i].Add(gap);
            }
        }

        int res = n;
        for (int line = 1; line < m; line++) {
            int cuts = 0;
            for (int i = 0; i < n; i++) {
                if (!gaps[i].Contains(line)) {
                    cuts++;
                }
            }
            res = Math.Min(res, cuts);
        }

        return res;
    }
}
```

```go
func leastBricks(wall [][]int) int {
    n := len(wall)
    m := 0
    for _, brick := range wall[0] {
        m += brick
    }

    gaps := make([]map[int]bool, n)
    for i := 0; i < n; i++ {
        gaps[i] = make(map[int]bool)
        gap := 0
        for _, brick := range wall[i] {
            gap += brick
            gaps[i][gap] = true
        }
    }

    res := n
    for line := 1; line < m; line++ {
        cuts := 0
        for i := 0; i < n; i++ {
            if !gaps[i][line] {
                cuts++
            }
        }
        if cuts < res {
            res = cuts
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun leastBricks(wall: List<List<Int>>): Int {
        val n = wall.size
        var m = 0
        for (brick in wall[0]) {
            m += brick
        }

        val gaps = Array(n) { mutableSetOf<Int>() }
        for (i in 0 until n) {
            var gap = 0
            for (brick in wall[i]) {
                gap += brick
                gaps[i].add(gap)
            }
        }

        var res = n
        for (line in 1 until m) {
            var cuts = 0
            for (i in 0 until n) {
                if (line !in gaps[i]) {
                    cuts++
                }
            }
            res = minOf(res, cuts)
        }

        return res
    }
}
```

```swift
class Solution {
    func leastBricks(_ wall: [[Int]]) -> Int {
        let n = wall.count
        var m = 0
        for brick in wall[0] {
            m += brick
        }

        var gaps = [[Int]: Set<Int>]()
        for i in 0..<n {
            var gapSet = Set<Int>()
            var gap = 0
            for brick in wall[i] {
                gap += brick
                gapSet.insert(gap)
            }
            gaps[[i]] = gapSet
        }

        var res = n
        for line in 1..<m {
            var cuts = 0
            for i in 0..<n {
                if !(gaps[[i]]?.contains(line) ?? false) {
                    cuts += 1
                }
            }
            res = min(res, cuts)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * g)$
- Space complexity: $O(n * g)$

> Where $m$ is the sum of widths of the bricks in the first row, $n$ is the number of rows and $g$ is the average number of gaps in each row.

---

## 2. Hash Map

### Intuition

Instead of checking every possible vertical position, we can think about this differently. We want to maximize the number of gaps we pass through, because each gap means we avoid cutting a brick. If we count how many times each gap position appears across all rows, the position with the most gaps is the best place to draw our line. The answer is then total rows minus the maximum gap count.

### Algorithm

1. Use a hash map to count the frequency of each gap position across all rows.
2. For each row, compute cumulative brick widths (excluding the last brick to avoid counting the wall edge).
3. For each cumulative width, increment its count in the hash map.
4. Find the maximum count in the hash map (the position with the most aligned gaps).
5. Return the total number of rows minus this maximum count.

::tabs-start

```python
class Solution:
    def leastBricks(self, wall: List[List[int]]) -> int:
        countGap = {0: 0}

        for r in wall:
            total = 0
            for i in range(len(r) - 1):
                total += r[i]
                countGap[total] = 1 + countGap.get(total, 0)

        return len(wall) - max(countGap.values())
```

```java
public class Solution {
    public int leastBricks(List<List<Integer>> wall) {
        HashMap<Integer, Integer> countGap = new HashMap<>();
        countGap.put(0, 0);

        for (List<Integer> row : wall) {
            int total = 0;
            for (int i = 0; i < row.size() - 1; i++) {
                total += row.get(i);
                countGap.put(total, countGap.getOrDefault(total, 0) + 1);
            }
        }

        int maxGaps = 0;
        for (int count : countGap.values()) {
            maxGaps = Math.max(maxGaps, count);
        }

        return wall.size() - maxGaps;
    }
}
```

```cpp
class Solution {
public:
    int leastBricks(vector<vector<int>>& wall) {
        unordered_map<int, int> countGap;
        countGap[0] = 0;

        for (const auto& row : wall) {
            int total = 0;
            for (size_t i = 0; i < row.size() - 1; ++i) {
                total += row[i];
                countGap[total]++;
            }
        }

        int maxGaps = 0;
        for (const auto& [key, value] : countGap) {
            maxGaps = max(maxGaps, value);
        }

        return wall.size() - maxGaps;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} wall
     * @return {number}
     */
    leastBricks(wall) {
        const countGap = new Map();
        countGap.set(0, 0);
        for (const row of wall) {
            let total = 0;
            for (let i = 0; i < row.length - 1; i++) {
                total += row[i];
                countGap.set(total, (countGap.get(total) || 0) + 1);
            }
        }
        return wall.length - Math.max(...countGap.values());
    }
}
```

```csharp
public class Solution {
    public int LeastBricks(IList<IList<int>> wall) {
        Dictionary<int, int> countGap = new Dictionary<int, int>();
        countGap[0] = 0;

        foreach (var row in wall) {
            int total = 0;
            for (int i = 0; i < row.Count - 1; i++) {
                total += row[i];
                if (!countGap.ContainsKey(total)) {
                    countGap[total] = 0;
                }
                countGap[total]++;
            }
        }

        int maxGaps = 0;
        foreach (int count in countGap.Values) {
            maxGaps = Math.Max(maxGaps, count);
        }

        return wall.Count - maxGaps;
    }
}
```

```go
func leastBricks(wall [][]int) int {
    countGap := map[int]int{0: 0}

    for _, row := range wall {
        total := 0
        for i := 0; i < len(row)-1; i++ {
            total += row[i]
            countGap[total]++
        }
    }

    maxGaps := 0
    for _, count := range countGap {
        if count > maxGaps {
            maxGaps = count
        }
    }

    return len(wall) - maxGaps
}
```

```kotlin
class Solution {
    fun leastBricks(wall: List<List<Int>>): Int {
        val countGap = mutableMapOf(0 to 0)

        for (row in wall) {
            var total = 0
            for (i in 0 until row.size - 1) {
                total += row[i]
                countGap[total] = countGap.getOrDefault(total, 0) + 1
            }
        }

        return wall.size - countGap.values.maxOrNull()!!
    }
}
```

```swift
class Solution {
    func leastBricks(_ wall: [[Int]]) -> Int {
        var countGap = [0: 0]

        for row in wall {
            var total = 0
            for i in 0..<(row.count - 1) {
                total += row[i]
                countGap[total, default: 0] += 1
            }
        }

        return wall.count - countGap.values.max()!
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(g)$

> Where $N$ is the total number of bricks in the wall and $g$ is the total number of gaps in all the rows.

---

## Common Pitfalls

### Counting the Wall Edge as a Valid Gap
The rightmost edge of the wall (at position equal to total width) should not be counted as a gap since a line there wouldn't cross any bricks anyway. Including it inflates the gap count and gives wrong answers.
```python
# Wrong: counting all gaps including the last one
for brick in row:
    total += brick
    countGap[total] += 1  # Counts wall edge

# Correct: exclude the last brick
for i in range(len(row) - 1):
    total += row[i]
    countGap[total] += 1
```

### Returning Maximum Gaps Instead of Minimum Cuts
The answer is `number_of_rows - max_gaps`, not just `max_gaps`. Maximizing gaps minimizes cuts, but forgetting to subtract from total rows returns the wrong value.

### Not Handling Rows with Single Bricks
If a row contains only one brick spanning the entire width, it has no internal gaps. The hash map initialization with `{0: 0}` handles the edge case where no gaps exist, ensuring the answer defaults to cutting through all rows.
