## 1. Simulation

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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * k)$
* Space complexity: $O(1)$ extra space.

> Where $n$ is the size of the input array, and $k$ is the number of operations.

---

## 2. Min-Heap

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

::tabs-end

### Time & Space Complexity

* Time complexity: 
    - $O(n + k \log n)$ in Python.
    - $O(n \log n + k \log n)$ in other languages.

* Space complexity: $O(n)$

> Where $n$ is the size of the input array, and $k$ is the number of operations.