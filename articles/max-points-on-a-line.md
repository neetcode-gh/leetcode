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

```csharp
public class Solution {
    public int MaxPoints(int[][] points) {
        int n = points.Length;
        if (n <= 2) return n;

        int res = 1;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j < n; j++) {
                double slope = GetSlope(points[i], points[j]);
                int cnt = 2;
                for (int k = j + 1; k < n; k++) {
                    if (slope == GetSlope(points[i], points[k])) {
                        cnt++;
                    }
                }
                res = Math.Max(res, cnt);
            }
        }
        return res;
    }

    private double GetSlope(int[] p1, int[] p2) {
        if (p1[0] == p2[0]) return double.PositiveInfinity;
        return (double)(p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
}
```

```go
func maxPoints(points [][]int) int {
    n := len(points)
    if n <= 2 {
        return n
    }

    getSlope := func(p1, p2 []int) float64 {
        if p1[0] == p2[0] {
            return math.Inf(1)
        }
        return float64(p2[1]-p1[1]) / float64(p2[0]-p1[0])
    }

    res := 1
    for i := 0; i < n; i++ {
        for j := i + 1; j < n; j++ {
            slope := getSlope(points[i], points[j])
            cnt := 2
            for k := j + 1; k < n; k++ {
                if slope == getSlope(points[i], points[k]) {
                    cnt++
                }
            }
            if cnt > res {
                res = cnt
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxPoints(points: Array<IntArray>): Int {
        val n = points.size
        if (n <= 2) return n

        fun getSlope(p1: IntArray, p2: IntArray): Double {
            if (p1[0] == p2[0]) return Double.POSITIVE_INFINITY
            return (p2[1] - p1[1]).toDouble() / (p2[0] - p1[0])
        }

        var res = 1
        for (i in 0 until n) {
            for (j in i + 1 until n) {
                val slope = getSlope(points[i], points[j])
                var cnt = 2
                for (k in j + 1 until n) {
                    if (slope == getSlope(points[i], points[k])) {
                        cnt++
                    }
                }
                res = maxOf(res, cnt)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxPoints(_ points: [[Int]]) -> Int {
        let n = points.count
        if n <= 2 { return n }

        func getSlope(_ p1: [Int], _ p2: [Int]) -> Double {
            if p1[0] == p2[0] { return Double.infinity }
            return Double(p2[1] - p1[1]) / Double(p2[0] - p1[0])
        }

        var res = 1
        for i in 0..<n {
            for j in (i + 1)..<n {
                let slope = getSlope(points[i], points[j])
                var cnt = 2
                for k in (j + 1)..<n {
                    if slope == getSlope(points[i], points[k]) {
                        cnt += 1
                    }
                }
                res = max(res, cnt)
            }
        }
        return res
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

```csharp
public class Solution {
    public int MaxPoints(int[][] points) {
        int res = 1;
        for (int i = 0; i < points.Length; i++) {
            var count = new Dictionary<double, int>();
            for (int j = i + 1; j < points.Length; j++) {
                double slope = GetSlope(points[i], points[j]);
                if (slope == -0.0) slope = 0.0;
                if (!count.ContainsKey(slope)) count[slope] = 0;
                count[slope]++;
                res = Math.Max(res, count[slope] + 1);
            }
        }
        return res;
    }

