## 1. Brute Force

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
