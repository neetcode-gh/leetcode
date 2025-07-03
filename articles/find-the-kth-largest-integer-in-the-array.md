## 1. Sorting

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n \log n)$
- Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 2. Max-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * (n + k) * \log n)$
- Space complexity: $O(n)$

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 3. Min-Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n * \log k)$
- Space complexity: $O(k)$

> Where $n$ is the number of strings and $m$ is the average length of a string.

---

## 4. Quick Select

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(m * n)$ in average case, $O(m * n ^ 2)$ in worst case.
- Space complexity: $O(1)$
