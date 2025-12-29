## 1. Brute Force

::tabs-start

```python
class Leaderboard:

    def __init__(self):
        self.scores = defaultdict()

    def addScore(self, playerId: int, score: int) -> None:
        if playerId not in self.scores:
            self.scores[playerId] = 0
        self.scores[playerId] += score

    def top(self, K: int) -> int:
        values = [v for _, v in sorted(self.scores.items(), key=lambda item: item[1])]
        values.sort(reverse=True)
        total, i = 0, 0
        while i < K:
            total += values[i]
            i += 1
        
        return total

    def reset(self, playerId: int) -> None:
        self.scores[playerId] = 0
```

```java
class Leaderboard {

    private HashMap<Integer, Integer> scores;
    
    public Leaderboard() {
      
        // Since this is a single threaded application and we don't need synchronized access, a 
        // HashMap is a good choice of data structure as compared to a Hashtable. Read more here:
        // https://stackoverflow.com/questions/40471/what-are-the-differences-between-a-hashmap-and-a-hashtable-in-java 
        this.scores = new HashMap<Integer, Integer>();
    }
    
    public void addScore(int playerId, int score) {
        
        if (!this.scores.containsKey(playerId)) {
            this.scores.put(playerId, 0);
        }
        
        this.scores.put(playerId, this.scores.get(playerId) + score);
    }
    
    public int top(int K) {
        
        List<Integer> values = new ArrayList<Integer>(this.scores.values());
        Collections.sort(values, Collections.reverseOrder());
        
        int total = 0;
        for (int i = 0; i < K; i++) {
            total += values.get(i);            
        }
        
        return total;
    }
    
    public void reset(int playerId) {
        this.scores.put(playerId, 0);
    }
}
```

```cpp
class Leaderboard {
private:
    unordered_map<int, int> scores;

public:
    Leaderboard() {}

    void addScore(int playerId, int score) {
        scores[playerId] += score;
    }

    int top(int K) {
        vector<int> values;
        values.reserve(scores.size());
        
        for (const auto& pair : scores) {
            values.push_back(pair.second);
        }
        
        sort(values.begin(), values.end(), greater<int>());
        
        int total = 0;
        for (int i = 0; i < K; i++) {
            total += values[i];
        }
        return total;
    }

    void reset(int playerId) {
        scores[playerId] = 0;
    }
};
```

```javascript
class Leaderboard {
    
    constructor() {
        this.scores = new Map();
    }
    
    /** 
     * @param {number} playerId 
     * @param {number} score
     * @return {void}
     */
    addScore(playerId, score) {
        if (!this.scores.has(playerId)) {
            this.scores.set(playerId, 0);
        }
        this.scores.set(playerId, this.scores.get(playerId) + score);
    }
    
    /** 
     * @param {number} K
     * @return {number}
     */
    top(K) {
        const values = Array.from(this.scores.entries())
            .sort((a, b) => a[1] - b[1])
            .map(entry => entry[1]);
        values.sort((a, b) => b - a);
        
        let total = 0;
        let i = 0;
        while (i < K) {
            total += values[i];
            i++;
        }
        return total;
    }
    
    /** 
     * @param {number} playerId
     * @return {void}
     */
    reset(playerId) {
        this.scores.set(playerId, 0);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: 
    - $O(1)$ for `addScore`
    - $O(1)$ for `reset`
    - $O(N \log N)$ for `top`

- Space complexity: $O(N)$

>  Where $N$ is the total number of players in the leaderboard.

---

## 2. Heap for top-K

::tabs-start

```python
class Leaderboard:

    def __init__(self):
        self.scores = {}

    def addScore(self, playerId: int, score: int) -> None:
        if playerId not in self.scores:
            self.scores[playerId] = 0
        self.scores[playerId] += score

    def top(self, K: int) -> int:
    
        # This is a min-heap by default in Python.
        heap = []
        for x in self.scores.values():
            heapq.heappush(heap, x)
            if len(heap) > K:
                heapq.heappop(heap)
        res = 0
        while heap:
            res += heapq.heappop(heap)
        return res

    def reset(self, playerId: int) -> None:
        self.scores[playerId] = 0
