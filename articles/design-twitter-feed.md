## 1. Sorting

::tabs-start

```python
class Twitter:

    def __init__(self):
        self.time = 0
        self.followMap = defaultdict(set)
        self.tweetMap = defaultdict(list)

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweetMap[userId].append((self.time, tweetId))
        self.time += 1

    def getNewsFeed(self, userId: int) -> List[int]:
        feed = self.tweetMap[userId][:]
        for followeeId in self.followMap[userId]:
            feed.extend(self.tweetMap[followeeId])

        feed.sort(key=lambda x: -x[0])
        return [tweetId for _, tweetId in feed[:10]]

    def follow(self, followerId: int, followeeId: int) -> None:
        if followerId != followeeId:
            self.followMap[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        self.followMap[followerId].discard(followeeId)
```

```java
public class Twitter {
    private int time;
    private Map<Integer, Set<Integer>> followMap;
    private Map<Integer, List<int[]>> tweetMap;

    public Twitter() {
        time = 0;
        followMap = new HashMap<>();
        tweetMap = new HashMap<>();
    }

    public void postTweet(int userId, int tweetId) {
        tweetMap.putIfAbsent(userId, new ArrayList<>());
        tweetMap.get(userId).add(new int[]{time++, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        List<int[]> feed = new ArrayList<>(tweetMap.getOrDefault(userId, new ArrayList<>()));
        for (int followeeId : followMap.getOrDefault(userId, new HashSet<>())) {
            feed.addAll(tweetMap.getOrDefault(followeeId, new ArrayList<>()));
        }
        feed.sort((a, b) -> b[0] - a[0]);
        List<Integer> res = new ArrayList<>();
        for (int i = 0; i < Math.min(10, feed.size()); i++) {
            res.add(feed.get(i)[1]);
        }
        return res;
    }

    public void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followMap.putIfAbsent(followerId, new HashSet<>());
            followMap.get(followerId).add(followeeId);
        }
    }

    public void unfollow(int followerId, int followeeId) {
        followMap.getOrDefault(followerId, new HashSet<>()).remove(followeeId);
    }
}
```

```cpp
class Twitter {
    int time;
    unordered_map<int, unordered_set<int>> followMap;
    unordered_map<int, vector<pair<int, int>>> tweetMap;
public:
    Twitter() : time(0) {}

    void postTweet(int userId, int tweetId) {
        tweetMap[userId].push_back({time++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        vector<pair<int, int>> feed = tweetMap[userId];
        for (int followeeId : followMap[userId]) {
            feed.insert(feed.end(), tweetMap[followeeId].begin(),
                                    tweetMap[followeeId].end());
        }
        sort(feed.begin(), feed.end(), [](auto &a, auto &b) {
            return a.first > b.first;
        });
        vector<int> res;
        for (int i = 0; i < min(10, (int)feed.size()); ++i) {
            res.push_back(feed[i].second);
        }
        return res;
    }

    void follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            followMap[followerId].insert(followeeId);
        }
    }

    void unfollow(int followerId, int followeeId) {
        followMap[followerId].erase(followeeId);
    }
};
```

```javascript
class Twitter {
    constructor() {
        this.time = 0;
        this.followMap = new Map();
        this.tweetMap = new Map();
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) this.tweetMap.set(userId, []);
        this.tweetMap.get(userId).push([this.time++, tweetId]);
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        let feed = [...(this.tweetMap.get(userId) || [])];
        (this.followMap.get(userId) || new Set()).forEach((followeeId) => {
            feed.push(...(this.tweetMap.get(followeeId) || []));
        });
        feed.sort((a, b) => b[0] - a[0]);
        return feed.slice(0, 10).map((x) => x[1]);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (followerId !== followeeId) {
            if (!this.followMap.has(followerId))
                this.followMap.set(followerId, new Set());
            this.followMap.get(followerId).add(followeeId);
        }
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

```csharp
class Twitter {
    private int time;
    private Dictionary<int, HashSet<int>> followMap;
    private Dictionary<int, List<(int, int)>> tweetMap;

    public Twitter() {
        time = 0;
        followMap = new Dictionary<int, HashSet<int>>();
        tweetMap = new Dictionary<int, List<(int, int)>>();
    }

    public void PostTweet(int userId, int tweetId) {
        if (!tweetMap.ContainsKey(userId)) {
            tweetMap[userId] = new List<(int, int)>();
        }
        tweetMap[userId].Add((time++, tweetId));
    }

    public List<int> GetNewsFeed(int userId) {
        var feed = new List<(int, int)>(tweetMap.GetValueOrDefault(userId, new List<(int, int)>()));
        foreach (var followeeId in followMap.GetValueOrDefault(userId, new HashSet<int>())) {
            feed.AddRange(tweetMap.GetValueOrDefault(followeeId, new List<(int, int)>()));
        }
        feed.Sort((a, b) => b.Item1 - a.Item1);
        var res = new List<int>();
        for (int i = 0; i < Math.Min(10, feed.Count); i++) {
            res.Add(feed[i].Item2);
        }
        return res;
    }

    public void Follow(int followerId, int followeeId) {
        if (followerId != followeeId) {
            if (!followMap.ContainsKey(followerId)) {
                followMap[followerId] = new HashSet<int>();
            }
            followMap[followerId].Add(followeeId);
        }
    }

    public void Unfollow(int followerId, int followeeId) {
        if (followMap.ContainsKey(followerId)) {
            followMap[followerId].Remove(followeeId);
        }
    }
}
```

```go
type Twitter struct {
    time      int
    followMap map[int]map[int]bool
    tweetMap  map[int][]Tweet
}

type Tweet struct {
    time    int
    tweetId int
}

func Constructor() Twitter {
    return Twitter{
        time:      0,
        followMap: make(map[int]map[int]bool),
        tweetMap:  make(map[int][]Tweet),
    }
}

