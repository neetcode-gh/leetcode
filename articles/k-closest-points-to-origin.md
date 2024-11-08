## 1. Sorting

::tabs-start

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        points.sort(key=lambda p: p[0]**2 + p[1]**2)
        return points[:k]
```

```java
public class Solution {
    public int[][] kClosest(int[][] points, int k) {
        Arrays.sort(points, (a, b) -> (a[0] * a[0] + a[1] * a[1]) - 
                                      (b[0] * b[0] + b[1] * b[1]));
        return Arrays.copyOfRange(points, 0, k);
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        sort(points.begin(), points.end(), [](const auto& a, const auto& b) {
            return (a[0] * a[0] + a[1] * a[1]) < (b[0] * b[0] + b[1] * b[1]);
        });
        return vector<vector<int>>(points.begin(), points.begin() + k);
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        points.sort((a, b) => (a[0] ** 2 + a[1] ** 2) - 
                              (b[0] ** 2 + b[1] ** 2));
        return points.slice(0, k);
    }
}
```

```csharp
public class Solution {
    public int[][] KClosest(int[][] points, int k) {
        Array.Sort(points, (a, b) => 
        (a[0] * a[0] + a[1] * a[1]).CompareTo(b[0] * b[0] + b[1] * b[1]));
        return points[..k];
    }
}
```

```go
func kClosest(points [][]int, k int) [][]int {
    sort.Slice(points, func(i, j int) bool {
        return points[i][0]*points[i][0] + points[i][1]*points[i][1] < 
               points[j][0]*points[j][0] + points[j][1]*points[j][1]
    })
    return points[:k]
}
```

```kotlin
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        points.sortBy { it[0] * it[0] + it[1] * it[1] }
        return points.take(k).toTypedArray()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n \log n)$
* Space complexity: $O(1)$ or $O(n)$ depending on the sorting algorithm.

---

## 2. Min Heap

::tabs-start

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        minHeap = []
        for x, y in points:
            dist = (x ** 2) + (y ** 2)
            minHeap.append([dist, x, y])
        
        heapq.heapify(minHeap)
        res = []
        while k > 0:
            dist, x, y = heapq.heappop(minHeap)
            res.append([x, y])
            k -= 1
            
        return res
```

```java
public class Solution {
    public int[][] kClosest(int[][] points, int K) {
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparing(a -> a[0]));
        for (int[] point : points) {
            int dist = point[0] * point[0] + point[1] * point[1];
            minHeap.offer(new int[]{dist, point[0], point[1]});
        }

