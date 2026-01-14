## 1. Two HashMaps

### Intuition
We need to track passenger trips and compute average travel times between stations. Each passenger checks in at one station and checks out at another, forming a route. By storing check-in information and aggregating travel times for each route, we can efficiently calculate averages without storing individual trip details.

### Algorithm
1. Use one hashmap to store check-in information: map passenger id to `(start station, check-in time)`.
2. Use another hashmap to store route statistics: map `(start station, end station)` to `[total time, trip count]`.
3. For `checkIn`: Store the passenger's start station and time in the check-in map.
4. For `checkOut`: Retrieve the passenger's check-in data, calculate the trip duration, and update the route map by adding the duration to the total time and incrementing the count.
5. For `getAverageTime`: Look up the route in the route map and return total time divided by count.

::tabs-start

```python
class UndergroundSystem:

    def __init__(self):
        self.checkInMap = {} # id -> (startStation, time)
        self.routeMap = {} # (start, end) -> [totalTime, count]

    def checkIn(self, id: int, startStation: str, t: int) -> None:
        self.checkInMap[id] = (startStation, t)

    def checkOut(self, id: int, endStation: str, t: int) -> None:
        startStation, time = self.checkInMap[id]
        route = (startStation, endStation)
        if route not in self.routeMap:
            self.routeMap[route] = [0, 0]
        self.routeMap[route][0] += t - time
        self.routeMap[route][1] += 1

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        totalTime, count = self.routeMap[(startStation, endStation)]
        return totalTime / count
```

```java
public class UndergroundSystem {
    private Map<Integer, Pair<String, Integer>> checkInMap;
    private Map<String, int[]> routeMap;

    public UndergroundSystem() {
        checkInMap = new HashMap<>();
        routeMap = new HashMap<>();
    }

    public void checkIn(int id, String startStation, int t) {
        checkInMap.put(id, new Pair<>(startStation, t));
    }

    public void checkOut(int id, String endStation, int t) {
        Pair<String, Integer> entry = checkInMap.get(id);
        String route = entry.getKey() + "," + endStation;
        routeMap.putIfAbsent(route, new int[]{0, 0});
        routeMap.get(route)[0] += t - entry.getValue();
        routeMap.get(route)[1] += 1;
    }

    public double getAverageTime(String startStation, String endStation) {
        int[] data = routeMap.get(startStation + "," + endStation);
        return (double) data[0] / data[1];
    }
}
```

```cpp
class UndergroundSystem {
    unordered_map<int, pair<string, int>> checkInMap;
    unordered_map<string, pair<int, int>> routeMap;

public:
    UndergroundSystem() {}

    void checkIn(int id, string startStation, int t) {
        checkInMap[id] = {startStation, t};
    }

    void checkOut(int id, string endStation, int t) {
        auto [startStation, time] = checkInMap[id];
        string route = startStation + "," + endStation;
        if (!routeMap.count(route))
            routeMap[route] = {0, 0};
        routeMap[route].first += t - time;
        routeMap[route].second += 1;
    }

    double getAverageTime(string startStation, string endStation) {
        string route = startStation + "," + endStation;
        auto [totalTime, count] = routeMap[route];
        return (double) totalTime / count;
    }
};
```

```javascript
class UndergroundSystem {
    /**
     * @constructor
     */
    constructor() {
        this.checkInMap = new Map();
        this.routeMap = new Map();
    }

    /**
     * @param {number} id
     * @param {string} startStation
     * @param {number} t
     * @return {void}
     */
    checkIn(id, startStation, t) {
        this.checkInMap.set(id, [startStation, t]);
    }

    /**
     * @param {number} id
     * @param {string} endStation
     * @param {number} t
     * @return {void}
     */
    checkOut(id, endStation, t) {
        const [startStation, time] = this.checkInMap.get(id);
        const route = `${startStation},${endStation}`;
        if (!this.routeMap.has(route)) this.routeMap.set(route, [0, 0]);
        this.routeMap.get(route)[0] += t - time;
        this.routeMap.get(route)[1] += 1;
    }

    /**
     * @param {string} startStation
     * @param {string} endStation
     * @return {number}
     */
    getAverageTime(startStation, endStation) {
        const [totalTime, count] = this.routeMap.get(
            `${startStation},${endStation}`,
        );
        return totalTime / count;
    }
}
```

