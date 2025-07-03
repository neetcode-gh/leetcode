## 1. Brute Force (Recursion)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Sorting + Min-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * (\log n + \log k))$
- Space complexity: $O(n + k)$

> Where $n$ is the number of engineers and $k$ is the maximum number of engineers that can be selected.