func (this *Twitter) PostTweet(userId int, tweetId int) {
    this.tweetMap[userId] = append(this.tweetMap[userId], Tweet{this.time, tweetId})
    this.time++
}

func (this *Twitter) GetNewsFeed(userId int) []int {
    feed := make([]Tweet, 0)
    feed = append(feed, this.tweetMap[userId]...)

    if follows, ok := this.followMap[userId]; ok {
        for followeeId := range follows {
            feed = append(feed, this.tweetMap[followeeId]...)
        }
    }

    sort.Slice(feed, func(i, j int) bool {
        return feed[i].time > feed[j].time
    })

    result := make([]int, 0)
    for i := 0; i < len(feed) && i < 10; i++ {
        result = append(result, feed[i].tweetId)
    }
    return result
}

func (this *Twitter) Follow(followerId int, followeeId int) {
    if followerId != followeeId {
        if this.followMap[followerId] == nil {
            this.followMap[followerId] = make(map[int]bool)
        }
        this.followMap[followerId][followeeId] = true
    }
}

func (this *Twitter) Unfollow(followerId int, followeeId int) {
    if follows, ok := this.followMap[followerId]; ok {
        delete(follows, followeeId)
    }
}
```

```kotlin
class Twitter {
    private var time = 0
    private val followMap = HashMap<Int, HashSet<Int>>()
    private val tweetMap = HashMap<Int, MutableList<Pair<Int, Int>>>()

    fun postTweet(userId: Int, tweetId: Int) {
        if (!tweetMap.containsKey(userId)) {
            tweetMap[userId] = mutableListOf()
        }
        tweetMap[userId]?.add(Pair(time, tweetId))
        time++
    }

    fun getNewsFeed(userId: Int): List<Int> {
        val feed = mutableListOf<Pair<Int, Int>>()
        tweetMap[userId]?.let { feed.addAll(it) }
        followMap[userId]?.forEach { followeeId ->
            tweetMap[followeeId]?.let { feed.addAll(it) }
        }

        return feed.sortedByDescending { it.first }
            .take(10)
            .map { it.second }
    }

    fun follow(followerId: Int, followeeId: Int) {
        if (followerId != followeeId) {
            if (!followMap.containsKey(followerId)) {
                followMap[followerId] = HashSet()
            }
            followMap[followerId]?.add(followeeId)
        }
    }

    fun unfollow(followerId: Int, followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}
```

```swift
class Twitter {
    private var time: Int
    private var followMap: [Int: Set<Int>]
    private var tweetMap: [Int: [(Int, Int)]]

    init() {
        self.time = 0
        self.followMap = [:]
        self.tweetMap = [:]
    }

    func postTweet(_ userId: Int, _ tweetId: Int) {
        if tweetMap[userId] == nil {
            tweetMap[userId] = []
        }
        tweetMap[userId]!.append((time, tweetId))
        time += 1
    }

    func getNewsFeed(_ userId: Int) -> [Int] {
        var feed = tweetMap[userId] ?? []
        if let followees = followMap[userId] {
            for followeeId in followees {
                if let tweets = tweetMap[followeeId] {
                    feed.append(contentsOf: tweets)
                }
            }
        }
        feed.sort { $0.0 > $1.0 }
        return feed.prefix(10).map { $0.1 }
    }

    func follow(_ followerId: Int, _ followeeId: Int) {
        if followerId != followeeId {
            followMap[followerId, default: Set()].insert(followeeId)
        }
    }

