## 1. Greedy (Sort By Start Value)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Greedy (Sort By End Value)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.
