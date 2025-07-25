## 1. Brute Force (Greedy)

::tabs-start

```python
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        n = len(heights)

        for i in range(1, n):
            if ladders >= i:
                continue

            diffs = []
            for j in range(i):
                if heights[j + 1] > heights[j]:
                    diffs.append(heights[j + 1] - heights[j])

            diffs.sort()
            brickSum = 0
            for j in range(len(diffs) - ladders):
                brickSum += diffs[j]

            if brickSum > bricks:
                return i - 1

        return n - 1
```

```java
public class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        int n = heights.length;

        for (int i = 1; i < n; i++) {
            if (ladders >= i) {
                continue;
            }

            List<Integer> diffs = new ArrayList<>();
            for (int j = 0; j < i; j++) {
                if (heights[j + 1] > heights[j]) {
                    diffs.add(heights[j + 1] - heights[j]);
                }
            }

            Collections.sort(diffs);
            long brickSum = 0;
            for (int j = 0; j < diffs.size() - ladders; j++) {
                brickSum += diffs.get(j);
            }

            if (brickSum > bricks) {
                return i - 1;
            }
        }

        return n - 1;
    }
}
```

```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        int n = heights.size();

        for (int i = 1; i < n; i++) {
            if (ladders >= i) {
                continue;
            }

            vector<int> diffs;
            for (int j = 0; j < i; j++) {
                if (heights[j + 1] > heights[j]) {
                    diffs.push_back(heights[j + 1] - heights[j]);
                }
            }

            sort(diffs.begin(), diffs.end());
            long long brickSum = 0;
            for (int j = 0; j < int(diffs.size()) - ladders; j++) {
                brickSum += diffs[j];
            }

            if (brickSum > bricks) {
                return i - 1;
            }
        }

        return n - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @param {number} bricks
     * @param {number} ladders
     * @return {number}
     */
    furthestBuilding(heights, bricks, ladders) {
        let n = heights.length;

        for (let i = 1; i < n; i++) {
            if (ladders >= i) {
                continue;
            }

            let diffs = [];
            for (let j = 0; j < i; j++) {
                if (heights[j + 1] > heights[j]) {
                    diffs.push(heights[j + 1] - heights[j]);
                }
            }

            diffs.sort((a, b) => a - b);
            let brickSum = 0;
            for (let j = 0; j < diffs.length - ladders; j++) {
                brickSum += diffs[j];
            }

            if (brickSum > bricks) {
                return i - 1;
            }
        }

        return n - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n)$

---

## 2. Binary Search On Buildings

::tabs-start

```python
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        def canReach(mid):
            diffs = []
            for i in range(mid):
                if heights[i + 1] > heights[i]:
                    diffs.append(heights[i + 1] - heights[i])

            diffs.sort()
            brickSum = 0
            for j in range(len(diffs) - ladders):
                brickSum += diffs[j]
                if brickSum > bricks:
                    return False

            return True

        l, r = ladders - 1, len(heights) - 1
        while l <= r:
            mid = (l + r) // 2
            if canReach(mid):
                l = mid + 1
            else:
                r = mid - 1

        return l - 1