    func unfollow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n * m + t\log t)$ for each $getNewsFeed()$ call and $O(1)$ for remaining methods.
- Space complexity: $O(N * m + N * M)$

> Where $n$ is the total number of $followeeIds$ associated with the $userId$, $m$ is the maximum number of tweets by any user, $t$ is the total number of tweets associated with the $userId$ and its $followeeIds$, $N$ is the total number of $userIds$ and $M$ is the maximum number of followees for any user.

---

## 2. Heap

::tabs-start

```python
class Twitter:
    def __init__(self):
        self.count = 0
        self.tweetMap = defaultdict(list)  # userId -> list of [count, tweetIds]
        self.followMap = defaultdict(set)  # userId -> set of followeeId

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweetMap[userId].append([self.count, tweetId])
        self.count -= 1

    def getNewsFeed(self, userId: int) -> List[int]:
        res = []
        minHeap = []

        self.followMap[userId].add(userId)
        for followeeId in self.followMap[userId]:
            if followeeId in self.tweetMap:
                index = len(self.tweetMap[followeeId]) - 1
                count, tweetId = self.tweetMap[followeeId][index]
                heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])

        while minHeap and len(res) < 10:
            count, tweetId, followeeId, index = heapq.heappop(minHeap)
            res.append(tweetId)
            if index >= 0:
                count, tweetId = self.tweetMap[followeeId][index]
                heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])
        return res

    def follow(self, followerId: int, followeeId: int) -> None:
        self.followMap[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followeeId in self.followMap[followerId]:
            self.followMap[followerId].remove(followeeId)
```

```java
public class Twitter {

    private int count;
    private Map<Integer, List<int[]>> tweetMap;
    private Map<Integer, Set<Integer>> followMap;

    public Twitter() {
        count = 0;
        tweetMap = new HashMap<>();
        followMap = new HashMap<>();
    }

    public void postTweet(int userId, int tweetId) {
        tweetMap.computeIfAbsent(userId, k -> new ArrayList<>()).add(new int[]{count--, tweetId});
    }

    public List<Integer> getNewsFeed(int userId) {
        List<Integer> res = new ArrayList<>();
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(Comparator.comparingInt(a -> a[0]));

        followMap.computeIfAbsent(userId, k -> new HashSet<>()).add(userId);
        for (int followeeId : followMap.get(userId)) {
            if (tweetMap.containsKey(followeeId)) {
                List<int[]> tweets = tweetMap.get(followeeId);
                int index = tweets.size() - 1;
                int[] tweet = tweets.get(index);
                minHeap.offer(new int[]{tweet[0], tweet[1], followeeId, index});
            }
        }

        while (!minHeap.isEmpty() && res.size() < 10) {
            int[] curr = minHeap.poll();
            res.add(curr[1]);
            int index = curr[3];
            if (index > 0) {
                int[] tweet = tweetMap.get(curr[2]).get(index - 1);
                minHeap.offer(new int[]{tweet[0], tweet[1], curr[2], index - 1});
            }
        }
        return res;
    }

    public void follow(int followerId, int followeeId) {
        followMap.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        followMap.computeIfPresent(followerId, (k, v) -> {
            v.remove(followeeId);
            return v;
        });
    }
}
```

```cpp
class Twitter {
    int count;
    unordered_map<int, vector<vector<int>>> tweetMap;
    unordered_map<int, set<int>> followMap;

public:
    Twitter() {
        count = 0;
    }

    void postTweet(int userId, int tweetId) {
        tweetMap[userId].push_back({count++, tweetId});
    }

    vector<int> getNewsFeed(int userId) {
        vector<int> res;
        auto compare = [](const vector<int>& a, const vector<int>& b) {
            return a[0] < b[0];
        };
        priority_queue<vector<int>, vector<vector<int>>, decltype(compare)> minHeap(compare);

        followMap[userId].insert(userId);
        for (int followeeId : followMap[userId]) {
            if (tweetMap.count(followeeId)) {
                const vector<vector<int>>& tweets = tweetMap[followeeId];
                int index = tweets.size() - 1;
                minHeap.push({tweets[index][0], tweets[index][1], followeeId, index});
            }
        }

        while (!minHeap.empty() && res.size() < 10) {
            vector<int> curr = minHeap.top();
            minHeap.pop();
            res.push_back(curr[1]);
            int index = curr[3];
            if (index > 0) {
                const vector<int>& tweet = tweetMap[curr[2]][index - 1];
                minHeap.push({tweet[0], tweet[1], curr[2], index - 1});
            }
        }
        return res;
    }

    void follow(int followerId, int followeeId) {
        followMap[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        followMap[followerId].erase(followeeId);
    }
};
```

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Twitter {
    constructor() {
        this.count = 0;
        this.tweetMap = new Map(); // userId -> array of [count, tweetId]
        this.followMap = new Map(); // userId -> set of followeeIds
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        this.tweetMap.get(userId).push([this.count, tweetId]);
        this.count -= 1;
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const res = [];
        if (!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }
        this.followMap.get(userId).add(userId);
        const minHeap = new PriorityQueue((a, b) => a[0] - b[0]);

        for (const followeeId of this.followMap.get(userId)) {
            if (this.tweetMap.has(followeeId)) {
                const tweets = this.tweetMap.get(followeeId);
                const index = tweets.length - 1;
                const [count, tweetId] = tweets[index];
                minHeap.enqueue([count, tweetId, followeeId, index - 1]);
            }
        }

        while (!minHeap.isEmpty() && res.length < 10) {
            const [count, tweetId, followeeId, nextIndex] = minHeap.dequeue();
            res.push(tweetId);
            if (nextIndex >= 0) {
                const [olderCount, olderTweetId] =
                    this.tweetMap.get(followeeId)[nextIndex];
                minHeap.enqueue([
                    olderCount,
                    olderTweetId,
                    followeeId,
                    nextIndex - 1,
                ]);
            }
        }

        return res;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

```csharp
class Twitter {
    private int count;
    private Dictionary<int, List<int[]>> tweetMap;
    private Dictionary<int, HashSet<int>> followMap;

    public Twitter() {
        count = 0;
        tweetMap = new Dictionary<int, List<int[]>>();
        followMap = new Dictionary<int, HashSet<int>>();
    }

    public void PostTweet(int userId, int tweetId) {
        if (!tweetMap.ContainsKey(userId)) {
            tweetMap[userId] = new List<int[]>();
        }
        tweetMap[userId].Add(new int[] { count++, tweetId });
    }

    public List<int> GetNewsFeed(int userId) {
        List<int> res = new List<int>();
        PriorityQueue<int[], int> minHeap = new PriorityQueue<int[], int>();

        if (!followMap.ContainsKey(userId)) {
            followMap[userId] = new HashSet<int>();
        }
        followMap[userId].Add(userId);

        foreach (int followeeId in followMap[userId]) {
            if (tweetMap.ContainsKey(followeeId) && tweetMap[followeeId].Count > 0) {
                List<int[]> tweets = tweetMap[followeeId];
                int index = tweets.Count - 1;
                int[] latestTweet = tweets[index];
                minHeap.Enqueue(new int[] { latestTweet[0], latestTweet[1], followeeId, index }, -latestTweet[0]);
            }
        }

        while (minHeap.Count > 0 && res.Count < 10) {
            int[] curr = minHeap.Dequeue();
            res.Add(curr[1]);
            int index = curr[3];
            if (index > 0) {
                int[] tweet = tweetMap[curr[2]][index - 1];
                minHeap.Enqueue(new int[] { tweet[0], tweet[1], curr[2], index - 1 }, -tweet[0]);
            }
        }

        return res;
    }

    public void Follow(int followerId, int followeeId) {
        if (!followMap.ContainsKey(followerId)) {
            followMap[followerId] = new HashSet<int>();
        }
        followMap[followerId].Add(followeeId);
    }

    public void Unfollow(int followerId, int followeeId) {
        if (followMap.ContainsKey(followerId)) {
            followMap[followerId].Remove(followeeId);
        }
    }
}
```

```go
type Twitter struct {
    count     int
    tweetMap  map[int][][]int    // userId -> list of [count, tweetId]
    followMap map[int]map[int]bool // userId -> set of followeeId
}

func Constructor() Twitter {
    return Twitter{
        count:     0,
        tweetMap:  make(map[int][][]int),
        followMap: make(map[int]map[int]bool),
    }
}

func (this *Twitter) PostTweet(userId int, tweetId int) {
    if this.tweetMap[userId] == nil {
        this.tweetMap[userId] = make([][]int, 0)
    }
    this.tweetMap[userId] = append(this.tweetMap[userId], []int{this.count, tweetId})
    this.count--
}

func (this *Twitter) GetNewsFeed(userId int) []int {
    res := make([]int, 0)

    minHeap := priorityqueue.NewWith(func(a, b interface{}) int {
        return a.([]int)[0] - b.([]int)[0]
    })

    if this.followMap[userId] == nil {
        this.followMap[userId] = make(map[int]bool)
    }
    this.followMap[userId][userId] = true

    for followeeId := range this.followMap[userId] {
        tweets := this.tweetMap[followeeId]
        if len(tweets) > 0 {
            index := len(tweets) - 1
            count, tweetId := tweets[index][0], tweets[index][1]
            minHeap.Enqueue([]int{count, tweetId, followeeId, index - 1})
        }
    }

    for minHeap.Size() > 0 && len(res) < 10 {
        item, _ := minHeap.Dequeue()
        curr := item.([]int)
        count, tweetId, followeeId, index := curr[0], curr[1], curr[2], curr[3]

        res = append(res, tweetId)

        if index >= 0 {
            tweets := this.tweetMap[followeeId]
            count, tweetId = tweets[index][0], tweets[index][1]
            minHeap.Enqueue([]int{count, tweetId, followeeId, index - 1})
        }
    }

    return res
}

func (this *Twitter) Follow(followerId int, followeeId int) {
    if this.followMap[followerId] == nil {
        this.followMap[followerId] = make(map[int]bool)
    }
    this.followMap[followerId][followeeId] = true
}

func (this *Twitter) Unfollow(followerId int, followeeId int) {
    if this.followMap[followerId] != nil {
        delete(this.followMap[followerId], followeeId)
    }
}
```

```kotlin
class Twitter {
    private var count = 0
    private val tweetMap = HashMap<Int, MutableList<IntArray>>() // userId -> list of [count, tweetId]
    private val followMap = HashMap<Int, HashSet<Int>>() // userId -> set of followeeId

    fun postTweet(userId: Int, tweetId: Int) {
        if (!tweetMap.containsKey(userId)) {
            tweetMap[userId] = mutableListOf()
        }
        tweetMap[userId]?.add(intArrayOf(count, tweetId))
        count--
    }

    fun getNewsFeed(userId: Int): List<Int> {
        val res = mutableListOf<Int>()
        val minHeap = PriorityQueue<IntArray>(compareBy { it[0] })

        if (!followMap.containsKey(userId)) {
            followMap[userId] = HashSet()
        }
        followMap[userId]?.add(userId)

        followMap[userId]?.forEach { followeeId ->
            tweetMap[followeeId]?.let { tweets ->
                if (tweets.isNotEmpty()) {
                    val index = tweets.size - 1
                    val (count, tweetId) = tweets[index]
                    minHeap.add(intArrayOf(count, tweetId, followeeId, index - 1))
                }
            }
        }

        while (minHeap.isNotEmpty() && res.size < 10) {
            val (count, tweetId, followeeId, index) = minHeap.poll()
            res.add(tweetId)

            if (index >= 0) {
                val tweets = tweetMap[followeeId]!!
                val (nextCount, nextTweetId) = tweets[index]
                minHeap.add(intArrayOf(nextCount, nextTweetId, followeeId, index - 1))
            }
        }

        return res
    }

    fun follow(followerId: Int, followeeId: Int) {
        if (!followMap.containsKey(followerId)) {
            followMap[followerId] = HashSet()
        }
        followMap[followerId]?.add(followeeId)
    }

    fun unfollow(followerId: Int, followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}
```

```swift
class Twitter {
    private var count: Int
    private var tweetMap: [Int: [(Int, Int)]]  // userId -> list of (count, tweetId)
    private var followMap: [Int: Set<Int>]     // userId -> set of followeeId

    init() {
        self.count = 0
        self.tweetMap = [:]
        self.followMap = [:]
    }

    func postTweet(_ userId: Int, _ tweetId: Int) {
        tweetMap[userId, default: []].append((count, tweetId))
        count -= 1
    }

    func getNewsFeed(_ userId: Int) -> [Int] {
        var res = [Int]()
        var minHeap = Heap<Item>()

        followMap[userId, default: Set()].insert(userId)
        if let followees = followMap[userId] {
            for followee in followees {
                if let tweets = tweetMap[followee], !tweets.isEmpty {
                    let index = tweets.count - 1
                    let (cnt, tweetId) = tweets[index]
                    minHeap.insert(
                        Item(
                            count: cnt, tweetId: tweetId,
                            followeeId: followee, index: index - 1
                        )
                    )
                }
            }
        }

        while !minHeap.isEmpty && res.count < 10 {
            let entry = minHeap.popMin()!
            res.append(entry.tweetId)
            if entry.index >= 0, let tweets = tweetMap[entry.followeeId] {
                let (cnt, tweetId) = tweets[entry.index]
                minHeap.insert(
                    Item(
                        count: cnt, tweetId: tweetId,
                        followeeId: entry.followeeId, index: entry.index - 1
                    )
                )
            }
        }
        return res
    }

    func follow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId, default: Set()].insert(followeeId)
    }

    func unfollow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}

struct Item: Comparable {
    let count: Int
    let tweetId: Int
    let followeeId: Int
    let index: Int

    static func < (lhs: Item, rhs: Item) -> Bool {
        return lhs.count < rhs.count
    }

    static func == (lhs: Item, rhs: Item) -> Bool {
        return lhs.count == rhs.count
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n \log n)$ for each $getNewsFeed()$ call and $O(1)$ for remaining methods.
- Space complexity: $O(N * m + N * M + n)$

> Where $n$ is the total number of $followeeIds$ associated with the $userId$, $m$ is the maximum number of tweets by any user, $N$ is the total number of $userIds$ and $M$ is the maximum number of followees for any user.

---

## 3. Heap (Optimal)

::tabs-start

```python
class Twitter:

    def __init__(self):
        self.count = 0
        self.tweetMap = defaultdict(list)  # userId -> list of [count, tweetIds]
        self.followMap = defaultdict(set)  # userId -> set of followeeId

    def postTweet(self, userId: int, tweetId: int) -> None:
        self.tweetMap[userId].append([self.count, tweetId])
        if len(self.tweetMap[userId]) > 10:
            self.tweetMap[userId].pop(0)
        self.count -= 1

    def getNewsFeed(self, userId: int) -> List[int]:
        res = []
        minHeap = []
        self.followMap[userId].add(userId)
        if len(self.followMap[userId]) >= 10:
            maxHeap = []
            for followeeId in self.followMap[userId]:
                if followeeId in self.tweetMap:
                    index = len(self.tweetMap[followeeId]) - 1
                    count, tweetId = self.tweetMap[followeeId][index]
                    heapq.heappush(maxHeap, [-count, tweetId, followeeId, index - 1])
                    if len(maxHeap) > 10:
                        heapq.heappop(maxHeap)
            while maxHeap:
                count, tweetId, followeeId, index = heapq.heappop(maxHeap)
                heapq.heappush(minHeap, [-count, tweetId, followeeId, index])
        else:
            for followeeId in self.followMap[userId]:
                if followeeId in self.tweetMap:
                    index = len(self.tweetMap[followeeId]) - 1
                    count, tweetId = self.tweetMap[followeeId][index]
                    heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])

