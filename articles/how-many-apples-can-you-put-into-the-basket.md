## 1. Dynamic Programming

::tabs-start

```python
class Solution:
    def maxNumberOfApples(self, weight: List[int]) -> int:
        n = len(weight)
        dp = [0] + [float("inf")] * n
        for i, w in enumerate(weight):
            for j in range(i + 1, 0, -1):
                dp[j] = min(dp[j], dp[j - 1] + w)

        res = 0
        for j in range(n + 1):
            if dp[j] <= 5000:
                res = j
        return res
```

```java
public class Solution {
    public int maxNumberOfApples(int[] weight) {
        int n = weight.length;
        int[] dp = new int[n + 1];
        Arrays.fill(dp, Integer.MAX_VALUE);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j >= 1; j--) {
                dp[j] = Math.min(dp[j], dp[j - 1] + weight[i]);
            }
        }

        int res = 0;
        for (int j = 0; j <= n; j++) {
            if (dp[j] <= 5000) {
                res = j;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfApples(vector<int>& weight) {
        int n = weight.size();
        vector<int> dp(n + 1, INT_MAX);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j >= 1; j--) {
                dp[j] = min(dp[j], dp[j - 1] + weight[i]);
            }
        }

        int res = 0;
        for (int j = 0; j <= n; j++) {
            if (dp[j] <= 5000) {
                res = j;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight) {
        const n = weight.length;
        const dp = new Array(n + 1).fill(Infinity);
        dp[0] = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j >= 1; j--) {
                dp[j] = Math.min(dp[j], dp[j - 1] + weight[i]);
            }
        }

        let res = 0;
        for (let j = 0; j <= n; j++) {
            if (dp[j] <= 5000) {
                res = j;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfApples(int[] weight) {
        int n = weight.Length;
        int[] dp = new int[n + 1];
        Array.Fill(dp, int.MaxValue);
        dp[0] = 0;
        for (int i = 0; i < n; i++) {
            for (int j = i + 1; j >= 1; j--) {
                dp[j] = Math.Min(dp[j], dp[j - 1] + weight[i]);
            }
        }

        int res = 0;
        for (int j = 0; j <= n; j++) {
            if (dp[j] <= 5000) {
                res = j;
            }
        }
        return res;
    }
}
```

```go
func maxNumberOfApples(weight []int) int {
    n := len(weight)
    dp := make([]int, n+1)
    for j := 1; j <= n; j++ {
        dp[j] = math.MaxInt32
    }
    for i := 0; i < n; i++ {
        for j := i + 1; j >= 1; j-- {
            dp[j] = min(dp[j], dp[j-1]+weight[i])
        }
    }

    res := 0
    for j := 0; j <= n; j++ {
        if dp[j] <= 5000 {
            res = j
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun maxNumberOfApples(weight: IntArray): Int {
        val n = weight.size
        val dp = IntArray(n + 1) { Int.MAX_VALUE }
        dp[0] = 0
        for (i in 0 until n) {
            for (j in i + 1 downTo 1) {
                dp[j] = minOf(dp[j], dp[j - 1] + weight[i])
            }
        }

        var res = 0
        for (j in 0..n) {
            if (dp[j] <= 5000) {
                res = j
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func maxNumberOfApples(_ weight: [Int]) -> Int {
        let n = weight.count
        var dp = [Int](repeating: Int.max, count: n + 1)
        dp[0] = 0
        for i in 0..<n {
            for j in stride(from: i + 1, through: 1, by: -1) {
                dp[j] = min(dp[j], dp[j - 1] + weight[i])
            }
        }

        var res = 0
        for j in 0...n {
            if dp[j] <= 5000 {
                res = j
            }
        }
        return res
    }
}
```

