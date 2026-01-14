## 1. Brute Force

### Intuition
The most straightforward approach is to check every pair of points and determine if the vertical area between them contains any other points. For each pair, we compute the horizontal distance and verify that no other point lies strictly between them in the x-coordinate. This gives us the correct answer but is inefficient for large inputs.

### Algorithm
1. Iterate through all pairs of points using two nested loops.
2. For each pair of points with x-coordinates `x1` and `x2`, check if any other point has an x-coordinate strictly between `min(x1, x2)` and `max(x1, x2)`.
3. If no point exists between them, calculate the width as the absolute difference of their x-coordinates.
4. Track and return the maximum width found among all valid pairs.

::tabs-start

```python
class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        n = len(points)
        res = 0

        for i in range(1, n):
            x1 = points[i][0]
            for j in range(i):
                x2 = points[j][0]
                hasPoints = False
                for k in range(n):
                    if k == i or k == j:
                        continue

                    x3 = points[k][0]
                    if x3 > min(x1, x2) and x3 < max(x1, x2):
                        hasPoints = True
                        break

                if not hasPoints:
                    res = max(res, abs(x1 - x2))

        return res
```

```java
public class Solution {
    public int maxWidthOfVerticalArea(int[][] points) {
        int n = points.length, res = 0;

        for (int i = 1; i < n; i++) {
            int x1 = points[i][0];
            for (int j = 0; j < i; j++) {
                int x2 = points[j][0];
                boolean hasPoints = false;

                for (int k = 0; k < n; k++) {
                    if (k == i || k == j) continue;

                    int x3 = points[k][0];
                    if (x3 > Math.min(x1, x2) && x3 < Math.max(x1, x2)) {
                        hasPoints = true;
                        break;
                    }
                }

                if (!hasPoints) {
                    res = Math.max(res, Math.abs(x1 - x2));
                }
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxWidthOfVerticalArea(vector<vector<int>>& points) {
        int n = points.size(), res = 0;

        for (int i = 1; i < n; i++) {
            int x1 = points[i][0];
            for (int j = 0; j < i; j++) {
                int x2 = points[j][0];
                bool hasPoints = false;

                for (int k = 0; k < n; k++) {
                    if (k == i || k == j) continue;

                    int x3 = points[k][0];
                    if (x3 > min(x1, x2) && x3 < max(x1, x2)) {
                        hasPoints = true;
                        break;
                    }
                }

                if (!hasPoints) {
                    res = max(res, abs(x1 - x2));
                }
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxWidthOfVerticalArea(points) {
        let n = points.length,
            res = 0;

        for (let i = 1; i < n; i++) {
            let x1 = points[i][0];
            for (let j = 0; j < i; j++) {
                let x2 = points[j][0];
                let hasPoints = false;

                for (let k = 0; k < n; k++) {
                    if (k === i || k === j) continue;

                    let x3 = points[k][0];
                    if (x3 > Math.min(x1, x2) && x3 < Math.max(x1, x2)) {
                        hasPoints = true;
                        break;
                    }
                }

                if (!hasPoints) {
                    res = Math.max(res, Math.abs(x1 - x2));
                }
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxWidthOfVerticalArea(int[][] points) {
        int n = points.Length, res = 0;

        for (int i = 1; i < n; i++) {
            int x1 = points[i][0];
            for (int j = 0; j < i; j++) {
                int x2 = points[j][0];
                bool hasPoints = false;

                for (int k = 0; k < n; k++) {
                    if (k == i || k == j) continue;

                    int x3 = points[k][0];
                    if (x3 > Math.Min(x1, x2) && x3 < Math.Max(x1, x2)) {
                        hasPoints = true;
                        break;
                    }
                }

                if (!hasPoints) {
                    res = Math.Max(res, Math.Abs(x1 - x2));
                }
            }
        }

        return res;
    }
}
```

```go
func maxWidthOfVerticalArea(points [][]int) int {
    n := len(points)
    res := 0

    for i := 1; i < n; i++ {
        x1 := points[i][0]
        for j := 0; j < i; j++ {
            x2 := points[j][0]
            hasPoints := false

            for k := 0; k < n; k++ {
                if k == i || k == j {
                    continue
                }

                x3 := points[k][0]
                if x3 > min(x1, x2) && x3 < max(x1, x2) {
                    hasPoints = true
                    break
                }
            }

            if !hasPoints {
                res = max(res, abs(x1-x2))
            }
        }
    }

    return res
}

func abs(x int) int {
    if x < 0 {
        return -x
    }
    return x
}
```

