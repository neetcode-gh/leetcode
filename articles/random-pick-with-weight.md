## 1. Prefix Sum + Linear Search

### Intuition

To pick an index with probability proportional to its weight, imagine laying all weights on a number line. A weight of 3 takes up 3 units, a weight of 1 takes up 1 unit, and so on. We pick a random point on this line, then find which weight's segment contains that point. The larger the weight, the more likely its segment gets hit.

### Algorithm

1. In the constructor, store the weights and compute their total sum.
2. For `pickIndex()`:
   - Generate a random number between 0 and the total sum.
   - Iterate through weights, accumulating a running sum.
   - Return the first index where the running sum exceeds the random target.
3. This linear scan takes O(n) per pick.

::tabs-start

```python
class Solution:

    def __init__(self, w: List[int]):
        self.w = w
        self.total = sum(w)

    def pickIndex(self) -> int:
        target = self.total * random.random()
        curSum = 0
        for i in range(len(self.w)):
            curSum += self.w[i]
            if curSum > target:
                return i
```

```java
public class Solution {
    int[] w;
    int total;

    public Solution(int[] w) {
        this.w = w;
        for (int weight : w) {
            total += weight;
        }
    }

    public int pickIndex() {
        double target = total * Math.random();
        int curSum = 0;
        for (int i = 0; i < w.length; i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}
```

```cpp
class Solution {
public:
    vector<int> w;
    int total = 0;

    Solution(vector<int>& w) {
        this->w = w;
        for (int weight : w) {
            total += weight;
        }
    }

    int pickIndex() {
        double target = total * ((double) rand() / RAND_MAX);
        int curSum = 0;
        for (int i = 0; i < w.size(); i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.w = w;
        this.total = w.reduce((a, b) => a + b, 0);
    }

    /**
     * @return {number}
     */
    pickIndex() {
        let target = this.total * Math.random();
        let curSum = 0;
        for (let i = 0; i < this.w.length; i++) {
            curSum += this.w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}
```

```csharp
public class Solution {
    private int[] w;
    private int total;

    public Solution(int[] w) {
        this.w = w;
        foreach (int weight in w) {
            total += weight;
        }
    }

    public int PickIndex() {
        double target = total * new Random().NextDouble();
        int curSum = 0;
        for (int i = 0; i < w.Length; i++) {
            curSum += w[i];
            if (curSum > target) {
                return i;
            }
        }
        return -1;
    }
}
```

```go
type Solution struct {
    w     []int
    total int
}

func Constructor(w []int) Solution {
    total := 0
    for _, weight := range w {
        total += weight
    }
    return Solution{w: w, total: total}
}

func (this *Solution) PickIndex() int {
    target := float64(this.total) * rand.Float64()
    curSum := 0
    for i := 0; i < len(this.w); i++ {
        curSum += this.w[i]
        if float64(curSum) > target {
            return i
        }
    }
    return -1
}
```

```kotlin
class Solution(w: IntArray) {
    private val w = w
    private val total = w.sum()

    fun pickIndex(): Int {
        val target = total * Math.random()
        var curSum = 0
        for (i in w.indices) {
            curSum += w[i]
            if (curSum > target) {
                return i
            }
        }
        return -1
    }
}
```

```swift
class Solution {
    private var w: [Int]
    private var total: Int

    init(_ w: [Int]) {
        self.w = w
        self.total = w.reduce(0, +)
    }

    func pickIndex() -> Int {
        let target = Double(total) * Double.random(in: 0..<1)
        var curSum = 0
        for i in 0..<w.count {
            curSum += w[i]
            if Double(curSum) > target {
                return i
            }
        }
        return -1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for initializing and $O(n)$ for each $pickIndex()$ function call.
* Space complexity: $O(n)$

---

## 2. Prefix Sum + Binary Search

### Intuition

The linear search can be optimized using binary search. By precomputing a prefix sum array, each index i represents the cumulative weight up to that point. When we generate a random target, we binary search for the smallest index whose prefix sum exceeds the target. This maps directly to the weight segment containing our random point.

### Algorithm

1. In the constructor, build a prefix sum array where `prefix[i]` is the sum of weights from index 0 to i-1.
2. For `pickIndex()`:
   - Generate a random number between 0 and the total sum (last element of prefix array).
   - Binary search for the leftmost index where the prefix sum exceeds the target.
   - Return that index minus 1 (adjusting for the prefix array offset).
3. This achieves O(log n) per pick.

::tabs-start

```python
class Solution:

    def __init__(self, w: List[int]):
        self.prefix = [0]
        for wgt in w:
            self.prefix.append(self.prefix[-1] + wgt)

    def pickIndex(self) -> int:
        target = self.prefix[-1] * random.random()
        l, r = 1, len(self.prefix)
        while l < r:
            mid = (l + r) >> 1
            if self.prefix[mid] <= target:
                l = mid + 1
            else:
                r = mid
        return l - 1
