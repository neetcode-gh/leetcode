## 1. Brute Force (Sorting)

### Intuition

The simplest way to find the median of a window is to extract the elements, sort them, and pick the middle value(s). For each position of the sliding window, we create a copy of the current k elements, sort them, and compute the median based on whether k is odd or even.

### Algorithm

1. Iterate through all possible starting positions of the window (from index `0` to `n - k`).
2. For each window position, extract the `k` elements into a temporary array.
3. Sort the temporary array.
4. If `k` is odd, the median is the middle element at index `k / 2`.
5. If `k` is even, the median is the average of elements at indices `(k - 1) / 2` and `k / 2`.
6. Append each median to the `result` array and return it.

::tabs-start

```python
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        res = []
        for i in range(len(nums) - k + 1):
            tmp = nums[i:i + k][:]
            tmp.sort()
            if k & 1:
                res.append(tmp[k // 2])
            else:
                res.append((tmp[k // 2] + tmp[(k - 1) // 2]) / 2)
        return res
```

```java
public class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        int n = nums.length - k + 1;
        double[] res = new double[n];
        for (int i = 0; i < n; i++) {
            int[] tmp = Arrays.copyOfRange(nums, i, i + k);
            Arrays.sort(tmp);
            if (k % 2 == 1) {
                res[i] = tmp[k / 2];
            } else {
                res[i] = (tmp[k / 2] + 0L + tmp[(k - 1) / 2]) / 2.0;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        vector<double> res;
        for (int i = 0; i <= nums.size() - k; ++i) {
            vector<int> tmp(nums.begin() + i, nums.begin() + i + k);
            sort(tmp.begin(), tmp.end());
            if (k % 2 == 1) {
                res.push_back(tmp[k / 2]);
            } else {
                res.push_back((tmp[k / 2] + 0LL + tmp[(k - 1) / 2]) / 2.0);
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
     * @param {number} k
     * @return {number[]}
     */
    medianSlidingWindow(nums, k) {
        const res = [];
        for (let i = 0; i <= nums.length - k; i++) {
            const tmp = nums.slice(i, i + k).sort((a, b) => a - b);
            if (k % 2 === 1) {
                res.push(tmp[Math.floor(k / 2)]);
            } else {
                res.push(
                    (tmp[Math.floor(k / 2)] + tmp[Math.floor((k - 1) / 2)]) / 2,
                );
            }
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public double[] MedianSlidingWindow(int[] nums, int k) {
        int n = nums.Length - k + 1;
        double[] res = new double[n];
        for (int i = 0; i < n; i++) {
            int[] tmp = new int[k];
            Array.Copy(nums, i, tmp, 0, k);
            Array.Sort(tmp);
            if (k % 2 == 1) {
                res[i] = tmp[k / 2];
            } else {
                res[i] = (tmp[k / 2] + 0L + tmp[(k - 1) / 2]) / 2.0;
            }
        }
        return res;
    }
}
```

