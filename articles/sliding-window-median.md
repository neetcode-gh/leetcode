## 1. Brute Force (Sorting)

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * k\log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 2. Two Heaps

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity:
    - $O(n)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 3. Two Multisets

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.

---

## 4. Multiset

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log k)$
- Space complexity:
    - $O(k)$ extra space.
    - $O(n - k + 1)$ space for output array.

> Where $n$ is the size of the array $nums$ and $k$ is the size of the sliding window.