```

```java
public class Solution {
    private int[] prefix;

    public Solution(int[] w) {
        prefix = new int[w.length + 1];
        for (int i = 0; i < w.length; i++) {
            prefix[i + 1] = prefix[i] + w[i];
        }
    }

    public int pickIndex() {
        double target = prefix[prefix.length - 1] * Math.random();
        int l = 1, r = prefix.length;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}
```

```cpp
class Solution {
public:
    vector<int> prefix;

    Solution(vector<int>& w) {
        prefix.push_back(0);
        for (int wgt : w) {
            prefix.push_back(prefix.back() + wgt);
        }
    }

    int pickIndex() {
        double target = prefix.back() * ((double) rand() / RAND_MAX);
        int l = 1, r = prefix.size();
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} w
     */
    constructor(w) {
        this.prefix = [0];
        for (let i = 0; i < w.length; i++) {
            this.prefix.push(this.prefix[this.prefix.length - 1] + w[i]);
        }
    }

    /**
     * @return {number}
     */
    pickIndex() {
        const total = this.prefix[this.prefix.length - 1];
        const target = total * Math.random();
        let l = 1, r = this.prefix.length;
        while (l < r) {
            const mid = (l + r) >> 1;
            if (this.prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}
```

```csharp
public class Solution {
    private List<int> prefix;

    public Solution(int[] w) {
        prefix = new List<int> { 0 };
        foreach (int wgt in w) {
            prefix.Add(prefix[^1] + wgt);
        }
    }

    public int PickIndex() {
        double target = prefix[^1] * new Random().NextDouble();
        int l = 1, r = prefix.Count;
        while (l < r) {
            int mid = (l + r) >> 1;
            if (prefix[mid] <= target) {
                l = mid + 1;
            } else {
                r = mid;
            }
        }
        return l - 1;
    }
}
```

```go
type Solution struct {
    prefix []int
}

func Constructor(w []int) Solution {
    prefix := []int{0}
    for _, wgt := range w {
        prefix = append(prefix, prefix[len(prefix)-1]+wgt)
    }
    return Solution{prefix: prefix}
}

func (this *Solution) PickIndex() int {
    target := float64(this.prefix[len(this.prefix)-1]) * rand.Float64()
    l, r := 1, len(this.prefix)
    for l < r {
        mid := (l + r) >> 1
        if float64(this.prefix[mid]) <= target {
            l = mid + 1
        } else {
            r = mid
        }
    }
    return l - 1
}
```

```kotlin
class Solution(w: IntArray) {
    private val prefix: MutableList<Int> = mutableListOf(0)

    init {
        for (wgt in w) {
            prefix.add(prefix.last() + wgt)
        }
    }

    fun pickIndex(): Int {
        val target = prefix.last() * Math.random()
        var l = 1
        var r = prefix.size
        while (l < r) {
            val mid = (l + r) shr 1
            if (prefix[mid] <= target) {
                l = mid + 1
            } else {
                r = mid
            }
        }
        return l - 1
    }
}
```

```swift
class Solution {
    private var prefix: [Int]

    init(_ w: [Int]) {
        prefix = [0]
        for wgt in w {
            prefix.append(prefix.last! + wgt)
        }
    }

    func pickIndex() -> Int {
        let target = Double(prefix.last!) * Double.random(in: 0..<1)
        var l = 1, r = prefix.count
        while l < r {
            let mid = (l + r) >> 1
            if Double(prefix[mid]) <= target {
                l = mid + 1
            } else {
                r = mid
            }
        }
        return l - 1
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for initializing and $O(\log n)$ for each $pickIndex()$ function call.
* Space complexity: $O(n)$