        int[][] result = new int[K][2];
        for (int i = 0; i < K; ++i) {
            int[] point = minHeap.poll();
            result[i] = new int[]{point[1], point[2]};
        }
        return result;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int K) {
        auto comp = [](const vector<int>& a, const vector<int>& b) {
            return a[0]*a[0] + a[1]*a[1] > b[0]*b[0] + b[1]*b[1];
        };
        
        priority_queue<vector<int>, vector<vector<int>>, decltype(comp)> minHeap(comp);

        for (const auto& point : points) {
            minHeap.push({point[0], point[1]});
        }

        vector<vector<int>> result;
        for (int i = 0; i < K; ++i) {
            result.push_back(minHeap.top());
            minHeap.pop();
        }
        return result;
    }
};
```

```javascript
/**
 * const { MinPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        const minHeap = new MinPriorityQueue(point => point[0]);

        for (const [x, y] of points) {
            const dist = x ** 2 + y ** 2;
            minHeap.enqueue([dist, x, y]);
        }

        const res = [];
        for (let i = 0; i < k; i++) {
            const [_, x, y] = minHeap.dequeue();
            res.push([x, y]);
        }

        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] KClosest(int[][] points, int K) {
        PriorityQueue<int[], int> minHeap = new PriorityQueue<int[], int>();
        foreach (int[] point in points) {
            int dist = point[0] * point[0] + point[1] * point[1];
            minHeap.Enqueue(new int[] { dist, point[0], point[1] }, dist);
        }

        int[][] result = new int[K][];
        for (int i = 0; i < K; ++i) {
            int[] point = minHeap.Dequeue();
            result[i] = new int[] { point[1], point[2] };
        }
        return result;
    }
}
```

```go
func kClosest(points [][]int, k int) [][]int {
    minHeap := priorityqueue.NewWith(func(a, b interface{}) int {
        distA := a.([]int)[0]
        distB := b.([]int)[0]
        return distA - distB
    })

    for _, point := range points {
        x, y := point[0], point[1]
        dist := x*x + y*y
        minHeap.Enqueue([]int{dist, x, y})
    }

    res := [][]int{}
    for i := 0; i < k; i++ {
        item, _ := minHeap.Dequeue()
        point := item.([]int)
        res = append(res, []int{point[1], point[2]})
    }

    return res
}
```

```kotlin
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): List<IntArray> {
        val minHeap = PriorityQueue(compareBy<IntArray> { it[0] * it[0] + it[1] * it[1] })

        for (point in points) {
            minHeap.add(point)
        }

        val res = mutableListOf<IntArray>()
        repeat(k) {
            res.add(minHeap.poll())
        }

        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(k * \log n)$
* Space complexity: $O(n)$

> Where $n$ is the length of the array $points$.

---

## 3. Max Heap

::tabs-start

```python
class Solution:
    def kClosest(self, points: List[List[int]], k: int) -> List[List[int]]:
        maxHeap = []
        for x, y in points:
            dist = -(x ** 2 + y ** 2)
            heapq.heappush(maxHeap, [dist, x, y])
            if len(maxHeap) > k:
                heapq.heappop(maxHeap)
        
        res = []
        while maxHeap:
            dist, x, y = heapq.heappop(maxHeap)
            res.append([x, y])
        return res
```

```java
public class Solution {
    public int[][] kClosest(int[][] points, int k) {
        PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
            (a, b) -> Integer.compare(b[0] * b[0] + b[1] * b[1], 
                                      a[0] * a[0] + a[1] * a[1])
        );

        for (int[] point : points) {
            maxHeap.offer(point);
            if (maxHeap.size() > k) {
                maxHeap.poll();
            }
        }

        int[][] res = new int[k][2];
        int i = 0;
        while (!maxHeap.isEmpty()) {
            res[i++] = maxHeap.poll();
        }
        return res;
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        priority_queue<pair<int, pair<int, int>>> maxHeap;
        for (auto& point : points) {
            int dist = point[0] * point[0] + point[1] * point[1];
            maxHeap.push({dist, {point[0], point[1]}});
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }
        
        vector<vector<int>> res;
        while (!maxHeap.empty()) {
            res.push_back({maxHeap.top().second.first, 
                           maxHeap.top().second.second});
            maxHeap.pop();
        }
        return res;
    }
};
```

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        const maxHeap = new PriorityQueue((a, b) => b[0] - a[0]);

        for (const [x, y] of points) {
            const dist = x ** 2 + y ** 2;
            maxHeap.push([dist, x, y]);
            if (maxHeap.size() > k) {
                maxHeap.pop();
            }
        }

        const res = [];
        while (maxHeap.size() > 0) {
            let tmp = maxHeap.pop();
            res.push([tmp[1], tmp[2]]);
        }
        return res;
    }
}
```

```csharp
public class Solution {
    public int[][] KClosest(int[][] points, int K) {
        PriorityQueue<int[], int> maxHeap = new();
        
        foreach (var point in points) {
            int dist = point[0] * point[0] + point[1] * point[1];
            maxHeap.Enqueue(point, -dist);
            if (maxHeap.Count > K) {
                maxHeap.Dequeue();
            }
        }

        var res = new List<int[]>();
        while (maxHeap.Count > 0) {
            res.Add(maxHeap.Dequeue());
        }
        
        return res.ToArray();
    }
}
```

```go
func kClosest(points [][]int, k int) [][]int {
    maxHeap := priorityqueue.NewWith(func(a, b interface{}) int {
        distA := a.([]int)[2]
        distB := b.([]int)[2]
        if distA > distB {
            return -1
        } else if distA < distB {
            return 1
        }
        return 0
    })
    
    for _, point := range points {
        x, y := point[0], point[1]
        dist := x*x + y*y
        maxHeap.Enqueue([]int{x, y, dist})
        if maxHeap.Size() > k {
            maxHeap.Dequeue()
        }
    }
    
    result := make([][]int, k)
    for i := k - 1; i >= 0; i-- {
        val, _ := maxHeap.Dequeue()
        point := val.([]int)
        result[i] = []int{point[0], point[1]}
    }
    
    return result
}
```

```kotlin
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val maxHeap = PriorityQueue<IntArray> { a, b ->
            (b[0] * b[0] + b[1] * b[1]) - (a[0] * a[0] + a[1] * a[1])
        }

        for (point in points) {
            maxHeap.offer(point)
            if (maxHeap.size > k) {
                maxHeap.poll()
            }
        }

        return Array(k) { maxHeap.poll() }
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * \log k)$
* Space complexity: $O(k)$

> Where $n$ is the length of the array $points$.

---

## 4. Quick Select

::tabs-start

```python
class Solution:
    def kClosest(self, points, k):
        euclidean = lambda x: x[0] ** 2 + x[1] ** 2
        def partition(l, r):
            pivotIdx = r
            pivotDist = euclidean(points[pivotIdx])
            i = l
            for j in range(l, r):
                if euclidean(points[j]) <= pivotDist:
                    points[i], points[j] = points[j], points[i]
                    i += 1
            points[i], points[r] = points[r], points[i]
            return i

        L, R = 0, len(points) - 1
        pivot = len(points)

        while pivot != k:
            pivot = partition(L, R)
            if pivot < k:
                L = pivot + 1
            else:
                R = pivot - 1
        return points[:k]
```

```java
public class Solution {
    public int[][] kClosest(int[][] points, int k) {
        int L = 0, R = points.length - 1;
        int pivot = points.length;

        while (pivot != k) {
            pivot = partition(points, L, R);
            if (pivot < k) {
                L = pivot + 1;
            } else {
                R = pivot - 1;
            }
        }
        int[][] res = new int[k][2];
        System.arraycopy(points, 0, res, 0, k);
        return res;
    }

    private int partition(int[][] points, int l, int r) {
        int pivotIdx = r;
        int pivotDist = euclidean(points[pivotIdx]);
        int i = l;
        for (int j = l; j < r; j++) {
            if (euclidean(points[j]) <= pivotDist) {
                int[] temp = points[i];
                points[i] = points[j];
                points[j] = temp;
                i++;
            }
        }
        int[] temp = points[i];
        points[i] = points[r];
        points[r] = temp;
        return i;
    }

    private int euclidean(int[] point) {
        return point[0] * point[0] + point[1] * point[1];
    }
}
```

```cpp
class Solution {
public:
    vector<vector<int>> kClosest(vector<vector<int>>& points, int k) {
        int L = 0, R = points.size() - 1;
        int pivot = points.size();

        while (pivot != k) {
            pivot = partition(points, L, R);
            if (pivot < k) {
                L = pivot + 1;
            } else {
                R = pivot - 1;
            }
        }
        return vector<std::vector<int>>(points.begin(), points.begin() + k);
    }

private:
    int partition(vector<vector<int>>& points, int l, int r) {
        int pivotIdx = r;
        int pivotDist = euclidean(points[pivotIdx]);
        int i = l;
        for (int j = l; j < r; j++) {
            if (euclidean(points[j]) <= pivotDist) {
                swap(points[i], points[j]);
                i++;
            }
        }
        swap(points[i], points[r]);
        return i;
    }

    int euclidean(vector<int>& point) {
        return point[0] * point[0] + point[1] * point[1];
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} points
     * @param {number} k
     * @return {number[][]}
     */
    kClosest(points, k) {
        let L = 0, R = points.length - 1, pivot = points.length;

        while (pivot !== k) {
            pivot = this.partition(points, L, R);
            if (pivot < k) {
                L = pivot + 1;
            } else {
                R = pivot - 1;
            }
        }
        return points.slice(0, k);
    }

    /**
     * @param {number[][]} points
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    partition(points, l, r) {
        const pivotIdx = r;
        const pivotDist = this.euclidean(points[pivotIdx]);
        let i = l;
        for (let j = l; j < r; j++) {
            if (this.euclidean(points[j]) <= pivotDist) {
                [points[i], points[j]] = [points[j], points[i]];
                i++;
            }
        }
        [points[i], points[r]] = [points[r], points[i]];
        return i;
    }

    /**
     * @param {number[]} point
     * @return {number}
     */
    euclidean(point) {
        return point[0] ** 2 + point[1] ** 2;
    }
}
```

```csharp
class Solution {
    public int[][] KClosest(int[][] points, int k) {
        int L = 0, R = points.Length - 1;
        int pivot = points.Length;

        while (pivot != k) {
            pivot = Partition(points, L, R);
            if (pivot < k) {
                L = pivot + 1;
            } else {
                R = pivot - 1;
            }
        }
        int[][] res = new int[k][];
        Array.Copy(points, res, k);
        return res;
    }

