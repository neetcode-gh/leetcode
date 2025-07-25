## 1. Brute Force

::tabs-start

```python
class Solution:
    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        res = 0
        for i in range(1, len(rectangles)):
            for j in range(i):
                if rectangles[i][0] / rectangles[i][1] == rectangles[j][0] / rectangles[j][1]:
                    res += 1
        return res
```

```java
public class Solution {
    public long interchangeableRectangles(int[][] rectangles) {
        long res = 0;
        for (int i = 1; i < rectangles.length; i++) {
            for (int j = 0; j < i; j++) {
                if ((double) rectangles[i][0] / rectangles[i][1] == (double) rectangles[j][0] / rectangles[j][1]) {
                    res++;
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
    long long interchangeableRectangles(vector<vector<int>>& rectangles) {
        long long res = 0;
        for (int i = 1; i < rectangles.size(); i++) {
            for (int j = 0; j < i; j++) {
                if ((double) rectangles[i][0] / rectangles[i][1] == (double) rectangles[j][0] / rectangles[j][1]) {
                    res++;
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
     * @param {number[][]} rectangles
     * @return {number}
     */
    interchangeableRectangles(rectangles) {
        let res = 0;
        for (let i = 1; i < rectangles.length; i++) {
            for (let j = 0; j < i; j++) {
                if (
                    rectangles[i][0] / rectangles[i][1] ===
                    rectangles[j][0] / rectangles[j][1]
                ) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map (Two Pass)

::tabs-start

```python
class Solution:
    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        count = {}
        for w, h in rectangles:
            count[w / h] = 1 + count.get(w / h, 0)

        res = 0
        for c in count.values():
            if c > 1:
                res += (c * (c - 1)) // 2
        return res
```

```java
public  class Solution {
    public long interchangeableRectangles(int[][] rectangles) {
        HashMap<Double, Integer> count = new HashMap<>();
        for (int[] rect : rectangles) {
            double ratio = (double) rect[0] / rect[1];
            count.put(ratio, count.getOrDefault(ratio, 0) + 1);
        }

        long res = 0;
        for (int c : count.values()) {
            if (c > 1) {
                res += (c * 1L * (c - 1)) / 2;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long interchangeableRectangles(vector<vector<int>>& rectangles) {
        unordered_map<double, int> count;
        for (const auto& rect : rectangles) {
            double ratio = (double) rect[0] / rect[1];
            count[ratio]++;
        }

        long long res = 0;
        for (const auto& [key, c] : count) {
            if (c > 1) {
                res += (c * 1LL * (c - 1)) / 2;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} rectangles
     * @return {number}
     */
    interchangeableRectangles(rectangles) {
        const count = new Map();
        for (const [w, h] of rectangles) {
            const ratio = w / h;
            count.set(ratio, (count.get(ratio) || 0) + 1);
        }

        let res = 0;
        for (const c of count.values()) {
            if (c > 1) {
                res += (c * (c - 1)) / 2;
            }
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Map (One Pass)

::tabs-start

```python
class Solution:
    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        count = {}
        res = 0
        for w, h in rectangles:
            res += count.get(w / h, 0)
            count[w / h] = 1 + count.get(w / h, 0)
        return res
```

```java
public  class Solution {
    public long interchangeableRectangles(int[][] rectangles) {
        HashMap<Double, Integer> count = new HashMap<>();
        long res = 0;
        for (int[] rect : rectangles) {
            double ratio = (double) rect[0] / rect[1];
            res += count.getOrDefault(ratio, 0);
            count.put(ratio, count.getOrDefault(ratio, 0) + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    long long interchangeableRectangles(vector<vector<int>>& rectangles) {
        unordered_map<double, int> count;
        long long res = 0;
        for (const auto& rect : rectangles) {
            double ratio = (double) rect[0] / rect[1];
            res += count[ratio];
            count[ratio]++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} rectangles
     * @return {number}
     */
    interchangeableRectangles(rectangles) {
        const count = new Map();
        let res = 0;
        for (const [w, h] of rectangles) {
            const ratio = w / h;
            res += count.get(ratio) || 0;
            count.set(ratio, (count.get(ratio) || 0) + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Greatest Common Divisor

::tabs-start

```python
class Solution:
    def hash(self, a: int, b: int) -> int:
        mask = a
        mask |= (b << 31)
        return mask

    def interchangeableRectangles(self, rectangles: List[List[int]]) -> int:
        res = 0
        count = {}
        for rect in rectangles:
            gcd = math.gcd(rect[0], rect[1])
            key = self.hash(rect[0] // gcd, rect[1] // gcd)
            res += count.get(key, 0)
            count[key] = count.get(key, 0) + 1
        return res
```

```java
public class Solution {
    public long hash(int a, int b) {
        long mask = a;
        mask |= ((long)b << 31);
        return mask;
    }

    public long interchangeableRectangles(int[][] rectangles) {
        long res = 0;
        Map<Long, Integer> count = new HashMap<>();
        for (int[] rect : rectangles) {
            int gcd = gcd(rect[0], rect[1]);
            long key = hash(rect[0] / gcd, rect[1] / gcd);
            res += count.getOrDefault(key, 0);
            count.put(key, count.getOrDefault(key, 0) + 1);
        }
        return res;
    }

    private int gcd(int a, int b) {
        while (b != 0) {
            a %= b;
            int temp = a;
            a = b;
            b = temp;
        }
        return a;
    }
}
```

```cpp
class Solution {
public:
    long long hash(int a, int b) {
        long long mask = a;
        mask |= ((long long)b << 31);
        return mask;
    }

    long long interchangeableRectangles(vector<vector<int>>& rectangles) {
        long long res = 0;
        unordered_map<long long, int> count;
        for (const auto& rect : rectangles) {
            int gcd = __gcd(rect[0], rect[1]);
            long long key = hash(rect[0] / gcd, rect[1] / gcd);
            res += count[key];
            count[key]++;
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} a
     * @param {number} b
     * @return {string}
     */
    hash(a, b) {
        return `${a},${b}`;
    }

    /**
     * @param {number[][]} rectangles
     * @return {number}
     */
    interchangeableRectangles(rectangles) {
        let res = 0;
        const count = new Map();

        const gcd = (a, b) => {
            while (b !== 0) {
                a %= b;
                [a, b] = [b, a];
            }
            return a;
        };

        for (const rect of rectangles) {
            const g = gcd(rect[0], rect[1]);
            const key = this.hash(
                Math.floor(rect[0] / g),
                Math.floor(rect[1] / g),
            );
            res += count.get(key) || 0;
            count.set(key, (count.get(key) || 0) + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
