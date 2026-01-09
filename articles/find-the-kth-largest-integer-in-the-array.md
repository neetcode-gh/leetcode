## 1. Sorting

### Intuition

Since numbers are represented as strings and can be very large (up to 100 digits), we cannot convert them to integers directly. Instead, we compare strings by length first, then lexicographically. A longer string represents a larger number, and for equal lengths, lexicographic order matches numeric order. After sorting in descending order, the kth element is our answer.

### Algorithm

1. Sort the array of strings in descending order using a custom comparator:
   - If two strings have different lengths, the longer one is larger.
   - If they have the same length, compare them lexicographically.
2. Return the element at index `k - 1` (since the array is 0-indexed).

::tabs-start

```python
class Solution:
    def kthLargestNumber(self, nums: List[str], k: int) -> str:
        return sorted(nums, key=lambda x: (len(x), x), reverse=True)[k - 1]
```

```java
public class Solution {
    public String kthLargestNumber(String[] nums, int k) {
        Arrays.sort(nums,
            (a, b) -> a.length() == b.length() ? b.compareTo(a) : b.length() - a.length()
        );
        return nums[k - 1];
    }
}
```

```cpp
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        sort(nums.begin(), nums.end(), [](const string& a, const string& b) {
            return a.size() == b.size() ? a > b : a.size() > b.size();
        });
        return nums[k - 1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @param {number} k
     * @return {string}
     */
    kthLargestNumber(nums, k) {
        nums.sort((a, b) =>
            a.length === b.length ? b.localeCompare(a) : b.length - a.length,
        );
        return nums[k - 1];
    }
}
```

```csharp
public class Solution {
    public string KthLargestNumber(string[] nums, int k) {
        Array.Sort(nums, (a, b) => {
            if (a.Length != b.Length) return b.Length.CompareTo(a.Length);
            return string.Compare(b, a, StringComparison.Ordinal);
        });
        return nums[k - 1];
    }
}
```

```go
import (
    "sort"
)

func kthLargestNumber(nums []string, k int) string {
    sort.Slice(nums, func(i, j int) bool {
        if len(nums[i]) != len(nums[j]) {
            return len(nums[i]) > len(nums[j])
        }
        return nums[i] > nums[j]
    })
    return nums[k-1]
}
```

```kotlin
class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {
        nums.sortWith { a, b ->
            if (a.length != b.length) b.length - a.length
            else b.compareTo(a)
        }
        return nums[k - 1]
    }
}
```

```swift
class Solution {
    func kthLargestNumber(_ nums: [String], _ k: Int) -> String {
        let sorted = nums.sorted { a, b in
            if a.count != b.count {
                return a.count > b.count
            }
            return a > b
        }
        return sorted[k - 1]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 2. Max-Heap

### Intuition

A max-heap keeps the largest element at the top. By inserting all elements into a max-heap and extracting the maximum k times, the kth extraction gives us the kth largest element. The custom comparator ensures proper ordering for string-represented numbers.

### Algorithm

1. Create a max-heap with a custom comparator that compares strings as numbers (length first, then lexicographically).
2. Insert all elements from the array into the heap.
3. Extract the maximum element `k - 1` times and discard them.
4. Extract once more and return this element as the kth largest.

::tabs-start

```python
class Num:
    def __init__(self, s: str):
        self.s = s

    def __lt__(self, other: "Num") -> bool:
        if len(self.s) != len(other.s):
            return len(self.s) > len(other.s)
        return self.s > other.s

class Solution:
    def kthLargestNumber(self, nums: List[str], k: int) -> str:
        maxHeap = [Num(s) for s in nums]
        heapq.heapify(maxHeap)

        for _ in range(k - 1):
            heapq.heappop(maxHeap)

        return heapq.heappop(maxHeap).s
