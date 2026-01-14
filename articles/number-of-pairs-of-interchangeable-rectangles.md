## 1. Brute Force

### Intuition

Two rectangles are interchangeable if they have the same aspect ratio (width divided by height). The simplest approach is to compare every pair of rectangles and check if their ratios match. For each pair where the ratios are equal, we count it as an interchangeable pair.

### Algorithm

1. Initialize a counter `res` to `0`.
2. For each rectangle `i` from `1` to `n-1`:
   - For each rectangle `j` from `0` to `i-1`:
     - If `rectangles[i][0] / rectangles[i][1]` equals `rectangles[j][0] / rectangles[j][1]`, increment `res`.
3. Return `res`.

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

```csharp
public class Solution {
    public long InterchangeableRectangles(int[][] rectangles) {
        long res = 0;
        for (int i = 1; i < rectangles.Length; i++) {
            for (int j = 0; j < i; j++) {
                if ((double)rectangles[i][0] / rectangles[i][1] ==
                    (double)rectangles[j][0] / rectangles[j][1]) {
                    res++;
                }
            }
        }
        return res;
    }
}
```

```go
func interchangeableRectangles(rectangles [][]int) int64 {
    var res int64 = 0
    for i := 1; i < len(rectangles); i++ {
        for j := 0; j < i; j++ {
            if float64(rectangles[i][0])/float64(rectangles[i][1]) ==
               float64(rectangles[j][0])/float64(rectangles[j][1]) {
                res++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun interchangeableRectangles(rectangles: Array<IntArray>): Long {
        var res = 0L
        for (i in 1 until rectangles.size) {
            for (j in 0 until i) {
                if (rectangles[i][0].toDouble() / rectangles[i][1] ==
                    rectangles[j][0].toDouble() / rectangles[j][1]) {
                    res++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func interchangeableRectangles(_ rectangles: [[Int]]) -> Int {
        var res = 0
        for i in 1..<rectangles.count {
            for j in 0..<i {
                if Double(rectangles[i][0]) / Double(rectangles[i][1]) ==
                   Double(rectangles[j][0]) / Double(rectangles[j][1]) {
                    res += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Hash Map (Two Pass)

### Intuition

Instead of comparing every pair, we can group rectangles by their aspect ratio. Rectangles with the same ratio form a group, and any two rectangles in the same group are interchangeable. If a group has `c` rectangles, the number of pairs is `c * (c-1) / 2` (choosing 2 from `c`). We use a hash map to count how many rectangles share each ratio.

### Algorithm

1. Create a hash map `count` to store the frequency of each aspect ratio.
2. First pass: for each rectangle, compute its ratio and increment the count in the map.
3. Second pass: for each ratio with count `c > 1`, add `c * (c-1) / 2` to the result.
4. Return the total count of interchangeable pairs.

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

```csharp
public class Solution {
    public long InterchangeableRectangles(int[][] rectangles) {
        var count = new Dictionary<double, int>();
        foreach (var rect in rectangles) {
            double ratio = (double)rect[0] / rect[1];
            if (!count.ContainsKey(ratio)) count[ratio] = 0;
            count[ratio]++;
        }

        long res = 0;
        foreach (var c in count.Values) {
            if (c > 1) {
                res += (long)c * (c - 1) / 2;
            }
        }
        return res;
    }
}
```

```go
func interchangeableRectangles(rectangles [][]int) int64 {
    count := make(map[float64]int)
    for _, rect := range rectangles {
        ratio := float64(rect[0]) / float64(rect[1])
        count[ratio]++
    }

    var res int64 = 0
    for _, c := range count {
        if c > 1 {
            res += int64(c) * int64(c-1) / 2
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun interchangeableRectangles(rectangles: Array<IntArray>): Long {
        val count = HashMap<Double, Int>()
        for (rect in rectangles) {
            val ratio = rect[0].toDouble() / rect[1]
            count[ratio] = count.getOrDefault(ratio, 0) + 1
        }

        var res = 0L
        for (c in count.values) {
            if (c > 1) {
                res += c.toLong() * (c - 1) / 2
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func interchangeableRectangles(_ rectangles: [[Int]]) -> Int {
        var count = [Double: Int]()
        for rect in rectangles {
            let ratio = Double(rect[0]) / Double(rect[1])
            count[ratio, default: 0] += 1
        }

        var res = 0
        for c in count.values {
            if c > 1 {
                res += c * (c - 1) / 2
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 3. Hash Map (One Pass)

### Intuition

We can optimize the two-pass approach into a single pass. As we process each rectangle, we check how many rectangles with the same ratio we have seen before. Each previously seen rectangle with the same ratio forms a new interchangeable pair with the current rectangle. This way, we count pairs incrementally as we go.

### Algorithm

1. Create a hash map `count` to store the frequency of each aspect ratio.
2. Initialize `res` to `0`.
3. For each rectangle:
   - Compute its aspect ratio.
   - Add the current count for this ratio to `res` (each previous rectangle with this ratio forms a pair).
   - Increment the count for this ratio in the map.
4. Return `res`.

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

```csharp
public class Solution {
    public long InterchangeableRectangles(int[][] rectangles) {
        var count = new Dictionary<double, int>();
        long res = 0;
        foreach (var rect in rectangles) {
            double ratio = (double)rect[0] / rect[1];
            if (count.ContainsKey(ratio)) {
                res += count[ratio];
                count[ratio]++;
            } else {
                count[ratio] = 1;
            }
        }
        return res;
    }
}
```

```go
func interchangeableRectangles(rectangles [][]int) int64 {
    count := make(map[float64]int)
    var res int64 = 0
    for _, rect := range rectangles {
        ratio := float64(rect[0]) / float64(rect[1])
        res += int64(count[ratio])
        count[ratio]++
    }
    return res
}
```

```kotlin
class Solution {
    fun interchangeableRectangles(rectangles: Array<IntArray>): Long {
        val count = HashMap<Double, Int>()
        var res = 0L
        for (rect in rectangles) {
            val ratio = rect[0].toDouble() / rect[1]
            res += count.getOrDefault(ratio, 0)
            count[ratio] = count.getOrDefault(ratio, 0) + 1
        }
        return res
    }
}
```

```swift
class Solution {
    func interchangeableRectangles(_ rectangles: [[Int]]) -> Int {
        var count = [Double: Int]()
        var res = 0
        for rect in rectangles {
            let ratio = Double(rect[0]) / Double(rect[1])
            res += count[ratio, default: 0]
            count[ratio, default: 0] += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 4. Greatest Common Divisor

### Intuition

Using floating-point division for ratios can lead to precision issues with very large numbers. A more robust approach is to reduce each ratio to its simplest form using the greatest common divisor (`GCD`). Two rectangles have the same ratio if and only if their reduced forms are identical. We can pack the reduced width and height into a single integer key for efficient hashing.

### Algorithm

1. Create a hash map `count` to store the frequency of each normalized ratio.
2. Initialize `res` to `0`.
3. For each rectangle:
   - Compute the `GCD` of width and height.
   - Divide both by the `GCD` to get the reduced form.
   - Create a unique hash key by combining the reduced width and height (e.g., using bit shifting).
   - Add the current count for this key to `res`.
   - Increment the count for this key in the map.
4. Return `res`.

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

```csharp
public class Solution {
    private long Hash(int a, int b) {
        long mask = a;
        mask |= ((long)b << 31);
        return mask;
    }

    private int Gcd(int a, int b) {
        while (b != 0) {
            a %= b;
            int temp = a;
            a = b;
            b = temp;
        }
        return a;
    }

    public long InterchangeableRectangles(int[][] rectangles) {
        long res = 0;
        var count = new Dictionary<long, int>();
        foreach (var rect in rectangles) {
            int gcd = Gcd(rect[0], rect[1]);
            long key = Hash(rect[0] / gcd, rect[1] / gcd);
            if (count.ContainsKey(key)) {
                res += count[key];
                count[key]++;
            } else {
                count[key] = 1;
            }
        }
        return res;
    }
}
```

```go
func interchangeableRectangles(rectangles [][]int) int64 {
    hash := func(a, b int) int64 {
        return int64(a) | (int64(b) << 31)
    }

    gcd := func(a, b int) int {
        for b != 0 {
            a, b = b, a%b
        }
        return a
    }

    var res int64 = 0
    count := make(map[int64]int)
    for _, rect := range rectangles {
        g := gcd(rect[0], rect[1])
        key := hash(rect[0]/g, rect[1]/g)
        res += int64(count[key])
        count[key]++
    }
    return res
}
```

```kotlin
class Solution {
    private fun hash(a: Int, b: Int): Long {
        var mask = a.toLong()
        mask = mask or (b.toLong() shl 31)
        return mask
    }

    private fun gcd(a: Int, b: Int): Int {
        var x = a
        var y = b
        while (y != 0) {
            val temp = x % y
            x = y
            y = temp
        }
        return x
    }

    fun interchangeableRectangles(rectangles: Array<IntArray>): Long {
        var res = 0L
        val count = HashMap<Long, Int>()
        for (rect in rectangles) {
            val g = gcd(rect[0], rect[1])
            val key = hash(rect[0] / g, rect[1] / g)
            res += count.getOrDefault(key, 0)
            count[key] = count.getOrDefault(key, 0) + 1
        }
        return res
    }
}
```

```swift
class Solution {
    private func hash(_ a: Int, _ b: Int) -> Int {
        var mask = a
        mask |= (b << 31)
        return mask
    }

    private func gcd(_ a: Int, _ b: Int) -> Int {
        var x = a
        var y = b
        while y != 0 {
            let temp = x % y
            x = y
            y = temp
        }
        return x
    }

    func interchangeableRectangles(_ rectangles: [[Int]]) -> Int {
        var res = 0
        var count = [Int: Int]()
        for rect in rectangles {
            let g = gcd(rect[0], rect[1])
            let key = hash(rect[0] / g, rect[1] / g)
            res += count[key, default: 0]
            count[key, default: 0] += 1
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Floating-Point Precision Errors

Using floating-point division to compute aspect ratios can lead to precision issues with large width/height values. Two ratios that should be equal may compare as unequal due to floating-point representation errors. The GCD-based approach avoids this by reducing ratios to their simplest integer form before comparison.

### Integer Overflow in Pair Counting

When counting pairs using the formula `c * (c - 1) / 2`, the multiplication can overflow if `c` is large and you are using 32-bit integers. Ensure you use a 64-bit integer type (like `long` in Java or `long long` in C++) for the result and intermediate calculations.

### Incorrect Pair Counting Formula

A common mistake is counting each pair twice by iterating over all `i != j` combinations, or forgetting to use the combination formula entirely. Remember that choosing 2 items from `c` items is `c * (c - 1) / 2`, not `c * c` or `c * (c - 1)`.
