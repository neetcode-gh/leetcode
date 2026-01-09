## 1. Sorting + Sliding Window

::tabs-start

```python
class Solution:
    def minimumDeviation(self, nums: List[int]) -> int:
        n = len(nums)
        arr = []
        for i, num in enumerate(nums):
            if num & 1:
                arr.append((num, i))
                arr.append((num * 2, i))
            else:
                while num % 2 == 0:
                    arr.append((num, i))
                    num //= 2
                arr.append((num, i))

        arr.sort()
        res = float("inf")

        seen = [0] * n
        count = i = 0
        for j in range(len(arr)):
            seen[arr[j][1]] += 1
            if seen[arr[j][1]] == 1:
                count += 1
                while count == n:
                    res = min(res, arr[j][0] - arr[i][0])
                    seen[arr[i][1]] -= 1
                    if seen[arr[i][1]] == 0:
                        count -= 1
                    i += 1

        return res
```

```java
public class Solution {
    public int minimumDeviation(int[] nums) {
        int n = nums.length;
        List<int[]> arr = new ArrayList<>();

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (num % 2 == 1) {
                arr.add(new int[]{num, i});
                arr.add(new int[]{num * 2, i});
            } else {
                while (num % 2 == 0) {
                    arr.add(new int[]{num, i});
                    num /= 2;
                }
                arr.add(new int[]{num, i});
            }
        }

        arr.sort(Comparator.comparingInt(a -> a[0]));
        int res = Integer.MAX_VALUE;

        int[] seen = new int[n];
        int count = 0, i = 0;

        for (int j = 0; j < arr.size(); j++) {
            seen[arr.get(j)[1]]++;
            if (seen[arr.get(j)[1]] == 1) {
                count++;
                while (count == n) {
                    res = Math.min(res, arr.get(j)[0] - arr.get(i)[0]);
                    seen[arr.get(i)[1]]--;
                    if (seen[arr.get(i)[1]] == 0) {
                        count--;
                    }
                    i++;
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
    int minimumDeviation(vector<int>& nums) {
        int n = nums.size();
        vector<pair<int, int>> arr;

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (num % 2 == 1) {
                arr.emplace_back(num, i);
                arr.emplace_back(num * 2, i);
            } else {
                while (num % 2 == 0) {
                    arr.emplace_back(num, i);
                    num /= 2;
                }
                arr.emplace_back(num, i);
            }
        }

        sort(arr.begin(), arr.end());
        int res = INT_MAX;

        vector<int> seen(n, 0);
        int count = 0, i = 0;

        for (int j = 0; j < arr.size(); j++) {
            seen[arr[j].second]++;
            if (seen[arr[j].second] == 1) {
                count++;
                while (count == n) {
                    res = min(res, arr[j].first - arr[i].first);
                    seen[arr[i].second]--;
                    if (seen[arr[i].second] == 0) {
                        count--;
                    }
                    i++;
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
     * @param {number[]} nums
     * @return {number}
     */
    minimumDeviation(nums) {
        let n = nums.length;
        let arr = [];

        for (let i = 0; i < n; i++) {
            let num = nums[i];
            if (num % 2 === 1) {
                arr.push([num, i]);
                arr.push([num * 2, i]);
            } else {
                while (num % 2 === 0) {
                    arr.push([num, i]);
                    num /= 2;
                }
                arr.push([num, i]);
            }
        }

        arr.sort((a, b) => a[0] - b[0]);
        let res = Infinity;

        let seen = new Array(n).fill(0);
        let count = 0,
            i = 0;

        for (let j = 0; j < arr.length; j++) {
            seen[arr[j][1]]++;
            if (seen[arr[j][1]] === 1) {
                count++;
                while (count === n) {
                    res = Math.min(res, arr[j][0] - arr[i][0]);
                    seen[arr[i][1]]--;
                    if (seen[arr[i][1]] === 0) {
                        count--;
                    }
                    i++;
                }
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumDeviation(int[] nums) {
        int n = nums.Length;
        List<int[]> arr = new List<int[]>();

        for (int i = 0; i < n; i++) {
            int num = nums[i];
            if (num % 2 == 1) {
                arr.Add(new int[] { num, i });
                arr.Add(new int[] { num * 2, i });
            } else {
                while (num % 2 == 0) {
                    arr.Add(new int[] { num, i });
                    num /= 2;
                }
                arr.Add(new int[] { num, i });
            }
        }

        arr.Sort((a, b) => a[0].CompareTo(b[0]));
        int res = int.MaxValue;

        int[] seen = new int[n];
        int count = 0, idx = 0;

        for (int j = 0; j < arr.Count; j++) {
            seen[arr[j][1]]++;
            if (seen[arr[j][1]] == 1) {
                count++;
                while (count == n) {
                    res = Math.Min(res, arr[j][0] - arr[idx][0]);
                    seen[arr[idx][1]]--;
                    if (seen[arr[idx][1]] == 0) {
                        count--;
                    }
                    idx++;
                }
            }
        }
        return res;
    }
}
```

