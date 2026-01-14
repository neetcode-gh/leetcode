## 1. Using Sorting

### Intuition

We need to find each student's average of their top `5` scores.
If we sort all items by student ID (ascending) and by score (descending), then for each student, their first `5` entries will be their highest scores.
We can then group by student, sum their top `5` scores, and compute the average.

### Algorithm

1. Sort the items array by student ID in ascending order. For the same ID, sort by score in descending order.
2. Iterate through the sorted array, processing one student at a time.
3. For each student, sum their first `5` scores (which are the highest due to sorting).
4. Skip any remaining scores for that student.
5. Store the student ID and their average (sum divided by `5`) in the result.
6. Return the result array.

::tabs-start

```python
class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        K = 5
        items.sort(key=lambda x: (x[0], -x[1]))

        solution = []
        n = len(items)
        i = 0
        while i < n:
            id = items[i][0]
            sum_val = 0
            for k in range(i, i + K):
                sum_val += items[k][1]
            while i < n and items[i][0] == id:
                i += 1
            solution.append([id, sum_val // K])

        return solution
```

```java
class Solution {

    private int K;

    public int[][] highFive(int[][] items) {
        this.K = 5;

        Arrays.sort(
                items,
                new Comparator<int[]>() {
                    @Override
                    public int compare(int[] a, int[] b) {
                        if (a[0] != b[0])
                            // item with lower id goes first
                            return a[0] - b[0];
                        // in case of tie for ids, item with higher score goes first
                        return b[1] - a[1];
                    }
                });

        List<int[]> solution = new ArrayList<>();
        int n = items.length;
        int i = 0;
        while (i < n) {
            int id = items[i][0];
            int sum = 0;
            // obtain total using the top 5 scores
            for (int k = i; k < i + this.K; ++k)
                sum += items[k][1];
            // ignore all the other scores for the same id
            while (i < n && items[i][0] == id)
                i++;
            solution.add(new int[] {id, sum / this.K});
        }

        int[][] solutionArray = new int[solution.size()][];
        return solution.toArray(solutionArray);
    }
}
```

```cpp
class Solution {
private:
    int K;

public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
        this->K = 5;
        // sort items using the custom comparator
        sort(items.begin(), items.end(),
            [](const vector<int> &a, const vector<int> &b) {
                if (a[0] != b[0])
                // item with lower id goes first
                return a[0] < b[0];
                // in case of tie for ids, item with higher score goes first
                return a[1] > b[1];
            });
        vector<vector<int>> solution;
        int n = items.size();
        int i = 0;
        while (i < n) {
            int id = items[i][0];
            int sum = 0;
            // obtain total using the top 5 scores
            for (int k = i; k < i + this->K; ++k)
                sum += items[k][1];
            // ignore all the other scores for the same id
            while (i < n && items[i][0] == id)
                i++;
            solution.push_back({id, sum / this->K});
        }
        return solution;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} items
     * @return {number[][]}
     */
    highFive(items) {
        const K = 5;
        items.sort((a, b) => {
            if (a[0] !== b[0]) return a[0] - b[0];
            return b[1] - a[1];
        });

        const solution = [];
        const n = items.length;
        let i = 0;
        while (i < n) {
            const id = items[i][0];
            let sum = 0;
            for (let k = i; k < i + K; k++) {
                sum += items[k][1];
            }
            while (i < n && items[i][0] === id) {
                i++;
            }
            solution.push([id, Math.floor(sum / K)]);
        }

        return solution;
    }
}
```

```go
func highFive(items [][]int) [][]int {
    K := 5
    sort.Slice(items, func(i, j int) bool {
        if items[i][0] != items[j][0] {
            return items[i][0] < items[j][0]
        }
        return items[i][1] > items[j][1]
    })

    solution := [][]int{}
    n := len(items)
    i := 0
    for i < n {
        id := items[i][0]
        sum := 0
        for k := i; k < i+K; k++ {
            sum += items[k][1]
        }
        for i < n && items[i][0] == id {
            i++
        }
        solution = append(solution, []int{id, sum / K})
    }

    return solution
}
```

```kotlin
class Solution {
    fun highFive(items: Array<IntArray>): Array<IntArray> {
        val K = 5
        items.sortWith(compareBy({ it[0] }, { -it[1] }))

        val solution = mutableListOf<IntArray>()
        val n = items.size
        var i = 0
        while (i < n) {
            val id = items[i][0]
            var sum = 0
            for (k in i until i + K) {
                sum += items[k][1]
            }
            while (i < n && items[i][0] == id) {
                i++
            }
            solution.add(intArrayOf(id, sum / K))
        }

        return solution.toTypedArray()
    }
}
```

