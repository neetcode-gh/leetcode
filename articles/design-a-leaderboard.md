## 1. Brute Force

### Intuition

The simplest approach stores player scores in a hash map. Adding a score or resetting is straightforward with hash map operations. To find the sum of the top K scores, we extract all scores, sort them in descending order, and sum the first K values. While easy to implement, sorting all scores for every `top` query is inefficient when there are many players.

### Algorithm

1. Use a hash map `scores` to store the mapping from `playerId` to their score.
2. For `addScore(playerId, score)`: if the player exists, add to their score; otherwise, initialize and add.
3. For `top(K)`: extract all score values, sort them in descending order, and return the sum of the first K scores.
4. For `reset(playerId)`: set the player's score to 0 in the hash map.

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

```csharp
public class Leaderboard {
    private Dictionary<int, int> scores;

    public Leaderboard() {
        scores = new Dictionary<int, int>();
    }

    public void AddScore(int playerId, int score) {
        if (!scores.ContainsKey(playerId)) {
            scores[playerId] = 0;
        }
        scores[playerId] += score;
    }

    public int Top(int K) {
        var values = scores.Values.ToList();
        values.Sort((a, b) => b.CompareTo(a));

        int total = 0;
        for (int i = 0; i < K; i++) {
            total += values[i];
        }
        return total;
    }

    public void Reset(int playerId) {
        scores[playerId] = 0;
    }
}
```

```go
type Leaderboard struct {
    scores map[int]int
}

func Constructor() Leaderboard {
    return Leaderboard{scores: make(map[int]int)}
}

func (this *Leaderboard) AddScore(playerId int, score int) {
    this.scores[playerId] += score
}

func (this *Leaderboard) Top(K int) int {
    values := make([]int, 0, len(this.scores))
    for _, v := range this.scores {
        values = append(values, v)
    }
    sort.Sort(sort.Reverse(sort.IntSlice(values)))

    total := 0
    for i := 0; i < K; i++ {
        total += values[i]
    }
    return total
}

func (this *Leaderboard) Reset(playerId int) {
    this.scores[playerId] = 0
}
```

```kotlin
class Leaderboard() {
    private val scores = mutableMapOf<Int, Int>()

    fun addScore(playerId: Int, score: Int) {
        scores[playerId] = scores.getOrDefault(playerId, 0) + score
    }

    fun top(K: Int): Int {
        val values = scores.values.sortedDescending()
        var total = 0
        for (i in 0 until K) {
            total += values[i]
        }
        return total
    }

    fun reset(playerId: Int) {
        scores[playerId] = 0
    }
}
```

```swift
class Leaderboard {
    private var scores: [Int: Int]

    init() {
        scores = [:]
    }

    func addScore(_ playerId: Int, _ score: Int) {
        scores[playerId, default: 0] += score
    }

    func top(_ K: Int) -> Int {
        let values = scores.values.sorted(by: >)
        var total = 0
        for i in 0..<K {
            total += values[i]
        }
        return total
    }

    func reset(_ playerId: Int) {
        scores[playerId] = 0
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

### Intuition

Instead of sorting all N scores, we can use a min-heap of size K to find the top K scores more efficiently. As we iterate through all scores, we maintain a heap containing the K largest scores seen so far. When the heap exceeds size K, we remove the smallest element. After processing all scores, the heap contains exactly the top K scores, and we sum them up.

### Algorithm

1. Use a hash map `scores` to store the mapping from `playerId` to their score.
2. For `addScore(playerId, score)`: if the player exists, add to their score; otherwise, initialize and add.
3. For `top(K)`:
   - Create a min-heap.
   - For each score value, push it onto the heap. If the heap size exceeds K, pop the minimum.
   - After processing all scores, sum up all elements remaining in the heap.
4. For `reset(playerId)`: set the player's score to 0 in the hash map.

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

```csharp
public class Leaderboard {
    private Dictionary<int, int> scores;

    public Leaderboard() {
        scores = new Dictionary<int, int>();
    }

    public void AddScore(int playerId, int score) {
        if (!scores.ContainsKey(playerId)) {
            scores[playerId] = 0;
        }
        scores[playerId] += score;
    }

    public int Top(int K) {
        var heap = new PriorityQueue<int, int>();

        foreach (var score in scores.Values) {
            heap.Enqueue(score, score);
            if (heap.Count > K) {
                heap.Dequeue();
            }
        }

        int total = 0;
        while (heap.Count > 0) {
            total += heap.Dequeue();
        }
        return total;
    }

