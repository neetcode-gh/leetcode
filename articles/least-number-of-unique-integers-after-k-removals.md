## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Hash Maps** - Counting element frequencies efficiently using key-value data structures
- **Sorting** - Understanding how to sort arrays and the time complexity implications
- **Greedy Algorithms** - Making locally optimal choices (removing least frequent elements first) to achieve a global optimum
- **Heaps/Priority Queues** - For the min-heap approach, understanding how to efficiently extract minimum values

---

## 1. Sorting

### Intuition

To minimize the number of unique integers after removing `k` elements, we should prioritize removing integers that appear least frequently. By eliminating all occurrences of the rarest integers first, we reduce the unique count most efficiently. Sorting frequencies in ascending order lets us greedily remove elements starting from the smallest frequency.

### Algorithm

1. Count the frequency of each integer using a hash map.
2. Extract the frequency values and sort them in ascending order.
3. Iterate through the sorted frequencies:
   - If `k` is large enough to remove all occurrences of this integer, subtract the frequency from `k` and decrease the unique count.
   - Otherwise, we cannot fully remove this integer, so return the remaining unique count.
4. If all integers can be removed, return `0`.

::tabs-start

```python
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        freq = sorted(Counter(arr).values())
        n = len(freq)
        for i in range(n):
            if k >= freq[i]:
                k -= freq[i]
            else:
                return n - i
        return 0
```

```java
public class Solution {
    public int findLeastNumOfUniqueInts(int[] arr, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : arr) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        List<Integer> freq = new ArrayList<>(freqMap.values());
        Collections.sort(freq);

        int n = freq.size();
        for (int i = 0; i < n; i++) {
            if (k >= freq.get(i)) {
                k -= freq.get(i);
            } else {
                return n - i;
            }
        }
        return 0;
    }
}
```

```cpp
class Solution {
public:
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        unordered_map<int, int> freqMap;
        for (int num : arr) {
            freqMap[num]++;
        }

        vector<int> freq;
        for (auto& [_, count] : freqMap) {
            freq.push_back(count);
        }

        sort(freq.begin(), freq.end());

        int n = freq.size();
        for (int i = 0; i < n; i++) {
            if (k >= freq[i]) {
                k -= freq[i];
            } else {
                return n - i;
            }
        }
        return 0;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    findLeastNumOfUniqueInts(arr, k) {
        let freqMap = new Map();
        for (let num of arr) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }

        let freq = Array.from(freqMap.values()).sort((a, b) => a - b);

        let n = freq.length;
        for (let i = 0; i < n; i++) {
            if (k >= freq[i]) {
                k -= freq[i];
            } else {
                return n - i;
            }
        }
        return 0;
    }
}
```

```csharp
public class Solution {
    public int FindLeastNumOfUniqueInts(int[] arr, int k) {
        Dictionary<int, int> freqMap = new Dictionary<int, int>();
        foreach (int num in arr) {
            if (!freqMap.ContainsKey(num)) freqMap[num] = 0;
            freqMap[num]++;
        }

        List<int> freq = new List<int>(freqMap.Values);
        freq.Sort();

        int n = freq.Count;
        for (int i = 0; i < n; i++) {
            if (k >= freq[i]) {
                k -= freq[i];
            } else {
                return n - i;
            }
        }
        return 0;
    }
}
```

```go
func findLeastNumOfUniqueInts(arr []int, k int) int {
    freqMap := make(map[int]int)
    for _, num := range arr {
        freqMap[num]++
    }

    freq := make([]int, 0, len(freqMap))
    for _, count := range freqMap {
        freq = append(freq, count)
    }

    sort.Ints(freq)

    n := len(freq)
    for i := 0; i < n; i++ {
        if k >= freq[i] {
            k -= freq[i]
        } else {
            return n - i
        }
    }
    return 0
}
```

```kotlin
class Solution {
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        var remaining = k
        val freqMap = HashMap<Int, Int>()
        for (num in arr) {
            freqMap[num] = freqMap.getOrDefault(num, 0) + 1
        }

        val freq = freqMap.values.sorted()

        val n = freq.size
        for (i in 0 until n) {
            if (remaining >= freq[i]) {
                remaining -= freq[i]
            } else {
                return n - i
            }
        }
        return 0
    }
}
```

```swift
class Solution {
    func findLeastNumOfUniqueInts(_ arr: [Int], _ k: Int) -> Int {
        var k = k
        var freqMap = [Int: Int]()
        for num in arr {
            freqMap[num, default: 0] += 1
        }

        let freq = freqMap.values.sorted()

        let n = freq.count
        for i in 0..<n {
            if k >= freq[i] {
                k -= freq[i]
            } else {
                return n - i
            }
        }
        return 0
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Min-Heap

### Intuition

A min-heap naturally gives us access to the smallest frequency first. Instead of sorting all frequencies upfront, we can repeatedly extract the minimum frequency and try to remove that integer. This approach works similarly to sorting but uses a heap data structure for extraction.

### Algorithm

1. Build a frequency map of all integers.
2. Insert all frequency values into a min-heap.
3. While `k > 0` and the heap is not empty:
   - Pop the smallest frequency.
   - If `k` can cover this frequency, subtract it from `k` and decrement the result count.
   - Otherwise, stop (we cannot fully remove this integer).
4. Return the remaining unique count.

::tabs-start

```python
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        freq = Counter(arr)
        heap = list(freq.values())
        heapq.heapify(heap)

        res = len(heap)
        while k > 0 and heap:
            f = heapq.heappop(heap)
            if k >= f:
                k -= f
                res -= 1
        return res