        while minHeap and len(res) < 10:
            count, tweetId, followeeId, index = heapq.heappop(minHeap)
            res.append(tweetId)
            if index >= 0:
                count, tweetId = self.tweetMap[followeeId][index]
                heapq.heappush(minHeap, [count, tweetId, followeeId, index - 1])

        return res

    def follow(self, followerId: int, followeeId: int) -> None:
        self.followMap[followerId].add(followeeId)

    def unfollow(self, followerId: int, followeeId: int) -> None:
        if followeeId in self.followMap[followerId]:
            self.followMap[followerId].remove(followeeId)
```

```java
public class Twitter {

    private int count;
    private Map<Integer, List<int[]>> tweetMap;
    private Map<Integer, Set<Integer>> followMap;

    public Twitter() {
        this.count = 0;
        this.tweetMap = new HashMap<>();
        this.followMap = new HashMap<>();
    }

    public void postTweet(int userId, int tweetId) {
        tweetMap.computeIfAbsent(userId, k -> new ArrayList<>())
                .add(new int[]{count, tweetId});
        if (tweetMap.get(userId).size() > 10) {
            tweetMap.get(userId).remove(0);
        }
        count--;
    }

    public List<Integer> getNewsFeed(int userId) {
        List<Integer> res = new ArrayList<>();
        PriorityQueue<int[]> minHeap = new PriorityQueue<>(
            (a, b) -> Integer.compare(a[0], b[0])
        );
        followMap.computeIfAbsent(userId, k -> new HashSet<>()).add(userId);
        if (followMap.get(userId).size() >= 10) {
            PriorityQueue<int[]> maxHeap = new PriorityQueue<>(
                (a, b) -> Integer.compare(a[0], b[0])
            );
            for (int followeeId : followMap.get(userId)) {
                if (!tweetMap.containsKey(followeeId)) continue;
                List<int[]> tweets = tweetMap.get(followeeId);
                int index = tweets.size() - 1;
                int[] tweet = tweets.get(index);
                maxHeap.offer(new int[]{-tweet[0], tweet[1], followeeId, index - 1});
                if (maxHeap.size() > 10) {
                    maxHeap.poll();
                }
            }
            while (!maxHeap.isEmpty()) {
                int[] top = maxHeap.poll();
                minHeap.offer(new int[]{-top[0], top[1], top[2], top[3]});
            }
        } else {
            for (int followeeId : followMap.get(userId)) {
                if (!tweetMap.containsKey(followeeId)) continue;
                List<int[]> tweets = tweetMap.get(followeeId);
                int index = tweets.size() - 1;
                int[] tweet = tweets.get(index);
                minHeap.offer(new int[]{tweet[0], tweet[1], followeeId, index - 1});
            }
        }

        while (!minHeap.isEmpty() && res.size() < 10) {
            int[] top = minHeap.poll();
            res.add(top[1]);
            int nextIndex = top[3];
            if (nextIndex >= 0) {
                List<int[]> tweets = tweetMap.get(top[2]);
                int[] nextTweet = tweets.get(nextIndex);
                minHeap.offer(new int[]{nextTweet[0], nextTweet[1], top[2], nextIndex - 1});
            }
        }
        return res;
    }