    public void Reset(int playerId) {
        scores[playerId] = 0;
    }
}
```

```go
import "container/heap"

type MinHeap []int

func (h MinHeap) Len() int           { return len(h) }
func (h MinHeap) Less(i, j int) bool { return h[i] < h[j] }
func (h MinHeap) Swap(i, j int)      { h[i], h[j] = h[j], h[i] }
func (h *MinHeap) Push(x interface{}) { *h = append(*h, x.(int)) }
func (h *MinHeap) Pop() interface{} {
    old := *h
    n := len(old)
    x := old[n-1]
    *h = old[0 : n-1]
    return x
}

type Leaderboard struct {
    scores map[int]int
}

func Constructor() Leaderboard {
    return Leaderboard{scores: make(map[int]int)}
}

func (this *Leaderboard) AddScore(playerId int, score int) {
    this.scores[playerId] += score
}

func (this *Leaderboard) Top(K int) int {
    h := &MinHeap{}
    heap.Init(h)

    for _, score := range this.scores {
        heap.Push(h, score)
        if h.Len() > K {
            heap.Pop(h)
        }
    }

    total := 0
    for h.Len() > 0 {
        total += heap.Pop(h).(int)
    }
    return total
}

func (this *Leaderboard) Reset(playerId int) {
    this.scores[playerId] = 0
}
```

```kotlin
import java.util.PriorityQueue

class Leaderboard() {
    private val scores = mutableMapOf<Int, Int>()

    fun addScore(playerId: Int, score: Int) {
        scores[playerId] = scores.getOrDefault(playerId, 0) + score
    }

    fun top(K: Int): Int {
        val heap = PriorityQueue<Int>()

        for (score in scores.values) {
            heap.offer(score)
            if (heap.size > K) {
                heap.poll()
            }
        }

        var total = 0
        while (heap.isNotEmpty()) {
            total += heap.poll()
        }
        return total
    }

    fun reset(playerId: Int) {
        scores[playerId] = 0
    }
}
```

```swift
class Leaderboard {
    private var scores: [Int: Int]

    init() {
        scores = [:]
    }

    func addScore(_ playerId: Int, _ score: Int) {
        scores[playerId, default: 0] += score
    }

    func top(_ K: Int) -> Int {
        var heap = [Int]()

        for score in scores.values {
            heap.append(score)
            heap.sort()
            if heap.count > K {
                heap.removeFirst()
            }
        }

        return heap.reduce(0, +)
    }

