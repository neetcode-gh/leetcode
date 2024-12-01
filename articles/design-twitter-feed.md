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
        (this.followMap.get(userId) || new Set()).forEach(followeeId => {
            feed.push(...(this.tweetMap.get(followeeId) || []));
        });
        feed.sort((a, b) => b[0] - a[0]);
        return feed.slice(0, 10).map(x => x[1]);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (followerId !== followeeId) {
            if (!this.followMap.has(followerId)) this.followMap.set(followerId, new Set());
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n * m + t\log t)$ for each $getNewsFeed()$ call and $O(1)$ for remaining methods.
* Space complexity: $O(N * m + N * M)$

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
 * const { MaxPriorityQueue } = require('@datastructures-js/priority-queue');
 */

class Twitter {
    constructor() {
        this.users = new Map();
        this.timestamp = 0;
    }

    /**
     * @param {number} userId
     * @param {number} tweetId
     * @return {void}
     */
    postTweet(userId, tweetId) {
        if (!this.users.has(userId)) {
            this.users.set(userId, { tweets: [], following: new Set() });
        }
        this.users
            .get(userId)
            .tweets.push({ timestamp: this.timestamp, tweetId });
        this.timestamp += 1;
    }

    /**
     * @param {number} userId
     * @return {number[]}
     */
    getNewsFeed(userId) {
        if (!this.users.has(userId)) {
            return [];
        }

        const maxPQ = new MaxPriorityQueue(tweet => tweet.timestamp);
        const seenTweets = new Set();

        const user = this.users.get(userId);
        user.tweets.forEach(tweet => {
            if (!seenTweets.has(tweet.tweetId)) {
                maxPQ.enqueue(tweet);
                seenTweets.add(tweet.tweetId);
            }
        });

        user.following.forEach(followeeId => {
            if (this.users.has(followeeId)) {
                this.users.get(followeeId).tweets.forEach(tweet => {
                    if (!seenTweets.has(tweet.tweetId)) {
                        maxPQ.enqueue(tweet);
                        seenTweets.add(tweet.tweetId);
                    }
                });
            }
        });

        const newsFeed = [];
        for (let i = 0; i < 10 && !maxPQ.isEmpty(); i++) {
            newsFeed.push(maxPQ.dequeue().tweetId);
        }

        return newsFeed;
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    follow(followerId, followeeId) {
        if (!this.users.has(followerId)) {
            this.users.set(followerId, { tweets: [], following: new Set() });
        }
        this.users.get(followerId).following.add(followeeId);
    }

    /**
     * @param {number} followerId
     * @param {number} followeeId
     * @return {void}
     */
    unfollow(followerId, followeeId) {
        if (this.users.has(followerId)) {
            this.users.get(followerId).following.delete(followeeId);
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

::tabs-end

### Time & Space Complexity

* Time complexity: $O(n)$ for each $getNewsFeed()$ call and $O(1)$ for remaining methods.
* Space complexity: $O(N * m + N * M + n)$

> Where $n$ is the total number of $followeeIds$ associated with the $userId$, $m$ is the maximum number of tweets by any user, $N$ is the total number of $userIds$ and $M$ is the maximum number of followees for any user.