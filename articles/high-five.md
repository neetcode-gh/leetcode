## 1. Using Sorting

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.

---

## 2. Using Map and Max Heap

::tabs-start

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.

---

## 3. Using Map and Min Heap

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

::tabs-end

### Time & Space Complexity

- Time complexity: $O(N \log N)$
- Space complexity: $O(N)$

>  Where $N$ is the total number of items.