```

```java
public class Solution {
    public String kthLargestNumber(String[] nums, int k) {
        PriorityQueue<String> maxHeap = new PriorityQueue<>((a, b) ->
            a.length() == b.length() ? b.compareTo(a) : Integer.compare(b.length(), a.length())
        );

        for (String num : nums) {
            maxHeap.offer(num);
        }

        while (--k > 0) {
            maxHeap.poll();
        }

        return maxHeap.poll();
    }
}
```

```cpp
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        auto cmp = [](const string& a, const string& b) {
            return a.size() == b.size() ? a < b : a.size() < b.size();
        };

        priority_queue<string, vector<string>, decltype(cmp)> maxHeap(cmp);

        for (const string& num : nums) {
            maxHeap.push(num);
        }

        while (--k > 0) {
            maxHeap.pop();
        }

        return maxHeap.top();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @param {number} k
     * @return {string}
     */
    kthLargestNumber(nums, k) {
        const maxHeap = new PriorityQueue((a, b) =>
            a.length === b.length ? b.localeCompare(a) : b.length - a.length,
        );

        for (const num of nums) {
            maxHeap.enqueue(num);
        }

        while (--k > 0) {
            maxHeap.dequeue();
        }

        return maxHeap.dequeue();
    }
}
```

```csharp
public class Solution {
    public string KthLargestNumber(string[] nums, int k) {
        var maxHeap = new PriorityQueue<string, string>(
            Comparer<string>.Create((a, b) => {
                if (a.Length != b.Length) return a.Length.CompareTo(b.Length);
                return string.Compare(a, b, StringComparison.Ordinal);
            })
        );

        foreach (var num in nums) {
            maxHeap.Enqueue(num, num);
        }

        while (--k > 0) {
            maxHeap.Dequeue();
        }

        return maxHeap.Dequeue();
    }
}
```

```go
import (
    "container/heap"
)

type MaxHeap []string