    public void follow(int followerId, int followeeId) {
        followMap.computeIfAbsent(followerId, k -> new HashSet<>()).add(followeeId);
    }

    public void unfollow(int followerId, int followeeId) {
        if (followMap.containsKey(followerId)) {
            followMap.get(followerId).remove(followeeId);
        }
    }
}
```

```cpp
class Twitter {
public:
    int count;
    unordered_map<int, vector<pair<int,int>>> tweetMap;
    unordered_map<int, unordered_set<int>> followMap;

    Twitter() {
        count = 0;
    }

    void postTweet(int userId, int tweetId) {
        tweetMap[userId].push_back({count, tweetId});
        if (tweetMap[userId].size() > 10) {
            tweetMap[userId].erase(tweetMap[userId].begin());
        }
        count--;
    }

    vector<int> getNewsFeed(int userId) {
        vector<int> res;
        followMap[userId].insert(userId);
        priority_queue<vector<int>, vector<vector<int>>, greater<vector<int>>> minHeap;
        if (followMap[userId].size() >= 10) {
            priority_queue<vector<int>> maxHeap;
            for (auto f : followMap[userId]) {
                if (!tweetMap.count(f)) continue;
                int idx = tweetMap[f].size() - 1;
                auto &p = tweetMap[f][idx];
                maxHeap.push({-p.first, p.second, f, idx - 1});
                if (maxHeap.size() > 10) maxHeap.pop();
            }
            while (!maxHeap.empty()) {
                auto t = maxHeap.top();
                maxHeap.pop();
                minHeap.push({-t[0], t[1], t[2], t[3]});
            }
        } else {
            for (auto f : followMap[userId]) {
                if (!tweetMap.count(f)) continue;
                int idx = tweetMap[f].size() - 1;
                auto &p = tweetMap[f][idx];
                minHeap.push({p.first, p.second, f, idx - 1});
            }
        }
        while (!minHeap.empty() && res.size() < 10) {
            auto t = minHeap.top();
            minHeap.pop();
            res.push_back(t[1]);
            int idx = t[3];
            if (idx >= 0) {
                auto &p = tweetMap[t[2]][idx];
                minHeap.push({p.first, p.second, t[2], idx - 1});
            }
        }
        return res;
    }