```kotlin
class Solution {
    fun maxWidthOfVerticalArea(points: Array<IntArray>): Int {
        val n = points.size
        var res = 0

        for (i in 1 until n) {
            val x1 = points[i][0]
            for (j in 0 until i) {
                val x2 = points[j][0]
                var hasPoints = false

                for (k in 0 until n) {
                    if (k == i || k == j) continue

                    val x3 = points[k][0]
                    if (x3 > minOf(x1, x2) && x3 < maxOf(x1, x2)) {
                        hasPoints = true
                        break
                    }
                }

                if (!hasPoints) {
                    res = maxOf(res, kotlin.math.abs(x1 - x2))
                }
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxWidthOfVerticalArea(_ points: [[Int]]) -> Int {
        let n = points.count
        var res = 0

        for i in 1..<n {
            let x1 = points[i][0]
            for j in 0..<i {
                let x2 = points[j][0]
                var hasPoints = false

                for k in 0..<n {
                    if k == i || k == j { continue }

                    let x3 = points[k][0]
                    if x3 > min(x1, x2) && x3 < max(x1, x2) {
                        hasPoints = true
                        break
                    }
                }

                if !hasPoints {
                    res = max(res, abs(x1 - x2))
                }
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$

---

## 2. Sorting

### Intuition
The key insight is that a vertical area containing no points must exist between two consecutive points when sorted by x-coordinate. If we sort all points by their x-values, the widest gap between adjacent points gives us the answer directly. This works because any non-adjacent pair would have at least one point between them, making that area invalid.

### Algorithm
1. Sort the `points` array by x-coordinate.
2. Iterate through consecutive pairs of sorted points.
3. For each consecutive pair, calculate the difference in their x-coordinates.
4. Return the maximum difference found.

::tabs-start

```python
class Solution:
    def maxWidthOfVerticalArea(self, points: List[List[int]]) -> int:
        points.sort()
        res = 0
        for i in range(len(points) - 1):
            res = max(res, points[i + 1][0] - points[i][0])
        return res
```

```java
public class Solution {
    public int maxWidthOfVerticalArea(int[][] points) {
        Arrays.sort(points, Comparator.comparingInt(a -> a[0]));
        int res = 0;

        for (int i = 0; i < points.length - 1; i++) {
            res = Math.max(res, points[i + 1][0] - points[i][0]);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxWidthOfVerticalArea(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](const auto& a, const auto& b) {
            return a[0] < b[0];
        });

        int res = 0;
        for (int i = 0; i < points.size() - 1; i++) {
            res = max(res, points[i + 1][0] - points[i][0]);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxWidthOfVerticalArea(points) {
        points.sort((a, b) => a[0] - b[0]);
        let res = 0;

        for (let i = 0; i < points.length - 1; i++) {
            res = Math.max(res, points[i + 1][0] - points[i][0]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxWidthOfVerticalArea(int[][] points) {
        Array.Sort(points, (a, b) => a[0].CompareTo(b[0]));
        int res = 0;

        for (int i = 0; i < points.Length - 1; i++) {
            res = Math.Max(res, points[i + 1][0] - points[i][0]);
        }

        return res;
    }
}
```

```go
func maxWidthOfVerticalArea(points [][]int) int {
    sort.Slice(points, func(i, j int) bool {
        return points[i][0] < points[j][0]
    })

    res := 0
    for i := 0; i < len(points)-1; i++ {
        res = max(res, points[i+1][0]-points[i][0])
    }

    return res
}
```

```kotlin
class Solution {
    fun maxWidthOfVerticalArea(points: Array<IntArray>): Int {
        points.sortBy { it[0] }
        var res = 0

        for (i in 0 until points.size - 1) {
            res = maxOf(res, points[i + 1][0] - points[i][0])
        }

        return res
    }
}
```

```swift
class Solution {
    func maxWidthOfVerticalArea(_ points: [[Int]]) -> Int {
        let sortedPoints = points.sorted { $0[0] < $1[0] }
        var res = 0

        for i in 0..<sortedPoints.count - 1 {
            res = max(res, sortedPoints[i + 1][0] - sortedPoints[i][0])
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## Common Pitfalls

### Using Y-Coordinates Instead of X-Coordinates
The problem asks for the widest *vertical* area, which means we need to find gaps along the x-axis. A common mistake is to consider y-coordinates or try to compute 2D distances between points.

```python
# Wrong: using y-coordinate
width = abs(points[i][1] - points[j][1])

# Correct: using x-coordinate only
width = abs(points[i][0] - points[j][0])
```

### Checking Non-Adjacent Points After Sorting
After sorting by x-coordinate, the maximum gap must occur between consecutive points. Some attempt to check all pairs even after sorting, which is unnecessary and leads to O(n^2) complexity.

```python
# Wrong: checking all pairs after sorting
for i in range(n):
    for j in range(i + 1, n):
        res = max(res, points[j][0] - points[i][0])

# Correct: only check adjacent pairs
for i in range(n - 1):
    res = max(res, points[i + 1][0] - points[i][0])
```

### Forgetting to Sort by X-Coordinate Only
When sorting 2D points, the default sort may use both x and y coordinates for tie-breaking. While this still works, some mistakenly sort by y-coordinate or use a complex comparator when only x matters.

```python
# Correct: sort by x-coordinate (y doesn't affect the answer)
points.sort(key=lambda p: p[0])
```