func (h MaxHeap) Len() int { return len(h) }
func (h MaxHeap) Less(i, j int) bool {
    if len(h[i]) != len(h[j]) {
        return len(h[i]) > len(h[j])
    }
    return h[i] > h[j]
}
func (h MaxHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MaxHeap) Push(x interface{}) { *h = append(*h, x.(string)) }
func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func kthLargestNumber(nums []string, k int) string {
    h := &MaxHeap{}
    heap.Init(h)

    for _, num := range nums {
        heap.Push(h, num)
    }

    for k > 1 {
        heap.Pop(h)
        k--
    }

    return heap.Pop(h).(string)
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {
        val maxHeap = PriorityQueue<String> { a, b ->
            if (a.length != b.length) b.length - a.length
            else b.compareTo(a)
        }

        for (num in nums) {
            maxHeap.offer(num)
        }

        repeat(k - 1) {
            maxHeap.poll()
        }

        return maxHeap.poll()
    }
}
```

```swift
class Solution {
    func kthLargestNumber(_ nums: [String], _ k: Int) -> String {
        var heap = nums
        heap.sort { a, b in
            if a.count != b.count {
                return a.count > b.count
            }
            return a > b
        }

        var result = ""
        var count = k
        var index = 0

        while count > 0 {
            result = heap[index]
            index += 1
            count -= 1
        }

        return result
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * (n + k) * \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 3. Min-Heap

### Intuition

Instead of storing all elements and extracting k times, we can maintain a min-heap of size k. The smallest element in this heap is always at the top. As we process elements, if the heap size exceeds k, we remove the smallest. After processing all elements, the heap contains the k largest elements, and the top (minimum of these k) is the kth largest overall.

### Algorithm

1. Create a min-heap with a custom comparator for string-represented numbers.
2. For each element in the array:
   - Add it to the heap.
   - If the heap size exceeds k, remove the minimum element.
3. After processing all elements, the top of the heap is the kth largest element.

::tabs-start

```python
class Num:
    def __init__(self, s: str):
        self.s = s

    def __lt__(self, other: "Num") -> bool:
        if len(self.s) != len(other.s):
            return len(self.s) < len(other.s)
        return self.s < other.s

class Solution:
    def kthLargestNumber(self, nums: List[str], k: int) -> str:
        minHeap = []
        for num in nums:
            heapq.heappush(minHeap, Num(num))
            if len(minHeap) > k:
                heapq.heappop(minHeap)
        return minHeap[0].s
```

```java
public class Solution {
    public String kthLargestNumber(String[] nums, int k) {
        PriorityQueue<String> minHeap = new PriorityQueue<>((a, b) ->
            a.length() == b.length() ? a.compareTo(b) : Integer.compare(a.length(), b.length())
        );

        for (String num : nums) {
            minHeap.offer(num);
            if (minHeap.size() > k) {
                minHeap.poll();
            }
        }

        return minHeap.peek();
    }
}
```

```cpp
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        auto cmp = [](const string& a, const string& b) {
            return a.size() == b.size() ? a > b : a.size() > b.size();
        };

        priority_queue<string, vector<string>, decltype(cmp)> minHeap(cmp);

        for (const string& num : nums) {
            minHeap.push(num);
            if (minHeap.size() > k) {
                minHeap.pop();
            }
        }

        return minHeap.top();
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @param {number} k
     * @return {string}
     */
    kthLargestNumber(nums, k) {
        const minHeap = new PriorityQueue((a, b) =>
            a.length === b.length ? a.localeCompare(b) : a.length - b.length,
        );

        for (const num of nums) {
            minHeap.enqueue(num);
            if (minHeap.size() > k) {
                minHeap.dequeue();
            }
        }

        return minHeap.front();
    }
}
```

```csharp
public class Solution {
    public string KthLargestNumber(string[] nums, int k) {
        var minHeap = new PriorityQueue<string, string>(
            Comparer<string>.Create((a, b) => {
                if (a.Length != b.Length) return a.Length.CompareTo(b.Length);
                return string.Compare(a, b, StringComparison.Ordinal);
            })
        );

        foreach (var num in nums) {
            minHeap.Enqueue(num, num);
            if (minHeap.Count > k) {
                minHeap.Dequeue();
            }
        }

        return minHeap.Peek();
    }
}
```

```go
import (
    "container/heap"
)

type MinHeap []string

func (h MinHeap) Len() int { return len(h) }
func (h MinHeap) Less(i, j int) bool {
    if len(h[i]) != len(h[j]) {
        return len(h[i]) < len(h[j])
    }
    return h[i] < h[j]
}
func (h MinHeap) Swap(i, j int) { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(string)) }
func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

func kthLargestNumber(nums []string, k int) string {
    h := &MinHeap{}
    heap.Init(h)

    for _, num := range nums {
        heap.Push(h, num)
        if h.Len() > k {
            heap.Pop(h)
        }
    }

    return (*h)[0]
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {
        val minHeap = PriorityQueue<String> { a, b ->
            if (a.length != b.length) a.length - b.length
            else a.compareTo(b)
        }

        for (num in nums) {
            minHeap.offer(num)
            if (minHeap.size > k) {
                minHeap.poll()
            }
        }

        return minHeap.peek()
    }
}
```

```swift
class Solution {
    func kthLargestNumber(_ nums: [String], _ k: Int) -> String {
        var minHeap = [String]()

        func siftUp(_ index: Int) {
            var i = index
            while i > 0 {
                let parent = (i - 1) / 2
                if compare(minHeap[i], minHeap[parent]) < 0 {
                    minHeap.swapAt(i, parent)
                    i = parent
                } else {
                    break
                }
            }
        }

        func siftDown(_ index: Int) {
            var i = index
            let n = minHeap.count
            while true {
                var smallest = i
                let left = 2 * i + 1
                let right = 2 * i + 2
                if left < n && compare(minHeap[left], minHeap[smallest]) < 0 {
                    smallest = left
                }
                if right < n && compare(minHeap[right], minHeap[smallest]) < 0 {
                    smallest = right
                }
                if smallest == i { break }
                minHeap.swapAt(i, smallest)
                i = smallest
            }
        }

        func compare(_ a: String, _ b: String) -> Int {
            if a.count != b.count {
                return a.count - b.count
            }
            return a < b ? -1 : (a > b ? 1 : 0)
        }

        for num in nums {
            minHeap.append(num)
            siftUp(minHeap.count - 1)
            if minHeap.count > k {
                minHeap[0] = minHeap.removeLast()
                if !minHeap.isEmpty {
                    siftDown(0)
                }
            }
        }

        return minHeap[0]
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log k)$
- Space complexity: $O(k)$

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 4. Quick Select

### Intuition

Quick Select is a selection algorithm based on the partitioning step of QuickSort. Instead of fully sorting the array, we only partition around a pivot and recurse into the side that contains our target index. On average, this finds the kth element in linear time. The algorithm uses median-of-three pivot selection to improve performance and avoid worst-case scenarios.

### Algorithm

1. Define comparison functions that compare strings as numbers (by length first, then lexicographically).
2. Use the partition function:
   - Select a pivot using median-of-three (first, middle, last elements).
   - Partition the array so elements greater than the pivot are on the left, and smaller ones are on the right.
3. Perform quick select:
   - If the search range is small (2 or fewer elements), sort them directly.
   - Otherwise, partition and recurse into the appropriate half based on where index `k - 1` falls relative to the pivot position.
4. Return the element at index `k - 1`.

::tabs-start

```python
class Solution:
    def greater(self, x: str, y: str) -> bool:
        if len(x) != len(y):
            return len(x) > len(y)
        return x > y

    def less(self, x: str, y: str) -> bool:
        if len(x) != len(y):
            return len(x) < len(y)
        return x < y

    def partition(self, nums: List[str], left: int, right: int) -> int:
        mid = (left + right) >> 1
        nums[mid], nums[left + 1] = nums[left + 1], nums[mid]

        if self.less(nums[left], nums[right]):
            nums[left], nums[right] = nums[right], nums[left]
        if self.less(nums[left + 1], nums[right]):
            nums[left + 1], nums[right] = nums[right], nums[left + 1]
        if self.less(nums[left], nums[left + 1]):
            nums[left], nums[left + 1] = nums[left + 1], nums[left]

        pivot = nums[left + 1]
        i = left + 1
        j = right

        while True:
            while True:
                i += 1
                if not self.greater(nums[i], pivot):
                    break
            while True:
                j -= 1
                if not self.less(nums[j], pivot):
                    break
            if i > j:
                break
            nums[i], nums[j] = nums[j], nums[i]

        nums[left + 1], nums[j] = nums[j], nums[left + 1]
        return j

    def quickSelect(self, nums: List[str], k: int) -> str:
        left = 0
        right = len(nums) - 1

        while True:
            if right <= left + 1:
                if right == left + 1 and self.greater(nums[right], nums[left]):
                    nums[left], nums[right] = nums[right], nums[left]
                return nums[k]

            j = self.partition(nums, left, right)
            if j >= k:
                right = j - 1
            if j <= k:
                left = j + 1

    def kthLargestNumber(self, nums: List[str], k: int) -> str:
        return self.quickSelect(nums, k - 1)
```

```java
public class Solution {
    public String kthLargestNumber(String[] nums, int k) {
        return quickSelect(nums, k - 1);
    }

    private boolean greater(String x, String y) {
        if (x.length() != y.length()) {
            return x.length() > y.length();
        }
        return x.compareTo(y) > 0;
    }

    private boolean less(String x, String y) {
        if (x.length() != y.length()) {
            return x.length() < y.length();
        }
        return x.compareTo(y) < 0;
    }

    private int partition(String[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums, mid, left + 1);

        if (less(nums[left], nums[right])) {
            swap(nums, left, right);
        }
        if (less(nums[left + 1], nums[right])) {
            swap(nums, left + 1, right);
        }
        if (less(nums[left], nums[left + 1])) {
            swap(nums, left, left + 1);
        }

        String pivot = nums[left + 1];
        int i = left + 1, j = right;

        while (true) {
            while (greater(nums[++i], pivot));
            while (less(nums[--j], pivot));
            if (i > j) break;
            swap(nums, i, j);
        }

        swap(nums, left + 1, j);
        return j;
    }

    private String quickSelect(String[] nums, int k) {
        int left = 0, right = nums.length - 1;

        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && greater(nums[right], nums[left])) {
                    swap(nums, left, right);
                }
                return nums[k];
            }

            int j = partition(nums, left, right);
            if (j >= k) {
                right = j - 1;
            }
            if (j <= k) {
                left = j + 1;
            }
        }
    }

    private void swap(String[] nums, int i, int j) {
        String temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }
}
```

```cpp
class Solution {
public:
    string kthLargestNumber(vector<string>& nums, int k) {
        return quickSelect(nums, k - 1);
    }

private:
    bool greater(const string& x, const string& y) {
        if (x.size() != y.size()) {
            return x.size() > y.size();
        }
        return x > y;
    }

