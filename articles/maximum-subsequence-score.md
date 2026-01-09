## 1. Brute Force (Recursion)

::tabs-start

```python
class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        n = len(nums1)

        def dfs(i, k, minVal, curSum):
            if k == 0:
                return curSum * minVal
            if i == n or (n - i) < k:
                return float("-inf")
            if minVal == 0:
                return 0

            res = dfs(i + 1, k, minVal, curSum)
            res = max(res, dfs(i + 1, k - 1, min(minVal, nums2[i]), curSum + nums1[i]))
            return res

        return dfs(0, k, float("inf"), 0)
```

```java
public class Solution {
    private int[] nums1, nums2;
    private int n;

    public long maxScore(int[] nums1, int[] nums2, int k) {
        this.nums1 = nums1;
        this.nums2 = nums2;
        this.n = nums1.length;
        return dfs(0, k, Integer.MAX_VALUE, 0);
    }

    private long dfs(int i, int k, int minVal, long curSum) {
        if (k == 0) {
            return curSum * minVal;
        }
        if (i == n || (n - i) < k) {
            return Integer.MIN_VALUE;
        }
        if (minVal == 0) {
            return 0;
        }

        long res = dfs(i + 1, k, minVal, curSum);
        res = Math.max(
                res,
                dfs(i + 1, k - 1, Math.min(minVal, nums2[i]), curSum + nums1[i])
            );
        return res;
    }
}
```

```cpp
class Solution {
private:
    vector<int> nums1, nums2;
    int n;

public:
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        this->nums1 = nums1;
        this->nums2 = nums2;
        this->n = nums1.size();
        return dfs(0, k, INT_MAX, 0);
    }

private:
    long long dfs(int i, int k, int minVal, long long curSum) {
        if (k == 0) {
            return curSum * minVal;
        }
        if (i == n || (n - i) < k) {
            return INT_MIN;
        }
        if (minVal == 0) {
            return 0;
        }

        long long res = dfs(i + 1, k, minVal, curSum);
        res = max(res, dfs(i + 1, k - 1, min(minVal, nums2[i]), curSum + nums1[i]));
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    maxScore(nums1, nums2, k) {
        const n = nums1.length;

        const dfs = (i, k, minVal, curSum) => {
            if (k === 0) {
                return curSum * minVal;
            }
            if (i === n || n - i < k) {
                return -Infinity;
            }
            if (minVal === 0) {
                return 0;
            }

            let res = dfs(i + 1, k, minVal, curSum);
            res = Math.max(
                res,
                dfs(
                    i + 1,
                    k - 1,
                    Math.min(minVal, nums2[i]),
                    curSum + nums1[i],
                ),
            );
            return res;
        };

        return dfs(0, k, Infinity, 0);
    }
}
```

```go
func maxScore(nums1 []int, nums2 []int, k int) int64 {
    n := len(nums1)

    var dfs func(i, k, minVal int, curSum int64) int64
    dfs = func(i, k, minVal int, curSum int64) int64 {
        if k == 0 {
            return curSum * int64(minVal)
        }
        if i == n || n-i < k {
            return math.MinInt64
        }
        if minVal == 0 {
            return 0
        }

        res := dfs(i+1, k, minVal, curSum)
        newMin := minVal
        if nums2[i] < newMin {
            newMin = nums2[i]
        }
        take := dfs(i+1, k-1, newMin, curSum+int64(nums1[i]))
        if take > res {
            res = take
        }
        return res
    }

    return dfs(0, k, math.MaxInt32, 0)
}
```

