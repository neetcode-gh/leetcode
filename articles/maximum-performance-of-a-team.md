## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Sorting with Custom Comparators** - Engineers are sorted by efficiency in descending order to fix the minimum efficiency
- **Heap / Priority Queue (Min-Heap)** - Used to efficiently maintain the k largest speeds as we iterate
- **Greedy Algorithms** - The key insight is fixing the minimum efficiency and maximizing the speed sum
- **Modular Arithmetic** - The result must be returned modulo 10^9 + 7, applied only at the end

---

## 1. Brute Force (Recursion)

### Intuition

The simplest approach is to try all possible subsets of engineers with size at most `k`. For each subset, we compute the sum of speeds and multiply by the minimum efficiency in that subset. We track the maximum performance across all valid subsets.

This works because performance is defined as (sum of speeds) * (minimum efficiency), so we need to consider every combination to find the optimal team.

### Algorithm

1. Use recursion to explore all choices: for each engineer, decide to either include them in the team or skip them.
2. Track the current speed sum and the minimum efficiency among selected engineers.
3. At each step, update the result with the current performance if it improves the maximum.
4. Base case: when we reach the end of the list or have no more slots (`k == 0`), stop recursing.
5. Return the result modulo $10^9 + 7$.

::tabs-start

```python
class Solution:
    def maxPerformance(self, n: int, speed: List[int], efficiency: List[int], k: int) -> int:
        MOD = 1000000007
        res = 0

        def dfs(i, k, speedSum, minEff):
            nonlocal res
            res = max(res, speedSum * minEff)
            if i == n or k == 0:
                return

            dfs(i + 1, k, speedSum, minEff)
            dfs(i + 1, k - 1, speedSum + speed[i], min(minEff, efficiency[i]))

        dfs(0, k, 0, float("inf"))
        return res % MOD
```

```java
public class Solution {
    private static final int MOD = 1000000007;
    private int[] speed, efficiency;
    private int n;
    private long res;

    public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {
        this.n = n;
        this.speed = speed;
        this.efficiency = efficiency;
        this.res = 0;

        dfs(0, k, Integer.MAX_VALUE, 0);
        return (int) (res % MOD);
    }

    private void dfs(int i, int k, int minEff, long speedSum) {
        res = Math.max(res, speedSum * minEff);
        if (i == n || k == 0) return;

        dfs(i + 1, k, minEff, speedSum);
        dfs(i + 1, k - 1, Math.min(minEff, efficiency[i]), speedSum + speed[i]);
    }
}
```

```cpp
class Solution {
private:
    static constexpr int MOD = 1000000007;
    vector<int> speed, efficiency;
    int n;
    long long res;

public:
    int maxPerformance(int n, vector<int>& speed, vector<int>& efficiency, int k) {
        this->n = n;
        this->speed = speed;
        this->efficiency = efficiency;
        res = 0;

        dfs(0, k, INT_MAX, 0);
        return int(res % MOD);
    }

private:
    void dfs(int i, int k, int minEff, long long speedSum) {
        res = max(res, speedSum * minEff);
        if (i == n || k == 0) return;

        dfs(i + 1, k, minEff, speedSum);
        dfs(i + 1, k - 1, min(minEff, efficiency[i]), speedSum + speed[i]);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} speed
     * @param {number[]} efficiency
     * @param {number} k
     * @return {number}
     */
    maxPerformance(n, speed, efficiency, k) {
        const MOD = 1000000007;
        let res = 0;

        const dfs = (i, k, minEff, speedSum) => {
            res = Math.max(res, minEff === Infinity ? 0 : speedSum * minEff);
            if (i === n || k === 0) return;

            dfs(i + 1, k, minEff, speedSum);
            dfs(
                i + 1,
                k - 1,
                Math.min(minEff, efficiency[i]),
                speedSum + speed[i],
            );
        };

        dfs(0, k, Infinity, 0);
        return res % MOD;
    }
}
```

```go
func maxPerformance(n int, speed []int, efficiency []int, k int) int {
    MOD := 1000000007
    res := 0

    var dfs func(i, k, minEff int, speedSum int)
    dfs = func(i, k, minEff int, speedSum int) {
        if minEff != math.MaxInt32 {
            if speedSum*minEff > res {
                res = speedSum * minEff
            }
        }
        if i == n || k == 0 {
            return
        }

        dfs(i+1, k, minEff, speedSum)
        newMinEff := minEff
        if efficiency[i] < minEff {
            newMinEff = efficiency[i]
        }
        dfs(i+1, k-1, newMinEff, speedSum+speed[i])
    }

    dfs(0, k, math.MaxInt32, 0)
    return res % MOD
}
```