```csharp
public class UndergroundSystem {
    private Dictionary<int, (string, int)> checkInMap;
    private Dictionary<string, int[]> routeMap;

    public UndergroundSystem() {
        checkInMap = new Dictionary<int, (string, int)>();
        routeMap = new Dictionary<string, int[]>();
    }

    public void CheckIn(int id, string startStation, int t) {
        checkInMap[id] = (startStation, t);
    }

    public void CheckOut(int id, string endStation, int t) {
        var (startStation, time) = checkInMap[id];
        string route = startStation + "," + endStation;
        if (!routeMap.ContainsKey(route)) {
            routeMap[route] = new int[]{0, 0};
        }
        routeMap[route][0] += t - time;
        routeMap[route][1] += 1;
    }

    public double GetAverageTime(string startStation, string endStation) {
        int[] data = routeMap[startStation + "," + endStation];
        return (double)data[0] / data[1];
    }
}
```

```go
type UndergroundSystem struct {
    checkInMap map[int][]interface{}
    routeMap   map[string][]int
}

func Constructor() UndergroundSystem {
    return UndergroundSystem{
        checkInMap: make(map[int][]interface{}),
        routeMap:   make(map[string][]int),
    }
}

func (this *UndergroundSystem) CheckIn(id int, stationName string, t int) {
    this.checkInMap[id] = []interface{}{stationName, t}
}

func (this *UndergroundSystem) CheckOut(id int, stationName string, t int) {
    entry := this.checkInMap[id]
    startStation := entry[0].(string)
    time := entry[1].(int)
    route := startStation + "," + stationName
    if _, ok := this.routeMap[route]; !ok {
        this.routeMap[route] = []int{0, 0}
    }
    this.routeMap[route][0] += t - time
    this.routeMap[route][1] += 1
}

func (this *UndergroundSystem) GetAverageTime(startStation string, endStation string) float64 {
    data := this.routeMap[startStation+","+endStation]
    return float64(data[0]) / float64(data[1])
}
```

```kotlin
class UndergroundSystem() {
    private val checkInMap = HashMap<Int, Pair<String, Int>>()
    private val routeMap = HashMap<String, IntArray>()

    fun checkIn(id: Int, stationName: String, t: Int) {
        checkInMap[id] = Pair(stationName, t)
    }

    fun checkOut(id: Int, stationName: String, t: Int) {
        val (startStation, time) = checkInMap[id]!!
        val route = "$startStation,$stationName"
        if (route !in routeMap) {
            routeMap[route] = intArrayOf(0, 0)
        }
        routeMap[route]!![0] += t - time
        routeMap[route]!![1] += 1
    }

    fun getAverageTime(startStation: String, endStation: String): Double {
        val data = routeMap["$startStation,$endStation"]!!
        return data[0].toDouble() / data[1]
    }
}
```