    void follow(int followerId, int followeeId) {
        followMap[followerId].insert(followeeId);
    }

    void unfollow(int followerId, int followeeId) {
        if (followMap[followerId].count(followeeId)) {
            followMap[followerId].erase(followeeId);
        }
    }
};
```

```javascript
/**
 * const { PriorityQueue } = require('@datastructures-js/priority-queue');
 */
class Twitter {
    constructor() {
        this.count = 0;
        this.tweetMap = new Map();
        this.followMap = new Map();
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.tweetMap.has(userId)) {
            this.tweetMap.set(userId, []);
        }
        const tweets = this.tweetMap.get(userId);
        tweets.push([this.count, tweetId]);
        if (tweets.length > 10) {
            tweets.shift();
        }
        this.count--;
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        const res = [];
        if (!this.followMap.has(userId)) {
            this.followMap.set(userId, new Set());
        }
        this.followMap.get(userId).add(userId);
        const minHeap = new PriorityQueue((a, b) => a[0] - b[0]);

        if (this.followMap.get(userId).size >= 10) {
            const maxHeap = new PriorityQueue((a, b) => a[0] - b[0]);
            for (const followeeId of this.followMap.get(userId)) {
                if (!this.tweetMap.has(followeeId)) continue;
                const tweets = this.tweetMap.get(followeeId);
                const idx = tweets.length - 1;
                const [cnt, tId] = tweets[idx];
                maxHeap.enqueue([-cnt, tId, followeeId, idx - 1]);
                if (maxHeap.size() > 10) {
                    maxHeap.dequeue();
                }
            }
            while (maxHeap.size() > 0) {
                const [negCount, tId, fId, idx] = maxHeap.dequeue();
                minHeap.enqueue([-negCount, tId, fId, idx]);
            }
        } else {
            for (const followeeId of this.followMap.get(userId)) {
                if (!this.tweetMap.has(followeeId)) continue;
                const tweets = this.tweetMap.get(followeeId);
                const idx = tweets.length - 1;
                const [cnt, tId] = tweets[idx];
                minHeap.enqueue([cnt, tId, followeeId, idx - 1]);
            }
        }

        while (minHeap.size() > 0 && res.length < 10) {
            const [cnt, tId, fId, idx] = minHeap.dequeue();
            res.push(tId);
            if (idx >= 0) {
                const [olderCount, olderTId] = this.tweetMap.get(fId)[idx];
                minHeap.enqueue([olderCount, olderTId, fId, idx - 1]);
            }
        }
        return res;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.followMap.has(followerId)) {
            this.followMap.set(followerId, new Set());
        }
        this.followMap.get(followerId).add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.followMap.has(followerId)) {
            this.followMap.get(followerId).delete(followeeId);
        }
    }
}
```

```csharp
public class Twitter
{
    private int count;
    private Dictionary<int, List<(int, int)>> tweetMap; // userId -> list of (count, tweetId)
    private Dictionary<int, HashSet<int>> followMap;    // userId -> set of followeeId

    public Twitter()
    {
        count = 0;
        tweetMap = new Dictionary<int, List<(int, int)>>();
        followMap = new Dictionary<int, HashSet<int>>();
    }

    public void PostTweet(int userId, int tweetId)
    {
        if (!tweetMap.ContainsKey(userId))
        {
            tweetMap[userId] = new List<(int, int)>();
        }
        tweetMap[userId].Add((count, tweetId));
        if (tweetMap[userId].Count > 10)
        {
            tweetMap[userId].RemoveAt(0);
        }
        count--;
    }

