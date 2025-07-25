## 1. Math

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        n = len(points)
        if n <= 2:
            return n

        def get_slope(p1, p2):
            if p1[0] == p2[0]:
                return float("inf")
            return (p2[1] - p1[1]) / (p2[0] - p1[0])

        res = 1
        for i in range(n):
            for j in range(i + 1, n):
                slope = get_slope(points[i], points[j])
                cnt = 2
                for k in range(j + 1, n):
                    if slope == get_slope(points[i], points[k]):
                        cnt += 1
                res = max(res, cnt)

        return res
```

```java
public class Solution {
    public int maxPoints(int[][] points) {
        int n = points.length;
        if (n <= 2) {
            return n;
        }

        int res = 1;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                double slope = getSlope(points[i], points[j]);
                int cnt = 2;
                for (int k = j + 1; k < n; k++) {
                    if (slope == getSlope(points[i], points[k])) {
                        cnt++;
                    }
                }
                res = Math.max(res, cnt);
            }
        }

        return res;
    }

    private double getSlope(int[] p1, int[] p2) {
        if (p1[0] == p2[0]) {
            return Double.POSITIVE_INFINITY;
        }
        return (double) (p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
}
```

```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int n = points.size();
        if (n <= 2) {
            return n;
        }

        int res = 1;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                double slope = getSlope(points[i], points[j]);
                int cnt = 2;
                for (int k = j + 1; k < n; k++) {
                    if (slope == getSlope(points[i], points[k])) {
                        cnt++;
                    }
                }
                res = max(res, cnt);
            }
        }

        return res;
    }

private:
    double getSlope(vector<int>& p1, vector<int>& p2) {
        if (p1[0] == p2[0]) {
            return INFINITY;
        }
        return (double)(p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        const n = points.length;
        if (n <= 2) {
            return n;
        }

        let res = 1;
        const getSlope = (p1, p2) => {
            if (p1[0] === p2[0]) {
                return Infinity;
            }
            return (p2[1] - p1[1]) / (p2[0] - p1[0]);
        };

        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j < n; j++) {
                const slope = getSlope(points[i], points[j]);
                let cnt = 2;
                for (let k = j + 1; k < n; k++) {
                    if (slope === getSlope(points[i], points[k])) {
                        cnt++;
                    }
                }
                res = Math.max(res, cnt);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 3)$
- Space complexity: $O(1)$ extra space.

---

## 2. Math + Hash Map

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        res = 1
        for i in range(len(points)):
            p1 = points[i]
            count = defaultdict(int)
            for j in range(i + 1, len(points)):
                p2 = points[j]
                if p2[0] == p1[0]:
                    slope = float("inf")
                else:
                    slope = (p2[1] - p1[1]) / (p2[0] - p1[0])
                count[slope] += 1
                res = max(res, count[slope] + 1)
        return res
```

```java
public class Solution {
    public int maxPoints(int[][] points) {
        int res = 1;
        for (int i = 0; i < points.length; i++) {
            Map<Double, Integer> count = new HashMap<>();
            for (int j = i + 1; j < points.length; j++) {
                double slope = getSlope(points[i], points[j]);
                if (slope == -0.0) slope = 0.0;

                count.put(slope, count.getOrDefault(slope, 0) + 1);
                res = Math.max(res, count.get(slope) + 1);
            }
        }
        return res;
    }

    private double getSlope(int[] p1, int[] p2) {
        if (p1[0] == p2[0]) {
            return Double.POSITIVE_INFINITY;
        }
        return (double) (p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
}
```

```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        int res = 1;
        for (int i = 0; i < points.size(); i++) {
            vector<int>& p1 = points[i];
            unordered_map<double, int> count;
            for (int j = i + 1; j < points.size(); j++) {
                vector<int>& p2 = points[j];
                double slope = (p2[0] == p1[0]) ? INFINITY :
                               (double)(p2[1] - p1[1]) / (p2[0] - p1[0]);
                count[slope]++;
                res = max(res, count[slope] + 1);
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
    maxPoints(points) {
        let res = 1;
        for (let i = 0; i < points.length; i++) {
            const p1 = points[i];
            const count = new Map();
            for (let j = i + 1; j < points.length; j++) {
                const p2 = points[j];
                const slope =
                    p2[0] === p1[0]
                        ? Infinity
                        : (p2[1] - p1[1]) / (p2[0] - p1[0]);
                count.set(slope, (count.get(slope) || 0) + 1);
                res = Math.max(res, count.get(slope) + 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(n)$

---

## 3. Math + Hash Map (Optimal)

::tabs-start

```python
class Solution:
    def maxPoints(self, points: List[List[int]]) -> int:
        if len(points) <= 2:
            return len(points)

        def gcd(a, b):
            return gcd(b, a % b) if b else a

        res = 1
        for i in range(len(points) - 1):
            count = defaultdict(int)
            for j in range(i + 1, len(points)):
                dx = points[j][0] - points[i][0]
                dy = points[j][1] - points[i][1]
                g = gcd(dx, dy)
                dx //= g
                dy //= g
                slope = (dx, dy)
                count[slope] += 1
            res = max(res, max(count.values()) + 1)
        return res
```

```java
public class Solution {
    public int maxPoints(int[][] points) {
        if (points.length <= 2) {
            return points.length;
        }

        int res = 1;
        for (int i = 0; i < points.length - 1; i++) {
            Map<String, Integer> count = new HashMap<>();
            for (int j = i + 1; j < points.length; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g;
                dy /= g;
                String slope = dx + ":" + dy;
                count.put(slope, count.getOrDefault(slope, 0) + 1);
            }
            for (int val : count.values()) {
                res = Math.max(res, val + 1);
            }
        }
        return res;
    }

    private int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
}
```

```cpp
class Solution {
public:
    int maxPoints(vector<vector<int>>& points) {
        if (points.size() <= 2) {
            return points.size();
        }

        int res = 1;
        for (int i = 0; i < points.size() - 1; i++) {
            unordered_map<string, int> count;
            for (int j = i + 1; j < points.size(); j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = gcd(dx, dy);
                dx /= g;
                dy /= g;
                string slope = to_string(dx) + ":" + to_string(dy);
                count[slope]++;
            }
            for (const auto& [slope, freq] : count) {
                res = max(res, freq + 1);
            }
        }
        return res;
    }

private:
    int gcd(int a, int b) {
        return b == 0 ? a : gcd(b, a % b);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @return {number}
     */
    maxPoints(points) {
        if (points.length <= 2) {
            return points.length;
        }

        const gcd = (a, b) => (b === 0 ? a : gcd(b, a % b));

        let res = 1;
        for (let i = 0; i < points.length - 1; i++) {
            const count = new Map();
            for (let j = i + 1; j < points.length; j++) {
                let dx = points[j][0] - points[i][0];
                let dy = points[j][1] - points[i][1];
                const g = gcd(dx, dy);
                dx /= g;
                dy /= g;
                const slope = `${dx}:${dy}`;
                count.set(slope, (count.get(slope) || 0) + 1);
            }
            for (const freq of count.values()) {
                res = Math.max(res, freq + 1);
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log m)$
- Space complexity: $O(n)$

> Where $n$ is the number of points and $m$ is the maximum value in the points.