```go
func minimumDeviation(nums []int) int {
    n := len(nums)
    arr := [][]int{}

    for i := 0; i < n; i++ {
        num := nums[i]
        if num%2 == 1 {
            arr = append(arr, []int{num, i})
            arr = append(arr, []int{num * 2, i})
        } else {
            for num%2 == 0 {
                arr = append(arr, []int{num, i})
                num /= 2
            }
            arr = append(arr, []int{num, i})
        }
    }

    sort.Slice(arr, func(i, j int) bool {
        return arr[i][0] < arr[j][0]
    })
    res := math.MaxInt32

    seen := make([]int, n)
    count, idx := 0, 0

    for j := 0; j < len(arr); j++ {
        seen[arr[j][1]]++
        if seen[arr[j][1]] == 1 {
            count++
            for count == n {
                if arr[j][0]-arr[idx][0] < res {
                    res = arr[j][0] - arr[idx][0]
                }
                seen[arr[idx][1]]--
                if seen[arr[idx][1]] == 0 {
                    count--
                }
                idx++
            }
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun minimumDeviation(nums: IntArray): Int {
        val n = nums.size
        val arr = mutableListOf<IntArray>()

        for (i in 0 until n) {
            var num = nums[i]
            if (num % 2 == 1) {
                arr.add(intArrayOf(num, i))
                arr.add(intArrayOf(num * 2, i))
            } else {
                while (num % 2 == 0) {
                    arr.add(intArrayOf(num, i))
                    num /= 2
                }
                arr.add(intArrayOf(num, i))
            }
        }

        arr.sortBy { it[0] }
        var res = Int.MAX_VALUE

        val seen = IntArray(n)
        var count = 0
        var idx = 0

        for (j in arr.indices) {
            seen[arr[j][1]]++
            if (seen[arr[j][1]] == 1) {
                count++
                while (count == n) {
                    res = minOf(res, arr[j][0] - arr[idx][0])
                    seen[arr[idx][1]]--
                    if (seen[arr[idx][1]] == 0) {
                        count--
                    }
                    idx++
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func minimumDeviation(_ nums: [Int]) -> Int {
        let n = nums.count
        var arr = [[Int]]()

        for i in 0..<n {
            var num = nums[i]
            if num % 2 == 1 {
                arr.append([num, i])
                arr.append([num * 2, i])
            } else {
                while num % 2 == 0 {
                    arr.append([num, i])
                    num /= 2
                }
                arr.append([num, i])
            }
        }

        arr.sort { $0[0] < $1[0] }
        var res = Int.max

        var seen = [Int](repeating: 0, count: n)
        var count = 0
        var idx = 0

        for j in 0..<arr.count {
            seen[arr[j][1]] += 1
            if seen[arr[j][1]] == 1 {
                count += 1
                while count == n {
                    res = min(res, arr[j][0] - arr[idx][0])
                    seen[arr[idx][1]] -= 1
                    if seen[arr[idx][1]] == 0 {
                        count -= 1
                    }
                    idx += 1
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O((n \log m) * \log (n \log m))$
- Space complexity: $O(n \log m)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in $nums$.

---

## 2. Min-Heap

::tabs-start

```python
class Solution:
    def minimumDeviation(self, nums: List[int]) -> int:
        minHeap, heapMax = [], 0

        for n in nums:
            tmp = n
            while n % 2 == 0:
                n //= 2
            minHeap.append((n, max(tmp, 2 * n)))
            heapMax = max(heapMax, n)

        res = float("inf")
        heapq.heapify(minHeap)

        while len(minHeap) == len(nums):
            n, nMax = heapq.heappop(minHeap)
            res = min(res, heapMax - n)

            if n < nMax:
                heapq.heappush(minHeap, (n * 2, nMax))
                heapMax = max(heapMax, n * 2)

        return res