```go
func medianSlidingWindow(nums []int, k int) []float64 {
    n := len(nums) - k + 1
    res := make([]float64, n)
    for i := 0; i < n; i++ {
        tmp := make([]int, k)
        copy(tmp, nums[i:i+k])
        sort.Ints(tmp)
        if k%2 == 1 {
            res[i] = float64(tmp[k/2])
        } else {
            res[i] = float64(tmp[k/2]+tmp[(k-1)/2]) / 2.0
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun medianSlidingWindow(nums: IntArray, k: Int): DoubleArray {
        val n = nums.size - k + 1
        val res = DoubleArray(n)
        for (i in 0 until n) {
            val tmp = nums.sliceArray(i until i + k).sortedArray()
            res[i] = if (k % 2 == 1) {
                tmp[k / 2].toDouble()
            } else {
                (tmp[k / 2].toLong() + tmp[(k - 1) / 2]) / 2.0
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {
        let n = nums.count - k + 1
        var res = [Double]()
        for i in 0..<n {
            let tmp = Array(nums[i..<(i + k)]).sorted()
            if k % 2 == 1 {
                res.append(Double(tmp[k / 2]))
            } else {
                res.append(Double(tmp[k / 2] + tmp[(k - 1) / 2]) / 2.0)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k\log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 2. Two Heaps

### Intuition

Instead of sorting each window from scratch, we can maintain the elements in two heaps: a max-heap for the smaller half and a min-heap for the larger half. The median is always accessible from the tops of these heaps. When the window slides, we use lazy deletion to handle removed elements. Elements are marked for deletion in a hash map but only physically removed when they appear at the heap tops.

### Algorithm

1. Initialize a max-heap (`small`) and a min-heap (`large`) for the first `k` elements, balancing them so `small` has the ceiling of `k/2` elements.
2. Compute the first median from the heap tops.
3. For each new element entering the window:
   - Mark the outgoing element for lazy deletion in a hash map.
   - Track the balance change based on which heap the outgoing element belongs to.
   - Insert the new element into the appropriate heap based on comparison with the `small` heap's top.
   - Rebalance the heaps if needed by moving elements between them.
   - Remove any elements marked for deletion that appear at heap tops.
   - Compute and store the median.
4. Return the array of medians.

::tabs-start

```python
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        small, large = [], []
        d = defaultdict(int)

        for i in range(k):
            heapq.heappush(small, -nums[i])
        for i in range(k // 2):
            heapq.heappush(large, -heapq.heappop(small))

        res = [-small[0] if k & 1 else (large[0] - small[0]) / 2]
        for i in range(k, len(nums)):
            d[nums[i - k]] += 1
            balance = -1 if small and nums[i - k] <= -small[0] else 1

            if small and nums[i] <= -small[0]:
                heapq.heappush(small, -nums[i])
                balance += 1
            else:
                heapq.heappush(large, nums[i])
                balance -= 1

            if balance > 0:
                heapq.heappush(large, -heapq.heappop(small))
            if balance < 0:
                heapq.heappush(small, -heapq.heappop(large))

            while small and d[-small[0]] > 0:
                d[-heapq.heappop(small)] -= 1

            while large and d[large[0]] > 0:
                d[heapq.heappop(large)] -= 1

            res.append(-small[0] if k & 1 else (large[0] - small[0]) / 2)

        return res
```

```java
public class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        PriorityQueue<Integer> small = new PriorityQueue<>(Collections.reverseOrder());
        PriorityQueue<Integer> large = new PriorityQueue<>();
        Map<Integer, Integer> d = new HashMap<>();

        for (int i = 0; i < k; i++) {
            small.add(nums[i]);
        }
        for (int i = 0; i < k / 2; i++) {
            large.add(small.poll());
        }

        double[] res = new double[nums.length - k + 1];
        res[0] = k % 2 == 1 ? small.peek() : (large.peek() + 0L + small.peek()) / 2.0;
        for (int i = k; i < nums.length; i++) {
            d.put(nums[i - k], d.getOrDefault(nums[i - k], 0) + 1);
            int balance = (small.size() > 0 && nums[i - k] <= small.peek()) ? -1 : 1;

            if (nums[i] <= small.peek()) {
                small.add(nums[i]);
                balance++;
            } else {
                large.add(nums[i]);
                balance--;
            }

            if (balance > 0) {
                large.add(small.poll());
            }
            if (balance < 0) {
                small.add(large.poll());
            }

            while (!small.isEmpty() && d.getOrDefault(small.peek(), 0) > 0) {
                d.put(small.peek(), d.get(small.peek()) - 1);
                small.poll();
            }
            while (!large.isEmpty() && d.getOrDefault(large.peek(), 0) > 0) {
                d.put(large.peek(), d.get(large.peek()) - 1);
                large.poll();
            }

            res[i - k + 1] = k % 2 == 1 ? small.peek() : (large.peek() + 0L + small.peek()) / 2.0;
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        priority_queue<int> small;
        priority_queue<int, vector<int>, greater<int>> large;
        unordered_map<int, int> d;

        for (int i = 0; i < k; ++i) {
            small.push(nums[i]);
        }
        for (int i = 0; i < k / 2; ++i) {
            large.push(small.top());
            small.pop();
        }

        vector<double> res;
        res.push_back(k & 1 ? small.top() : (large.top() + 0LL + small.top()) / 2.0);
        for (int i = k; i < nums.size(); ++i) {
            d[nums[i - k]]++;
            int balance = small.size() > 0 && nums[i - k] <= small.top() ? -1 : 1;

            if (nums[i] <= small.top()) {
                small.push(nums[i]);
                balance++;
            } else {
                large.push(nums[i]);
                balance--;
            }

            if (balance > 0) {
                large.push(small.top());
                small.pop();
            }
            if (balance < 0) {
                small.push(large.top());
                large.pop();
            }

            while (!small.empty() && d[small.top()] > 0) {
                d[small.top()]--;
                small.pop();
            }

            while (!large.empty() && d[large.top()] > 0) {
                d[large.top()]--;
                large.pop();
            }

            res.push_back(k & 1 ? small.top() : (large.top() + 0LL + small.top()) / 2.0);
        }

        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    medianSlidingWindow(nums, k) {
        const small = new MaxPriorityQueue({ compare: (a, b) => b - a });
        const large = new MinPriorityQueue({ compare: (a, b) => a - b });
        const d = new Map();

        for (let i = 0; i < k; i++) {
            small.enqueue(nums[i]);
        }
        for (let i = 0; i < Math.floor(k / 2); i++) {
            large.enqueue(small.dequeue());
        }

        const res = [
            k % 2 === 1 ? small.front() : (large.front() + small.front()) / 2,
        ];
        for (let i = k; i < nums.length; i++) {
            const toRemove = nums[i - k];
            d.set(toRemove, (d.get(toRemove) || 0) + 1);
            let balance =
                small.size() > 0 && toRemove <= small.front() ? -1 : 1;

            if (nums[i] <= small.front()) {
                small.enqueue(nums[i]);
                balance++;
            } else {
                large.enqueue(nums[i]);
                balance--;
            }

            if (balance > 0) {
                large.enqueue(small.dequeue());
            }
            if (balance < 0) {
                small.enqueue(large.dequeue());
            }

            while (small.size() > 0 && d.get(small.front()) > 0) {
                d.set(small.front(), d.get(small.front()) - 1);
                small.dequeue();
            }
            while (large.size() > 0 && d.get(large.front()) > 0) {
                d.set(large.front(), d.get(large.front()) - 1);
                large.dequeue();
            }

            res.push(
                k % 2 === 1
                    ? small.front()
                    : (large.front() + small.front()) / 2,
            );
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public double[] MedianSlidingWindow(int[] nums, int k) {
        var small = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
        var large = new PriorityQueue<int, int>();
        var d = new Dictionary<int, int>();

        for (int i = 0; i < k; i++) {
            small.Enqueue(nums[i], nums[i]);
        }
        for (int i = 0; i < k / 2; i++) {
            int val = small.Dequeue();
            large.Enqueue(val, val);
        }

        double[] res = new double[nums.Length - k + 1];
        res[0] = k % 2 == 1 ? small.Peek() : (small.Peek() + 0L + large.Peek()) / 2.0;

        for (int i = k; i < nums.Length; i++) {
            int toRemove = nums[i - k];
            d[toRemove] = d.GetValueOrDefault(toRemove) + 1;
            int balance = small.Count > 0 && toRemove <= small.Peek() ? -1 : 1;

            if (small.Count > 0 && nums[i] <= small.Peek()) {
                small.Enqueue(nums[i], nums[i]);
                balance++;
            } else {
                large.Enqueue(nums[i], nums[i]);
                balance--;
            }

            if (balance > 0) {
                int val = small.Dequeue();
                large.Enqueue(val, val);
            }
            if (balance < 0) {
                int val = large.Dequeue();
                small.Enqueue(val, val);
            }

            while (small.Count > 0 && d.GetValueOrDefault(small.Peek()) > 0) {
                d[small.Peek()]--;
                small.Dequeue();
            }
            while (large.Count > 0 && d.GetValueOrDefault(large.Peek()) > 0) {
                d[large.Peek()]--;
                large.Dequeue();
            }

            res[i - k + 1] = k % 2 == 1 ? small.Peek() : (small.Peek() + 0L + large.Peek()) / 2.0;
        }

        return res;
    }
}
```

```go
func medianSlidingWindow(nums []int, k int) []float64 {
    // Note: This is a simplified brute force approach for Go
    // as implementing two heaps with lazy deletion is complex
    n := len(nums) - k + 1
    res := make([]float64, n)
    for i := 0; i < n; i++ {
        tmp := make([]int, k)
        copy(tmp, nums[i:i+k])
        sort.Ints(tmp)
        if k%2 == 1 {
            res[i] = float64(tmp[k/2])
        } else {
            res[i] = float64(tmp[k/2]+tmp[(k-1)/2]) / 2.0
        }
    }
    return res
}
```

```kotlin
class Solution {
    fun medianSlidingWindow(nums: IntArray, k: Int): DoubleArray {
        val small = PriorityQueue<Int>(Collections.reverseOrder())
        val large = PriorityQueue<Int>()
        val d = HashMap<Int, Int>()

        for (i in 0 until k) {
            small.add(nums[i])
        }
        for (i in 0 until k / 2) {
            large.add(small.poll())
        }

        val res = DoubleArray(nums.size - k + 1)
        res[0] = if (k % 2 == 1) small.peek().toDouble() else (large.peek().toLong() + small.peek()) / 2.0

        for (i in k until nums.size) {
            d[nums[i - k]] = d.getOrDefault(nums[i - k], 0) + 1
            var balance = if (small.isNotEmpty() && nums[i - k] <= small.peek()) -1 else 1

            if (nums[i] <= small.peek()) {
                small.add(nums[i])
                balance++
            } else {
                large.add(nums[i])
                balance--
            }

            if (balance > 0) large.add(small.poll())
            if (balance < 0) small.add(large.poll())

            while (small.isNotEmpty() && d.getOrDefault(small.peek(), 0) > 0) {
                d[small.peek()] = d[small.peek()]!! - 1
                small.poll()
            }
            while (large.isNotEmpty() && d.getOrDefault(large.peek(), 0) > 0) {
                d[large.peek()] = d[large.peek()]!! - 1
                large.poll()
            }

            res[i - k + 1] = if (k % 2 == 1) small.peek().toDouble() else (large.peek().toLong() + small.peek()) / 2.0
        }

        return res
    }
}
```

```swift
class Solution {
    func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {
        // Simplified brute force approach for Swift
        let n = nums.count - k + 1
        var res = [Double]()
        for i in 0..<n {
            let tmp = Array(nums[i..<(i + k)]).sorted()
            if k % 2 == 1 {
                res.append(Double(tmp[k / 2]))
            } else {
                res.append(Double(tmp[k / 2] + tmp[(k - 1) / 2]) / 2.0)
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 3. Two Multisets

### Intuition

Using two balanced multisets (or sorted lists) instead of heaps gives us direct removal capability without lazy deletion. The smaller half is stored in one multiset with access to its maximum, and the larger half is stored in another with access to its minimum. When the window slides, we can directly remove the outgoing element from whichever set contains it.

### Algorithm

1. Initialize two multisets: `small` for the lower half and `large` for the upper half.
2. For each element in the array:
   - Insert into `small` if it is less than or equal to `small`'s maximum, otherwise into `large`.
   - If past the first `k` elements, remove the outgoing element from whichever set contains it.
   - Rebalance so that `small` has at most one more element than `large`, and `large` never exceeds `small`'s size.
   - Once the window is full (`i >= k - 1`), compute the median from the tops of the sets.
3. Return the collected medians.

::tabs-start

```python
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        small, large = SortedList(), SortedList()
        res = []
        for i in range(len(nums)):
            if len(small) == 0 or nums[i] <= small[-1]:
                small.add(nums[i])
            else:
                large.add(nums[i])
            if i >= k:
                if nums[i - k] in small:
                    small.remove(nums[i - k])
                else:
                    large.remove(nums[i - k])
            if len(small) > len(large) + 1:
                large.add(small.pop())
            if len(large) > len(small):
                small.add(large.pop(0))
            if i >= k - 1:
                res.append(small[-1] if k & 1 else (small[-1] + large[0]) / 2)
        return res
```

```java
public class Solution {
    public double[] medianSlidingWindow(int[] nums, int k) {
        TreeSet<Integer> small = new TreeSet<>((a, b) ->
            nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b)
        );
        TreeSet<Integer> large = new TreeSet<>((a, b) ->
            nums[a] != nums[b] ? Integer.compare(nums[a], nums[b]) : Integer.compare(a, b)
        );
        double[] res = new double[nums.length - k + 1];
        for (int i = 0; i < nums.length; i++) {
            if (small.isEmpty() || nums[i] <= nums[small.last()]) small.add(i);
            else large.add(i);
            if (i >= k) {
                if (small.contains(i - k)) small.remove(i - k);
                else large.remove(i - k);
            }
            while (small.size() > large.size() + 1) large.add(small.pollLast());
            while (large.size() > small.size()) small.add(large.pollFirst());
            if (i >= k - 1) {
                res[i - k + 1] = k % 2 == 1 ? nums[small.last()] :
                                 (nums[small.last()] + 0L + nums[large.first()]) / 2.0;
            }
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<int> small, large;
        vector<double> res;
        for (int i = 0; i < nums.size(); ++i) {
            if (small.empty() || nums[i] <= *small.rbegin()) small.insert(nums[i]);
            else large.insert(nums[i]);
            if (i >= k) {
                if (small.count(nums[i - k])) small.erase(small.find(nums[i - k]));
                else large.erase(large.find(nums[i - k]));
            }
            if (small.size() > large.size() + 1) {
                large.insert(*small.rbegin());
                small.erase(prev(small.end()));
            }
            if (large.size() > small.size()) {
                small.insert(*large.begin());
                large.erase(large.begin());
            }
            if (i >= k - 1) {
                res.push_back(
                    k % 2 == 1 ? *small.rbegin() :
                                ((*small.rbegin() + 0LL + *large.begin()) / 2.0)
                );
            }
        }
        return res;
    }
};
```

```go
func medianSlidingWindow(nums []int, k int) []float64 {
    small := NewOrderedMultiset()
    large := NewOrderedMultiset()
    res := []float64{}

    for i := 0; i < len(nums); i++ {
        if small.Len() == 0 || nums[i] <= small.Max() {
            small.Add(nums[i])
        } else {
            large.Add(nums[i])
        }

        if i >= k {
            if small.Contains(nums[i-k]) {
                small.Remove(nums[i-k])
            } else {
                large.Remove(nums[i-k])
            }
        }

        for small.Len() > large.Len()+1 {
            large.Add(small.PopMax())
        }
        for large.Len() > small.Len() {
            small.Add(large.PopMin())
        }

        if i >= k-1 {
            if k%2 == 1 {
                res = append(res, float64(small.Max()))
            } else {
                res = append(res, float64(small.Max()+large.Min())/2.0)
            }
        }
    }
    return res
}

type OrderedMultiset struct {
    data []int
}

func NewOrderedMultiset() *OrderedMultiset {
    return &OrderedMultiset{data: []int{}}
}

func (m *OrderedMultiset) Len() int {
    return len(m.data)
}

func (m *OrderedMultiset) Add(val int) {
    i := sort.SearchInts(m.data, val)
    m.data = append(m.data, 0)
    copy(m.data[i+1:], m.data[i:])
    m.data[i] = val
}

func (m *OrderedMultiset) Remove(val int) {
    i := sort.SearchInts(m.data, val)
    if i < len(m.data) && m.data[i] == val {
        m.data = append(m.data[:i], m.data[i+1:]...)
    }
}

func (m *OrderedMultiset) Contains(val int) bool {
    i := sort.SearchInts(m.data, val)
    return i < len(m.data) && m.data[i] == val
}

func (m *OrderedMultiset) Max() int {
    return m.data[len(m.data)-1]
}

func (m *OrderedMultiset) Min() int {
    return m.data[0]
}

func (m *OrderedMultiset) PopMax() int {
    val := m.data[len(m.data)-1]
    m.data = m.data[:len(m.data)-1]
    return val
}

func (m *OrderedMultiset) PopMin() int {
    val := m.data[0]
    m.data = m.data[1:]
    return val
}
```

```kotlin
class Solution {
    fun medianSlidingWindow(nums: IntArray, k: Int): DoubleArray {
        val small = TreeMap<Int, Int>()
        val large = TreeMap<Int, Int>()
        var smallSize = 0
        var largeSize = 0
        val res = DoubleArray(nums.size - k + 1)

        fun addToSet(set: TreeMap<Int, Int>, num: Int) {
            set[num] = set.getOrDefault(num, 0) + 1
        }

        fun removeFromSet(set: TreeMap<Int, Int>, num: Int) {
            val count = set[num]!!
            if (count == 1) set.remove(num)
            else set[num] = count - 1
        }

        for (i in nums.indices) {
            if (smallSize == 0 || nums[i] <= small.lastKey()) {
                addToSet(small, nums[i])
                smallSize++
            } else {
                addToSet(large, nums[i])
                largeSize++
            }

            if (i >= k) {
                val toRemove = nums[i - k]
                if (small.containsKey(toRemove)) {
                    removeFromSet(small, toRemove)
                    smallSize--
                } else {
                    removeFromSet(large, toRemove)
                    largeSize--
                }
            }

            while (smallSize > largeSize + 1) {
                val maxSmall = small.lastKey()
                removeFromSet(small, maxSmall)
                addToSet(large, maxSmall)
                smallSize--
                largeSize++
            }
            while (largeSize > smallSize) {
                val minLarge = large.firstKey()
                removeFromSet(large, minLarge)
                addToSet(small, minLarge)
                largeSize--
                smallSize++
            }

            if (i >= k - 1) {
                res[i - k + 1] = if (k % 2 == 1) {
                    small.lastKey().toDouble()
                } else {
                    (small.lastKey().toLong() + large.firstKey()) / 2.0
                }
            }
        }
        return res
    }
}
```

```swift
class Solution {
    func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {
        var small = [Int]()
        var large = [Int]()
        var res = [Double]()

        func addSorted(_ arr: inout [Int], _ val: Int) {
            let idx = arr.firstIndex { $0 >= val } ?? arr.count
            arr.insert(val, at: idx)
        }

        func removeSorted(_ arr: inout [Int], _ val: Int) {
            if let idx = arr.firstIndex(of: val) {
                arr.remove(at: idx)
            }
        }

        for i in 0..<nums.count {
            if small.isEmpty || nums[i] <= small.last! {
                addSorted(&small, nums[i])
            } else {
                addSorted(&large, nums[i])
            }

            if i >= k {
                let toRemove = nums[i - k]
                if let idx = small.firstIndex(of: toRemove) {
                    small.remove(at: idx)
                } else {
                    removeSorted(&large, toRemove)
                }
            }

            while small.count > large.count + 1 {
                let val = small.removeLast()
                addSorted(&large, val)
            }
            while large.count > small.count {
                let val = large.removeFirst()
                addSorted(&small, val)
            }

            if i >= k - 1 {
                if k % 2 == 1 {
                    res.append(Double(small.last!))
                } else {
                    res.append(Double(small.last! + large.first!) / 2.0)
                }
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 4. Multiset

### Intuition

A single sorted data structure can track all k elements directly. By maintaining a pointer or index to the median position, we can update it efficiently as elements are added and removed. When a new element is inserted before the median or an element before the median is removed, we adjust the median pointer accordingly.

### Algorithm

1. Initialize a sorted container (multiset or sorted list) with the first `k` elements.
2. Set a median pointer to the element at index `k / 2`.
3. Compute the first median from the pointer position.
4. For each subsequent element:
   - Insert the new element and adjust the median pointer if the insertion happens before or at the current median.
   - Adjust the median pointer if the element being removed is at or before the current median.
   - Remove the outgoing element from the container.
   - Compute and store the median.
5. Return the array of medians.

::tabs-start

```python
class Solution:
    def medianSlidingWindow(self, nums: List[int], k: int) -> List[float]:
        window = SortedList()
        res = []
        for i in range(len(nums)):
            window.add(nums[i])
            if i >= k:
                window.remove(nums[i - k])
            if i >= k - 1:
                if k % 2 == 1:
                    res.append(float(window[k // 2]))
                else:
                    res.append((window[k // 2 - 1] + window[k // 2]) / 2)
        return res
```

```cpp
class Solution {
public:
    vector<double> medianSlidingWindow(vector<int>& nums, int k) {
        multiset<int> window(nums.begin(), nums.begin() + k);
        auto mid = next(window.begin(), k / 2);
        vector<double> res;

        for (int i = k;; i++) {
            if (k & 1) {
                res.push_back(*mid);
            } else {
                res.push_back((*mid + 0LL + *prev(mid)) / 2.0);
            }

            if (i == nums.size()) return res;

            window.insert(nums[i]);
            if (nums[i] < *mid) mid--;
            if (nums[i - k] <= *mid) mid++;
            window.erase(window.lower_bound(nums[i - k]));
        }
    }
};
```

```go
func medianSlidingWindow(nums []int, k int) []float64 {
    window := make([]int, k)
    copy(window, nums[:k])
    sort.Ints(window)
    res := []float64{}

    getMedian := func() float64 {
        if k%2 == 1 {
            return float64(window[k/2])
        }
        return float64(window[k/2-1]+window[k/2]) / 2.0
    }

    res = append(res, getMedian())

    for i := k; i < len(nums); i++ {
        // Remove nums[i-k]
        toRemove := nums[i-k]
        idx := sort.SearchInts(window, toRemove)
        window = append(window[:idx], window[idx+1:]...)

        // Insert nums[i]
        toInsert := nums[i]
        insertIdx := sort.SearchInts(window, toInsert)
        window = append(window, 0)
        copy(window[insertIdx+1:], window[insertIdx:])
        window[insertIdx] = toInsert

        res = append(res, getMedian())
    }

    return res
}
```

```kotlin
class Solution {
    fun medianSlidingWindow(nums: IntArray, k: Int): DoubleArray {
        val window = sortedMapOf<Int, Int>()
        var windowCount = 0

        fun add(num: Int) {
            window[num] = window.getOrDefault(num, 0) + 1
            windowCount++
        }

        fun remove(num: Int) {
            val count = window[num]!!
            if (count == 1) window.remove(num)
            else window[num] = count - 1
            windowCount--
        }

        fun getKth(kth: Int): Int {
            var count = 0
            for ((key, cnt) in window) {
                count += cnt
                if (count >= kth) return key
            }
            return 0
        }

        for (i in 0 until k) add(nums[i])

        val res = DoubleArray(nums.size - k + 1)

        for (i in k..nums.size) {
            res[i - k] = if (k % 2 == 1) {
                getKth((k + 1) / 2).toDouble()
            } else {
                (getKth(k / 2).toLong() + getKth(k / 2 + 1)) / 2.0
            }

            if (i < nums.size) {
                remove(nums[i - k])
                add(nums[i])
            }
        }

        return res
    }
}
```

```swift
class Solution {
    func medianSlidingWindow(_ nums: [Int], _ k: Int) -> [Double] {
        var window = Array(nums[0..<k]).sorted()
        var res = [Double]()

        func getMedian() -> Double {
            if k % 2 == 1 {
                return Double(window[k / 2])
            }
            return Double(window[k / 2 - 1] + window[k / 2]) / 2.0
        }

        res.append(getMedian())

        for i in k..<nums.count {
            // Remove nums[i-k]
            if let idx = window.firstIndex(of: nums[i - k]) {
                window.remove(at: idx)
            }

            // Insert nums[i]
            let insertIdx = window.firstIndex { $0 >= nums[i] } ?? window.count
            window.insert(nums[i], at: insertIdx)

            res.append(getMedian())
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.