    public List<int> GetNewsFeed(int userId)
    {
        var res = new List<int>();
        if (!followMap.ContainsKey(userId))
        {
            followMap[userId] = new HashSet<int>();
        }
        followMap[userId].Add(userId);
        var minHeap = new PriorityQueue<(int, int, int, int), int>();
        if (followMap[userId].Count >= 10)
        {
            var maxHeap = new PriorityQueue<(int, int, int, int), int>();
            foreach (var fId in followMap[userId])
            {
                if (tweetMap.ContainsKey(fId))
                {
                    var tweets = tweetMap[fId];
                    int idx = tweets.Count - 1;
                    var (c, tId) = tweets[idx];
                    maxHeap.Enqueue(
                        ( -c, tId, fId, idx - 1 ),
                        -c
                    );
                    if (maxHeap.Count > 10)
                    {
                        maxHeap.Dequeue();
                    }
                }
            }

            while (maxHeap.Count > 0)
            {
                var item = maxHeap.Dequeue();
                var negCount = item.Item1;
                var tId = item.Item2;
                var fId = item.Item3;
                var idx = item.Item4;

                int originalCount = -negCount;
                minHeap.Enqueue(
                    ( originalCount, tId, fId, idx ),
                    originalCount
                );
            }
        }
        else
        {
            foreach (var fId in followMap[userId])
            {
                if (tweetMap.ContainsKey(fId))
                {
                    var tweets = tweetMap[fId];
                    int idx = tweets.Count - 1;
                    var (c, tId) = tweets[idx];
                    minHeap.Enqueue(
                        ( c, tId, fId, idx - 1 ),
                        c
                    );
                }
            }
        }

        while (minHeap.Count > 0 && res.Count < 10)
        {
            var (c, tId, fId, idx) = minHeap.Dequeue();
            res.Add(tId);
            if (idx >= 0)
            {
                var (olderCount, olderTid) = tweetMap[fId][idx];
                minHeap.Enqueue(
                    ( olderCount, olderTid, fId, idx - 1 ),
                    olderCount
                );
            }
        }

        return res;
    }

    public void Follow(int followerId, int followeeId)
    {
        if (!followMap.ContainsKey(followerId))
        {
            followMap[followerId] = new HashSet<int>();
        }
        followMap[followerId].Add(followeeId);
    }

    public void Unfollow(int followerId, int followeeId)
    {
        if (followMap.ContainsKey(followerId))
        {
            followMap[followerId].Remove(followeeId);
        }
    }
}
```

```go
type Twitter struct {
    count     int
    tweetMap  map[int][][2]int    // userId -> [count, tweetId]
    followMap map[int]map[int]bool // userId -> set of followeeIds
}

func Constructor() Twitter {
    return Twitter{
        count:     0,
        tweetMap:  make(map[int][][2]int),
        followMap: make(map[int]map[int]bool),
    }
}

func (t *Twitter) PostTweet(userId int, tweetId int) {
    if _, exists := t.tweetMap[userId]; !exists {
        t.tweetMap[userId] = make([][2]int, 0, 10)
    }
    t.tweetMap[userId] = append(t.tweetMap[userId], [2]int{t.count, tweetId})
    if len(t.tweetMap[userId]) > 10 {
        t.tweetMap[userId] = t.tweetMap[userId][1:]
    }
    t.count--
}

func maxHeapComparator(a, b interface{}) int {
    A := a.([]int)
    B := b.([]int)
    switch {
    case A[0] < B[0]:
        return -1
    case A[0] > B[0]:
        return 1
    default:
        return 0
    }
}

func minHeapComparator(a, b interface{}) int {
    A := a.([]int)
    B := b.([]int)
    switch {
    case A[0] < B[0]:
        return -1
    case A[0] > B[0]:
        return 1
    default:
        return 0
    }
}

func (t *Twitter) GetNewsFeed(userId int) []int {
    res := []int{}
    if _, ok := t.followMap[userId]; !ok {
        t.followMap[userId] = make(map[int]bool)
    }
    t.followMap[userId][userId] = true
    minHeap := priorityqueue.NewWith(minHeapComparator)

    if len(t.followMap[userId]) >= 10 {
        maxHeap := priorityqueue.NewWith(maxHeapComparator)
        for fId := range t.followMap[userId] {
            if tweets, exists := t.tweetMap[fId]; exists && len(tweets) > 0 {
                idx := len(tweets) - 1
                c := tweets[idx][0]
                tId := tweets[idx][1]
                maxHeap.Enqueue([]int{-c, tId, fId, idx - 1})
                if maxHeap.Size() > 10 {
                    maxHeap.Dequeue()
                }
            }
        }

        for !maxHeap.Empty() {
            item, _ := maxHeap.Dequeue()
            arr := item.([]int)
            negCount := arr[0]
            tId := arr[1]
            fId := arr[2]
            nextIdx := arr[3]
            realCount := -negCount
            minHeap.Enqueue([]int{realCount, tId, fId, nextIdx})
        }
    } else {
        for fId := range t.followMap[userId] {
            if tweets, exists := t.tweetMap[fId]; exists && len(tweets) > 0 {
                idx := len(tweets) - 1
                c := tweets[idx][0]
                tId := tweets[idx][1]
                minHeap.Enqueue([]int{c, tId, fId, idx - 1})
            }
        }
    }

    for !minHeap.Empty() && len(res) < 10 {
        top, _ := minHeap.Dequeue()
        arr := top.([]int)
        tId := arr[1]
        fId := arr[2]
        nextIdx := arr[3]

        res = append(res, tId)
        if nextIdx >= 0 {
            older := t.tweetMap[fId][nextIdx]
            minHeap.Enqueue([]int{older[0], older[1], fId, nextIdx - 1})
        }
    }

    return res
}

func (t *Twitter) Follow(followerId, followeeId int) {
    if _, ok := t.followMap[followerId]; !ok {
        t.followMap[followerId] = make(map[int]bool)
    }
    t.followMap[followerId][followeeId] = true
}

func (t *Twitter) Unfollow(followerId, followeeId int) {
    if _, ok := t.followMap[followerId]; ok {
        delete(t.followMap[followerId], followeeId)
    }
}
```

```kotlin
class Twitter {
    private var count = 0
    private val tweetMap = mutableMapOf<Int, MutableList<Pair<Int, Int>>>()
    private val followMap = mutableMapOf<Int, MutableSet<Int>>()

