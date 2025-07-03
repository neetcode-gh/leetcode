## 1. Brute Force

::tabs-start

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        n = len(nums)
        res = 1

        for i in range(n):
            mini = maxi = nums[i]
            for j in range(i + 1, n):
                mini = min(mini, nums[j])
                maxi = max(maxi, nums[j])
                if maxi - mini > limit:
                    break
                res = max(res, j - i + 1)

        return res
```

```java
public class Solution {
    public int longestSubarray(int[] nums, int limit) {
        int n = nums.length;
        int res = 1;

        for (int i = 0; i < n; i++) {
            int mini = nums[i], maxi = nums[i];
            for (int j = i + 1; j < n; j++) {
                mini = Math.min(mini, nums[j]);
                maxi = Math.max(maxi, nums[j]);
                if (maxi - mini > limit) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        int n = nums.size();
        int res = 1;

        for (int i = 0; i < n; i++) {
            int mini = nums[i], maxi = nums[i];
            for (int j = i + 1; j < n; j++) {
                mini = min(mini, nums[j]);
                maxi = max(maxi, nums[j]);
                if (maxi - mini > limit) {
                    break;
                }
                res = max(res, j - i + 1);
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
     * @param {number} limit
     * @return {number}
     */
    longestSubarray(nums, limit) {
        const n = nums.length;
        let res = 1;

        for (let i = 0; i < n; i++) {
            let mini = nums[i],
                maxi = nums[i];
            for (let j = i + 1; j < n; j++) {
                mini = Math.min(mini, nums[j]);
                maxi = Math.max(maxi, nums[j]);
                if (maxi - mini > limit) {
                    break;
                }
                res = Math.max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int limit) {
        int n = nums.Length;
        int res = 1;

        for (int i = 0; i < n; i++) {
            int mini = nums[i], maxi = nums[i];
            for (int j = i + 1; j < n; j++) {
                mini = Math.Min(mini, nums[j]);
                maxi = Math.Max(maxi, nums[j]);
                if (maxi - mini > limit) {
                    break;
                }
                res = Math.Max(res, j - i + 1);
            }
        }

        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2)$
- Space complexity: $O(1)$

---

## 2. Heap

::tabs-start

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        maxHeap = []
        minHeap = []
        j = 0
        res = 0

        for i, v in enumerate(nums):
            heapq.heappush(maxHeap, (-v, i))
            heapq.heappush(minHeap, (v, i))

            while -maxHeap[0][0] - minHeap[0][0] > limit:
                j += 1
                while maxHeap and maxHeap[0][1] < j:
                    heapq.heappop(maxHeap)
                while minHeap and minHeap[0][1] < j:
                    heapq.heappop(minHeap)

            res = max(res, i - j + 1)

        return res
```

```java
public class Solution {
    public int longestSubarray(int[] nums, int limit) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a,b) -> b[0] - a[0]
        );
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            (a,b) -> a[0] - b[0]
        );
        int j = 0, res = 0;
        for (int i = 0; i < nums.length; ++i) {
            int v = nums[i];
            maxHeap.offer(new int[]{v, i});
            minHeap.offer(new int[]{v, i});

            while (maxHeap.peek()[0] - minHeap.peek()[0] > limit) {
                ++j;
                while (!maxHeap.isEmpty() && maxHeap.peek()[1] < j) {
                    maxHeap.poll();
                }
                while (!minHeap.isEmpty() && minHeap.peek()[1] < j) {
                    minHeap.poll();
                }
            }

            res = Math.max(res, i - j + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        priority_queue<pair<int,int>> maxHeap;
        priority_queue<
            pair<int,int>,
            vector<pair<int,int>>,
            greater<pair<int,int>>
        >   minHeap;

        int j = 0, res = 0;
        for (int i = 0; i < (int)nums.size(); ++i) {
            int v = nums[i];
            maxHeap.emplace(v, i);
            minHeap.emplace(v, i);

            while (maxHeap.top().first - minHeap.top().first > limit) {
                ++j;
                while (!maxHeap.empty() && maxHeap.top().second < j)
                    maxHeap.pop();
                while (!minHeap.empty() && minHeap.top().second < j)
                    minHeap.pop();
            }

            res = max(res, i - j + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} limit
     * @return {number}
     */
    longestSubarray(nums, limit) {
        const maxHeap = new PriorityQueue((a, b) => b[0] - a[0]);
        const minHeap = new PriorityQueue((a, b) => a[0] - b[0]);
        let j = 0,
            res = 0;

        for (let i = 0; i < nums.length; ++i) {
            const v = nums[i];
            maxHeap.push([v, i]);
            minHeap.push([v, i]);

            while (maxHeap.front()[0] - minHeap.front()[0] > limit) {
                ++j;
                while (!maxHeap.isEmpty() && maxHeap.front()[1] < j)
                    maxHeap.pop();
                while (!minHeap.isEmpty() && minHeap.front()[1] < j)
                    minHeap.pop();
            }

            res = Math.max(res, i - j + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int limit) {
        var maxHeap = new PriorityQueue<int[], int>();
        var minHeap = new PriorityQueue<int[], int>();

        int j = 0, res = 0;
        for (int i = 0; i < nums.Length; ++i) {
            int v = nums[i];
            maxHeap.Enqueue(new[]{v, i}, -v);
            minHeap.Enqueue(new[]{v, i}, v);

            while (maxHeap.Peek()[0] - minHeap.Peek()[0] > limit) {
                ++j;
                while (maxHeap.Count > 0 && maxHeap.Peek()[1] < j)
                    maxHeap.Dequeue();
                while (minHeap.Count > 0 && minHeap.Peek()[1] < j)
                    minHeap.Dequeue();
            }

            res = Math.Max(res, i - j + 1);
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

## 3. Sorted Dict

::tabs-start

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        tree = SortedDict()
        l = res = 0
        for r, x in enumerate(nums):
            tree[x] = tree.get(x, 0) + 1
            while tree.peekitem(-1)[0] - tree.peekitem(0)[0] > limit:
                y = nums[l]
                tree[y] -= 1
                if tree[y] == 0:
                    del tree[y]
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int longestSubarray(int[] nums, int limit) {
        TreeMap<Integer,Integer> map = new TreeMap<>();
        int l = 0, res = 0;
        for (int r = 0; r < nums.length; r++) {
            map.put(nums[r], map.getOrDefault(nums[r],0) + 1);
            while (map.lastKey() - map.firstKey() > limit) {
                int cnt = map.get(nums[l]);
                if (cnt == 1) map.remove(nums[l]);
                else map.put(nums[l], cnt - 1);
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        multiset<int> ms;
        int l = 0, res = 0;
        for (int r = 0; r < nums.size(); r++) {
            ms.insert(nums[r]);
            while (*ms.rbegin() - *ms.begin() > limit) {
                ms.erase(ms.find(nums[l]));
                l++;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int limit) {
        var map = new SortedList<int,int>();
        int l = 0, res = 0;
        for (int r = 0; r < nums.Length; r++) {
            int x = nums[r];
            if (!map.ContainsKey(x)) map[x] = 0;
            map[x]++;

            while (map.Keys[map.Count - 1] - map.Keys[0] > limit) {
                int y = nums[l++];
                map[y]--;
                if (map[y] == 0) map.Remove(y);
            }

            res = Math.Max(res, r - l + 1);
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

## 4. Deque - I

::tabs-start

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        min_q = deque()  # mono increasing
        max_q = deque()  # mono decreasing
        l = res = 0

        for r in range(len(nums)):
            while min_q and nums[r] < min_q[-1]:
                min_q.pop()
            while max_q and nums[r] > max_q[-1]:
                max_q.pop()

            min_q.append(nums[r])
            max_q.append(nums[r])

            while max_q[0] - min_q[0] > limit:
                if nums[l] == max_q[0]:
                    max_q.popleft()
                if nums[l] == min_q[0]:
                    min_q.popleft()
                l += 1
            res = max(res, r - l + 1)
        return res
```

```java
public class Solution {
    public int longestSubarray(int[] nums, int limit) {
        Deque<Integer> minQ = new ArrayDeque<>();
        Deque<Integer> maxQ = new ArrayDeque<>();
        int l = 0, res = 0;
        for (int r = 0; r < nums.length; r++) {
            while (!minQ.isEmpty() && nums[r] < minQ.peekLast()) {
                minQ.removeLast();
            }
            while (!maxQ.isEmpty() && nums[r] > maxQ.peekLast()) {
                maxQ.removeLast();
            }
            minQ.addLast(nums[r]);
            maxQ.addLast(nums[r]);
            while (maxQ.peekFirst() - minQ.peekFirst() > limit) {
                if (nums[l] == maxQ.peekFirst()) {
                    maxQ.removeFirst();
                }
                if (nums[l] == minQ.peekFirst()) {
                    minQ.removeFirst();
                }
                l++;
            }
            res = Math.max(res, r - l + 1);
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> minQ, maxQ;
        int l = 0, res = 0;
        for (int r = 0; r < nums.size(); r++) {
            while (!minQ.empty() && nums[r] < minQ.back()) {
                minQ.pop_back();
            }
            while (!maxQ.empty() && nums[r] > maxQ.back()) {
                maxQ.pop_back();
            }
            minQ.push_back(nums[r]);
            maxQ.push_back(nums[r]);
            while (maxQ.front() - minQ.front() > limit) {
                if (nums[l] == maxQ.front()) {
                    maxQ.pop_front();
                }
                if (nums[l] == minQ.front()) {
                    minQ.pop_front();
                }
                l++;
            }
            res = max(res, r - l + 1);
        }
        return res;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} limit
     * @return {number}
     */
    longestSubarray(nums, limit) {
        const minQ = new Deque();
        const maxQ = new Deque();
        let l = 0,
            res = 0;
        for (let r = 0; r < nums.length; r++) {
            while (!minQ.isEmpty() && nums[r] < minQ.back()) {
                minQ.popBack();
            }
            while (!maxQ.isEmpty() && nums[r] > maxQ.back()) {
                maxQ.popBack();
            }

            minQ.pushBack(nums[r]);
            maxQ.pushBack(nums[r]);

            while (maxQ.front() - minQ.front() > limit) {
                if (nums[l] === maxQ.front()) {
                    maxQ.popFront();
                }
                if (nums[l] === minQ.front()) {
                    minQ.popFront();
                }
                l++;
            }

            res = Math.max(res, r - l + 1);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int limit) {
        var minQ = new LinkedList<int>();
        var maxQ = new LinkedList<int>();
        int l = 0, res = 0;
        for (int r = 0; r < nums.Length; r++) {
            while (minQ.Count > 0 && nums[r] < minQ.Last.Value) {
                minQ.RemoveLast();
            }
            while (maxQ.Count > 0 && nums[r] > maxQ.Last.Value) {
                maxQ.RemoveLast();
            }
            minQ.AddLast(nums[r]);
            maxQ.AddLast(nums[r]);
            while (maxQ.First.Value - minQ.First.Value > limit) {
                if (nums[l] == maxQ.First.Value) {
                    maxQ.RemoveFirst();
                }
                if (nums[l] == minQ.First.Value) {
                    minQ.RemoveFirst();
                }
                l++;
            }
            res = System.Math.Max(res, r - l + 1);
        }
        return res;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$

---

## 5. Deque - II

::tabs-start

```python
class Solution:
    def longestSubarray(self, nums: List[int], limit: int) -> int:
        inc = deque([nums[0]])
        dec = deque([nums[0]])
        res = 1
        j = 0

        for i in range(1, len(nums)):
            while inc and inc[-1] > nums[i]:
                inc.pop()
            while dec and dec[-1] < nums[i]:
                dec.pop()

            inc.append(nums[i])
            dec.append(nums[i])
            if dec[0] - inc[0] > limit:
                if dec[0] == nums[j]:
                    dec.popleft()
                if inc[0] == nums[j]:
                    inc.popleft()
                j += 1

        return len(nums) - j
```

```java
public class Solution {
    public int longestSubarray(int[] nums, int limit) {
        Deque<Integer> inc = new ArrayDeque<>();
        Deque<Integer> dec = new ArrayDeque<>();
        inc.addLast(nums[0]);
        dec.addLast(nums[0]);
        int res = 1, j = 0;

        for (int i = 1; i < nums.length; i++) {
            while (!inc.isEmpty() && inc.peekLast() > nums[i]) {
                inc.removeLast();
            }
            while (!dec.isEmpty() && dec.peekLast() < nums[i]) {
                dec.removeLast();
            }

            inc.addLast(nums[i]);
            dec.addLast(nums[i]);
            if (dec.peekFirst() - inc.peekFirst() > limit) {
                if (dec.peekFirst().equals(nums[j])) {
                    dec.removeFirst();
                }
                if (inc.peekFirst().equals(nums[j])) {
                    inc.removeFirst();
                }
                j++;
            }
        }

        return nums.length - j;
    }
}
```

```cpp
class Solution {
public:
    int longestSubarray(vector<int>& nums, int limit) {
        deque<int> inc, dec;
        inc.push_back(nums[0]);
        dec.push_back(nums[0]);
        int res = 1, j = 0, n = nums.size();

        for (int i = 1; i < n; i++) {
            while (!inc.empty() && inc.back() > nums[i]) {
                inc.pop_back();
            }
            while (!dec.empty() && dec.back() < nums[i]) {
                dec.pop_back();
            }

            inc.push_back(nums[i]);
            dec.push_back(nums[i]);
            if (dec.front() - inc.front() > limit) {
                if (dec.front() == nums[j]) {
                    dec.pop_front();
                }
                if (inc.front() == nums[j]) {
                    inc.pop_front();
                }
                j++;
            }
        }

        return n - j;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} nums
     * @param {number} limit
     * @return {number}
     */
    longestSubarray(nums, limit) {
        const inc = new Deque([nums[0]]);
        const dec = new Deque([nums[0]]);
        let res = 1,
            j = 0;

        for (let i = 1; i < nums.length; i++) {
            while (!inc.isEmpty() && inc.back() > nums[i]) {
                inc.popBack();
            }
            while (!dec.isEmpty() && dec.back() < nums[i]) {
                dec.popBack();
            }

            inc.pushBack(nums[i]);
            dec.pushBack(nums[i]);
            if (dec.front() - inc.front() > limit) {
                if (dec.front() === nums[j]) {
                    dec.popFront();
                }
                if (inc.front() === nums[j]) {
                    inc.popFront();
                }
                j++;
            }
        }

        return nums.length - j;
    }
}
```

```csharp
public class Solution {
    public int LongestSubarray(int[] nums, int limit) {
        var inc = new LinkedList<int>();
        var dec = new LinkedList<int>();
        inc.AddLast(nums[0]);
        dec.AddLast(nums[0]);
        int res = 1, j = 0;

        for (int i = 1; i < nums.Length; i++) {
            while (inc.Count > 0 && inc.Last.Value > nums[i]) {
                inc.RemoveLast();
            }
            while (dec.Count > 0 && dec.Last.Value < nums[i]) {
                dec.RemoveLast();
            }

            inc.AddLast(nums[i]);
            dec.AddLast(nums[i]);
            if (dec.First.Value - inc.First.Value > limit) {
                if (dec.First.Value == nums[j]) {
                    dec.RemoveFirst();
                }
                if (inc.First.Value == nums[j]) {
                    inc.RemoveFirst();
                }
                j++;
            }
        }

        return nums.Length - j;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$
- Space complexity: $O(n)$
