## 1. Hash Map - I

::tabs-start

```python
class CountSquares:
    def __init__(self):
        self.ptsCount = defaultdict(int)
        self.pts = []

    def add(self, point: List[int]) -> None:
        self.ptsCount[tuple(point)] += 1
        self.pts.append(point)

    def count(self, point: List[int]) -> int:
        res = 0
        px, py = point
        for x, y in self.pts:
            if (abs(py - y) != abs(px - x)) or x == px or y == py:
                continue
            res += self.ptsCount[(x, py)] * self.ptsCount[(px, y)]
        return res
```

```java
public class CountSquares {
    private Map<List<Integer>, Integer> ptsCount;
    private List<List<Integer>> pts;

    public CountSquares() {
        ptsCount = new HashMap<>();
        pts = new ArrayList<>();
    }

    public void add(int[] point) {
        List<Integer> p = Arrays.asList(point[0], point[1]);
        ptsCount.put(p, ptsCount.getOrDefault(p, 0) + 1);
        pts.add(p);
    }

    public int count(int[] point) {
        int res = 0;
        int px = point[0], py = point[1];
        for (List<Integer> pt : pts) {
            int x = pt.get(0), y = pt.get(1);
            if (Math.abs(py - y) != Math.abs(px - x) || x == px || y == py) {
                continue;
            }
            res += ptsCount.getOrDefault(Arrays.asList(x, py), 0) * 
                   ptsCount.getOrDefault(Arrays.asList(px, y), 0);
        }
        return res;
    }
}
```

```cpp
class CountSquares {
private:
    unordered_map<long, int> ptsCount;
    vector<vector<int>> pts;

    long getKey(int x, int y) {
        return (static_cast<long>(x) << 32) | static_cast<long>(y);
    }

public:
    CountSquares() {
    }

    void add(vector<int> point) {
        long key = getKey(point[0], point[1]);
        ptsCount[key]++; 
        pts.push_back(point); 
    }
    
    int count(vector<int> point) {
        int res = 0;
        int px = point[0], py = point[1];

        for (const auto& pt : pts) {
            int x = pt[0], y = pt[1];
            if (abs(py - y) != abs(px - x) || x == px || y == py) continue;
            res += ptsCount[getKey(x, py)] * ptsCount[getKey(px, y)];
        }
        return res;
    }
};
```

```javascript
class CountSquares {
    constructor() {
        this.ptsCount = new Map();
        this.pts = [];
    }

    /**
     * @param {number[]} point
     * @return {void}
     */
    add(point) {
        const p = point.join(',');
        this.ptsCount.set(p, (this.ptsCount.get(p) || 0) + 1);
        this.pts.push(point);
    }

    /**
     * @param {number[]} point
     * @return {number}
     */
    count(point) {
        let res = 0;
        const [px, py] = point;
        for (const [x, y] of this.pts) {
            if (Math.abs(py - y) !== Math.abs(px - x) || x === px || y === py) {
                continue;
            }
            res +=
                (this.ptsCount.get(`${x},${py}`) || 0) *
                (this.ptsCount.get(`${px},${y}`) || 0);
        }
        return res;
    }
}
```

```csharp
public class CountSquares {
    private Dictionary<(int, int), int> ptsCount;
    private List<int[]> pts;

    public CountSquares() {
        ptsCount = new Dictionary<(int, int), int>();
        pts = new List<int[]>();
    }

    public void Add(int[] point) {
        var tuplePoint = (point[0], point[1]);
        if (!ptsCount.ContainsKey(tuplePoint))
            ptsCount[tuplePoint] = 0;
        
        ptsCount[tuplePoint]++;
        pts.Add(point);
    }

    public int Count(int[] point) {
        int res = 0;
        int px = point[0];
        int py = point[1];
        
        foreach (var pt in pts) {
            int x = pt[0];
            int y = pt[1];

            if (Math.Abs(py - y) != Math.Abs(px - x) || x == px || y == py)
                continue;

            res += (ptsCount.GetValueOrDefault((x, py)) * 
                   ptsCount.GetValueOrDefault((px, y)));
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $add()$, $O(n)$ for $count()$.
* Space complexity: $O(n)$

---

## 2. Hash Map - II

::tabs-start

```python
class CountSquares:

    def __init__(self):
        self.ptsCount = defaultdict(lambda: defaultdict(int))

    def add(self, point: List[int]) -> None:
        self.ptsCount[point[0]][point[1]] += 1

    def count(self, point: List[int]) -> int:
        res = 0
        x1, y1 = point
        for y2 in self.ptsCount[x1]:
            side = y2 - y1
            if side == 0:
                continue

            x3, x4 = x1 + side, x1 - side
            res += (self.ptsCount[x1][y2] * self.ptsCount[x3][y1] *
                    self.ptsCount[x3][y2])

            res += (self.ptsCount[x1][y2] * self.ptsCount[x4][y1] *
                    self.ptsCount[x4][y2])
        return res