```

```java
public class Solution {
    public int minimumDeviation(int[] nums) {
        PriorityQueue<int[]> minHeap = new PriorityQueue<>((a, b) -> a[0] - b[0]);
        int heapMax = 0;

        for (int num : nums) {
            int tmp = num;
            while (num % 2 == 0) {
                num /= 2;
            }
            minHeap.offer(new int[]{num, Math.max(tmp, 2 * num)});
            heapMax = Math.max(heapMax, num);
        }

        int res = Integer.MAX_VALUE;

        while (minHeap.size() == nums.length) {
            int[] minElement = minHeap.poll();
            int n = minElement[0], nMax = minElement[1];
            res = Math.min(res, heapMax - n);

            if (n < nMax) {
                minHeap.offer(new int[]{n * 2, nMax});
                heapMax = Math.max(heapMax, n * 2);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumDeviation(vector<int>& nums) {
        priority_queue<pair<int, int>, vector<pair<int, int>>, greater<>> minHeap;
        int heapMax = 0;

        for (int num : nums) {
            int tmp = num;
            while (num % 2 == 0) {
                num /= 2;
            }
            minHeap.push({num, max(tmp, 2 * num)});
            heapMax = max(heapMax, num);
        }

        int res = INT_MAX;

        while (minHeap.size() == nums.size()) {
            auto [n, nMax] = minHeap.top();
            minHeap.pop();
            res = min(res, heapMax - n);

            if (n < nMax) {
                minHeap.push({n * 2, nMax});
                heapMax = max(heapMax, n * 2);
            }
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minimumDeviation(nums) {
        const minHeap = new MinPriorityQueue((x) => x[0]);
        let heapMax = 0;

        for (let num of nums) {
            let tmp = num;
            while (num % 2 === 0) {
                num /= 2;
            }
            minHeap.enqueue([num, Math.max(tmp, num * 2)]);
            heapMax = Math.max(heapMax, num);
        }

        let res = Infinity;

        while (minHeap.size() === nums.length) {
            let [n, nMax] = minHeap.dequeue();
            res = Math.min(res, heapMax - n);

            if (n < nMax) {
                minHeap.enqueue([n * 2, nMax]);
                heapMax = Math.max(heapMax, n * 2);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumDeviation(int[] nums) {
        var minHeap = new PriorityQueue<int[], int>();
        int heapMax = 0;

        foreach (int num in nums) {
            int tmp = num;
            int n = num;
            while (n % 2 == 0) {
                n /= 2;
            }
            minHeap.Enqueue(new int[] { n, Math.Max(tmp, 2 * n) }, n);
            heapMax = Math.Max(heapMax, n);
        }

        int res = int.MaxValue;

        while (minHeap.Count == nums.Length) {
            int[] minElement = minHeap.Dequeue();
            int val = minElement[0], nMax = minElement[1];
            res = Math.Min(res, heapMax - val);

            if (val < nMax) {
                minHeap.Enqueue(new int[] { val * 2, nMax }, val * 2);
                heapMax = Math.Max(heapMax, val * 2);
            }
        }

        return res;
    }
}
```

```go
import "container/heap"

type MinHeap [][]int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i][0] < h[j][0] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x any)        { *h = append(*h, x.([]int)) }
func (h *MinHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func minimumDeviation(nums []int) int {
    minHeap := &MinHeap{}
    heap.Init(minHeap)
    heapMax := 0

    for _, num := range nums {
        tmp := num
        for num%2 == 0 {
            num /= 2
        }
        heap.Push(minHeap, []int{num, max(tmp, 2*num)})
        heapMax = max(heapMax, num)
    }

    res := math.MaxInt32

    for minHeap.Len() == len(nums) {
        minElement := heap.Pop(minHeap).([]int)
        n, nMax := minElement[0], minElement[1]
        res = min(res, heapMax-n)

        if n < nMax {
            heap.Push(minHeap, []int{n * 2, nMax})
            heapMax = max(heapMax, n*2)
        }
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumDeviation(nums: IntArray): Int {
        val minHeap = PriorityQueue<IntArray>(compareBy { it[0] })
        var heapMax = 0

        for (num in nums) {
            var n = num
            val tmp = num
            while (n % 2 == 0) {
                n /= 2
            }
            minHeap.offer(intArrayOf(n, maxOf(tmp, 2 * n)))
            heapMax = maxOf(heapMax, n)
        }

        var res = Int.MAX_VALUE

        while (minHeap.size == nums.size) {
            val minElement = minHeap.poll()
            val n = minElement[0]
            val nMax = minElement[1]
            res = minOf(res, heapMax - n)

            if (n < nMax) {
                minHeap.offer(intArrayOf(n * 2, nMax))
                heapMax = maxOf(heapMax, n * 2)
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumDeviation(_ nums: [Int]) -> Int {
        var minHeap = Heap<(Int, Int)>(comparator: { $0.0 < $1.0 })
        var heapMax = 0

        for num in nums {
            var n = num
            let tmp = num
            while n % 2 == 0 {
                n /= 2
            }
            minHeap.insert((n, max(tmp, 2 * n)))
            heapMax = max(heapMax, n)
        }

        var res = Int.max

        while minHeap.count == nums.count {
            let minElement = minHeap.remove()!
            let n = minElement.0
            let nMax = minElement.1
            res = min(res, heapMax - n)

            if n < nMax {
                minHeap.insert((n * 2, nMax))
                heapMax = max(heapMax, n * 2)
            }
        }

        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    var count: Int { elements.count }
    var isEmpty: Bool { elements.isEmpty }

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n *\log n * \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in $nums$.

---

## 3. Max-Heap

::tabs-start

```python
class Solution:
    def minimumDeviation(self, nums: List[int]) -> int:
        maxHeap = []
        minVal = float("inf")

        for num in nums:
            if num % 2 == 1:
                num *= 2
            heapq.heappush(maxHeap, -num)
            minVal = min(minVal, num)

        res = float("inf")

        while maxHeap:
            maxVal = -heapq.heappop(maxHeap)
            res = min(res, maxVal - minVal)
            if maxVal % 2 == 1:
                break

            nextVal = maxVal // 2
            heapq.heappush(maxHeap, -nextVal)
            minVal = min(minVal, nextVal)

        return res
```

```java
public class Solution {
    public int minimumDeviation(int[] nums) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);
        int minVal = Integer.MAX_VALUE;

        for (int num : nums) {
            if (num % 2 == 1) num *= 2;
            maxHeap.offer(num);
            minVal = Math.min(minVal, num);
        }

        int res = Integer.MAX_VALUE;

        while (!maxHeap.isEmpty()) {
            int maxVal = maxHeap.poll();
            res = Math.min(res, maxVal - minVal);

            if (maxVal % 2 == 1) break;

            int nextVal = maxVal / 2;
            maxHeap.offer(nextVal);
            minVal = Math.min(minVal, nextVal);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int minimumDeviation(vector<int>& nums) {
        priority_queue<int> maxHeap;
        int minVal = INT_MAX;

        for (int num : nums) {
            if (num % 2 == 1) num *= 2;
            maxHeap.push(num);
            minVal = min(minVal, num);
        }

        int res = INT_MAX;

        while (!maxHeap.empty()) {
            int maxVal = maxHeap.top();
            maxHeap.pop();
            res = min(res, maxVal - minVal);

            if (maxVal % 2 == 1) break;

            int nextVal = maxVal / 2;
            maxHeap.push(nextVal);
            minVal = min(minVal, nextVal);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @return {number}
     */
    minimumDeviation(nums) {
        const maxHeap = new MaxPriorityQueue();
        let minVal = Infinity;

        for (let num of nums) {
            if (num % 2 === 1) num *= 2;
            maxHeap.enqueue(num);
            minVal = Math.min(minVal, num);
        }

        let res = Infinity;

        while (!maxHeap.isEmpty()) {
            let maxVal = maxHeap.dequeue();
            res = Math.min(res, maxVal - minVal);

            if (maxVal % 2 === 1) break;

            let nextVal = maxVal / 2;
            maxHeap.enqueue(nextVal);
            minVal = Math.min(minVal, nextVal);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int MinimumDeviation(int[] nums) {
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        int minVal = int.MaxValue;

        foreach (int num in nums) {
            int n = num;
            if (n % 2 == 1) n *= 2;
            maxHeap.Enqueue(n, n);
            minVal = Math.Min(minVal, n);
        }

        int res = int.MaxValue;

        while (maxHeap.Count > 0) {
            int maxVal = maxHeap.Dequeue();
            res = Math.Min(res, maxVal - minVal);

            if (maxVal % 2 == 1) break;

            int nextVal = maxVal / 2;
            maxHeap.Enqueue(nextVal, nextVal);
            minVal = Math.Min(minVal, nextVal);
        }

        return res;
    }
}
```

```go
import "container/heap"

type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x any)        { *h = append(*h, x.(int)) }
func (h *MaxHeap) Pop() any {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func minimumDeviation(nums []int) int {
    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)
    minVal := math.MaxInt32

    for _, num := range nums {
        if num%2 == 1 {
            num *= 2
        }
        heap.Push(maxHeap, num)
        minVal = min(minVal, num)
    }

    res := math.MaxInt32

    for maxHeap.Len() > 0 {
        maxVal := heap.Pop(maxHeap).(int)
        res = min(res, maxVal-minVal)

        if maxVal%2 == 1 {
            break
        }

        nextVal := maxVal / 2
        heap.Push(maxHeap, nextVal)
        minVal = min(minVal, nextVal)
    }

    return res
}
```

```kotlin
class Solution {
    fun minimumDeviation(nums: IntArray): Int {
        val maxHeap = PriorityQueue<Int>(compareByDescending { it })
        var minVal = Int.MAX_VALUE

        for (num in nums) {
            var n = num
            if (n % 2 == 1) n *= 2
            maxHeap.offer(n)
            minVal = minOf(minVal, n)
        }

        var res = Int.MAX_VALUE

        while (maxHeap.isNotEmpty()) {
            val maxVal = maxHeap.poll()
            res = minOf(res, maxVal - minVal)

            if (maxVal % 2 == 1) break

            val nextVal = maxVal / 2
            maxHeap.offer(nextVal)
            minVal = minOf(minVal, nextVal)
        }

        return res
    }
}
```

```swift
class Solution {
    func minimumDeviation(_ nums: [Int]) -> Int {
        var maxHeap = Heap<Int>(comparator: { $0 > $1 })
        var minVal = Int.max

        for num in nums {
            var n = num
            if n % 2 == 1 { n *= 2 }
            maxHeap.insert(n)
            minVal = min(minVal, n)
        }

        var res = Int.max

        while !maxHeap.isEmpty {
            let maxVal = maxHeap.remove()!
            res = min(res, maxVal - minVal)

            if maxVal % 2 == 1 { break }

            let nextVal = maxVal / 2
            maxHeap.insert(nextVal)
            minVal = min(minVal, nextVal)
        }

        return res
    }
}

struct Heap<T> {
    var elements: [T] = []
    let comparator: (T, T) -> Bool

    var count: Int { elements.count }
    var isEmpty: Bool { elements.isEmpty }

    init(comparator: @escaping (T, T) -> Bool) {
        self.comparator = comparator
    }

    mutating func insert(_ value: T) {
        elements.append(value)
        siftUp(from: elements.count - 1)
    }

    mutating func remove() -> T? {
        guard !elements.isEmpty else { return nil }
        elements.swapAt(0, elements.count - 1)
        let removed = elements.removeLast()
        if !elements.isEmpty { siftDown(from: 0) }
        return removed
    }

    private mutating func siftUp(from index: Int) {
        var child = index
        var parent = (child - 1) / 2
        while child > 0 && comparator(elements[child], elements[parent]) {
            elements.swapAt(child, parent)
            child = parent
            parent = (child - 1) / 2
        }
    }

    private mutating func siftDown(from index: Int) {
        var parent = index
        while true {
            let left = 2 * parent + 1
            let right = 2 * parent + 2
            var candidate = parent
            if left < elements.count && comparator(elements[left], elements[candidate]) {
                candidate = left
            }
            if right < elements.count && comparator(elements[right], elements[candidate]) {
                candidate = right
            }
            if candidate == parent { return }
            elements.swapAt(parent, candidate)
            parent = candidate
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n *\log n * \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in $nums$.