```

```java
class Leaderboard {

    private HashMap<Integer, Integer> scores;
    
    public Leaderboard() {
        this.scores = new HashMap<Integer, Integer>();
    }
    
    public void addScore(int playerId, int score) {
        
        if (!this.scores.containsKey(playerId)) {
            this.scores.put(playerId, 0);
        }
        
        this.scores.put(playerId, this.scores.get(playerId) + score);
    }
    
    public int top(int K) {
        
        // A min-heap in java containing entries of a hash map. Note that we have to provide
        // a comparator of our own to make sure we get the ordering right of these objects.
        PriorityQueue<Map.Entry<Integer, Integer>> heap = new PriorityQueue<>((a, b) -> a.getValue() - b.getValue());
        
        for (Map.Entry<Integer, Integer> entry : this.scores.entrySet()) {
            heap.offer(entry);
            if (heap.size() > K) {
                heap.poll();
            }
        }
        
        int total = 0;
        Iterator value = heap.iterator();
        while (value.hasNext()) { 
            total += ((Map.Entry<Integer, Integer>)value.next()).getValue();   
        }
        
        return total;
    }
    
    public void reset(int playerId) {
        this.scores.put(playerId, 0);
    }
}
```

```cpp
class Leaderboard {
private:
    unordered_map<int, int> scores;
    
public:
    Leaderboard() {
        
    }
    
    void addScore(int playerId, int score) {
        if (scores.find(playerId) == scores.end()) {
            scores[playerId] = 0;
        }
        scores[playerId] += score;
    }
    
    int top(int K) {
        // By default, priority_queue is max-heap, so we use greater<int> for min-heap
        priority_queue<int, vector<int>, greater<int>> heap;
        
        for (const auto& entry : scores) {
            heap.push(entry.second);
            if (heap.size() > K) {
                heap.pop();
            }
        }
        
        int total = 0;
        while (!heap.empty()) {
            total += heap.top();
            heap.pop();
        }
        return total;
    }
    
    void reset(int playerId) {
        scores[playerId] = 0;
    }
};
```

```javascript
class Leaderboard {
    constructor() {
        this.scores = {};
    }
    
    /** 
     * @param {number} playerId 
     * @param {number} score
     * @return {void}
     */
    addScore(playerId, score) {
        if (!(playerId in this.scores)) {
            this.scores[playerId] = 0;
        }
        
        this.scores[playerId] += score;
    }
    
    /** 
     * @param {number} K
     * @return {number}
     */
    top(K) {
        const heap = new PriorityQueue((a, b) => a - b); // Using @datastructures-js/priority-queue
        
        for (const score of Object.values(this.scores)) {
            heap.enqueue(score);
            if (heap.size() > K) {
                heap.dequeue();
            }
        }
        
        let res = 0;
        while (heap.size() > 0) {
            res += heap.dequeue();
        }

        return res;
    }
    