```swift
class UndergroundSystem {
    private var checkInMap: [Int: (String, Int)]
    private var routeMap: [String: [Int]]

    init() {
        checkInMap = [:]
        routeMap = [:]
    }

    func checkIn(_ id: Int, _ stationName: String, _ t: Int) {
        checkInMap[id] = (stationName, t)
    }

    func checkOut(_ id: Int, _ stationName: String, _ t: Int) {
        let (startStation, time) = checkInMap[id]!
        let route = "\(startStation),\(stationName)"
        if routeMap[route] == nil {
            routeMap[route] = [0, 0]
        }
        routeMap[route]![0] += t - time
        routeMap[route]![1] += 1
    }

    func getAverageTime(_ startStation: String, _ endStation: String) -> Double {
        let data = routeMap["\(startStation),\(endStation)"]!
        return Double(data[0]) / Double(data[1])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $checkIn()$ function call.
    - $O(m)$ time for each $checkOut()$ and $getAverageTime()$ function calls.
- Space complexity: $O(n + N ^ 2)$

> Where $n$ is the number of passengers, $N$ is the total number of stations, and $m$ is the average length of station name.

---

## 2. Two HashMaps + Hashing

### Intuition
The previous approach uses string concatenation to create route keys, which can be slow for long station names. By computing a hash value for each route instead of concatenating strings, we can achieve faster lookups. Using double hashing (two different hash functions) reduces collision probability while maintaining `O(1)` average lookup time.

### Algorithm
1. Use one hashmap to store check-in information: map passenger id to `(start station, check-in time)`.
2. Use another hashmap to store route statistics: map route hash to `[total time, trip count]`.
3. Implement a hash function that combines two polynomial rolling hashes with different bases and moduli to create a unique identifier for each route.
4. For `checkIn`: Store the passenger's start station and time.
5. For `checkOut`: Retrieve check-in data, compute the route hash, and update the route statistics.
6. For `getAverageTime`: Compute the route hash and return total time divided by count from the route map.

::tabs-start

```python
class UndergroundSystem:
    MOD1, MOD2 = 768258391, 685683731
    BASE1, BASE2 = 37, 31

    def __init__(self):
        self.checkInMap = {}  # id -> (startStation, time)
        self.routeMap = {}  # hash(route) -> (totalTime, count)

    def getHash(self, s1: str, s2: str) -> int:
        h1, h2, p1, p2 = 0, 0, 1, 1
        for c in s1 + ',' + s2:
            h1 = (h1 + (ord(c) - 96) * p1) % self.MOD1
            h2 = (h2 + (ord(c) - 96) * p2) % self.MOD2
            p1 = (p1 * self.BASE1) % self.MOD1
            p2 = (p2 * self.BASE2) % self.MOD2
        return (h1 << 32) | h2

    def checkIn(self, id: int, startStation: str, t: int) -> None:
        self.checkInMap[id] = (startStation, t)

    def checkOut(self, id: int, endStation: str, t: int) -> None:
        startStation, time = self.checkInMap[id]
        routeHash = self.getHash(startStation, endStation)
        if routeHash not in self.routeMap:
            self.routeMap[routeHash] = [0, 0]
        self.routeMap[routeHash][0] += t - time
        self.routeMap[routeHash][1] += 1

    def getAverageTime(self, startStation: str, endStation: str) -> float:
        routeHash = self.getHash(startStation, endStation)
        totalTime, count = self.routeMap[routeHash]
        return totalTime / count
```

```java
public class UndergroundSystem {
    private static final int MOD1 = 768258391, MOD2 = 685683731;
    private static final int BASE1 = 37, BASE2 = 31;
    private Map<Integer, Pair<String, Integer>> checkInMap;
    private Map<Long, int[]> routeMap;

    public UndergroundSystem() {
        checkInMap = new HashMap<>();
        routeMap = new HashMap<>();
    }

    private long getHash(String s1, String s2) {
        long h1 = 0, h2 = 0, p1 = 1, p2 = 1;
        String combined = s1 + "," + s2;

        for (char c : combined.toCharArray()) {
            h1 = (h1 + (c - 96) * p1) % MOD1;
            h2 = (h2 + (c - 96) * p2) % MOD2;
            p1 = (p1 * BASE1) % MOD1;
            p2 = (p2 * BASE2) % MOD2;
        }
        return (h1 << 32) | h2;
    }

    public void checkIn(int id, String startStation, int t) {
        checkInMap.put(id, new Pair<>(startStation, t));
    }

    public void checkOut(int id, String endStation, int t) {
        Pair<String, Integer> checkInData = checkInMap.get(id);
        long routeHash = getHash(checkInData.getKey(), endStation);
        routeMap.putIfAbsent(routeHash, new int[]{0, 0});
        int[] data = routeMap.get(routeHash);
        data[0] += (t - checkInData.getValue());
        data[1]++;
    }

