## 1. Brute Force

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * g)$
- Space complexity: $O(n * g)$

> Where $m$ is the sum of widths of the bricks in the first row, $n$ is the number of rows and $g$ is the average number of gaps in each row.

---

## 2. Hash Map

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N)$
- Space complexity: $O(g)$

> Where $N$ is the total number of bricks in the wall and $g$ is the total number of gaps in all the rows.