```

```java
public class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        int l = ladders - 1, r = heights.length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(heights, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

    private boolean canReach(int[] heights, int mid, int bricks, int ladders) {
        List<Integer> diffs = new ArrayList<>();

        for (int i = 0; i < mid; i++) {
            if (heights[i + 1] > heights[i]) {
                diffs.add(heights[i + 1] - heights[i]);
            }
        }

        Collections.sort(diffs);
        int brickSum = 0;

        for (int j = 0; j < diffs.size() - ladders; j++) {
            brickSum += diffs.get(j);
            if (brickSum > bricks) {
                return false;
            }
        }

        return true;
    }
}
```

```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        int l = ladders - 1, r = heights.size() - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (canReach(heights, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

private:
    bool canReach(vector<int>& heights, int mid, int bricks, int ladders) {
        vector<int> diffs;

        for (int i = 0; i < mid; i++) {
            if (heights[i + 1] > heights[i]) {
                diffs.push_back(heights[i + 1] - heights[i]);
            }
        }

        sort(diffs.begin(), diffs.end());
        long long brickSum = 0;

        for (int j = 0; j < int(diffs.size()) - ladders; j++) {
            brickSum += diffs[j];
            if (brickSum > bricks) {
                return false;
            }
        }

        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @param {number} bricks
     * @param {number} ladders
     * @return {number}
     */
    furthestBuilding(heights, bricks, ladders) {
        let l = ladders - 1,
            r = heights.length - 1;

        const canReach = (mid) => {
            let diffs = [];
            for (let i = 0; i < mid; i++) {
                if (heights[i + 1] > heights[i]) {
                    diffs.push(heights[i + 1] - heights[i]);
                }
            }

            diffs.sort((a, b) => a - b);
            let brickSum = 0;

            for (let j = 0; j < diffs.length - ladders; j++) {
                brickSum += diffs[j];
                if (brickSum > bricks) {
                    return false;
                }
            }

            return true;
        };

        while (l <= r) {
            let mid = Math.floor((l + r) / 2);
            if (canReach(mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log ^ 2 n)$
- Space complexity: $O(n)$

---

## 3. Binary Search On Buildings (Optimal)

::tabs-start

```python
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        diffs = []
        for i in range(1, len(heights)):
            if heights[i] > heights[i - 1]:
                diffs.append((heights[i] - heights[i - 1], i))

        diffs.sort(reverse=True)

        def canReach(index):
            useLadders = useBricks = 0
            for diff, i in diffs:
                if i > index:
                    continue

                if useLadders < ladders:
                    useLadders += 1
                else:
                    useBricks += diff
                    if useBricks > bricks:
                        return False
            return True

        l, r = 1, len(heights) - 1
        while l <= r:
            mid = (l + r) >> 1
            if canReach(mid):
                l = mid + 1
            else:
                r = mid - 1
        return l - 1
```

```java
public class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        List<int[]> diffs = new ArrayList<>();
        for (int i = 1; i < heights.length; i++) {
            if (heights[i] > heights[i - 1]) {
                diffs.add(new int[]{heights[i] - heights[i - 1], i});
            }
        }

        diffs.sort((a, b) -> Integer.compare(b[0], a[0]));

        int l = 1, r = heights.length - 1;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (canReach(diffs, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

    private boolean canReach(List<int[]> diffs, int index, int bricks, int ladders) {
        int useLadders = 0;
        long useBricks = 0;
        for (int[] diff : diffs) {
            int jump = diff[0], i = diff[1];

            if (i > index) continue;

            if (useLadders < ladders) {
                useLadders++;
            } else {
                useBricks += jump;
                if (useBricks > bricks) {
                    return false;
                }
            }
        }
        return true;
    }
}
```

```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        vector<pair<int, int>> diffs;
        for (int i = 1; i < heights.size(); i++) {
            if (heights[i] > heights[i - 1]) {
                diffs.emplace_back(heights[i] - heights[i - 1], i);
            }
        }

        sort(diffs.rbegin(), diffs.rend()); // Sort in descending order

        int l = 1, r = heights.size() - 1;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (canReach(diffs, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

private:
    bool canReach(vector<pair<int, int>>& diffs, int index, int bricks, int ladders) {
        int useLadders = 0;
        long long useBricks = 0;
        for (auto& diff : diffs) {
            int jump = diff.first, i = diff.second;

            if (i > index) continue;

            if (useLadders < ladders) {
                useLadders++;
            } else {
                useBricks += jump;
                if (useBricks > bricks) {
                    return false;
                }
            }
        }
        return true;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @param {number} bricks
     * @param {number} ladders
     * @return {number}
     */
    furthestBuilding(heights, bricks, ladders) {
        let diffs = [];
        for (let i = 1; i < heights.length; i++) {
            if (heights[i] > heights[i - 1]) {
                diffs.push([heights[i] - heights[i - 1], i]);
            }
        }

        diffs.sort((a, b) => b[0] - a[0]);

        const canReach = (index) => {
            let useLadders = 0,
                useBricks = 0;
            for (let [diff, i] of diffs) {
                if (i > index) continue;

                if (useLadders < ladders) {
                    useLadders++;
                } else {
                    useBricks += diff;
                    if (useBricks > bricks) {
                        return false;
                    }
                }
            }
            return true;
        };

        let l = 1,
            r = heights.length - 1;
        while (l <= r) {
            let mid = (l + r) >> 1;
            if (canReach(mid)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Max-Heap

::tabs-start

```python
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        heap = []  # Max heap of bricks used

        for i in range(len(heights) - 1):
            diff = heights[i + 1] - heights[i]
            if diff <= 0:
                continue

            bricks -= diff
            heapq.heappush(heap, -diff)

            if bricks < 0:
                if ladders == 0:
                    return i
                ladders -= 1
                bricks += -heapq.heappop(heap)

        return len(heights) - 1
```

```java
public class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> maxHeap = new PriorityQueue<>((a, b) -> b - a);

        for (int i = 0; i < heights.length - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            bricks -= diff;
            maxHeap.offer(diff);

            if (bricks < 0) {
                if (ladders == 0) return i;
                ladders--;
                bricks += maxHeap.poll();
            }
        }

        return heights.length - 1;
    }
}
```

```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int> maxHeap;

        for (int i = 0; i < heights.size() - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            bricks -= diff;
            maxHeap.push(diff);

            if (bricks < 0) {
                if (ladders == 0) return i;
                ladders--;
                bricks += maxHeap.top();
                maxHeap.pop();
            }
        }

        return heights.size() - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @param {number} bricks
     * @param {number} ladders
     * @return {number}
     */
    furthestBuilding(heights, bricks, ladders) {
        const maxHeap = new MaxPriorityQueue();

        for (let i = 0; i < heights.length - 1; i++) {
            let diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            bricks -= diff;
            maxHeap.enqueue(diff);

            if (bricks < 0) {
                if (ladders === 0) return i;
                ladders--;
                bricks += maxHeap.dequeue().element;
            }
        }

        return heights.length - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Min-Heap

::tabs-start

```python
class Solution:
    def furthestBuilding(self, heights: List[int], bricks: int, ladders: int) -> int:
        minHeap = []

        for i in range(len(heights) - 1):
            diff = heights[i + 1] - heights[i]
            if diff <= 0:
                continue

            heapq.heappush(minHeap, diff)
            if len(minHeap) > ladders:
                bricks -= heapq.heappop(minHeap)
                if bricks < 0:
                    return i

        return len(heights) - 1
```

```java
public class Solution {
    public int furthestBuilding(int[] heights, int bricks, int ladders) {
        PriorityQueue<Integer> minHeap = new PriorityQueue<>();

        for (int i = 0; i < heights.length - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            minHeap.offer(diff);
            if (minHeap.size() > ladders) {
                bricks -= minHeap.poll();
                if (bricks < 0) return i;
            }
        }

        return heights.length - 1;
    }
}
```

```cpp
class Solution {
public:
    int furthestBuilding(vector<int>& heights, int bricks, int ladders) {
        priority_queue<int, vector<int>, greater<int>> minHeap;

        for (int i = 0; i < int(heights.size()) - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            minHeap.push(diff);
            if (minHeap.size() > ladders) {
                bricks -= minHeap.top(); minHeap.pop();
                if (bricks < 0) return i;
            }
        }

        return int(heights.size()) - 1;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[]} heights
     * @param {number} bricks
     * @param {number} ladders
     * @return {number}
     */
    furthestBuilding(heights, bricks, ladders) {
        const minHeap = new MinPriorityQueue();

        for (let i = 0; i < heights.length - 1; i++) {
            let diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            minHeap.enqueue(diff);
            if (minHeap.size() > ladders) {
                bricks -= minHeap.dequeue().element;
                if (bricks < 0) return i;
            }
        }

        return heights.length - 1;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$
