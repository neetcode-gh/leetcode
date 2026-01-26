## Prerequisites
Before attempting this problem, you should be comfortable with:
- **Array Traversal** - Finding minimum elements and their indices in an array
- **Simulation** - Implementing step-by-step operations as described in the problem
- **Min-Heap (Priority Queue)** - Efficiently retrieving and updating minimum elements
- **Tie-Breaking Logic** - Handling cases where multiple elements share the same value

---

## 1. Simulation

### Intuition

The problem asks us to repeatedly find the minimum element and multiply it by a given multiplier. A straightforward approach is to simulate exactly what the problem describes: for each of the `k` operations, scan through the array to find the smallest element (choosing the first occurrence if there are ties), then multiply that element by the multiplier.

### Algorithm

1. Repeat the following `k` times:
   - Find the index of the minimum element in the array. If there are duplicates, pick the smallest index.
   - Multiply the element at that index by `multiplier`.
2. Return the modified array.

::tabs-start

```python
class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        n = len(nums)
        for _ in range(k):
            minIdx = 0
            for i in range(1, n):
                if nums[i] < nums[minIdx]:
                    minIdx = i
            nums[minIdx] *= multiplier
        return nums
```

```java
public class Solution {
    public int[] getFinalState(int[] nums, int k, int multiplier) {
        int n = nums.length;
        for (int j = 0; j < k; j++) {
            int minIdx = 0;
            for (int i = 1; i < n; i++) {
                if (nums[i] < nums[minIdx]) {
                    minIdx = i;
                }
            }
            nums[minIdx] *= multiplier;
        }
        return nums;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getFinalState(vector<int>& nums, int k, int multiplier) {
        int n = nums.size();
        for (int _ = 0; _ < k; _++) {
            int minIdx = 0;
            for (int i = 1; i < n; i++) {
                if (nums[i] < nums[minIdx]) {
                    minIdx = i;
                }
            }
            nums[minIdx] *= multiplier;
        }
        return nums;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @param {number} multiplier
     * @return {number[]}
     */
    getFinalState(nums, k, multiplier) {
        let n = nums.length;
        for (let _ = 0; _ < k; _++) {
            let minIdx = 0;
            for (let i = 1; i < n; i++) {
                if (nums[i] < nums[minIdx]) {
                    minIdx = i;
                }
            }
            nums[minIdx] *= multiplier;
        }
        return nums;
    }
}
```

```csharp
public class Solution {
    public int[] GetFinalState(int[] nums, int k, int multiplier) {
        int n = nums.Length;
        for (int _ = 0; _ < k; _++) {
            int minIdx = 0;
            for (int i = 1; i < n; i++) {
                if (nums[i] < nums[minIdx]) {
                    minIdx = i;
                }
            }
            nums[minIdx] *= multiplier;
        }
        return nums;
    }
}
```

```go
func getFinalState(nums []int, k int, multiplier int) []int {
    n := len(nums)
    for i := 0; i < k; i++ {
        minIdx := 0
        for j := 1; j < n; j++ {
            if nums[j] < nums[minIdx] {
                minIdx = j
            }
        }
        nums[minIdx] *= multiplier
    }
    return nums
}
```

```kotlin
class Solution {
    fun getFinalState(nums: IntArray, k: Int, multiplier: Int): IntArray {
        val n = nums.size
        repeat(k) {
            var minIdx = 0
            for (i in 1 until n) {
                if (nums[i] < nums[minIdx]) {
                    minIdx = i
                }
            }
            nums[minIdx] *= multiplier
        }
        return nums
    }
}
```

```swift
class Solution {
    func getFinalState(_ nums: [Int], _ k: Int, _ multiplier: Int) -> [Int] {
        var nums = nums
        let n = nums.count
        for _ in 0..<k {
            var minIdx = 0
            for i in 1..<n {
                if nums[i] < nums[minIdx] {
                    minIdx = i
                }
            }
            nums[minIdx] *= multiplier
        }
        return nums
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the input array, and $k$ is the number of operations.

---

## 2. Min-Heap

### Intuition

Instead of scanning the entire array each time to find the minimum, we can use a min-heap (priority queue) to efficiently retrieve the smallest element. The heap keeps elements sorted by their value, and when values are equal, by their index. After extracting the minimum, we multiply it, update the result array, and push the updated value back into the heap.

### Algorithm

1. Create a copy of the input array to store results.
2. Build a min-heap containing pairs of `(value, index)` for each element.
3. Repeat `k` times:
   - Pop the minimum element from the heap.
   - Multiply the corresponding value in the result array by `multiplier`.
   - Push the updated `(new_value, index)` back into the heap.
4. Return the result array.

::tabs-start

```python
class Solution:
    def getFinalState(self, nums: List[int], k: int, multiplier: int) -> List[int]:
        res = nums[:]

        min_heap = [(num, i) for i, num in enumerate(nums)]
        heapq.heapify(min_heap)

        for _ in range(k):
            num, i = heapq.heappop(min_heap)
            res[i] *= multiplier
            heapq.heappush(min_heap, (res[i], i))

        return res