    public double getAverageTime(String startStation, String endStation) {
        long routeHash = getHash(startStation, endStation);
        int[] data = routeMap.get(routeHash);
        return (double) data[0] / data[1];
    }
}
```

```cpp
class UndergroundSystem {
private:
    static constexpr int MOD1 = 768258391, MOD2 = 685683731;
    static constexpr int BASE1 = 37, BASE2 = 31;
    unordered_map<int, pair<string, int>> checkInMap;
    unordered_map<unsigned long long, pair<int, int>> routeMap;

    unsigned long long getHash(const string& s1, const string& s2) {
        long long h1 = 0, h2 = 0, p1 = 1, p2 = 1;
        string combined = s1 + "," + s2;

        for (char c : combined) {
            h1 = (h1 + (c - 96) * p1) % MOD1;
            h2 = (h2 + (c - 96) * p2) % MOD2;
            p1 = (p1 * BASE1) % MOD1;
            p2 = (p2 * BASE2) % MOD2;
        }
        return (h1 << 32) | h2;
    }

public:
    UndergroundSystem() {}

    void checkIn(int id, string startStation, int t) {
        checkInMap[id] = {startStation, t};
    }

    void checkOut(int id, string endStation, int t) {
        auto [startStation, time] = checkInMap[id];
        unsigned long long routeHash = getHash(startStation, endStation);
        routeMap[routeHash].first += (t - time);
        routeMap[routeHash].second++;
    }

    double getAverageTime(string startStation, string endStation) {
        unsigned long long routeHash = getHash(startStation, endStation);
        auto [totalTime, count] = routeMap[routeHash];
        return (double) totalTime / count;
    }
};
```

```javascript
class UndergroundSystem {
    /**
     * @constructor
     */
    constructor() {
        this.MOD1 = 768258391;
        this.MOD2 = 685683731;
        this.BASE1 = 37;
        this.BASE2 = 31;
        this.checkInMap = new Map();
        this.routeMap = new Map();
    }

    /**
     * @param {string} s1
     * @param {string} s2
     * @return {number}
     */
    getHash(s1, s2) {
        let h1 = 0,
            h2 = 0,
            p1 = 1,
            p2 = 1;
        let combined = s1 + ',' + s2;

        for (let i = 0; i < combined.length; i++) {
            let c = combined.charCodeAt(i) - 96;
            h1 = (h1 + c * p1) % this.MOD1;
            h2 = (h2 + c * p2) % this.MOD2;
            p1 = (p1 * this.BASE1) % this.MOD1;
            p2 = (p2 * this.BASE2) % this.MOD2;
        }
        return (BigInt(h1) << BigInt(32)) | BigInt(h2);
    }

    /**
     * @param {number} id
     * @param {string} startStation
     * @param {number} t
     * @return {void}
     */
    checkIn(id, startStation, t) {
        this.checkInMap.set(id, [startStation, t]);
    }

    /**
     * @param {number} id
     * @param {string} endStation
     * @param {number} t
     * @return {void}
     */
    checkOut(id, endStation, t) {
        let [startStation, time] = this.checkInMap.get(id);
        let routeHash = this.getHash(startStation, endStation);
        if (!this.routeMap.has(routeHash)) {
            this.routeMap.set(routeHash, [0, 0]);
        }
        let data = this.routeMap.get(routeHash);
        data[0] += t - time;
        data[1]++;
    }

    /**
     * @param {string} startStation
     * @param {string} endStation
     * @return {number}
     */
    getAverageTime(startStation, endStation) {
        let routeHash = this.getHash(startStation, endStation);
        let [totalTime, count] = this.routeMap.get(routeHash);
        return totalTime / count;
    }
}
```

```csharp
public class UndergroundSystem {
    private const int MOD1 = 768258391, MOD2 = 685683731;
    private const int BASE1 = 37, BASE2 = 31;
    private Dictionary<int, (string, int)> checkInMap;
    private Dictionary<long, int[]> routeMap;