    bool less(const string& x, const string& y) {
        if (x.size() != y.size()) {
            return x.size() < y.size();
        }
        return x < y;
    }

    int partition(vector<string>& nums, int left, int right) {
        int mid = (left + right) >> 1;
        swap(nums[mid], nums[left + 1]);

        if (less(nums[left], nums[right])) {
            swap(nums[left], nums[right]);
        }
        if (less(nums[left + 1], nums[right])) {
            swap(nums[left + 1], nums[right]);
        }
        if (less(nums[left], nums[left + 1])) {
            swap(nums[left], nums[left + 1]);
        }

        string pivot = nums[left + 1];
        int i = left + 1, j = right;

        while (true) {
            while (greater(nums[++i], pivot));
            while (less(nums[--j], pivot));
            if (i > j) break;
            swap(nums[i], nums[j]);
        }

        swap(nums[left + 1], nums[j]);
        return j;
    }

    string quickSelect(vector<string>& nums, int k) {
        int left = 0, right = nums.size() - 1;

        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && greater(nums[right], nums[left])) {
                    swap(nums[left], nums[right]);
                }
                return nums[k];
            }

            int j = partition(nums, left, right);
            if (j >= k) {
                right = j - 1;
            }
            if (j <= k) {
                left = j + 1;
            }
        }
    }
};
```

```javascript
class Solution {
    /**
     * @param {string[]} nums
     * @param {number} k
     * @return {string}
     */
    kthLargestNumber(nums, k) {
        const greater = (x, y) =>
            x.length !== y.length ? x.length > y.length : x > y;
        const less = (x, y) =>
            x.length !== y.length ? x.length < y.length : x < y;
        const swap = (arr, i, j) => ([arr[i], arr[j]] = [arr[j], arr[i]]);

        const partition = (nums, left, right) => {
            const mid = Math.floor((left + right) / 2);
            swap(nums, mid, left + 1);

            if (less(nums[left], nums[right])) swap(nums, left, right);
            if (less(nums[left + 1], nums[right])) swap(nums, left + 1, right);
            if (less(nums[left], nums[left + 1])) swap(nums, left, left + 1);

            const pivot = nums[left + 1];
            let i = left + 1,
                j = right;

            while (true) {
                while (greater(nums[++i], pivot));
                while (less(nums[--j], pivot));
                if (i > j) break;
                swap(nums, i, j);
            }

            swap(nums, left + 1, j);
            return j;
        };

        const quickSelect = (nums, k) => {
            let left = 0,
                right = nums.length - 1;

            while (true) {
                if (right <= left + 1) {
                    if (
                        right === left + 1 &&
                        greater(nums[right], nums[left])
                    ) {
                        swap(nums, left, right);
                    }
                    return nums[k];
                }

                const j = partition(nums, left, right);
                if (j >= k) right = j - 1;
                if (j <= k) left = j + 1;
            }
        };

        return quickSelect(nums, k - 1);
    }
}
```

```csharp
public class Solution {
    public string KthLargestNumber(string[] nums, int k) {
        return QuickSelect(nums, k - 1);
    }

