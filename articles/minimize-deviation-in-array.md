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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n *\log n * \log m)$
- Space complexity: $O(n)$

> Where $n$ is the size of the array $nums$ and $m$ is the maximum element in $nums$.