```rust
impl Solution {
    pub fn max_number_of_apples(weight: Vec<i32>) -> i32 {
        let n = weight.len();
        let mut dp = vec![i32::MAX; n + 1];
        dp[0] = 0;
        for i in 0..n {
            for j in (1..=i + 1).rev() {
                dp[j] = dp[j].min(dp[j - 1] + weight[i]);
            }
        }

        let mut res = 0;
        for j in 0..=n {
            if dp[j] <= 5000 {
                res = j as i32;
            }
        }
        res
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight: number[]): number {
        const n = weight.length;
        const dp: number[] = new Array(n + 1).fill(Infinity);
        dp[0] = 0;
        for (let i = 0; i < n; i++) {
            for (let j = i + 1; j >= 1; j--) {
                dp[j] = Math.min(dp[j], dp[j - 1] + weight[i]);
            }
        }

        let res = 0;
        for (let j = 0; j <= n; j++) {
            if (dp[j] <= 5000) {
                res = j;
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

> Where $n$ is the number of apples.

---

## 2. Sorting

::tabs-start

```python
class Solution:
    def maxNumberOfApples(self, weight: List[int]) -> int:
        weight.sort()
        apples = units = 0
        for w in weight:
            if units + w > 5000:
                break
            units += w
            apples += 1
        return apples
