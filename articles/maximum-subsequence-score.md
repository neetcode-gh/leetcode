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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