```swift
class Solution {
    func highFive(_ items: [[Int]]) -> [[Int]] {
        let K = 5
        var sortedItems = items.sorted {
            if $0[0] != $1[0] { return $0[0] < $1[0] }
            return $0[1] > $1[1]
        }

        var solution = [[Int]]()
        let n = sortedItems.count
        var i = 0
        while i < n {
            let id = sortedItems[i][0]
            var sum = 0
            for k in i..<(i + K) {
                sum += sortedItems[k][1]
            }
            while i < n && sortedItems[i][0] == id {
                i += 1
            }
            solution.append([id, sum / K])
        }

        return solution
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.

---

## 2. Using Map and Max Heap

### Intuition

Instead of sorting all items, we can use a map to group scores by student ID and a max heap for each student.
The max heap naturally keeps the largest scores at the top, so extracting the top `5` is straightforward.
Using a TreeMap (or sorted map) ensures students are processed in ID order.

### Algorithm

1. Create a map where each key is a student ID and each value is a max heap of scores.
2. Iterate through all items and push each score into the corresponding student's max heap.
3. Iterate through the map in sorted order of student IDs.
4. For each student, pop the top `5` scores from the max heap and compute their sum.
5. Store the student ID and the average in the result.
6. Return the result array.

::tabs-start

```python
class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        K = 5
        all_scores = defaultdict(list)

        for item in items:
            student_id = item[0]
            score = item[1]
            heapq.heappush(all_scores[student_id], -score)

        solution = []
        for student_id in sorted(all_scores.keys()):
            total = 0
            for i in range(K):
                total += -heapq.heappop(all_scores[student_id])
            solution.append([student_id, total // K])

        return solution
```

```java
class Solution {
    private int K;

    public int[][] highFive(int[][] items) {
        this.K = 5;
        TreeMap<Integer, Queue<Integer>> allScores = new TreeMap<>();
        for (int[] item : items) {
            int id = item[0];
            int score = item[1];
            if (!allScores.containsKey(id))
                // max heap
                allScores.put(id, new PriorityQueue<>((a,b) -> b - a));
            // Add score to the max heap
            allScores.get(id).add(score);
        }

        List<int[]> solution = new ArrayList<>();

        for (int id : allScores.keySet()) {
            int sum = 0;
            // obtain the top k scores (k = 5)
            for (int i = 0; i < this.K; ++i)
                sum += allScores.get(id).poll();
            solution.add(new int[] {id, sum / this.K});
        }
        int[][] solutionArray = new int[solution.size()][];
        return solution.toArray(solutionArray);
    }
}
```

```cpp
class Solution {
private:
    int K;

public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
        this->K = 5;
        map<int, priority_queue<int>> allScores;
        for (const auto &item: items) {
            int id = item[0];
            int score = item[1];
            // Add score to the max heap
            allScores[id].push(score);
        }
        vector<vector<int>> solution;
        for (auto &[id, scores] : allScores) {
            int sum = 0;
            // obtain the top k scores (k = 5)
            for (int i = 0; i < this->K; ++i) {
                sum += scores.top();
                scores.pop();
            }
            solution.push_back({id, sum / this->K});
        }
        return solution;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} items
     * @return {number[][]}
     */
    highFive(items) {
        const K = 5;
        const allScores = new Map();

        for (const item of items) {
            const id = item[0];
            const score = item[1];

            if (!allScores.has(id)) {
                allScores.set(id, new MaxPriorityQueue());
            }
            allScores.get(id).enqueue(score);
        }

        const solution = [];
        const sortedIds = Array.from(allScores.keys()).sort((a, b) => a - b);

        for (const id of sortedIds) {
            let sum = 0;
            const heap = allScores.get(id);

            for (let i = 0; i < K; i++) {
                sum += heap.dequeue().element;
            }

            solution.push([id, Math.floor(sum / K)]);
        }

        return solution;
    }
}
```

```go
import (
    "container/heap"
    "sort"
)

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

func highFive(items [][]int) [][]int {
    K := 5
    allScores := make(map[int]*MaxHeap)

    for _, item := range items {
        id, score := item[0], item[1]
        if allScores[id] == nil {
            allScores[id] = &MaxHeap{}
            heap.Init(allScores[id])
        }
        heap.Push(allScores[id], score)
    }

    ids := make([]int, 0, len(allScores))
    for id := range allScores {
        ids = append(ids, id)
    }
    sort.Ints(ids)

    solution := [][]int{}
    for _, id := range ids {
        sum := 0
        for i := 0; i < K; i++ {
            sum += heap.Pop(allScores[id]).(int)
        }
        solution = append(solution, []int{id, sum / K})
    }

    return solution
}
```

```kotlin
import java.util.PriorityQueue
import java.util.TreeMap

class Solution {
    fun highFive(items: Array<IntArray>): Array<IntArray> {
        val K = 5
        val allScores = TreeMap<Int, PriorityQueue<Int>>()

        for (item in items) {
            val id = item[0]
            val score = item[1]
            if (!allScores.containsKey(id)) {
                allScores[id] = PriorityQueue(compareByDescending { it })
            }
            allScores[id]!!.add(score)
        }

        val solution = mutableListOf<IntArray>()
        for (id in allScores.keys) {
            var sum = 0
            for (i in 0 until K) {
                sum += allScores[id]!!.poll()
            }
            solution.add(intArrayOf(id, sum / K))
        }

        return solution.toTypedArray()
    }
}
```

```swift
class Solution {
    func highFive(_ items: [[Int]]) -> [[Int]] {
        let K = 5
        var allScores = [Int: [Int]]()

        for item in items {
            let id = item[0]
            let score = item[1]
            if allScores[id] == nil {
                allScores[id] = []
            }
            allScores[id]!.append(score)
        }

        var solution = [[Int]]()
        for id in allScores.keys.sorted() {
            let scores = allScores[id]!.sorted(by: >)
            var sum = 0
            for i in 0..<K {
                sum += scores[i]
            }
            solution.append([id, sum / K])
        }

        return solution
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.

---

## 3. Using Map and Min Heap

### Intuition

A min heap of size `5` is more space efficient than storing all scores.
As we process each score, we add it to the heap. If the heap size exceeds `5`, we remove the smallest score.
This ensures the heap always contains the top `5` scores for each student.
At the end, we simply sum all elements in the heap to get the total of the top `5` scores.

### Algorithm

1. Create a map where each key is a student ID and each value is a min heap.
2. For each item, push the score into the corresponding student's min heap.
3. If the heap size exceeds `5`, pop the minimum element to maintain only the top `5` scores.
4. Iterate through the map in sorted order of student IDs.
5. For each student, sum all scores in the min heap and compute the average.
6. Return the result array.

::tabs-start

```python
class Solution:
    def highFive(self, items: List[List[int]]) -> List[List[int]]:
        K = 5
        all_scores = defaultdict(list)  # Using defaultdict with list for min heap

        for item in items:
            student_id = item[0]
            score = item[1]

            heapq.heappush(all_scores[student_id], score)

            if len(all_scores[student_id]) > K:
                heapq.heappop(all_scores[student_id])

        solution = []
        for student_id in sorted(all_scores.keys()):
            total = sum(all_scores[student_id])
            solution.append([student_id, total // K])

        return solution
```

```java
class Solution {
    private int K;

    public int[][] highFive(int[][] items) {
        this.K = 5;
        TreeMap<Integer, Queue<Integer>> allScores = new TreeMap<>();
        for (int[] item : items) {
            int id = item[0];
            int score = item[1];
            if (!allScores.containsKey(id))
                allScores.put(id, new PriorityQueue<>());
            // insert the score in the min heap
            allScores.get(id).add(score);
            // remove the minimum element from the min heap in case the size of the min heap exceeds 5
            if (allScores.get(id).size() > this.K)
                allScores.get(id).poll();
        }

        List<int[]> solution = new ArrayList<>();

        for (int id : allScores.keySet()) {
            int sum = 0;
            // min heap contains the top 5 scores
            for (int i = 0; i < this.K; ++i)
                sum += allScores.get(id).poll();
            solution.add(new int[] {id, sum / this.K});
        }

        int[][] solutionArray = new int[solution.size()][];
        return solution.toArray(solutionArray);
    }
}
```

```cpp
class Solution {
private:
    int K;

public:
    vector<vector<int>> highFive(vector<vector<int>>& items) {
        this->K = 5;
        map<int, priority_queue<int, vector<int>, greater<int>>> allScores;
        for (const auto &item: items) {
            int id = item[0];
            int score = item[1];
            // insert the score in the min heap
            allScores[id].push(score);
            // remove the minimum element from the min heap in case the size of the min heap exceeds 5
            if (allScores[id].size() > this->K)
                allScores[id].pop();
        }
        vector<vector<int>> solution;
        for (auto &[id, top_scores]: allScores) {
            int total = 0;
            // min heap contains the top 5 scores
            for (int i = 0; i < this->K; ++i) {
                total += top_scores.top();
                top_scores.pop();
            }
            solution.push_back({id, total / this->K});
        }
        return solution;
    }
};
```

```javascript
class Solution {
    /**
     * @param {number[][]} items
     * @return {number[][]}
     */
    highFive(items) {
        const K = 5;
        const allScores = new Map();

        for (const item of items) {
            const id = item[0];
            const score = item[1];

            if (!allScores.has(id)) {
                allScores.set(id, new MinPriorityQueue()); // Using { MinPriorityQueue } from '@datastructures-js/priority-queue';
            }

            allScores.get(id).enqueue(score);

            if (allScores.get(id).size() > K) {
                allScores.get(id).dequeue();
            }
        }

        const solution = [];
        const sortedIds = Array.from(allScores.keys()).sort((a, b) => a - b);

        for (const id of sortedIds) {
            let sum = 0;
            const heap = allScores.get(id);

            for (let i = 0; i < K; i++) {
                sum += heap.dequeue().element;
            }

            solution.push([id, Math.floor(sum / K)]);
        }

        return solution;
    }
}
```

```go
import (
    "container/heap"
    "sort"
)

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

func highFive(items [][]int) [][]int {
    K := 5
    allScores := make(map[int]*MinHeap)

    for _, item := range items {
        id, score := item[0], item[1]
        if allScores[id] == nil {
            allScores[id] = &MinHeap{}
            heap.Init(allScores[id])
        }
        heap.Push(allScores[id], score)
        if allScores[id].Len() > K {
            heap.Pop(allScores[id])
        }
    }

    ids := make([]int, 0, len(allScores))
    for id := range allScores {
        ids = append(ids, id)
    }
    sort.Ints(ids)

    solution := [][]int{}
    for _, id := range ids {
        sum := 0
        for allScores[id].Len() > 0 {
            sum += heap.Pop(allScores[id]).(int)
        }
        solution = append(solution, []int{id, sum / K})
    }

    return solution
}
```

```kotlin
import java.util.PriorityQueue
import java.util.TreeMap

class Solution {
    fun highFive(items: Array<IntArray>): Array<IntArray> {
        val K = 5
        val allScores = TreeMap<Int, PriorityQueue<Int>>()

        for (item in items) {
            val id = item[0]
            val score = item[1]
            if (!allScores.containsKey(id)) {
                allScores[id] = PriorityQueue()
            }
            allScores[id]!!.add(score)
            if (allScores[id]!!.size > K) {
                allScores[id]!!.poll()
            }
        }

        val solution = mutableListOf<IntArray>()
        for (id in allScores.keys) {
            var sum = 0
            for (i in 0 until K) {
                sum += allScores[id]!!.poll()
            }
            solution.add(intArrayOf(id, sum / K))
        }

        return solution.toTypedArray()
    }
}
```

```swift
class Solution {
    func highFive(_ items: [[Int]]) -> [[Int]] {
        let K = 5
        var allScores = [Int: [Int]]()

        for item in items {
            let id = item[0]
            let score = item[1]
            if allScores[id] == nil {
                allScores[id] = []
            }
            allScores[id]!.append(score)
            allScores[id]!.sort()
            if allScores[id]!.count > K {
                allScores[id]!.removeFirst()
            }
        }

        var solution = [[Int]]()
        for id in allScores.keys.sorted() {
            let total = allScores[id]!.reduce(0, +)
            solution.append([id, total / K])
        }

        return solution
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.

---

## Common Pitfalls

### Assuming Each Student Has Exactly 5 Scores

The problem guarantees each student has at least 5 scores, but they may have more. A common mistake is iterating through exactly 5 scores per student without properly handling the remaining scores. When using the sorting approach, make sure to skip all remaining scores for a student after summing their top 5. When using heaps, ensure you only extract exactly 5 elements regardless of the heap size.

### Using the Wrong Heap Type

When implementing the min heap solution, some developers confuse min and max heaps. The min heap approach works by maintaining only the top 5 scores: when a new score arrives and the heap size exceeds 5, you remove the minimum. If you accidentally use a max heap, you would remove the largest scores instead, keeping the smallest ones. Similarly, when using a max heap to get top scores, ensure you are extracting (not just peeking) the maximum values.