```kotlin
class Solution {
    private lateinit var nums1: IntArray
    private lateinit var nums2: IntArray
    private var n = 0

    fun maxScore(nums1: IntArray, nums2: IntArray, k: Int): Long {
        this.nums1 = nums1
        this.nums2 = nums2
        this.n = nums1.size
        return dfs(0, k, Int.MAX_VALUE, 0L)
    }

    private fun dfs(i: Int, k: Int, minVal: Int, curSum: Long): Long {
        if (k == 0) {
            return curSum * minVal
        }
        if (i == n || n - i < k) {
            return Long.MIN_VALUE
        }
        if (minVal == 0) {
            return 0L
        }

        var res = dfs(i + 1, k, minVal, curSum)
        res = maxOf(res, dfs(i + 1, k - 1, minOf(minVal, nums2[i]), curSum + nums1[i]))
        return res
    }
}
```

```swift
class Solution {
    private var nums1 = [Int]()
    private var nums2 = [Int]()
    private var n = 0

    func maxScore(_ nums1: [Int], _ nums2: [Int], _ k: Int) -> Int {
        self.nums1 = nums1
        self.nums2 = nums2
        self.n = nums1.count
        return dfs(0, k, Int.max, 0)
    }

    private func dfs(_ i: Int, _ k: Int, _ minVal: Int, _ curSum: Int) -> Int {
        if k == 0 {
            return curSum * minVal
        }
        if i == n || n - i < k {
            return Int.min
        }
        if minVal == 0 {
            return 0
        }

        var res = dfs(i + 1, k, minVal, curSum)
        res = max(res, dfs(i + 1, k - 1, min(minVal, nums2[i]), curSum + nums1[i]))
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(2 ^ n)$
- Space complexity: $O(n)$ for recursion stack.

---

## 2. Min-Heap - I

::tabs-start

```python
class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        pairs = sorted(zip(nums1, nums2), key=lambda p: p[1], reverse=True)

        minHeap = []
        n1Sum = 0
        res = 0

        for n1, n2 in pairs:
            n1Sum += n1
            heapq.heappush(minHeap, n1)

            if len(minHeap) > k:
                n1Sum -= heapq.heappop(minHeap)

            if len(minHeap) == k:
                res = max(res, n1Sum * n2)

        return res
