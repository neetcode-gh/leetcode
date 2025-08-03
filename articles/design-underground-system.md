## 1. Two HashMaps

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

::tabs-end

### Time & Space Complexity

- Time complexity:
    - $O(1)$ time for initialization.
    - $O(1)$ time for each $checkIn()$ function call.
    - $O(m)$ time for each $checkOut()$ and $getAverageTime()$ function calls.
- Space complexity: $O(n + N ^ 2)$

> Where $n$ is the number of passengers, $N$ is the total number of stations, and $m$ is the average length of station name.