    /** 
     * @param {number} playerId
     * @return {void}
     */
    reset(playerId) {
        this.scores[playerId] = 0;
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: 
    - $O(1)$ for `addScore`
    - $O(1)$ for `reset`
    - $O(N \log K)$ for `top`

- Space complexity: $O(N + K)$

>  Where $N$ is the total number of players in the leaderboard, and $K$ is the number of top-scoring players to return.

---

## 3. Using a TreeMap / SortedMap

::tabs-start

```python
from sortedcontainers import SortedDict

class Leaderboard:

    def __init__(self):
        self.scores = {}
        self.sortedScores = SortedDict()

    def addScore(self, playerId: int, score: int) -> None:

        # The scores dictionary simply contains the mapping from the
        # playerId to their score. The sortedScores contain a BST with 
        # key as the score and value as the number of players that have
        # that score.     
        if playerId not in self.scores:
            self.scores[playerId] = score
            self.sortedScores[-score] = self.sortedScores.get(-score, 0) + 1
        else:
            preScore = self.scores[playerId]
            val = self.sortedScores.get(-preScore)
            if val == 1:
                del self.sortedScores[-preScore]
            else:
                self.sortedScores[-preScore] = val - 1    
            
            newScore = preScore + score
            self.scores[playerId] = newScore
            self.sortedScores[-newScore] = self.sortedScores.get(-newScore, 0) + 1
        
    def top(self, K: int) -> int:
        count, total = 0, 0

        for key, value in self.sortedScores.items():
            times = self.sortedScores.get(key)
            for _ in range(times): 
                total += -key
                count += 1
                
                # Found top-K scores, break.
                if count == K:
                    break
                
            # Found top-K scores, break.
            if count == K:
                break
        
        return total

    def reset(self, playerId: int) -> None:
        preScore = self.scores[playerId]
        if self.sortedScores[-preScore] == 1:
            del self.sortedScores[-preScore]
        else:
            self.sortedScores[-preScore] -= 1
        del self.scores[playerId]
```

```java
class Leaderboard {

    Map<Integer, Integer> scores;
    TreeMap<Integer, Integer> sortedScores;
    
    public Leaderboard() {
        this.scores = new HashMap<Integer, Integer>();
        this.sortedScores = new TreeMap<>(Collections.reverseOrder());
    }
    
    public void addScore(int playerId, int score) {
        
        // The scores dictionary simply contains the mapping from the
        // playerId to their score. The sortedScores contain a BST with 
        // key as the score and value as the number of players that have
        // that score.        
        if (!this.scores.containsKey(playerId)) {
            this.scores.put(playerId, score);
            this.sortedScores.put(score, this.sortedScores.getOrDefault(score, 0) + 1);
        } else {
            
            // Since the current player's score is changing, we need to
            // update the sortedScores map to reduce count for the old
            // score.
            int preScore = this.scores.get(playerId);
            int playerCount = this.sortedScores.get(preScore);
            
            
            // If no player has this score, remov it from the tree.
            if (playerCount == 1) {
                this.sortedScores.remove(preScore);
            } else {
                this.sortedScores.put(preScore, playerCount - 1);
            }
            
            // Updated score
            int newScore = preScore + score;
            this.scores.put(playerId, newScore);
            this.sortedScores.put(newScore, this.sortedScores.getOrDefault(newScore, 0) + 1);
        }
    }
    
    public int top(int K) {
        
        int count = 0;
        int sum = 0;
        
        // In-order traversal over the scores in the TreeMap
        for (Map.Entry<Integer, Integer> entry: this.sortedScores.entrySet()) {
            
            // Number of players that have this score.
            int times = entry.getValue();
            int key = entry.getKey();
            
            for (int i = 0; i < times; i++) {
                sum += key;
                count++;
                
                // Found top-K scores, break.
                if (count == K) {
                    break;
                }
            }
            
            // Found top-K scores, break.
            if (count == K) {
                break;
            }
        }
        
        return sum;
    }
    
    public void reset(int playerId) {
        int preScore = this.scores.get(playerId);
        this.sortedScores.put(preScore, this.sortedScores.get(preScore) - 1);
        if (this.sortedScores.get(preScore) == 0) {
            this.sortedScores.remove(preScore);
        }
        
        this.scores.remove(playerId);
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: 
    - $O(\log N)$ for `addScore`

    - $O(\log N)$ for `reset`.  Note that this complexity is in the case when every player always maintains a unique score.

    - $O(K)$ for `top`. Note that if the data structure doesn't provide a natural iterator, then we can simply get a list of all the key-value pairs and they will naturally be sorted due to the nature of this data structure. In that case, the complexity would be $O(N)$ since we would be forming a new list. 

- Space complexity: $O(N)$ used by the `scores` dictionary. Also, if you obtain all the key-value pairs in a new list in the `top` function, then an additional $O(N)$ would be used.


>  Where $N$ is the total number of players in the leaderboard, and $K$ is the number of top-scoring players to return.
