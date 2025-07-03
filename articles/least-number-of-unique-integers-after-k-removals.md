## 1. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 2. Min-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 3. Bucket Sort

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