    func reset(_ playerId: Int) {
        scores[playerId] = 0
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

>  Where $N$ is the total number of players in the leaderboard, and $K$ is the number of top-scoring players.

---

## 3. Using a TreeMap / SortedMap

### Intuition

A TreeMap (or sorted dictionary) keeps scores in sorted order, allowing us to iterate from highest to lowest efficiently. The key insight is to track how many players share each score rather than storing individual player entries. When a score changes, we decrement the count for the old score and increment for the new one. For `top(K)`, we iterate through scores in descending order, accumulating until we reach K players.

### Algorithm

1. Use two structures:
   - `scores`: a hash map from `playerId` to their score.
   - `sortedScores`: a TreeMap from score to the count of players with that score, sorted in descending order.
2. For `addScore(playerId, score)`:
   - If the player is new, add their score to both maps.
   - If the player exists, decrement the count for their old score in `sortedScores` (removing the entry if count becomes 0), update `scores`, and increment the count for the new score.
3. For `top(K)`:
   - Iterate through `sortedScores` in descending order.
   - For each score, add it to the sum as many times as there are players with that score, until K players have been counted.
4. For `reset(playerId)`: decrement the count for the player's score in `sortedScores` (removing if 0), and remove the player from `scores`.

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

```cpp
class Leaderboard {
public:
    unordered_map<int, int> scores;
    map<int, int, greater<int>> sortedScores;

    Leaderboard() {}

    void addScore(int playerId, int score) {
        if (scores.find(playerId) == scores.end()) {
            scores[playerId] = score;
            sortedScores[score]++;
        } else {
            int preScore = scores[playerId];
            sortedScores[preScore]--;
            if (sortedScores[preScore] == 0) {
                sortedScores.erase(preScore);
            }

            int newScore = preScore + score;
            scores[playerId] = newScore;
            sortedScores[newScore]++;
        }
    }

    int top(int K) {
        int count = 0, sum = 0;

        for (auto& [key, times] : sortedScores) {
            for (int i = 0; i < times; i++) {
                sum += key;
                count++;
                if (count == K) break;
            }
            if (count == K) break;
        }

        return sum;
    }

    void reset(int playerId) {
        int preScore = scores[playerId];
        sortedScores[preScore]--;
        if (sortedScores[preScore] == 0) {
            sortedScores.erase(preScore);
        }
        scores.erase(playerId);
    }
};
```

```javascript
class Leaderboard {
    constructor() {
        this.scores = new Map();
        this.sortedScores = new Map();
    }

    /**
     * @param {number} playerId
     * @param {number} score
     * @return {void}
     */
    addScore(playerId, score) {
        if (!this.scores.has(playerId)) {
            this.scores.set(playerId, score);
            this.sortedScores.set(score, (this.sortedScores.get(score) || 0) + 1);
        } else {
            const preScore = this.scores.get(playerId);
            const playerCount = this.sortedScores.get(preScore);

            if (playerCount === 1) {
                this.sortedScores.delete(preScore);
            } else {
                this.sortedScores.set(preScore, playerCount - 1);
            }

            const newScore = preScore + score;
            this.scores.set(playerId, newScore);
            this.sortedScores.set(newScore, (this.sortedScores.get(newScore) || 0) + 1);
        }
    }

    /**
     * @param {number} K
     * @return {number}
     */
    top(K) {
        const sortedKeys = [...this.sortedScores.keys()].sort((a, b) => b - a);
        let count = 0, sum = 0;

        for (const key of sortedKeys) {
            const times = this.sortedScores.get(key);
            for (let i = 0; i < times; i++) {
                sum += key;
                count++;
                if (count === K) break;
            }
            if (count === K) break;
        }

        return sum;
    }

    /**
     * @param {number} playerId
     * @return {void}
     */
    reset(playerId) {
        const preScore = this.scores.get(playerId);
        const playerCount = this.sortedScores.get(preScore);

        if (playerCount === 1) {
            this.sortedScores.delete(preScore);
        } else {
            this.sortedScores.set(preScore, playerCount - 1);
        }

        this.scores.delete(playerId);
    }
}
```

```csharp
public class Leaderboard {
    private Dictionary<int, int> scores;
    private SortedDictionary<int, int> sortedScores;

    public Leaderboard() {
        scores = new Dictionary<int, int>();
        sortedScores = new SortedDictionary<int, int>(Comparer<int>.Create((a, b) => b.CompareTo(a)));
    }

    public void AddScore(int playerId, int score) {
        if (!scores.ContainsKey(playerId)) {
            scores[playerId] = score;
            sortedScores[score] = sortedScores.GetValueOrDefault(score, 0) + 1;
        } else {
            int preScore = scores[playerId];
            int playerCount = sortedScores[preScore];

            if (playerCount == 1) {
                sortedScores.Remove(preScore);
            } else {
                sortedScores[preScore] = playerCount - 1;
            }

            int newScore = preScore + score;
            scores[playerId] = newScore;
            sortedScores[newScore] = sortedScores.GetValueOrDefault(newScore, 0) + 1;
        }
    }

    public int Top(int K) {
        int count = 0, sum = 0;

        foreach (var entry in sortedScores) {
            int key = entry.Key;
            int times = entry.Value;

            for (int i = 0; i < times; i++) {
                sum += key;
                count++;
                if (count == K) break;
            }
            if (count == K) break;
        }

        return sum;
    }

    public void Reset(int playerId) {
        int preScore = scores[playerId];
        sortedScores[preScore]--;
        if (sortedScores[preScore] == 0) {
            sortedScores.Remove(preScore);
        }
        scores.Remove(playerId);
    }
}
```

```go
type Leaderboard struct {
    scores       map[int]int
    sortedScores *redblacktree.Tree
}

func Constructor() Leaderboard {
    return Leaderboard{
        scores:       make(map[int]int),
        sortedScores: redblacktree.NewWith(func(a, b interface{}) int {
            return b.(int) - a.(int)
        }),
    }
}

func (this *Leaderboard) AddScore(playerId int, score int) {
    if _, exists := this.scores[playerId]; !exists {
        this.scores[playerId] = score
        count := 0
        if val, found := this.sortedScores.Get(score); found {
            count = val.(int)
        }
        this.sortedScores.Put(score, count+1)
    } else {
        preScore := this.scores[playerId]
        playerCount := this.sortedScores.Values()[this.findIndex(preScore)].(int)

        if playerCount == 1 {
            this.sortedScores.Remove(preScore)
        } else {
            this.sortedScores.Put(preScore, playerCount-1)
        }

        newScore := preScore + score
        this.scores[playerId] = newScore
        count := 0
        if val, found := this.sortedScores.Get(newScore); found {
            count = val.(int)
        }
        this.sortedScores.Put(newScore, count+1)
    }
}

func (this *Leaderboard) findIndex(score int) int {
    for i, k := range this.sortedScores.Keys() {
        if k.(int) == score {
            return i
        }
    }
    return -1
}

func (this *Leaderboard) Top(K int) int {
    count, sum := 0, 0
    it := this.sortedScores.Iterator()

    for it.Next() {
        key := it.Key().(int)
        times := it.Value().(int)

        for i := 0; i < times; i++ {
            sum += key
            count++
            if count == K {
                return sum
            }
        }
    }

    return sum
}

func (this *Leaderboard) Reset(playerId int) {
    preScore := this.scores[playerId]
    if val, found := this.sortedScores.Get(preScore); found {
        playerCount := val.(int)
        if playerCount == 1 {
            this.sortedScores.Remove(preScore)
        } else {
            this.sortedScores.Put(preScore, playerCount-1)
        }
    }
    delete(this.scores, playerId)
}
```

```kotlin
import java.util.*

class Leaderboard() {
    private val scores = HashMap<Int, Int>()
    private val sortedScores = TreeMap<Int, Int>(Collections.reverseOrder())

    fun addScore(playerId: Int, score: Int) {
        if (playerId !in scores) {
            scores[playerId] = score
            sortedScores[score] = sortedScores.getOrDefault(score, 0) + 1
        } else {
            val preScore = scores[playerId]!!
            val playerCount = sortedScores[preScore]!!

            if (playerCount == 1) {
                sortedScores.remove(preScore)
            } else {
                sortedScores[preScore] = playerCount - 1
            }

            val newScore = preScore + score
            scores[playerId] = newScore
            sortedScores[newScore] = sortedScores.getOrDefault(newScore, 0) + 1
        }
    }

    fun top(K: Int): Int {
        var count = 0
        var sum = 0

        for ((key, times) in sortedScores) {
            for (i in 0 until times) {
                sum += key
                count++
                if (count == K) return sum
            }
        }

        return sum
    }

    fun reset(playerId: Int) {
        val preScore = scores[playerId]!!
        sortedScores[preScore] = sortedScores[preScore]!! - 1
        if (sortedScores[preScore] == 0) {
            sortedScores.remove(preScore)
        }
        scores.remove(playerId)
    }
}
```

```swift
class Leaderboard {
    private var scores: [Int: Int]
    private var sortedScores: [Int: Int]

    init() {
        scores = [:]
        sortedScores = [:]
    }

    func addScore(_ playerId: Int, _ score: Int) {
        if scores[playerId] == nil {
            scores[playerId] = score
            sortedScores[score, default: 0] += 1
        } else {
            let preScore = scores[playerId]!
            let playerCount = sortedScores[preScore]!

            if playerCount == 1 {
                sortedScores.removeValue(forKey: preScore)
            } else {
                sortedScores[preScore] = playerCount - 1
            }

            let newScore = preScore + score
            scores[playerId] = newScore
            sortedScores[newScore, default: 0] += 1
        }
    }

    func top(_ K: Int) -> Int {
        let sortedKeys = sortedScores.keys.sorted(by: >)
        var count = 0
        var sum = 0

        for key in sortedKeys {
            let times = sortedScores[key]!
            for _ in 0..<times {
                sum += key
                count += 1
                if count == K { return sum }
            }
        }

        return sum
    }

    func reset(_ playerId: Int) {
        let preScore = scores[playerId]!
        sortedScores[preScore]! -= 1
        if sortedScores[preScore] == 0 {
            sortedScores.removeValue(forKey: preScore)
        }
        scores.removeValue(forKey: playerId)
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


>  Where $N$ is the total number of players in the leaderboard, and $K$ is the number of top-scoring players.