    private bool Greater(string x, string y) {
        if (x.Length != y.Length) return x.Length > y.Length;
        return string.Compare(x, y, StringComparison.Ordinal) > 0;
    }

    private bool Less(string x, string y) {
        if (x.Length != y.Length) return x.Length < y.Length;
        return string.Compare(x, y, StringComparison.Ordinal) < 0;
    }

    private void Swap(string[] nums, int i, int j) {
        var temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
    }

    private int Partition(string[] nums, int left, int right) {
        int mid = (left + right) >> 1;
        Swap(nums, mid, left + 1);

        if (Less(nums[left], nums[right])) Swap(nums, left, right);
        if (Less(nums[left + 1], nums[right])) Swap(nums, left + 1, right);
        if (Less(nums[left], nums[left + 1])) Swap(nums, left, left + 1);

        string pivot = nums[left + 1];
        int i = left + 1, j = right;

        while (true) {
            while (Greater(nums[++i], pivot)) ;
            while (Less(nums[--j], pivot)) ;
            if (i > j) break;
            Swap(nums, i, j);
        }

        Swap(nums, left + 1, j);
        return j;
    }

    private string QuickSelect(string[] nums, int k) {
        int left = 0, right = nums.Length - 1;

        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && Greater(nums[right], nums[left])) {
                    Swap(nums, left, right);
                }
                return nums[k];
            }

            int j = Partition(nums, left, right);
            if (j >= k) right = j - 1;
            if (j <= k) left = j + 1;
        }
    }
}
```

```go
func kthLargestNumber(nums []string, k int) string {
    return quickSelect(nums, k-1)
}

func greater(x, y string) bool {
    if len(x) != len(y) {
        return len(x) > len(y)
    }
    return x > y
}

func less(x, y string) bool {
    if len(x) != len(y) {
        return len(x) < len(y)
    }
    return x < y
}