```

```java
public class CountSquares {
    private Map<Integer, Map<Integer, Integer>> ptsCount;

    public CountSquares() {
        ptsCount = new HashMap<>();
    }

    public void add(int[] point) {
        int x = point[0], y = point[1];
        ptsCount.putIfAbsent(x, new HashMap<>());
        ptsCount.get(x).put(y, ptsCount.get(x).getOrDefault(y, 0) + 1);
    }

    public int count(int[] point) {
        int res = 0, x1 = point[0], y1 = point[1];

        if (!ptsCount.containsKey(x1)) return res;

        for (int y2 : ptsCount.get(x1).keySet()) {
            int side = y2 - y1;
            if (side == 0) continue;

            int x3 = x1 + side, x4 = x1 - side;
            res += ptsCount.get(x1).get(y2) *
                   ptsCount.getOrDefault(x3, new HashMap<>()).getOrDefault(y1, 0) *
                   ptsCount.getOrDefault(x3, new HashMap<>()).getOrDefault(y2, 0);

            res += ptsCount.get(x1).get(y2) *
                   ptsCount.getOrDefault(x4, new HashMap<>()).getOrDefault(y1, 0) *
                   ptsCount.getOrDefault(x4, new HashMap<>()).getOrDefault(y2, 0);
        }

        return res;
    }
}
```

```cpp
class CountSquares {
    unordered_map<int, unordered_map<int, int>> ptsCount;
public:
    CountSquares() {
        
    }
    
    void add(vector<int> point) {
        ptsCount[point[0]][point[1]]++;
    }

    int count(vector<int> point) {
        int res = 0;
        int x1 = point[0], y1 = point[1];

        for (auto &[y2, cnt] : ptsCount[x1]) {
            int side = y2 - y1;
            if (side == 0) continue;

            int x3 = x1 + side, x4 = x1 - side;
            res += cnt * ptsCount[x3][y1] * ptsCount[x3][y2];
            res += cnt * ptsCount[x4][y1] * ptsCount[x4][y2];
        }

        return res;
    }
};
```

```javascript
class CountSquares {
    constructor() {
        this.ptsCount = new Map();
    }

    /**
     * @param {number[]} point
     * @return {void}
     */
    add(point) {
        const [x, y] = point;
        if (!this.ptsCount.has(x)) this.ptsCount.set(x, new Map());
        const yCount = this.ptsCount.get(x);
        yCount.set(y, (yCount.get(y) || 0) + 1);
    }

    /**
     * @param {number[]} point
     * @return {number}
     */
    count(point) {
        let res = 0;
        const [x1, y1] = point;
        if (!this.ptsCount.has(x1)) return res;

        const x1Points = this.ptsCount.get(x1);
        for (const [y2, cnt] of x1Points) {
            const side = y2 - y1;
            if (side === 0) continue;

            const x3 = x1 + side;
            const x4 = x1 - side;

            res += cnt *
                   (this.ptsCount.get(x3)?.get(y1) || 0) *
                   (this.ptsCount.get(x3)?.get(y2) || 0);

            res += cnt *
                   (this.ptsCount.get(x4)?.get(y1) || 0) *
                   (this.ptsCount.get(x4)?.get(y2) || 0);
        }

        return res;
    }
}
```

```csharp
public class CountSquares {
    private Dictionary<int, Dictionary<int, int>> ptsCount;

    public CountSquares() {
        ptsCount = new Dictionary<int, Dictionary<int, int>>();
    }

    public void Add(int[] point) {
        int x = point[0], y = point[1];
        if (!ptsCount.ContainsKey(x)) {
            ptsCount[x] = new Dictionary<int, int>();
        }
        if (!ptsCount[x].ContainsKey(y)) ptsCount[x][y] = 0;
        ptsCount[x][y]++;
    }

    public int Count(int[] point) {
        int res = 0;
        int x1 = point[0], y1 = point[1];

        if (!ptsCount.ContainsKey(x1)) return res;

        foreach (var kv in ptsCount[x1]) {
            int y2 = kv.Key, cnt = kv.Value;
            int side = y2 - y1;
            if (side == 0) continue;

            int x3 = x1 + side, x4 = x1 - side;

            res += cnt *
                   (ptsCount.ContainsKey(x3) && 
                    ptsCount[x3].ContainsKey(y1) ? ptsCount[x3][y1] : 0) *
                   (ptsCount.ContainsKey(x3) && 
                    ptsCount[x3].ContainsKey(y2) ? ptsCount[x3][y2] : 0);

            res += cnt *
                   (ptsCount.ContainsKey(x4) && 
                    ptsCount[x4].ContainsKey(y1) ? ptsCount[x4][y1] : 0) *
                   (ptsCount.ContainsKey(x4) && 
                    ptsCount[x4].ContainsKey(y2) ? ptsCount[x4][y2] : 0);
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $add()$, $O(n)$ for $count()$.
* Space complexity: $O(n)$