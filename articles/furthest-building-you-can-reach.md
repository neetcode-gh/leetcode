## 1. Brute Force (Greedy)

### Intuition

The key observation is that ladders are most valuable for the largest height differences, since a ladder covers any gap regardless of size while bricks are consumed proportionally. For each position we reach, we can check if it's achievable by sorting all the height jumps encountered so far and using ladders for the largest ones while using bricks for the rest.

### Algorithm

1. Iterate through each building index `i` from `1` to `n - 1`.
2. If we have enough ladders to cover all jumps up to index `i`, we can definitely reach it.
3. Otherwise, collect all positive height differences (jumps) from the start to index `i`.
4. Sort the jumps in ascending order.
5. Use bricks for the smallest jumps (all jumps except the largest `ladders` ones).
6. If the total bricks needed exceeds what we have, return the previous index `i - 1`.
7. If we successfully iterate through all buildings, return `n - 1`.

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

```csharp
public class Solution {
    public int FurthestBuilding(int[] heights, int bricks, int ladders) {
        int n = heights.Length;

        for (int i = 1; i < n; i++) {
            if (ladders >= i) continue;

            List<int> diffs = new List<int>();
            for (int j = 0; j < i; j++) {
                if (heights[j + 1] > heights[j]) {
                    diffs.Add(heights[j + 1] - heights[j]);
                }
            }

            diffs.Sort();
            long brickSum = 0;
            for (int j = 0; j < diffs.Count - ladders; j++) {
                brickSum += diffs[j];
            }

            if (brickSum > bricks) return i - 1;
        }

        return n - 1;
    }
}
```

```go
func furthestBuilding(heights []int, bricks int, ladders int) int {
    n := len(heights)

    for i := 1; i < n; i++ {
        if ladders >= i {
            continue
        }

        diffs := []int{}
        for j := 0; j < i; j++ {
            if heights[j+1] > heights[j] {
                diffs = append(diffs, heights[j+1]-heights[j])
            }
        }

        sort.Ints(diffs)
        brickSum := 0
        for j := 0; j < len(diffs)-ladders; j++ {
            brickSum += diffs[j]
        }

        if brickSum > bricks {
            return i - 1
        }
    }

    return n - 1
}
```

```kotlin
class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        val n = heights.size

        for (i in 1 until n) {
            if (ladders >= i) continue

            val diffs = mutableListOf<Int>()
            for (j in 0 until i) {
                if (heights[j + 1] > heights[j]) {
                    diffs.add(heights[j + 1] - heights[j])
                }
            }

            diffs.sort()
            var brickSum = 0L
            for (j in 0 until diffs.size - ladders) {
                brickSum += diffs[j]
            }

            if (brickSum > bricks) return i - 1
        }

        return n - 1
    }
}
```