    public UndergroundSystem() {
        checkInMap = new Dictionary<int, (string, int)>();
        routeMap = new Dictionary<long, int[]>();
    }

    private long GetHash(string s1, string s2) {
        long h1 = 0, h2 = 0, p1 = 1, p2 = 1;
        string combined = s1 + "," + s2;
        foreach (char c in combined) {
            h1 = (h1 + (c - 96) * p1) % MOD1;
            h2 = (h2 + (c - 96) * p2) % MOD2;
            p1 = (p1 * BASE1) % MOD1;
            p2 = (p2 * BASE2) % MOD2;
        }
        return (h1 << 32) | h2;
    }

    public void CheckIn(int id, string startStation, int t) {
        checkInMap[id] = (startStation, t);
    }

    public void CheckOut(int id, string endStation, int t) {
        var (startStation, time) = checkInMap[id];
        long routeHash = GetHash(startStation, endStation);
        if (!routeMap.ContainsKey(routeHash)) {
            routeMap[routeHash] = new int[]{0, 0};
        }
        routeMap[routeHash][0] += t - time;
        routeMap[routeHash][1]++;
    }

    public double GetAverageTime(string startStation, string endStation) {
        long routeHash = GetHash(startStation, endStation);
        int[] data = routeMap[routeHash];
        return (double)data[0] / data[1];
    }
}
```

```go
type UndergroundSystem struct {
    checkInMap map[int][]interface{}
    routeMap   map[uint64][]int
}

const MOD1 = 768258391
const MOD2 = 685683731
const BASE1 = 37
const BASE2 = 31

func Constructor() UndergroundSystem {
    return UndergroundSystem{
        checkInMap: make(map[int][]interface{}),
        routeMap:   make(map[uint64][]int),
    }
}

func getHash(s1, s2 string) uint64 {
    var h1, h2, p1, p2 int64 = 0, 0, 1, 1
    combined := s1 + "," + s2
    for _, c := range combined {
        h1 = (h1 + int64(c-96)*p1) % MOD1
        h2 = (h2 + int64(c-96)*p2) % MOD2
        p1 = (p1 * BASE1) % MOD1
        p2 = (p2 * BASE2) % MOD2
    }
    return (uint64(h1) << 32) | uint64(h2)
}

func (this *UndergroundSystem) CheckIn(id int, stationName string, t int) {
    this.checkInMap[id] = []interface{}{stationName, t}
}

func (this *UndergroundSystem) CheckOut(id int, stationName string, t int) {
    entry := this.checkInMap[id]
    startStation := entry[0].(string)
    time := entry[1].(int)
    routeHash := getHash(startStation, stationName)
    if _, ok := this.routeMap[routeHash]; !ok {
        this.routeMap[routeHash] = []int{0, 0}
    }
    this.routeMap[routeHash][0] += t - time
    this.routeMap[routeHash][1]++
}

func (this *UndergroundSystem) GetAverageTime(startStation string, endStation string) float64 {
    routeHash := getHash(startStation, endStation)
    data := this.routeMap[routeHash]
    return float64(data[0]) / float64(data[1])
}
```

```kotlin
class UndergroundSystem() {
    private val MOD1 = 768258391L
    private val MOD2 = 685683731L
    private val BASE1 = 37L
    private val BASE2 = 31L
    private val checkInMap = HashMap<Int, Pair<String, Int>>()
    private val routeMap = HashMap<Long, IntArray>()

    private fun getHash(s1: String, s2: String): Long {
        var h1 = 0L
        var h2 = 0L
        var p1 = 1L
        var p2 = 1L
        val combined = "$s1,$s2"
        for (c in combined) {
            h1 = (h1 + (c.code - 96) * p1) % MOD1
            h2 = (h2 + (c.code - 96) * p2) % MOD2
            p1 = (p1 * BASE1) % MOD1
            p2 = (p2 * BASE2) % MOD2
        }
        return (h1 shl 32) or h2
    }

