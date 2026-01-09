## 1. Greedy (Sort By Start Value)

### Intuition

Think of each balloon as a horizontal range on a number line. If two balloons overlap, a single arrow can pop both. The key insight is that by sorting balloons by their starting position, we can process them left to right and greedily merge overlapping intervals.

When we encounter a new balloon, we check if it overlaps with the previous group. If it does, we shrink the overlap region by taking the minimum of the end values. If not, we need a new arrow. We start by assuming each balloon needs its own arrow, then subtract one for each overlap we find.

### Algorithm

1. Sort the intervals by their starting position.
2. Initialize result as the total number of balloons and track the previous interval's end.
3. For each subsequent balloon:
   - If it overlaps with the previous group (its start is at or before the tracked end), decrement the result and update the tracked end to be the minimum of both ends.
   - Otherwise, start a new group by updating the tracked end to this balloon's end.
4. Return the result.

::tabs-start

```python
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        points.sort()
        res, prevEnd = len(points), points[0][1]

        for i in range(1, len(points)):
            curr = points[i]
            if curr[0] <= prevEnd:
                res -= 1
                prevEnd = min(curr[1], prevEnd)
            else:
                prevEnd = curr[1]

        return res
```

```java
public class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[0], b[0]));
        int res = points.length, prevEnd = points[0][1];

        for (int i = 1; i < points.length; i++) {
            int[] curr = points[i];
            if (curr[0] <= prevEnd) {
                res--;
                prevEnd = Math.min(curr[1], prevEnd);
            } else {
                prevEnd = curr[1];
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end());
        int res = points.size(), prevEnd = points[0][1];

        for (int i = 1; i < points.size(); i++) {
            vector<int>& curr = points[i];
            if (curr[0] <= prevEnd) {
                res--;
                prevEnd = min(curr[1], prevEnd);
            } else {
                prevEnd = curr[1];
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
    findMinArrowShots(points) {
        points.sort((a, b) => a[0] - b[0]);
        let res = points.length,
            prevEnd = points[0][1];

        for (let i = 1; i < points.length; i++) {
            let curr = points[i];
            if (curr[0] <= prevEnd) {
                res--;
                prevEnd = Math.min(curr[1], prevEnd);
            } else {
                prevEnd = curr[1];
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMinArrowShots(int[][] points) {
        Array.Sort(points, (a, b) => a[0].CompareTo(b[0]));
        int res = points.Length, prevEnd = points[0][1];

        for (int i = 1; i < points.Length; i++) {
            int[] curr = points[i];
            if (curr[0] <= prevEnd) {
                res--;
                prevEnd = Math.Min(curr[1], prevEnd);
            } else {
                prevEnd = curr[1];
            }
        }

        return res;
    }
}
```

```go
func findMinArrowShots(points [][]int) int {
    sort.Slice(points, func(i, j int) bool {
        return points[i][0] < points[j][0]
    })
    res, prevEnd := len(points), points[0][1]

    for i := 1; i < len(points); i++ {
        curr := points[i]
        if curr[0] <= prevEnd {
            res--
            prevEnd = min(curr[1], prevEnd)
        } else {
            prevEnd = curr[1]
        }
    }

    return res
}

func min(a, b int) int {
    if a < b {
        return a
    }
    return b
}
```

```kotlin
class Solution {
    fun findMinArrowShots(points: Array<IntArray>): Int {
        points.sortBy { it[0] }
        var res = points.size
        var prevEnd = points[0][1]

        for (i in 1 until points.size) {
            val curr = points[i]
            if (curr[0] <= prevEnd) {
                res--
                prevEnd = minOf(curr[1], prevEnd)
            } else {
                prevEnd = curr[1]
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findMinArrowShots(_ points: [[Int]]) -> Int {
        let sortedPoints = points.sorted { $0[0] < $1[0] }
        var res = sortedPoints.count
        var prevEnd = sortedPoints[0][1]

        for i in 1..<sortedPoints.count {
            let curr = sortedPoints[i]
            if curr[0] <= prevEnd {
                res -= 1
                prevEnd = min(curr[1], prevEnd)
            } else {
                prevEnd = curr[1]
            }
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

## 2. Greedy (Sort By End Value)

### Intuition

Sorting by end position offers a cleaner greedy approach. By shooting an arrow at the end of the first balloon, we maximize the chance of hitting subsequent balloons. Each balloon that starts after our current arrow position requires a new arrow.

This is a classic interval scheduling pattern: always pick the earliest finishing interval first. When we shoot at the end of a balloon, any other balloon that overlaps must have started before or at that point.

### Algorithm

1. Sort the balloons by their ending position.
2. Start with one arrow at the end of the first balloon.
3. For each subsequent balloon:
   - If it starts after the current arrow position, shoot a new arrow at this balloon's end and increment the count.
   - Otherwise, the current arrow already covers this balloon.
4. Return the total arrow count.

::tabs-start

```python
class Solution:
    def findMinArrowShots(self, points: List[List[int]]) -> int:
        points.sort(key=lambda x: x[1])
        res, prevEnd = 1, points[0][1]

        for i in range(1, len(points)):
            if points[i][0] > prevEnd:
                prevEnd = points[i][1]
                res += 1

        return res
```

```java
public class Solution {
    public int findMinArrowShots(int[][] points) {
        Arrays.sort(points, (a, b) -> Integer.compare(a[1], b[1]));
        int res = 1, prevEnd = points[0][1];

        for (int i = 1; i < points.length; i++) {
            if (points[i][0] > prevEnd) {
                prevEnd = points[i][1];
                res++;
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int findMinArrowShots(vector<vector<int>>& points) {
        sort(points.begin(), points.end(), [](const auto& a, const auto& b) {
            return a[1] < b[1];
        });
        int res = 1, prevEnd = points[0][1];

        for (int i = 1; i < points.size(); i++) {
            if (points[i][0] > prevEnd) {
                prevEnd = points[i][1];
                res++;
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
    findMinArrowShots(points) {
        points.sort((a, b) => a[1] - b[1]);
        let res = 1,
            prevEnd = points[0][1];

        for (let i = 1; i < points.length; i++) {
            if (points[i][0] > prevEnd) {
                prevEnd = points[i][1];
                res++;
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int FindMinArrowShots(int[][] points) {
        Array.Sort(points, (a, b) => a[1].CompareTo(b[1]));
        int res = 1, prevEnd = points[0][1];

        for (int i = 1; i < points.Length; i++) {
            if (points[i][0] > prevEnd) {
                prevEnd = points[i][1];
                res++;
            }
        }

        return res;
    }
}
```

```go
func findMinArrowShots(points [][]int) int {
    sort.Slice(points, func(i, j int) bool {
        return points[i][1] < points[j][1]
    })
    res, prevEnd := 1, points[0][1]

    for i := 1; i < len(points); i++ {
        if points[i][0] > prevEnd {
            prevEnd = points[i][1]
            res++
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun findMinArrowShots(points: Array<IntArray>): Int {
        points.sortBy { it[1] }
        var res = 1
        var prevEnd = points[0][1]

        for (i in 1 until points.size) {
            if (points[i][0] > prevEnd) {
                prevEnd = points[i][1]
                res++
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func findMinArrowShots(_ points: [[Int]]) -> Int {
        let sortedPoints = points.sorted { $0[1] < $1[1] }
        var res = 1
        var prevEnd = sortedPoints[0][1]

        for i in 1..<sortedPoints.count {
            if sortedPoints[i][0] > prevEnd {
                prevEnd = sortedPoints[i][1]
                res += 1
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