    fun postTweet(userId: Int, tweetId: Int) {
        if (!tweetMap.containsKey(userId)) {
            tweetMap[userId] = mutableListOf()
        }
        val tweets = tweetMap[userId]!!
        tweets.add(Pair(count, tweetId))
        if (tweets.size > 10) {
            tweets.removeAt(0)
        }
        count--
    }

    fun getNewsFeed(userId: Int): List<Int> {
        val res = mutableListOf<Int>()
        if (!followMap.containsKey(userId)) {
            followMap[userId] = mutableSetOf()
        }
        followMap[userId]!!.add(userId)
        val minHeap = PriorityQueue<List<Int>> { a, b -> a[0].compareTo(b[0]) }
        if (followMap[userId]!!.size >= 10) {
            val maxHeap = PriorityQueue<List<Int>> { a, b -> a[0].compareTo(b[0]) }
            for (fId in followMap[userId]!!) {
                if (!tweetMap.containsKey(fId)) continue
                val tweets = tweetMap[fId]!!
                if (tweets.isEmpty()) continue
                val idx = tweets.size - 1
                val (c, tId) = tweets[idx]
                maxHeap.offer(listOf(-c, tId, fId, idx - 1))
                if (maxHeap.size > 10) {
                    maxHeap.poll()
                }
            }
            while (maxHeap.isNotEmpty()) {
                val (negCount, tId, fId, nextIdx) = maxHeap.poll()
                val realCount = -negCount
                minHeap.offer(listOf(realCount, tId, fId, nextIdx))
            }
        } else {
            for (fId in followMap[userId]!!) {
                if (!tweetMap.containsKey(fId)) continue
                val tweets = tweetMap[fId]!!
                if (tweets.isEmpty()) continue
                val idx = tweets.size - 1
                val (c, tId) = tweets[idx]
                minHeap.offer(listOf(c, tId, fId, idx - 1))
            }
        }

        while (minHeap.isNotEmpty() && res.size < 10) {
            val (c, tId, fId, idx) = minHeap.poll()
            res.add(tId)
            if (idx >= 0) {
                val (olderCount, olderTid) = tweetMap[fId]!![idx]
                minHeap.offer(listOf(olderCount, olderTid, fId, idx - 1))
            }
        }

        return res
    }

    fun follow(followerId: Int, followeeId: Int) {
        if (!followMap.containsKey(followerId)) {
            followMap[followerId] = mutableSetOf()
        }
        followMap[followerId]!!.add(followeeId)
    }

    fun unfollow(followerId: Int, followeeId: Int) {
        if (followMap.containsKey(followerId)) {
            followMap[followerId]!!.remove(followeeId)
        }
    }
}
```

```swift
struct Item: Comparable {
    let count: Int
    let tweetId: Int
    let followeeId: Int
    let index: Int

    static func < (lhs: Item, rhs: Item) -> Bool {
        return lhs.count < rhs.count
    }

    static func == (lhs: Item, rhs: Item) -> Bool {
        return lhs.count == rhs.count &&
               lhs.tweetId == rhs.tweetId &&
               lhs.followeeId == rhs.followeeId &&
               lhs.index == rhs.index
    }
}

class Twitter {
    private var count: Int
    private var tweetMap: [Int: [(Int, Int)]] // userId -> list of (count, tweetId)
    private var followMap: [Int: Set<Int>]    // userId -> set of followeeId

    init() {
        self.count = 0
        self.tweetMap = [:]
        self.followMap = [:]
    }

    func postTweet(_ userId: Int, _ tweetId: Int) {
        tweetMap[userId, default: []].append((count, tweetId))
        if tweetMap[userId]!.count > 10 {
            tweetMap[userId]!.removeFirst()
        }
        count -= 1
    }

    func getNewsFeed(_ userId: Int) -> [Int] {
        var res = [Int]()
        var minHeap = Heap<Item>()
        followMap[userId, default: Set()].insert(userId)

        if followMap[userId]!.count >= 10 {
            var maxHeap = Heap<Item>()
            for followeeId in followMap[userId]! {
                if let tweets = tweetMap[followeeId], !tweets.isEmpty {
                    let index = tweets.count - 1
                    let (cnt, tweetId) = tweets[index]
                    maxHeap.insert(
                        Item(
                            count: cnt, tweetId: tweetId,
                            followeeId: followeeId, index: index - 1
                        )
                    )
                    if maxHeap.count > 10 {
                        maxHeap.removeMax()
                    }
                }
            }
            while !maxHeap.isEmpty {
                let item = maxHeap.popMax()!
                minHeap.insert(item)
            }
        } else {
            for followeeId in followMap[userId]! {
                if let tweets = tweetMap[followeeId], !tweets.isEmpty {
                    let index = tweets.count - 1
                    let (cnt, tweetId) = tweets[index]
                    minHeap.insert(
                        Item(
                            count: cnt, tweetId: tweetId,
                            followeeId: followeeId, index: index - 1
                        )
                    )
                }
            }
        }

        while !minHeap.isEmpty && res.count < 10 {
            let item = minHeap.popMin()!
            res.append(item.tweetId)
            if item.index >= 0, let tweets = tweetMap[item.followeeId] {
                let (cnt, tweetId) = tweets[item.index]
                minHeap.insert(
                    Item(
                        count: cnt, tweetId: tweetId,
                        followeeId: item.followeeId, index: item.index - 1
                    )
                )
            }
        }

        return res
    }

    func follow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId, default: Set()].insert(followeeId)
    }

    func unfollow(_ followerId: Int, _ followeeId: Int) {
        followMap[followerId]?.remove(followeeId)
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity: $O(n)$ for each $getNewsFeed()$ call and $O(1)$ for remaining methods.
- Space complexity: $O(N * m + N * M + n)$

> Where $n$ is the total number of $followeeIds$ associated with the $userId$, $m$ is the maximum number of tweets by any user ($m$ can be at most $10$), $N$ is the total number of $userIds$ and $M$ is the maximum number of followees for any user.