    fun checkIn(id: Int, stationName: String, t: Int) {
        checkInMap[id] = Pair(stationName, t)
    }

    fun checkOut(id: Int, stationName: String, t: Int) {
        val (startStation, time) = checkInMap[id]!!
        val routeHash = getHash(startStation, stationName)
        if (routeHash !in routeMap) {
            routeMap[routeHash] = intArrayOf(0, 0)
        }
        routeMap[routeHash]!![0] += t - time
        routeMap[routeHash]!![1]++
    }

    fun getAverageTime(startStation: String, endStation: String): Double {
        val routeHash = getHash(startStation, endStation)
        val data = routeMap[routeHash]!!
        return data[0].toDouble() / data[1]
    }
}
```

```swift
class UndergroundSystem {
    private let MOD1 = 768258391
    private let MOD2 = 685683731
    private let BASE1 = 37
    private let BASE2 = 31
    private var checkInMap: [Int: (String, Int)]
    private var routeMap: [Int64: [Int]]

    init() {
        checkInMap = [:]
        routeMap = [:]
    }

    private func getHash(_ s1: String, _ s2: String) -> Int64 {
        var h1: Int64 = 0
        var h2: Int64 = 0
        var p1: Int64 = 1
        var p2: Int64 = 1
        let combined = s1 + "," + s2
        for c in combined.unicodeScalars {
            let val = Int64(c.value) - 96
            h1 = (h1 + val * p1) % Int64(MOD1)
            h2 = (h2 + val * p2) % Int64(MOD2)
            p1 = (p1 * Int64(BASE1)) % Int64(MOD1)
            p2 = (p2 * Int64(BASE2)) % Int64(MOD2)
        }
        return (h1 << 32) | h2
    }

    func checkIn(_ id: Int, _ stationName: String, _ t: Int) {
        checkInMap[id] = (stationName, t)
    }

    func checkOut(_ id: Int, _ stationName: String, _ t: Int) {
        let (startStation, time) = checkInMap[id]!
        let routeHash = getHash(startStation, stationName)
        if routeMap[routeHash] == nil {
            routeMap[routeHash] = [0, 0]
        }
        routeMap[routeHash]![0] += t - time
        routeMap[routeHash]![1] += 1
    }

    func getAverageTime(_ startStation: String, _ endStation: String) -> Double {
        let routeHash = getHash(startStation, endStation)
        let data = routeMap[routeHash]!
        return Double(data[0]) / Double(data[1])
    }
}
```

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $checkIn()$ function call.
    - $O(m)$ time for each $checkOut()$ and $getAverageTime()$ function calls.
- Space complexity: $O(n + N ^ 2)$

> Where $n$ is the number of passengers, $N$ is the total number of stations, and $m$ is the average length of station name.

---

## Common Pitfalls

### Integer Division Instead of Float Division

When calculating the average time, using integer division will truncate the result. The problem requires a floating-point average, so ensure you cast to float before dividing.

```python
# Wrong - integer division in some languages
return totalTime / count  # May truncate in Java/C++

# Correct - explicit float conversion
return float(totalTime) / count  # Python
return (double) totalTime / count;  // Java/C++
```

### Route Key Collision with Simple Concatenation

If station names can contain the delimiter character used in route keys, you may get false matches. For example, stations "A,B" and "C" would collide with "A" and "B,C" if using comma as delimiter.

```python
# Potential collision issue
route = startStation + endStation  # "AB" + "C" == "A" + "BC"

# Better - use a delimiter unlikely to appear in station names
route = startStation + "," + endStation

# Best - use a tuple as key (in languages that support it)
route = (startStation, endStation)
```

### Not Cleaning Up Check-In Data

After a passenger checks out, the check-in data is no longer needed. While not strictly incorrect, keeping stale check-in entries can waste memory in long-running systems.

```python
def checkOut(self, id: int, endStation: str, t: int) -> None:
    startStation, time = self.checkInMap[id]
    # ... update route statistics ...

    # Optional cleanup to save memory
    del self.checkInMap[id]
```