    private double GetSlope(int[] p1, int[] p2) {
        if (p1[0] == p2[0]) return double.PositiveInfinity;
        return (double)(p2[1] - p1[1]) / (p2[0] - p1[0]);
    }
}
```

```go
func maxPoints(points [][]int) int {
    res := 1
    for i := 0; i < len(points); i++ {
        p1 := points[i]
        count := make(map[float64]int)
        for j := i + 1; j < len(points); j++ {
            p2 := points[j]
            var slope float64
            if p2[0] == p1[0] {
                slope = math.Inf(1)
            } else {
                slope = float64(p2[1]-p1[1]) / float64(p2[0]-p1[0])
            }
            count[slope]++
            if count[slope]+1 > res {
                res = count[slope] + 1
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxPoints(points: Array<IntArray>): Int {
        var res = 1
        for (i in points.indices) {
            val count = mutableMapOf<Double, Int>()
            for (j in i + 1 until points.size) {
                var slope = if (points[j][0] == points[i][0]) {
                    Double.POSITIVE_INFINITY
                } else {
                    (points[j][1] - points[i][1]).toDouble() / (points[j][0] - points[i][0])
                }
                if (slope == -0.0) slope = 0.0
                count[slope] = count.getOrDefault(slope, 0) + 1
                res = maxOf(res, count[slope]!! + 1)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxPoints(_ points: [[Int]]) -> Int {
        var res = 1
        for i in 0..<points.count {
            var count = [Double: Int]()
            for j in (i + 1)..<points.count {
                var slope: Double
                if points[j][0] == points[i][0] {
                    slope = Double.infinity
                } else {
                    slope = Double(points[j][1] - points[i][1]) / Double(points[j][0] - points[i][0])
                }
                if slope == -0.0 { slope = 0.0 }
                count[slope, default: 0] += 1
                res = max(res, count[slope]! + 1)
            }
        }
        return res
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

```csharp
public class Solution {
    public int MaxPoints(int[][] points) {
        if (points.Length <= 2) return points.Length;

        int res = 1;
        for (int i = 0; i < points.Length - 1; i++) {
            var count = new Dictionary<string, int>();
            for (int j = i + 1; j < points.Length; j++) {
                int dx = points[j][0] - points[i][0];
                int dy = points[j][1] - points[i][1];
                int g = Gcd(dx, dy);
                dx /= g;
                dy /= g;
                string slope = dx + ":" + dy;
                if (!count.ContainsKey(slope)) count[slope] = 0;
                count[slope]++;
            }
            foreach (int val in count.Values) {
                res = Math.Max(res, val + 1);
            }
        }
        return res;
    }

    private int Gcd(int a, int b) {
        return b == 0 ? a : Gcd(b, a % b);
    }
}
```

```go
func maxPoints(points [][]int) int {
    if len(points) <= 2 {
        return len(points)
    }

    var gcd func(a, b int) int
    gcd = func(a, b int) int {
        if b == 0 {
            return a
        }
        return gcd(b, a%b)
    }

    res := 1
    for i := 0; i < len(points)-1; i++ {
        count := make(map[string]int)
        for j := i + 1; j < len(points); j++ {
            dx := points[j][0] - points[i][0]
            dy := points[j][1] - points[i][1]
            g := gcd(dx, dy)
            dx /= g
            dy /= g
            slope := fmt.Sprintf("%d:%d", dx, dy)
            count[slope]++
        }
        for _, freq := range count {
            if freq+1 > res {
                res = freq + 1
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxPoints(points: Array<IntArray>): Int {
        if (points.size <= 2) return points.size

        fun gcd(a: Int, b: Int): Int = if (b == 0) a else gcd(b, a % b)

        var res = 1
        for (i in 0 until points.size - 1) {
            val count = mutableMapOf<String, Int>()
            for (j in i + 1 until points.size) {
                var dx = points[j][0] - points[i][0]
                var dy = points[j][1] - points[i][1]
                val g = gcd(dx, dy)
                dx /= g
                dy /= g
                val slope = "$dx:$dy"
                count[slope] = count.getOrDefault(slope, 0) + 1
            }
            for (freq in count.values) {
                res = maxOf(res, freq + 1)
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxPoints(_ points: [[Int]]) -> Int {
        if points.count <= 2 { return points.count }

        func gcd(_ a: Int, _ b: Int) -> Int {
            return b == 0 ? a : gcd(b, a % b)
        }

        var res = 1
        for i in 0..<(points.count - 1) {
            var count = [String: Int]()
            for j in (i + 1)..<points.count {
                var dx = points[j][0] - points[i][0]
                var dy = points[j][1] - points[i][1]
                let g = gcd(dx, dy)
                dx /= g
                dy /= g
                let slope = "\(dx):\(dy)"
                count[slope, default: 0] += 1
            }
            for freq in count.values {
                res = max(res, freq + 1)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log m)$
- Space complexity: $O(n)$

> Where $n$ is the number of points and $m$ is the maximum value in the points.