```kotlin
class Solution {
    private var res: Long = 0

    fun maxPerformance(n: Int, speed: IntArray, efficiency: IntArray, k: Int): Int {
        val MOD = 1000000007
        res = 0

        fun dfs(i: Int, k: Int, minEff: Int, speedSum: Long) {
            if (minEff != Int.MAX_VALUE) {
                res = maxOf(res, speedSum * minEff)
            }
            if (i == n || k == 0) return

            dfs(i + 1, k, minEff, speedSum)
            dfs(i + 1, k - 1, minOf(minEff, efficiency[i]), speedSum + speed[i])
        }

        dfs(0, k, Int.MAX_VALUE, 0)
        return (res % MOD).toInt()
    }
}
```

```swift
class Solution {
    func maxPerformance(_ n: Int, _ speed: [Int], _ efficiency: [Int], _ k: Int) -> Int {
        let MOD = 1000000007
        var res = 0

        func dfs(_ i: Int, _ k: Int, _ minEff: Int, _ speedSum: Int) {
            if minEff != Int.max {
                res = max(res, speedSum * minEff)
            }
            if i == n || k == 0 { return }

            dfs(i + 1, k, minEff, speedSum)
            dfs(i + 1, k - 1, min(minEff, efficiency[i]), speedSum + speed[i])
        }

        dfs(0, k, Int.max, 0)
        return res % MOD
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Sorting + Min-Heap

### Intuition

The key insight is that the minimum efficiency in a team acts as a bottleneck. If we fix which engineer has the minimum efficiency, we want to maximize the sum of speeds among the remaining selected engineers.

By sorting engineers in descending order of efficiency, as we iterate through them, each new engineer we consider has the smallest efficiency so far. At that point, we want to pick the engineers with the highest speeds (up to `k` total) from those we have seen. A min-heap helps us efficiently maintain the top `k` speeds.

### Algorithm

1. Pair each engineer's efficiency with their speed and sort by efficiency in descending order.
2. Use a min-heap to track the speeds of selected engineers.
3. Iterate through the sorted list. For each engineer:
   - If the heap already has `k` engineers, remove the one with the smallest speed.
   - Add the current engineer's speed to the heap and update the speed sum.
   - Calculate performance using the current efficiency (which is now the minimum) and update the result.
4. Return the maximum performance modulo $10^9 + 7$.

::tabs-start

```python
class Solution:
    def maxPerformance(self, n: int, speed: List[int], efficiency: List[int], k: int) -> int:
        MOD = 10**9 + 7
        eng = sorted(zip(efficiency, speed), reverse=True)

        res = speedSum = 0
        minHeap = []

        for eff, spd in eng:
            if len(minHeap) == k:
                speedSum -= heapq.heappop(minHeap)
            speedSum += spd
            heapq.heappush(minHeap, spd)
            res = max(res, eff * speedSum)

        return res % MOD
```

```java
public class Solution {
    public int maxPerformance(int n, int[] speed, int[] efficiency, int k) {
        final int MOD = 1_000_000_007;
        int[][] engineers = new int[n][2];

        for (int i = 0; i < n; i++) {
            engineers[i] = new int[]{efficiency[i], speed[i]};
        }

        Arrays.sort(engineers, (a, b) -> Integer.compare(b[0], a[0]));

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        long speedSum = 0, res = 0;

        for (int[] eng : engineers) {
            if (minHeap.size() == k) {
                speedSum -= minHeap.poll();
            }
            speedSum += eng[1];
            minHeap.offer(eng[1]);
            res = Math.max(res, speedSum * eng[0]);
        }

        return (int) (res % MOD);
    }
}
```

```cpp
class Solution {
public:
    int maxPerformance(int n, vector<int>& speed, vector<int>& efficiency, int k) {
        constexpr int MOD = 1'000'000'007;
        vector<pair<int, int>> engineers;

        for (int i = 0; i < n; i++) {
            engineers.emplace_back(efficiency[i], speed[i]);
        }

        sort(engineers.rbegin(), engineers.rend());

        priority_queue<int, vector<int>, greater<int>> minHeap;
        long long speedSum = 0, res = 0;

        for (const auto& [eff, spd] : engineers) {
            if (minHeap.size() == k) {
                speedSum -= minHeap.top();
                minHeap.pop();
            }
            speedSum += spd;
            minHeap.push(spd);
            res = max(res, speedSum * eff);
        }

        return res % MOD;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number} n
     * @param {number[]} speed
     * @param {number[]} efficiency
     * @param {number} k
     * @return {number}
     */
    maxPerformance(n, speed, efficiency, k) {
        const MOD = BigInt(1e9 + 7);
        const engineers = efficiency.map((eff, i) => [eff, speed[i]]);
        engineers.sort((a, b) => b[0] - a[0]);

        const minHeap = new MinPriorityQueue();
        let speedSum = BigInt(0),
            res = BigInt(0);

        for (const [eff, spd] of engineers) {
            if (minHeap.size() === k) {
                speedSum -= BigInt(minHeap.dequeue());
            }
            speedSum += BigInt(spd);
            minHeap.enqueue(spd);
            res = res > speedSum * BigInt(eff) ? res : speedSum * BigInt(eff);
        }

        return Number(res % MOD);
    }
}
```

```go
func maxPerformance(n int, speed []int, efficiency []int, k int) int {
    MOD := int64(1000000007)
    engineers := make([][2]int, n)
    for i := 0; i < n; i++ {
        engineers[i] = [2]int{efficiency[i], speed[i]}
    }

    sort.Slice(engineers, func(i, j int) bool {
        return engineers[i][0] > engineers[j][0]
    })

    minHeap := &IntHeap{}
    heap.Init(minHeap)
    var speedSum, res int64

    for _, eng := range engineers {
        if minHeap.Len() == k {
            speedSum -= int64(heap.Pop(minHeap).(int))
        }
        speedSum += int64(eng[1])
        heap.Push(minHeap, eng[1])
        if speedSum*int64(eng[0]) > res {
            res = speedSum * int64(eng[0])
        }
    }

    return int(res % MOD)
}