```

```java
public class Solution {
    public int[] getFinalState(int[] nums, int k, int multiplier) {
        int n = nums.length;
        int[] res = Arrays.copyOf(nums, n);

        PriorityQueue<Integer> minHeap = new PriorityQueue<>((a, b) -> {
            if (res[a] != res[b]) return Integer.compare(res[a], res[b]);
            return Integer.compare(a, b);
        });

        for (int i = 0; i < n; i++) {
            minHeap.add(i);
        }

        for (int i = 0; i < k; i++) {
            int idx = minHeap.poll();
            res[idx] *= multiplier;
            minHeap.add(idx);
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<int> getFinalState(vector<int>& nums, int k, int multiplier) {
        int n = nums.size();
        vector<int> res = nums;

        auto cmp = [&](int a, int b) {
            if (res[a] != res[b]) return res[a] > res[b];
            return a > b;
        };
        priority_queue<int, vector<int>, decltype(cmp)> minHeap(cmp);

        for (int i = 0; i < n; i++) {
            minHeap.push(i);
        }

        for (int _ = 0; _ < k; _++) {
            int i = minHeap.top();
            minHeap.pop();
            res[i] *= multiplier;
            minHeap.push(i);
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
     * @param {number} multiplier
     * @return {number[]}
     */
    getFinalState(nums, k, multiplier) {
        let res = nums.slice();
        let n = res.length;
        let minHeap = new PriorityQueue((a, b) => {
            if (res[a] !== res[b]) {
                return res[a] - res[b];
            }
            return a - b;
        });

        for (let i = 0; i < n; i++) {
            minHeap.enqueue(i);
        }

        for (let _ = 0; _ < k; _++) {
            let i = minHeap.dequeue();
            res[i] *= multiplier;
            minHeap.enqueue(i);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[] GetFinalState(int[] nums, int k, int multiplier) {
        int n = nums.Length;
        int[] res = new int[n];
        Array.Copy(nums, res, n);

        var minHeap = new PriorityQueue<int, (int, int)>();
        for (int i = 0; i < n; i++) {
            minHeap.Enqueue(i, (res[i], i));
        }

        for (int _ = 0; _ < k; _++) {
            int i = minHeap.Dequeue();
            res[i] *= multiplier;
            minHeap.Enqueue(i, (res[i], i));
        }

        return res;
    }
}
```

```go
import "container/heap"

type MinHeap struct {
    indices []int
    values  []int
}

func (h MinHeap) Len() int { return len(h.indices) }
func (h MinHeap) Less(i, j int) bool {
    if h.values[h.indices[i]] != h.values[h.indices[j]] {
        return h.values[h.indices[i]] < h.values[h.indices[j]]
    }
    return h.indices[i] < h.indices[j]
}
func (h MinHeap) Swap(i, j int) { h.indices[i], h.indices[j] = h.indices[j], h.indices[i] }
func (h *MinHeap) Push(x interface{}) { h.indices = append(h.indices, x.(int)) }
func (h *MinHeap) Pop() interface{} {
    old := h.indices
    n := len(old)
    x := old[n-1]
    h.indices = old[0 : n-1]
    return x
}

func getFinalState(nums []int, k int, multiplier int) []int {
    n := len(nums)
    res := make([]int, n)
    copy(res, nums)

    h := &MinHeap{indices: make([]int, 0, n), values: res}
    for i := 0; i < n; i++ {
        heap.Push(h, i)
    }

    for i := 0; i < k; i++ {
        idx := heap.Pop(h).(int)
        res[idx] *= multiplier
        heap.Push(h, idx)
    }

    return res
}
```

```kotlin
import java.util.PriorityQueue

class Solution {
    fun getFinalState(nums: IntArray, k: Int, multiplier: Int): IntArray {
        val n = nums.size
        val res = nums.copyOf()

        val minHeap = PriorityQueue<Int>(compareBy({ res[it] }, { it }))
        for (i in 0 until n) {
            minHeap.add(i)
        }

        repeat(k) {
            val i = minHeap.poll()
            res[i] *= multiplier
            minHeap.add(i)
        }

        return res
    }
}
```

```swift
class Solution {
    func getFinalState(_ nums: [Int], _ k: Int, _ multiplier: Int) -> [Int] {
        var res = nums
        let n = res.count
        var heap = [(Int, Int)]()

        for i in 0..<n {
            heap.append((res[i], i))
        }
        heap.sort { ($0.0, $0.1) < ($1.0, $1.1) }

        for _ in 0..<k {
            let (_, i) = heap.removeFirst()
            res[i] *= multiplier
            let newVal = res[i]
            var insertIdx = heap.count
            for j in 0..<heap.count {
                if (newVal, i) < (heap[j].0, heap[j].1) {
                    insertIdx = j
                    break
                }
            }
            heap.insert((newVal, i), at: insertIdx)
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity:
    - $O(n + k \log n)$ in Python.
    - $O(n \log n + k \log n)$ in other languages.

* Space complexity: $O(n)$

> Where $n$ is the size of the input array, and $k$ is the number of operations.

---

## Common Pitfalls

### Incorrect Tie-Breaking for Minimum Element

When multiple elements share the minimum value, the problem requires selecting the one with the smallest index. Failing to handle this tie-breaking rule correctly will produce wrong results. Always scan from left to right and keep track of the first occurrence of the minimum.

### Modifying Heap Values Without Re-Heapifying

When using a heap-based approach, some implementations store indices and compare using the current array values. After multiplying an element, you must properly update the heap by removing and reinserting the index, or the heap property will be violated and subsequent minimum extractions will be incorrect.