```

```java
public class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        int[][] pairs = new int[n][2];

        for (int i = 0; i < n; i++) {
            pairs[i][0] = nums1[i];
            pairs[i][1] = nums2[i];
        }

        Arrays.sort(pairs, (a, b) -> Integer.compare(b[1], a[1]));

        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        long n1Sum = 0, res = 0;

        for (int[] pair : pairs) {
            n1Sum += pair[0];
            minHeap.offer(pair[0]);

            if (minHeap.size() > k) {
                n1Sum -= minHeap.poll();
            }

            if (minHeap.size() == k) {
                res = Math.max(res, n1Sum * pair[1]);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size();
        vector<pair<int, int>> pairs(n);

        for (int i = 0; i < n; i++) {
            pairs[i] = {nums1[i], nums2[i]};
        }

        sort(pairs.begin(), pairs.end(), [](const auto& a, const auto& b) {
            return b.second < a.second;
        });

        priority_queue<int, vector<int>, greater<int>> minHeap;
        long long n1Sum = 0, res = 0;

        for (auto& pair : pairs) {
            n1Sum += pair.first;
            minHeap.push(pair.first);

            if (minHeap.size() > k) {
                n1Sum -= minHeap.top();
                minHeap.pop();
            }

            if (minHeap.size() == k) {
                res = max(res, n1Sum * (long long)pair.second);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    maxScore(nums1, nums2, k) {
        let pairs = nums1.map((n1, i) => [n1, nums2[i]]);
        pairs.sort((a, b) => b[1] - a[1]);

        let minHeap = new MinPriorityQueue();
        let n1Sum = 0,
            res = 0;

        for (let [n1, n2] of pairs) {
            n1Sum += n1;
            minHeap.enqueue(n1);

            if (minHeap.size() > k) {
                n1Sum -= minHeap.dequeue();
            }

            if (minHeap.size() === k) {
                res = Math.max(res, n1Sum * n2);
            }
        }

        return res;
    }
}
```

```go
func maxScore(nums1 []int, nums2 []int, k int) int64 {
    n := len(nums1)
    pairs := make([][2]int, n)
    for i := 0; i < n; i++ {
        pairs[i] = [2]int{nums1[i], nums2[i]}
    }
    sort.Slice(pairs, func(i, j int) bool {
        return pairs[i][1] > pairs[j][1]
    })

    minHeap := &IntHeap{}
    heap.Init(minHeap)
    var n1Sum int64 = 0
    var res int64 = 0

    for _, pair := range pairs {
        n1Sum += int64(pair[0])
        heap.Push(minHeap, pair[0])

        if minHeap.Len() > k {
            n1Sum -= int64(heap.Pop(minHeap).(int))
        }

        if minHeap.Len() == k {
            cur := n1Sum * int64(pair[1])
            if cur > res {
                res = cur
            }
        }
    }
    return res
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
    fun maxScore(nums1: IntArray, nums2: IntArray, k: Int): Long {
        val n = nums1.size
        val pairs = Array(n) { intArrayOf(nums1[it], nums2[it]) }
        pairs.sortByDescending { it[1] }

        val minHeap = PriorityQueue<Int>()
        var n1Sum = 0L
        var res = 0L

        for (pair in pairs) {
            n1Sum += pair[0]
            minHeap.offer(pair[0])

            if (minHeap.size > k) {
                n1Sum -= minHeap.poll()
            }

            if (minHeap.size == k) {
                res = maxOf(res, n1Sum * pair[1])
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ nums1: [Int], _ nums2: [Int], _ k: Int) -> Int {
        let n = nums1.count
        var pairs = (0..<n).map { (nums1[$0], nums2[$0]) }
        pairs.sort { $0.1 > $1.1 }

        var minHeap = Heap<Int>()
        var n1Sum = 0
        var res = 0

        for (n1, n2) in pairs {
            n1Sum += n1
            minHeap.insert(n1)

            if minHeap.count > k {
                n1Sum -= minHeap.removeMin()
            }

            if minHeap.count == k {
                res = max(res, n1Sum * n2)
            }
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Min-Heap - II

::tabs-start

```python
class Solution:
    def maxScore(self, nums1: List[int], nums2: List[int], k: int) -> int:
        n = len(nums1)
        arr = [(nums2[i] << 30) | nums1[i] for i in range(n)]
        arr.sort(reverse=True)

        minHeap = []
        n1Sum = 0
        res = 0

        for num in arr:
            n1, n2 = num & ((1 << 30) - 1), num >> 30
            n1Sum += n1
            heapq.heappush(minHeap, n1)

            if len(minHeap) > k:
                n1Sum -= heapq.heappop(minHeap)

            if len(minHeap) == k:
                res = max(res, n1Sum * n2)

        return res
```

```java
public class Solution {
    public long maxScore(int[] nums1, int[] nums2, int k) {
        int n = nums1.length;
        long[] arr = new long[n];
        for (int i = 0; i < n; i++) {
            arr[i] = ((long) nums2[i] << 30) | nums1[i];
        }

        Arrays.sort(arr);
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        long n1Sum = 0, res = 0;

        for (int i = n - 1; i >= 0; i--) {
            int n1 = (int) (arr[i] & ((1L << 30) - 1));
            int n2 = (int) (arr[i] >> 30);
            n1Sum += n1;
            minHeap.offer(n1);

            if (minHeap.size() > k) {
                n1Sum -= minHeap.poll();
            }
            if (minHeap.size() == k) {
                res = Math.max(res, n1Sum * (long) n2);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    long long maxScore(vector<int>& nums1, vector<int>& nums2, int k) {
        int n = nums1.size();
        vector<long long> arr(n);
        for (int i = 0; i < n; i++) {
            arr[i] = ((long long) nums2[i] << 30) | nums1[i];
        }

        sort(arr.rbegin(), arr.rend());
        priority_queue<int, vector<int>, greater<int>> minHeap;
        long long n1Sum = 0, res = 0;

        for (long long& num : arr) {
            int n1 = num & ((1LL << 30) - 1);
            int n2 = num >> 30;
            n1Sum += n1;
            minHeap.push(n1);

            if (minHeap.size() > k) {
                n1Sum -= minHeap.top();
                minHeap.pop();
            }
            if (minHeap.size() == k) {
                res = max(res, n1Sum * (long long)n2);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @param {number} k
     * @return {number}
     */
    maxScore(nums1, nums2, k) {
        const n = nums1.length;
        const arr = [];
        for (let i = 0; i < n; i++) {
            arr.push((BigInt(nums2[i]) << BigInt(30)) | BigInt(nums1[i]));
        }

        arr.sort((a, b) => Number(b - a));
        const minHeap = new MinPriorityQueue();
        let n1Sum = 0n,
            res = 0n;

        for (let num of arr) {
            let n1 = Number(num & ((1n << 30n) - 1n));
            let n2 = Number(num >> 30n);
            n1Sum += BigInt(n1);
            minHeap.enqueue(n1);

            if (minHeap.size() > k) {
                n1Sum -= BigInt(minHeap.dequeue());
            }
            if (minHeap.size() === k) {
                res = BigInt(Math.max(Number(res), Number(n1Sum * BigInt(n2))));
            }
        }

        return Number(res);
    }
}
```

```go
func maxScore(nums1 []int, nums2 []int, k int) int64 {
    n := len(nums1)
    arr := make([]int64, n)
    for i := 0; i < n; i++ {
        arr[i] = (int64(nums2[i]) << 30) | int64(nums1[i])
    }

    sort.Slice(arr, func(i, j int) bool {
        return arr[i] > arr[j]
    })

    minHeap := &IntHeap{}
    heap.Init(minHeap)
    var n1Sum int64 = 0
    var res int64 = 0

    for _, num := range arr {
        n1 := int(num & ((1 << 30) - 1))
        n2 := int(num >> 30)
        n1Sum += int64(n1)
        heap.Push(minHeap, n1)

        if minHeap.Len() > k {
            n1Sum -= int64(heap.Pop(minHeap).(int))
        }
        if minHeap.Len() == k {
            cur := n1Sum * int64(n2)
            if cur > res {
                res = cur
            }
        }
    }

    return res
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
    fun maxScore(nums1: IntArray, nums2: IntArray, k: Int): Long {
        val n = nums1.size
        val arr = LongArray(n) { (nums2[it].toLong() shl 30) or nums1[it].toLong() }
        arr.sortDescending()

        val minHeap = PriorityQueue<Int>()
        var n1Sum = 0L
        var res = 0L

        for (num in arr) {
            val n1 = (num and ((1L shl 30) - 1)).toInt()
            val n2 = (num shr 30).toInt()
            n1Sum += n1
            minHeap.offer(n1)

            if (minHeap.size > k) {
                n1Sum -= minHeap.poll()
            }
            if (minHeap.size == k) {
                res = maxOf(res, n1Sum * n2)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func maxScore(_ nums1: [Int], _ nums2: [Int], _ k: Int) -> Int {
        let n = nums1.count
        var arr = (0..<n).map { (Int64(nums2[$0]) << 30) | Int64(nums1[$0]) }
        arr.sort { $0 > $1 }

        var minHeap = Heap<Int>()
        var n1Sum: Int64 = 0
        var res: Int64 = 0

        for num in arr {
            let n1 = Int(num & ((1 << 30) - 1))
            let n2 = Int(num >> 30)
            n1Sum += Int64(n1)
            minHeap.insert(n1)

            if minHeap.count > k {
                n1Sum -= Int64(minHeap.removeMin())
            }
            if minHeap.count == k {
                let cur = n1Sum * Int64(n2)
                if cur > res { res = cur }
            }
        }

        return Int(res)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