```swift
class Solution {
    func furthestBuilding(_ heights: [Int], _ bricks: Int, _ ladders: Int) -> Int {
        let n = heights.count

        for i in 1..<n {
            if ladders >= i { continue }

            var diffs = [Int]()
            for j in 0..<i {
                if heights[j + 1] > heights[j] {
                    diffs.append(heights[j + 1] - heights[j])
                }
            }

            diffs.sort()
            var brickSum = 0
            for j in 0..<(diffs.count - ladders) {
                brickSum += diffs[j]
            }

            if brickSum > bricks { return i - 1 }
        }

        return n - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n ^ 2 \log n)$
- Space complexity: $O(n)$

---

## 2. Binary Search On Buildings

### Intuition

Instead of checking each building sequentially, we can use binary search to find the furthest reachable building. The key insight is that reachability is monotonic: if we can reach building `i`, we can also reach all buildings before it. This lets us binary search on the answer.

### Algorithm

1. Binary search on the building index with range `[ladders - 1, n - 1]`.
2. For each `mid` index, check if we can reach it using `canReach(mid)`.
3. In `canReach`: collect all positive height differences up to index `mid`.
4. Sort the differences and use bricks for the smallest ones (all except the largest `ladders`).
5. If total bricks needed is within budget, we can reach that building.
6. Adjust binary search bounds based on reachability.
7. Return `l - 1` as the furthest reachable building.

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

```csharp
public class Solution {
    public int FurthestBuilding(int[] heights, int bricks, int ladders) {
        int l = ladders - 1, r = heights.Length - 1;

        while (l <= r) {
            int mid = (l + r) / 2;
            if (CanReach(heights, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

    private bool CanReach(int[] heights, int mid, int bricks, int ladders) {
        List<int> diffs = new List<int>();

        for (int i = 0; i < mid; i++) {
            if (heights[i + 1] > heights[i]) {
                diffs.Add(heights[i + 1] - heights[i]);
            }
        }

        diffs.Sort();
        int brickSum = 0;

        for (int j = 0; j < diffs.Count - ladders; j++) {
            brickSum += diffs[j];
            if (brickSum > bricks) return false;
        }

        return true;
    }
}
```

```go
func furthestBuilding(heights []int, bricks int, ladders int) int {
    l, r := ladders-1, len(heights)-1

    canReach := func(mid int) bool {
        diffs := []int{}
        for i := 0; i < mid; i++ {
            if heights[i+1] > heights[i] {
                diffs = append(diffs, heights[i+1]-heights[i])
            }
        }

        sort.Ints(diffs)
        brickSum := 0

        for j := 0; j < len(diffs)-ladders; j++ {
            brickSum += diffs[j]
            if brickSum > bricks {
                return false
            }
        }

        return true
    }

    for l <= r {
        mid := (l + r) / 2
        if canReach(mid) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return l - 1
}
```

```kotlin
class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        var l = ladders - 1
        var r = heights.size - 1

        fun canReach(mid: Int): Boolean {
            val diffs = mutableListOf<Int>()
            for (i in 0 until mid) {
                if (heights[i + 1] > heights[i]) {
                    diffs.add(heights[i + 1] - heights[i])
                }
            }

            diffs.sort()
            var brickSum = 0

            for (j in 0 until diffs.size - ladders) {
                brickSum += diffs[j]
                if (brickSum > bricks) return false
            }

            return true
        }

        while (l <= r) {
            val mid = (l + r) / 2
            if (canReach(mid)) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        return l - 1
    }
}
```

```swift
class Solution {
    func furthestBuilding(_ heights: [Int], _ bricks: Int, _ ladders: Int) -> Int {
        var l = ladders - 1
        var r = heights.count - 1

        func canReach(_ mid: Int) -> Bool {
            var diffs = [Int]()
            for i in 0..<mid {
                if heights[i + 1] > heights[i] {
                    diffs.append(heights[i + 1] - heights[i])
                }
            }

            diffs.sort()
            var brickSum = 0

            for j in 0..<(diffs.count - ladders) {
                brickSum += diffs[j]
                if brickSum > bricks { return false }
            }

            return true
        }

        while l <= r {
            let mid = (l + r) / 2
            if canReach(mid) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        return l - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log ^ 2 n)$
- Space complexity: $O(n)$

---

## 3. Binary Search On Buildings (Optimal)

### Intuition

We can optimize the previous approach by pre-sorting all height differences once instead of sorting repeatedly for each binary search check. By storing differences with their indices and sorting them in descending order, we can efficiently determine for any target building which jumps to cover with ladders (the largest ones) and which to cover with bricks.

### Algorithm

1. Pre-compute all positive height differences along with their indices.
2. Sort these differences in descending order.
3. Binary search on building indices from `1` to `n - 1`.
4. For each `mid` index, iterate through sorted differences: use ladders for the largest jumps (up to `ladders` count), and use bricks for the rest that occur before or at the `mid` index.
5. If bricks exceed the budget, that building is unreachable.
6. Return the furthest reachable building index.

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

```csharp
public class Solution {
    public int FurthestBuilding(int[] heights, int bricks, int ladders) {
        var diffs = new List<int[]>();
        for (int i = 1; i < heights.Length; i++) {
            if (heights[i] > heights[i - 1]) {
                diffs.Add(new int[] { heights[i] - heights[i - 1], i });
            }
        }

        diffs.Sort((a, b) => b[0].CompareTo(a[0]));

        int l = 1, r = heights.Length - 1;
        while (l <= r) {
            int mid = (l + r) >> 1;
            if (CanReach(diffs, mid, bricks, ladders)) {
                l = mid + 1;
            } else {
                r = mid - 1;
            }
        }

        return l - 1;
    }

    private bool CanReach(List<int[]> diffs, int index, int bricks, int ladders) {
        int useLadders = 0;
        long useBricks = 0;
        foreach (var diff in diffs) {
            int jump = diff[0], i = diff[1];
            if (i > index) continue;

            if (useLadders < ladders) {
                useLadders++;
            } else {
                useBricks += jump;
                if (useBricks > bricks) return false;
            }
        }
        return true;
    }
}
```

```go
func furthestBuilding(heights []int, bricks int, ladders int) int {
    type pair struct {
        diff, idx int
    }
    diffs := []pair{}
    for i := 1; i < len(heights); i++ {
        if heights[i] > heights[i-1] {
            diffs = append(diffs, pair{heights[i] - heights[i-1], i})
        }
    }

    sort.Slice(diffs, func(i, j int) bool {
        return diffs[i].diff > diffs[j].diff
    })

    canReach := func(index int) bool {
        useLadders, useBricks := 0, 0
        for _, d := range diffs {
            if d.idx > index {
                continue
            }

            if useLadders < ladders {
                useLadders++
            } else {
                useBricks += d.diff
                if useBricks > bricks {
                    return false
                }
            }
        }
        return true
    }

    l, r := 1, len(heights)-1
    for l <= r {
        mid := (l + r) >> 1
        if canReach(mid) {
            l = mid + 1
        } else {
            r = mid - 1
        }
    }

    return l - 1
}
```

```kotlin
class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        val diffs = mutableListOf<IntArray>()
        for (i in 1 until heights.size) {
            if (heights[i] > heights[i - 1]) {
                diffs.add(intArrayOf(heights[i] - heights[i - 1], i))
            }
        }

        diffs.sortByDescending { it[0] }

        fun canReach(index: Int): Boolean {
            var useLadders = 0
            var useBricks = 0L
            for (diff in diffs) {
                val (jump, i) = diff[0] to diff[1]
                if (i > index) continue

                if (useLadders < ladders) {
                    useLadders++
                } else {
                    useBricks += jump
                    if (useBricks > bricks) return false
                }
            }
            return true
        }

        var l = 1
        var r = heights.size - 1
        while (l <= r) {
            val mid = (l + r) shr 1
            if (canReach(mid)) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        return l - 1
    }
}
```

```swift
class Solution {
    func furthestBuilding(_ heights: [Int], _ bricks: Int, _ ladders: Int) -> Int {
        var diffs = [(Int, Int)]()
        for i in 1..<heights.count {
            if heights[i] > heights[i - 1] {
                diffs.append((heights[i] - heights[i - 1], i))
            }
        }

        diffs.sort { $0.0 > $1.0 }

        func canReach(_ index: Int) -> Bool {
            var useLadders = 0
            var useBricks = 0
            for (diff, i) in diffs {
                if i > index { continue }

                if useLadders < ladders {
                    useLadders += 1
                } else {
                    useBricks += diff
                    if useBricks > bricks { return false }
                }
            }
            return true
        }

        var l = 1
        var r = heights.count - 1
        while l <= r {
            let mid = (l + r) >> 1
            if canReach(mid) {
                l = mid + 1
            } else {
                r = mid - 1
            }
        }

        return l - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 4. Max-Heap

### Intuition

We can make greedy decisions as we traverse by initially using bricks for each jump, then retroactively swapping to a ladder when bricks run out. A max-heap tracks all brick usages so far, allowing us to efficiently swap the largest brick usage with a ladder when needed. This ensures ladders always cover the biggest gaps.

### Algorithm

1. Traverse buildings from left to right.
2. For each positive height difference, subtract it from `bricks` and push the difference onto a max-heap.
3. If `bricks` go negative:
   - If no ladders remain, return the current index (cannot proceed).
   - Otherwise, use a ladder: pop the largest difference from the heap and add it back to `bricks`.
   - Decrement `ladders`.
4. If we complete the traversal, return `n - 1`.

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

```csharp
public class Solution {
    public int FurthestBuilding(int[] heights, int bricks, int ladders) {
        var maxHeap = new PriorityQueue<int, int>(Comparer<int>.Create((a, b) => b - a));

        for (int i = 0; i < heights.Length - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            bricks -= diff;
            maxHeap.Enqueue(diff, diff);

            if (bricks < 0) {
                if (ladders == 0) return i;
                ladders--;
                bricks += maxHeap.Dequeue();
            }
        }

        return heights.Length - 1;
    }
}
```

```go
func furthestBuilding(heights []int, bricks int, ladders int) int {
    maxHeap := &MaxHeap{}
    heap.Init(maxHeap)

    for i := 0; i < len(heights)-1; i++ {
        diff := heights[i+1] - heights[i]
        if diff <= 0 {
            continue
        }

        bricks -= diff
        heap.Push(maxHeap, diff)

        if bricks < 0 {
            if ladders == 0 {
                return i
            }
            ladders--
            bricks += heap.Pop(maxHeap).(int)
        }
    }

    return len(heights) - 1
}

type MaxHeap []int

func (h MaxHeap) Len() int           { return len(h) }
func (h MaxHeap) Less(i, j int) bool { return h[i] > h[j] }
func (h MaxHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MaxHeap) Push(x interface{}) {
    *h = append(*h, x.(int))
}

func (h *MaxHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        var bricks = bricks
        var ladders = ladders
        val maxHeap = PriorityQueue<Int>(reverseOrder())

        for (i in 0 until heights.size - 1) {
            val diff = heights[i + 1] - heights[i]
            if (diff <= 0) continue

            bricks -= diff
            maxHeap.add(diff)

            if (bricks < 0) {
                if (ladders == 0) return i
                ladders--
                bricks += maxHeap.poll()
            }
        }

        return heights.size - 1
    }
}
```

```swift
class Solution {
    func furthestBuilding(_ heights: [Int], _ bricks: Int, _ ladders: Int) -> Int {
        var bricks = bricks
        var ladders = ladders
        var maxHeap = [Int]()

        for i in 0..<(heights.count - 1) {
            let diff = heights[i + 1] - heights[i]
            if diff <= 0 { continue }

            bricks -= diff
            maxHeap.append(diff)
            maxHeap.sort(by: >)

            if bricks < 0 {
                if ladders == 0 { return i }
                ladders -= 1
                bricks += maxHeap.removeFirst()
            }
        }

        return heights.count - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## 5. Min-Heap

### Intuition

Instead of tracking brick usages, we can track ladder usages in a min-heap. We greedily assign ladders to each jump, but once we've used more than the allowed number of ladders, we convert the smallest ladder usage back to bricks. This way, ladders always end up covering the largest jumps.

### Algorithm

1. Traverse buildings from left to right.
2. For each positive height difference, push it onto a min-heap (representing a ladder allocation).
3. If the heap size exceeds the number of ladders:
   - Pop the smallest difference (least valuable ladder usage).
   - Subtract it from `bricks`.
   - If `bricks` go negative, return the current index.
4. If we complete the traversal, return `n - 1`.

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

```csharp
public class Solution {
    public int FurthestBuilding(int[] heights, int bricks, int ladders) {
        var minHeap = new PriorityQueue<int, int>();

        for (int i = 0; i < heights.Length - 1; i++) {
            int diff = heights[i + 1] - heights[i];
            if (diff <= 0) continue;

            minHeap.Enqueue(diff, diff);
            if (minHeap.Count > ladders) {
                bricks -= minHeap.Dequeue();
                if (bricks < 0) return i;
            }
        }

        return heights.Length - 1;
    }
}
```

```go
func furthestBuilding(heights []int, bricks int, ladders int) int {
    minHeap := &MinHeap{}
    heap.Init(minHeap)

    for i := 0; i < len(heights)-1; i++ {
        diff := heights[i+1] - heights[i]
        if diff <= 0 {
            continue
        }

        heap.Push(minHeap, diff)
        if minHeap.Len() > ladders {
            bricks -= heap.Pop(minHeap).(int)
            if bricks < 0 {
                return i
            }
        }
    }

    return len(heights) - 1
}

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }

func (h *MinHeap) Push(x interface{}) {
    *h = append(*h, x.(int))
}

func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}
```

```kotlin
class Solution {
    fun furthestBuilding(heights: IntArray, bricks: Int, ladders: Int): Int {
        var bricks = bricks
        val minHeap = PriorityQueue<Int>()

        for (i in 0 until heights.size - 1) {
            val diff = heights[i + 1] - heights[i]
            if (diff <= 0) continue

            minHeap.add(diff)
            if (minHeap.size > ladders) {
                bricks -= minHeap.poll()
                if (bricks < 0) return i
            }
        }

        return heights.size - 1
    }
}
```

```swift
class Solution {
    func furthestBuilding(_ heights: [Int], _ bricks: Int, _ ladders: Int) -> Int {
        var bricks = bricks
        var minHeap = [Int]()

        for i in 0..<(heights.count - 1) {
            let diff = heights[i + 1] - heights[i]
            if diff <= 0 { continue }

            minHeap.append(diff)
            minHeap.sort()
            if minHeap.count > ladders {
                bricks -= minHeap.removeFirst()
                if bricks < 0 { return i }
            }
        }

        return heights.count - 1
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$
- Space complexity: $O(n)$

---

## Common Pitfalls

### Ignoring Downward or Equal Height Transitions

Not all building transitions require resources. When `heights[i+1] <= heights[i]`, no bricks or ladders are needed. Forgetting to skip these cases leads to wasting resources on non-existent climbs and incorrect answers. Always check if the height difference is positive before consuming any resources.

### Using Ladders for Small Gaps Instead of Large Ones

The greedy insight is that ladders should cover the largest height differences since they handle any gap regardless of size. Using ladders greedily for the first gaps encountered (rather than the largest ones) leads to suboptimal resource usage. The heap-based solutions ensure ladders always end up covering the maximum height differences.

### Returning the Wrong Index When Resources Run Out

When bricks become negative, the current building cannot be reached, so the answer should be the previous index. A common mistake is returning `i` instead of `i - 1` in the brute force approach, or returning `i` when we should return `i` (the last reachable building) in the heap approach. Pay careful attention to what index represents the last successfully reached building.