    private int Partition(int[][] points, int l, int r) {
        int pivotIdx = r;
        int pivotDist = Euclidean(points[pivotIdx]);
        int i = l;
        for (int j = l; j < r; j++) {
            if (Euclidean(points[j]) <= pivotDist) {
                Swap(points, i, j);
                i++;
            }
        }
        Swap(points, i, r);
        return i;
    }

    private int Euclidean(int[] point) {
        return point[0] * point[0] + point[1] * point[1];
    }

    private void Swap(int[][] points, int i, int j) {
        int[] temp = points[i];
        points[i] = points[j];
        points[j] = temp;
    }
}
```

```go
func kClosest(points [][]int, k int) [][]int {
    euclidean := func(x []int) int {
        return x[0]*x[0] + x[1]*x[1]
    }

    partition := func(points [][]int, l, r int) int {
        pivotIdx := r
        pivotDist := euclidean(points[pivotIdx])
        i := l
        for j := l; j < r; j++ {
            if euclidean(points[j]) <= pivotDist {
                points[i], points[j] = points[j], points[i]
                i++
            }
        }
        points[i], points[r] = points[r], points[i]
        return i
    }

    L, R := 0, len(points)-1
    pivot := len(points)

    for pivot != k {
        pivot = partition(points, L, R)
        if pivot < k {
            L = pivot + 1
        } else {
            R = pivot - 1
        }
    }
    return points[:k]
}
```

```kotlin
class Solution {
    fun kClosest(points: Array<IntArray>, k: Int): Array<IntArray> {
        val euclidean = { x: IntArray -> x[0] * x[0] + x[1] * x[1] }

        fun partition(points: Array<IntArray>, l: Int, r: Int): Int {
            val pivotIdx = r
            val pivotDist = euclidean(points[pivotIdx])
            var i = l
            for (j in l until r) {
                if (euclidean(points[j]) <= pivotDist) {
                    points[i] = points[j].also { points[j] = points[i] }
                    i++
                }
            }
            points[i] = points[r].also { points[r] = points[i] }
            return i
        }

        var L = 0
        var R = points.size - 1
        var pivot = points.size

        while (pivot != k) {
            pivot = partition(points, L, R)
            if (pivot < k) {
                L = pivot + 1
            } else {
                R = pivot - 1
            }
        }
        return points.copyOfRange(0, k)
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ in average case, $O(n ^ 2)$ in worst case.
* Space complexity: $O(1)$