```

```java
public class Solution {
    public int maxNumberOfApples(int[] weight) {
        Arrays.sort(weight);
        int apples = 0, units = 0;
        for (int w : weight) {
            if (units + w > 5000) {
                break;
            }
            units += w;
            apples++;
        }
        return apples;
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfApples(vector<int>& weight) {
        sort(weight.begin(), weight.end());
        int apples = 0, units = 0;
        for (int w : weight) {
            if (units + w > 5000) {
                break;
            }
            units += w;
            apples++;
        }
        return apples;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight) {
        weight.sort((a, b) => a - b);
        let apples = 0,
            units = 0;
        for (const w of weight) {
            if (units + w > 5000) {
                break;
            }
            units += w;
            apples++;
        }
        return apples;
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfApples(int[] weight) {
        Array.Sort(weight);
        int apples = 0, units = 0;
        foreach (int w in weight) {
            if (units + w > 5000) {
                break;
            }
            units += w;
            apples++;
        }
        return apples;
    }
}
```

```go
func maxNumberOfApples(weight []int) int {
    sort.Ints(weight)
    apples, units := 0, 0
    for _, w := range weight {
        if units+w > 5000 {
            break
        }
        units += w
        apples++
    }
    return apples
}
```

```kotlin
class Solution {
    fun maxNumberOfApples(weight: IntArray): Int {
        weight.sort()
        var apples = 0
        var units = 0
        for (w in weight) {
            if (units + w > 5000) {
                break
            }
            units += w
            apples++
        }
        return apples
    }
}
```

```swift
class Solution {
    func maxNumberOfApples(_ weight: [Int]) -> Int {
        var apples = 0, units = 0
        for w in weight.sorted() {
            if units + w > 5000 {
                break
            }
            units += w
            apples += 1
        }
        return apples
    }
}
```

```rust
impl Solution {
    pub fn max_number_of_apples(weight: Vec<i32>) -> i32 {
        let mut weight = weight;
        weight.sort();
        let (mut apples, mut units) = (0, 0);
        for w in weight {
            if units + w > 5000 {
                break;
            }
            units += w;
            apples += 1;
        }
        apples
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight: number[]): number {
        weight.sort((a, b) => a - b);
        let apples = 0,
            units = 0;
        for (const w of weight) {
            if (units + w > 5000) {
                break;
            }
            units += w;
            apples++;
        }
        return apples;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $n$ is the number of apples.

---

## 3. Min-Heap

::tabs-start

```python
class Solution:
    def maxNumberOfApples(self, weight: List[int]) -> int:
        heapq.heapify(weight)
        apples = units = 0
        while weight and units + weight[0] <= 5000:
            units += heapq.heappop(weight)
            apples += 1
        return apples
```

```java
public class Solution {
    public int maxNumberOfApples(int[] weight) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();
        for (int w : weight) {
            minHeap.offer(w);
        }
        int apples = 0, units = 0;
        while (!minHeap.isEmpty() && units + minHeap.peek() <= 5000) {
            units += minHeap.poll();
            apples++;
        }
        return apples;
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfApples(vector<int>& weight) {
        priority_queue<int, vector<int>, greater<int>> minHeap(weight.begin(), weight.end());
        int apples = 0, units = 0;
        while (!minHeap.empty() && units + minHeap.top() <= 5000) {
            units += minHeap.top();
            minHeap.pop();
            apples++;
        }
        return apples;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight) {
        const minHeap = new MinPriorityQueue();
        for (const w of weight) {
            minHeap.enqueue(w);
        }
        let apples = 0,
            units = 0;
        while (!minHeap.isEmpty() && units + minHeap.front() <= 5000) {
            units += minHeap.dequeue();
            apples++;
        }
        return apples;
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfApples(int[] weight) {
        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        foreach (int w in weight) {
            minHeap.Enqueue(w, w);
        }
        int apples = 0, units = 0;
        while (minHeap.Count > 0 && units + minHeap.Peek() <= 5000) {
            units += minHeap.Dequeue();
            apples++;
        }
        return apples;
    }
}
```

```go
type MinHeap []int

func (h MinHeap) Len() int            { return len(h) }
func (h MinHeap) Less(i, j int) bool  { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)       { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[:n-1]
    return x
}

func maxNumberOfApples(weight []int) int {
    minHeap := MinHeap(weight)
    heap.Init(&minHeap)
    apples, units := 0, 0
    for minHeap.Len() > 0 && units+minHeap[0] <= 5000 {
        units += heap.Pop(&minHeap).(int)
        apples++
    }
    return apples
}
```

```kotlin
class Solution {
    fun maxNumberOfApples(weight: IntArray): Int {
        val minHeap = PriorityQueue<Int>()
        for (w in weight) {
            minHeap.offer(w)
        }
        var apples = 0
        var units = 0
        while (minHeap.isNotEmpty() && units + minHeap.peek() <= 5000) {
            units += minHeap.poll()
            apples++
        }
        return apples
    }
}
```

```swift
class Solution {
    func maxNumberOfApples(_ weight: [Int]) -> Int {
        var minHeap = Heap(weight)
        var apples = 0, units = 0
        while let w = minHeap.min, units + w <= 5000 {
            units += minHeap.removeMin()
            apples += 1
        }
        return apples
    }
}
```

```rust
use std::cmp::Reverse;
use std::collections::BinaryHeap;

impl Solution {
    pub fn max_number_of_apples(weight: Vec<i32>) -> i32 {
        let mut min_heap: BinaryHeap<Reverse<i32>> = weight.into_iter().map(Reverse).collect();
        let (mut apples, mut units) = (0, 0);
        while let Some(&Reverse(w)) = min_heap.peek() {
            if units + w > 5000 {
                break;
            }
            min_heap.pop();
            units += w;
            apples += 1;
        }
        apples
    }
}
```

```typescript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight: number[]): number {
        const minHeap = new MinPriorityQueue();
        for (const w of weight) {
            minHeap.enqueue(w);
        }
        let apples = 0,
            units = 0;
        while (!minHeap.isEmpty() && units + (minHeap.front() as number) <= 5000) {
            units += minHeap.dequeue() as number;
            apples++;
        }
        return apples;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + k \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of apples and $k$ is the number of apples put into the basket.

---

## 4. Counting Sort

::tabs-start

```python
class Solution:
    def maxNumberOfApples(self, weight: List[int]) -> int:
        count = [0] * 1001
        for w in weight:
            count[w] += 1

        apples = units = 0
        for w in range(1, 1001):
            if count[w] == 0:
                continue
            take = min(count[w], (5000 - units) // w)
            if take == 0:
                break
            apples += take
            units += take * w
        return apples
```

```java
public class Solution {
    public int maxNumberOfApples(int[] weight) {
        int[] count = new int[1001];
        for (int w : weight) {
            count[w]++;
        }

        int apples = 0, units = 0;
        for (int w = 1; w <= 1000; w++) {
            if (count[w] == 0) {
                continue;
            }
            int take = Math.min(count[w], (5000 - units) / w);
            if (take == 0) {
                break;
            }
            apples += take;
            units += take * w;
        }
        return apples;
    }
}
```

```cpp
class Solution {
public:
    int maxNumberOfApples(vector<int>& weight) {
        vector<int> count(1001, 0);
        for (int w : weight) {
            count[w]++;
        }

        int apples = 0, units = 0;
        for (int w = 1; w <= 1000; w++) {
            if (count[w] == 0) {
                continue;
            }
            int take = min(count[w], (5000 - units) / w);
            if (take == 0) {
                break;
            }
            apples += take;
            units += take * w;
        }
        return apples;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight) {
        const count = new Array(1001).fill(0);
        for (const w of weight) {
            count[w]++;
        }

        let apples = 0,
            units = 0;
        for (let w = 1; w <= 1000; w++) {
            if (count[w] === 0) {
                continue;
            }
            const take = Math.min(count[w], Math.floor((5000 - units) / w));
            if (take === 0) {
                break;
            }
            apples += take;
            units += take * w;
        }
        return apples;
    }
}
```

```csharp
public class Solution {
    public int MaxNumberOfApples(int[] weight) {
        int[] count = new int[1001];
        foreach (int w in weight) {
            count[w]++;
        }

        int apples = 0, units = 0;
        for (int w = 1; w <= 1000; w++) {
            if (count[w] == 0) {
                continue;
            }
            int take = Math.Min(count[w], (5000 - units) / w);
            if (take == 0) {
                break;
            }
            apples += take;
            units += take * w;
        }
        return apples;
    }
}
```

```go
func maxNumberOfApples(weight []int) int {
    count := make([]int, 1001)
    for _, w := range weight {
        count[w]++
    }

    apples, units := 0, 0
    for w := 1; w <= 1000; w++ {
        if count[w] == 0 {
            continue
        }
        take := min(count[w], (5000-units)/w)
        if take == 0 {
            break
        }
        apples += take
        units += take * w
    }
    return apples
}
```

```kotlin
class Solution {
    fun maxNumberOfApples(weight: IntArray): Int {
        val count = IntArray(1001)
        for (w in weight) {
            count[w]++
        }

        var apples = 0
        var units = 0
        for (w in 1..1000) {
            if (count[w] == 0) {
                continue
            }
            val take = minOf(count[w], (5000 - units) / w)
            if (take == 0) {
                break
            }
            apples += take
            units += take * w
        }
        return apples
    }
}
```

```swift
class Solution {
    func maxNumberOfApples(_ weight: [Int]) -> Int {
        var count = [Int](repeating: 0, count: 1001)
        for w in weight {
            count[w] += 1
        }

        var apples = 0, units = 0
        for w in 1...1000 {
            if count[w] == 0 {
                continue
            }
            let take = min(count[w], (5000 - units) / w)
            if take == 0 {
                break
            }
            apples += take
            units += take * w
        }
        return apples
    }
}
```

```rust
impl Solution {
    pub fn max_number_of_apples(weight: Vec<i32>) -> i32 {
        let mut count = vec![0; 1001];
        for &w in &weight {
            count[w as usize] += 1;
        }

        let (mut apples, mut units) = (0, 0);
        for w in 1..=1000 {
            if count[w as usize] == 0 {
                continue;
            }
            let take = count[w as usize].min((5000 - units) / w);
            if take == 0 {
                break;
            }
            apples += take;
            units += take * w;
        }
        apples
    }
}
```

```typescript
class Solution {
    /**
     * @param {number[]} weight
     * @return {number}
     */
    maxNumberOfApples(weight: number[]): number {
        const count: number[] = new Array(1001).fill(0);
        for (const w of weight) {
            count[w]++;
        }

        let apples = 0,
            units = 0;
        for (let w = 1; w <= 1000; w++) {
            if (count[w] === 0) {
                continue;
            }
            const take = Math.min(count[w], Math.floor((5000 - units) / w));
            if (take === 0) {
                break;
            }
            apples += take;
            units += take * w;
        }
        return apples;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n + m)$
- Space complexity: $O(m)$

> Where $n$ is the number of apples and $m$ is the maximum weight of an apple ($m = 1000$).