```

```java
public class Solution {
    public int findLeastNumOfUniqueInts(int[] arr, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : arr) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        PriorityQueue<Integer> minHeap = new PriorityQueue<>(freqMap.values());

        int res = minHeap.size();
        while (k > 0 && !minHeap.isEmpty()) {
            int f = minHeap.poll();
            if (k >= f) {
                k -= f;
                res--;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        unordered_map<int, int> freqMap;
        for (int num : arr) {
            freqMap[num]++;
        }

        priority_queue<int, vector<int>, greater<int>> minHeap;
        for (auto& [_, count] : freqMap) {
            minHeap.push(count);
        }

        int res = minHeap.size();
        while (k > 0 && !minHeap.empty()) {
            int f = minHeap.top();
            minHeap.pop();
            if (k >= f) {
                k -= f;
                res--;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    findLeastNumOfUniqueInts(arr, k) {
        let freqMap = new Map();
        for (let num of arr) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }

        const minHeap = MinPriorityQueue.fromArray([...freqMap.values()]);

        let res = minHeap.size();
        while (k > 0 && !minHeap.isEmpty()) {
            let f = minHeap.pop();
            if (k >= f) {
                k -= f;
                res--;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLeastNumOfUniqueInts(int[] arr, int k) {
        Dictionary<int, int> freqMap = new Dictionary<int, int>();
        foreach (int num in arr) {
            if (!freqMap.ContainsKey(num)) freqMap[num] = 0;
            freqMap[num]++;
        }

        PriorityQueue<int, int> minHeap = new PriorityQueue<int, int>();
        foreach (int f in freqMap.Values) {
            minHeap.Enqueue(f, f);
        }

        int res = minHeap.Count;
        while (k > 0 && minHeap.Count > 0) {
            int f = minHeap.Dequeue();
            if (k >= f) {
                k -= f;
                res--;
            }
        }
        return res;
    }
}
```

```go
func findLeastNumOfUniqueInts(arr []int, k int) int {
    freqMap := make(map[int]int)
    for _, num := range arr {
        freqMap[num]++
    }

    minHeap := &IntHeap{}
    heap.Init(minHeap)
    for _, count := range freqMap {
        heap.Push(minHeap, count)
    }

    res := minHeap.Len()
    for k > 0 && minHeap.Len() > 0 {
        f := heap.Pop(minHeap).(int)
        if k >= f {
            k -= f
            res--
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
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        var remaining = k
        val freqMap = HashMap<Int, Int>()
        for (num in arr) {
            freqMap[num] = freqMap.getOrDefault(num, 0) + 1
        }

        val minHeap = PriorityQueue<Int>()
        for (f in freqMap.values) {
            minHeap.offer(f)
        }

        var res = minHeap.size
        while (remaining > 0 && minHeap.isNotEmpty()) {
            val f = minHeap.poll()
            if (remaining >= f) {
                remaining -= f
                res--
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findLeastNumOfUniqueInts(_ arr: [Int], _ k: Int) -> Int {
        var k = k
        var freqMap = [Int: Int]()
        for num in arr {
            freqMap[num, default: 0] += 1
        }

        var minHeap = Heap<Int>()
        for f in freqMap.values {
            minHeap.insert(f)
        }

        var res = minHeap.count
        while k > 0 && !minHeap.isEmpty {
            let f = minHeap.removeMin()
            if k >= f {
                k -= f
                res -= 1
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

## 3. Bucket Sort

### Intuition

Since frequencies are bounded by the array length, we can use bucket sort to avoid comparison-based sorting. We create buckets where bucket `f` contains the count of integers with frequency `f`. Then we iterate through buckets from frequency `1` upward, removing as many complete integers as possible at each frequency level.

### Algorithm

1. Build a frequency map of all integers.
2. Create a frequency list (bucket array) where `freqList[f]` counts how many integers have frequency `f`.
3. Iterate `f` from `1` to the array length:
   - Calculate how many integers with frequency `f` can be fully removed given the remaining `k`.
   - Subtract the cost from `k` and reduce the result count.
   - If `k` cannot remove all integers at this frequency, compute partial removal and break.
4. Return the remaining unique count.

::tabs-start

```python
class Solution:
    def findLeastNumOfUniqueInts(self, arr: List[int], k: int) -> int:
        freq = Counter(arr)
        freq_list = [0] * (len(arr) + 1)

        for n, f in freq.items():
            freq_list[f] += 1

        res = len(freq)
        for f in range(1, len(freq_list)):
            remove = freq_list[f]
            if k >= f * remove:
                k -= f * remove
                res -= remove
            else:
                remove = k // f
                res -= remove
                break
        return res
```

```java
public class Solution {
    public int findLeastNumOfUniqueInts(int[] arr, int k) {
        Map<Integer, Integer> freqMap = new HashMap<>();
        for (int num : arr) {
            freqMap.put(num, freqMap.getOrDefault(num, 0) + 1);
        }

        int[] freqList = new int[arr.length + 1];
        for (int f : freqMap.values()) {
            freqList[f]++;
        }

        int res = freqMap.size();
        for (int f = 1; f < freqList.length; f++) {
            int remove = freqList[f];
            if (k >= f * remove) {
                k -= f * remove;
                res -= remove;
            } else {
                remove = k / f;
                res -= remove;
                break;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int findLeastNumOfUniqueInts(vector<int>& arr, int k) {
        unordered_map<int, int> freqMap;
        for (int num : arr) {
            freqMap[num]++;
        }

        vector<int> freqList(arr.size() + 1, 0);
        for (auto& [_, f] : freqMap) {
            freqList[f]++;
        }

        int res = freqMap.size();
        for (int f = 1; f < freqList.size(); f++) {
            int remove = freqList[f];
            if (k >= f * remove) {
                k -= f * remove;
                res -= remove;
            } else {
                remove = k / f;
                res -= remove;
                break;
            }
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} arr
     * @param {number} k
     * @return {number}
     */
    findLeastNumOfUniqueInts(arr, k) {
        let freqMap = new Map();
        for (let num of arr) {
            freqMap.set(num, (freqMap.get(num) || 0) + 1);
        }

        let freqList = new Array(arr.length + 1).fill(0);
        for (let f of freqMap.values()) {
            freqList[f]++;
        }

        let res = freqMap.size;
        for (let f = 1; f < freqList.length; f++) {
            let remove = freqList[f];
            if (k >= f * remove) {
                k -= f * remove;
                res -= remove;
            } else {
                remove = Math.floor(k / f);
                res -= remove;
                break;
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int FindLeastNumOfUniqueInts(int[] arr, int k) {
        Dictionary<int, int> freqMap = new Dictionary<int, int>();
        foreach (int num in arr) {
            if (!freqMap.ContainsKey(num)) freqMap[num] = 0;
            freqMap[num]++;
        }

        int[] freqList = new int[arr.Length + 1];
        foreach (int f in freqMap.Values) {
            freqList[f]++;
        }

        int res = freqMap.Count;
        for (int f = 1; f < freqList.Length; f++) {
            int remove = freqList[f];
            if (k >= f * remove) {
                k -= f * remove;
                res -= remove;
            } else {
                remove = k / f;
                res -= remove;
                break;
            }
        }
        return res;
    }
}
```

```go
func findLeastNumOfUniqueInts(arr []int, k int) int {
    freqMap := make(map[int]int)
    for _, num := range arr {
        freqMap[num]++
    }

    freqList := make([]int, len(arr)+1)
    for _, f := range freqMap {
        freqList[f]++
    }

    res := len(freqMap)
    for f := 1; f < len(freqList); f++ {
        remove := freqList[f]
        if k >= f*remove {
            k -= f * remove
            res -= remove
        } else {
            remove = k / f
            res -= remove
            break
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun findLeastNumOfUniqueInts(arr: IntArray, k: Int): Int {
        var remaining = k
        val freqMap = HashMap<Int, Int>()
        for (num in arr) {
            freqMap[num] = freqMap.getOrDefault(num, 0) + 1
        }

        val freqList = IntArray(arr.size + 1)
        for (f in freqMap.values) {
            freqList[f]++
        }

        var res = freqMap.size
        for (f in 1 until freqList.size) {
            var remove = freqList[f]
            if (remaining >= f * remove) {
                remaining -= f * remove
                res -= remove
            } else {
                remove = remaining / f
                res -= remove
                break
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func findLeastNumOfUniqueInts(_ arr: [Int], _ k: Int) -> Int {
        var k = k
        var freqMap = [Int: Int]()
        for num in arr {
            freqMap[num, default: 0] += 1
        }

        var freqList = [Int](repeating: 0, count: arr.count + 1)
        for f in freqMap.values {
            freqList[f] += 1
        }

        var res = freqMap.count
        for f in 1..<freqList.count {
            var remove = freqList[f]
            if k >= f * remove {
                k -= f * remove
                res -= remove
            } else {
                remove = k / f
                res -= remove
                break
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

## Common Pitfalls

### Removing High-Frequency Elements First

The greedy strategy requires removing elements with the *lowest* frequency first to maximize the reduction in unique count. Removing high-frequency elements wastes removals since you need more deletions to eliminate a single unique integer. Always sort frequencies in ascending order.

### Counting Unique Integers Incorrectly

A subtle bug is decrementing the unique count even when you cannot fully remove all occurrences of an integer. If `k` is less than the current frequency, you cannot eliminate that unique integer, so the count should not decrease. Only reduce the unique count when all occurrences are removed.

### Forgetting Partial Removal Logic

When `k` cannot fully cover the current frequency but can partially cover it, some implementations incorrectly skip this case entirely. While partial removal does not reduce the unique count, you still need to account for it when moving to the next frequency bucket in bucket sort approaches.
