## 1. Brute Force

### Intuition
A subarray is valid if the **difference between its maximum and minimum** is at most `limit`.
Brute force tries every possible starting index `i`, then extends the subarray to the right (`j`) while tracking the current **min** and **max**.
The moment `max - min` becomes greater than `limit`, extending further will only keep it invalid (or worse), so we **break** and move to the next `i`.

### Algorithm
1. Initialize `res = 1`.
2. For each starting index `i`:
   - Set `mini = maxi = nums[i]`.
   - For each `j` from `i+1` to `n-1`:
     - Update `mini = min(mini, nums[j])`
     - Update `maxi = max(maxi, nums[j])`
     - If `maxi - mini > limit`, break.
     - Otherwise update `res = max(res, j - i + 1)`.
3. Return `res`.

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

### Intuition

We want to find the longest continuous subarray where the difference between the maximum and minimum elements is less than or equal to the given limit.

A simple way would be to check all subarrays, but that would be too slow. Instead, we can use a **sliding window** approach where we expand the window to the right and shrink it from the left only when the condition becomes invalid.

The key challenge is to **quickly know the maximum and minimum values** in the current window. To handle this efficiently, we use:
- a **max heap** to track the maximum value
- a **min heap** to track the minimum value

Each heap also stores indices so we can remove elements that move out of the window.

### Algorithm

1. Initialize two heaps:
   - a max heap to store values (as negative for max behavior) along with their indices
   - a min heap to store values along with their indices
2. Use two pointers:
   - `i` for expanding the window to the right
   - `j` for shrinking the window from the left
3. For each element at index `i`:
   - Add it to both the max heap and the min heap
4. While the difference between the current maximum and minimum exceeds the limit:
   - Move the left pointer `j` forward
   - Remove elements from both heaps whose indices are less than `j` (they are outside the window)
5. After the window becomes valid again:
   - Update the result with the current window length `i - j + 1`
6. Continue this process until all elements are processed
7. Return the maximum window length found.

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

### Intuition

We want the longest continuous subarray where the difference between the maximum and minimum elements is less than or equal to the given limit.

Using a sliding window helps us avoid checking all subarrays. As we expand the window to the right, we need a way to **always know the current minimum and maximum values** inside the window.

To do this efficiently, we use a **sorted data structure** that keeps all elements of the current window in order. This allows us to:
- get the minimum element from the beginning
- get the maximum element from the end

If the difference between these two values becomes greater than the limit, we shrink the window from the left until it becomes valid again.

### Algorithm

1. Initialize a sorted dictionary to store elements of the current window along with their frequencies.
2. Use two pointers:
   - `l` as the left boundary of the window
   - `r` as the right boundary of the window
3. For each element at index `r`:
   - Insert it into the sorted dictionary and increase its count
4. While the difference between the largest and smallest keys in the sorted dictionary exceeds the limit:
   - Remove the element at index `l` from the dictionary
   - Decrease its count and delete it if the count becomes zero
   - Move the left pointer `l` forward
5. Once the window is valid:
   - Update the result with the current window size `r - l + 1`
6. Continue until all elements are processed
7. Return the maximum window length found.

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

### Intuition

We want to find the longest continuous subarray where the difference between the maximum and minimum elements does not exceed the given limit.

A sliding window is a natural choice here, but the main challenge is efficiently tracking the **current minimum and maximum** in the window as it moves.

To solve this, we use **two monotonic deques**:
- a **monotonically increasing deque** to keep track of the minimum values
- a **monotonically decreasing deque** to keep track of the maximum values

These deques are maintained in such a way that their front elements always represent the minimum and maximum of the current window.

### Algorithm

1. Initialize two deques:
   - `min_q` to store elements in increasing order (front is the minimum)
   - `max_q` to store elements in decreasing order (front is the maximum)
2. Use two pointers:
   - `l` for the left boundary of the window
   - `r` for expanding the window to the right
3. For each index `r`:
   - Remove elements from the back of `min_q` while the current value is smaller
   - Remove elements from the back of `max_q` while the current value is larger
   - Add the current value to both deques
4. While the difference between the front of `max_q` and `min_q` exceeds the limit:
   - If the element leaving the window equals the front of `max_q`, remove it
   - If the element leaving the window equals the front of `min_q`, remove it
   - Move the left pointer `l` forward
5. After the window becomes valid:
   - Update the result using the current window size `r - l + 1`
6. Continue until all elements are processed
7. Return the maximum window length found

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

### Intuition

We want the longest continuous subarray where the difference between the maximum and minimum values is at most `limit`.

A sliding window works well because the subarray must be continuous. As we expand the window to the right, we need to always know the **current minimum and maximum** in the window.

To track them efficiently, we maintain two monotonic deques:
- `inc` (increasing deque): keeps possible minimum values in increasing order, so the front is the current minimum
- `dec` (decreasing deque): keeps possible maximum values in decreasing order, so the front is the current maximum

Whenever the window becomes invalid (max - min > limit), we shrink it from the left by moving `j` forward and removing the left element from the deques if it matches their front.

### Algorithm

1. Initialize two deques using the first element:
   - `inc` for minimum tracking (monotonic increasing)
   - `dec` for maximum tracking (monotonic decreasing)
2. Use two pointers:
   - `i` expands the window to the right
   - `j` shrinks the window from the left when needed
3. For each new element `nums[i]`:
   - Maintain `inc` by popping from the back while the back is greater than `nums[i]`
   - Maintain `dec` by popping from the back while the back is less than `nums[i]`
   - Append `nums[i]` to both deques
4. If the window becomes invalid (`dec[0] - inc[0] > limit`):
   - If the element leaving the window (`nums[j]`) equals the front of `dec`, pop it from `dec`
   - If it equals the front of `inc`, pop it from `inc`
   - Move `j` forward by 1 to shrink the window
5. After processing all elements, the valid window starts at `j` and ends at the last index, so its length is `len(nums) - j`
6. Return that length

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