type IntHeap []int

func (h IntHeap) Len() int           { return len(h) }
func (h IntHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h IntHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *IntHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *IntHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun maxPerformance(n: Int, speed: IntArray, efficiency: IntArray, k: Int): Int {
        val MOD = 1_000_000_007L
        val engineers = efficiency.indices
            .map { i -> intArrayOf(efficiency[i], speed[i]) }
            .sortedByDescending { it[0] }

        val minHeap = PriorityQueue<Int>()
        var speedSum = 0L
        var res = 0L

        for ((eff, spd) in engineers) {
            if (minHeap.size == k) {
                speedSum -= minHeap.poll()
            }
            speedSum += spd
            minHeap.offer(spd)
            res = maxOf(res, speedSum * eff)
        }

        return (res % MOD).toInt()
    }
}
```

```swift
class Solution {
    func maxPerformance(_ n: Int, _ speed: [Int], _ efficiency: [Int], _ k: Int) -> Int {
        let MOD = 1_000_000_007
        var engineers = (0..<n).map { (efficiency[$0], speed[$0]) }
        engineers.sort { $0.0 > $1.0 }

        var minHeap = Heap<Int>()
        var speedSum = 0
        var res = 0

        for (eff, spd) in engineers {
            if minHeap.count == k {
                speedSum -= minHeap.popMin()!
            }
            speedSum += spd
            minHeap.insert(spd)
            res = max(res, speedSum * eff)
        }

        return res % MOD
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (\log n + \log k))$
- Space complexity: $O(n + k)$

> Where $n$ is the number of engineers and $k$ is the maximum number of engineers that can be selected.

---

## Common Pitfalls

### Integer Overflow When Computing Performance

The performance value is `(sum of speeds) * (minimum efficiency)`, which can exceed the 32-bit integer range for large inputs. Use 64-bit integers (`long` in Java, `long long` in C++) for intermediate calculations, and only apply the modulo when returning the final result.

### Applying Modulo During Computation Instead of at the End

The modulo operation should only be applied to the final answer, not during intermediate maximum comparisons. Applying modulo too early (e.g., `res = max(res, performance % MOD)`) corrupts the comparison logic because a smaller modulo result might incorrectly appear larger than the true maximum.

### Misunderstanding "At Most k Engineers"

The problem asks for at most `k` engineers, meaning teams of size 1, 2, ..., up to `k` are all valid. A common mistake is only considering teams of exactly size `k`. The heap-based solution naturally handles this by computing performance at each step as engineers are added.

### Incorrect Heap Management

When the heap exceeds `k` engineers, you must remove the engineer with the smallest speed (the top of a min-heap). A common error is using a max-heap instead, which would remove the fastest engineer and yield suboptimal results. The min-heap ensures we always keep the `k` fastest engineers seen so far.

### Forgetting to Update Speed Sum When Popping from Heap

After removing an engineer from the heap, the speed sum must be decremented by that engineer's speed. Forgetting this update causes the speed sum to be incorrectly inflated, leading to wrong performance calculations.