func partition(nums []string, left, right int) int {
    mid := (left + right) >> 1
    nums[mid], nums[left+1] = nums[left+1], nums[mid]

    if less(nums[left], nums[right]) {
        nums[left], nums[right] = nums[right], nums[left]
    }
    if less(nums[left+1], nums[right]) {
        nums[left+1], nums[right] = nums[right], nums[left+1]
    }
    if less(nums[left], nums[left+1]) {
        nums[left], nums[left+1] = nums[left+1], nums[left]
    }

    pivot := nums[left+1]
    i, j := left+1, right

    for {
        for i++; greater(nums[i], pivot); i++ {
        }
        for j--; less(nums[j], pivot); j-- {
        }
        if i > j {
            break
        }
        nums[i], nums[j] = nums[j], nums[i]
    }

    nums[left+1], nums[j] = nums[j], nums[left+1]
    return j
}

func quickSelect(nums []string, k int) string {
    left, right := 0, len(nums)-1

    for {
        if right <= left+1 {
            if right == left+1 && greater(nums[right], nums[left]) {
                nums[left], nums[right] = nums[right], nums[left]
            }
            return nums[k]
        }

        j := partition(nums, left, right)
        if j >= k {
            right = j - 1
        }
        if j <= k {
            left = j + 1
        }
    }
}
```

```kotlin
class Solution {
    fun kthLargestNumber(nums: Array<String>, k: Int): String {
        return quickSelect(nums, k - 1)
    }

    private fun greater(x: String, y: String): Boolean {
        if (x.length != y.length) return x.length > y.length
        return x > y
    }

    private fun less(x: String, y: String): Boolean {
        if (x.length != y.length) return x.length < y.length
        return x < y
    }

    private fun swap(nums: Array<String>, i: Int, j: Int) {
        val temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }

    private fun partition(nums: Array<String>, left: Int, right: Int): Int {
        val mid = (left + right) shr 1
        swap(nums, mid, left + 1)

        if (less(nums[left], nums[right])) swap(nums, left, right)
        if (less(nums[left + 1], nums[right])) swap(nums, left + 1, right)
        if (less(nums[left], nums[left + 1])) swap(nums, left, left + 1)

        val pivot = nums[left + 1]
        var i = left + 1
        var j = right

        while (true) {
            do { i++ } while (greater(nums[i], pivot))
            do { j-- } while (less(nums[j], pivot))
            if (i > j) break
            swap(nums, i, j)
        }

        swap(nums, left + 1, j)
        return j
    }

    private fun quickSelect(nums: Array<String>, k: Int): String {
        var left = 0
        var right = nums.size - 1

        while (true) {
            if (right <= left + 1) {
                if (right == left + 1 && greater(nums[right], nums[left])) {
                    swap(nums, left, right)
                }
                return nums[k]
            }

            val j = partition(nums, left, right)
            if (j >= k) right = j - 1
            if (j <= k) left = j + 1
        }
    }
}
```

```swift
class Solution {
    func kthLargestNumber(_ nums: [String], _ k: Int) -> String {
        var nums = nums
        return quickSelect(&nums, k - 1)
    }

    private func greater(_ x: String, _ y: String) -> Bool {
        if x.count != y.count { return x.count > y.count }
        return x > y
    }

    private func less(_ x: String, _ y: String) -> Bool {
        if x.count != y.count { return x.count < y.count }
        return x < y
    }

    private func partition(_ nums: inout [String], _ left: Int, _ right: Int) -> Int {
        let mid = (left + right) >> 1
        nums.swapAt(mid, left + 1)

        if less(nums[left], nums[right]) { nums.swapAt(left, right) }
        if less(nums[left + 1], nums[right]) { nums.swapAt(left + 1, right) }
        if less(nums[left], nums[left + 1]) { nums.swapAt(left, left + 1) }

        let pivot = nums[left + 1]
        var i = left + 1
        var j = right

        while true {
            repeat { i += 1 } while greater(nums[i], pivot)
            repeat { j -= 1 } while less(nums[j], pivot)
            if i > j { break }
            nums.swapAt(i, j)
        }

        nums.swapAt(left + 1, j)
        return j
    }

    private func quickSelect(_ nums: inout [String], _ k: Int) -> String {
        var left = 0
        var right = nums.count - 1

        while true {
            if right <= left + 1 {
                if right == left + 1 && greater(nums[right], nums[left]) {
                    nums.swapAt(left, right)
                }
                return nums[k]
            }

            let j = partition(&nums, left, right)
            if j >= k { right = j - 1 }
            if j <= k { left = j + 1 }
        }
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$ in average case, $O(m * n ^ 2)$ in worst case.
- Space complexity: $O(1)$
