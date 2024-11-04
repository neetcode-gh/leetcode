## 1. Brute Force

::tabs-start

```python
class TimeMap:

    def __init__(self):
        self.keyStore = {}

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.keyStore:
            self.keyStore[key] = {}
        if timestamp not in self.keyStore[key]:
            self.keyStore[key][timestamp] = []
        self.keyStore[key][timestamp].append(value)

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.keyStore:
            return ""
        seen = 0

        for time in self.keyStore[key]:
            if time <= timestamp:
                seen = max(seen, time)
        return "" if seen == 0 else self.keyStore[key][seen][-1]
```

```java
public class TimeMap {
    private Map<String, Map<Integer, List<String>>> keyStore;

    public TimeMap() {
        keyStore = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        if (!keyStore.containsKey(key)) {
            keyStore.put(key, new HashMap<>());
        }
        if (!keyStore.get(key).containsKey(timestamp)) {
            keyStore.get(key).put(timestamp, new ArrayList<>());
        }
        keyStore.get(key).get(timestamp).add(value);
    }

    public String get(String key, int timestamp) {
        if (!keyStore.containsKey(key)) {
            return "";
        }
        int seen = 0;

        for (int time : keyStore.get(key).keySet()) {
            if (time <= timestamp) {
                seen = Math.max(seen, time);
            }
        }
        if (seen == 0) return "";
        int back = keyStore.get(key).get(seen).size() - 1;
        return keyStore.get(key).get(seen).get(back);
    }
}
```

```cpp
class TimeMap {
public:
    unordered_map<string, unordered_map<int, vector<string>>> keyStore;
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        keyStore[key][timestamp].push_back(value);
    }

    string get(string key, int timestamp) {
        if (keyStore.find(key) == keyStore.end()) {
            return "";
        }
        int seen = 0;
        for (const auto& [time, _] : keyStore[key]) {
            if (time <= timestamp) {
                seen = max(seen, time);
            }
        }
        return seen == 0 ? "" : keyStore[key][seen].back();
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, new Map());
        }
        if (!this.keyStore.get(key).has(timestamp)) {
            this.keyStore.get(key).set(timestamp, []);
        }
        this.keyStore.get(key).get(timestamp).push(value);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        if (!this.keyStore.has(key)) {
            return "";
        }
        let seen = 0;

        for (let time of this.keyStore.get(key).keys()) {
            if (time <= timestamp) {
                seen = Math.max(seen, time);
            }
        }
        return seen === 0 ? "" : this.keyStore.get(key).get(seen).at(-1);
    }
}
```

```csharp
public class TimeMap {
    private Dictionary<string, Dictionary<int, List<string>>> keyStore;

    public TimeMap() {
        keyStore = new Dictionary<string, Dictionary<int, List<string>>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            keyStore[key] = new Dictionary<int, List<string>>();
        }
        if (!keyStore[key].ContainsKey(timestamp)) {
            keyStore[key][timestamp] = new List<string>();
        }
        keyStore[key][timestamp].Add(value);
    }

    public string Get(string key, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            return "";
        }
        var timestamps = keyStore[key];
        int seen = 0;

        foreach (var time in timestamps.Keys) {
            if (time <= timestamp) {
                seen = time;
            }
        }
        return seen == 0 ? "" : timestamps[seen][^1];
    }
}
```

```go
type TimeMap struct {
   keyStore map[string]map[int][]string
}

func Constructor() TimeMap {
   return TimeMap{
       keyStore: make(map[string]map[int][]string),
   }
}

func (this *TimeMap) Set(key string, value string, timestamp int) {
   if _, exists := this.keyStore[key]; !exists {
       this.keyStore[key] = make(map[int][]string)
   }
   this.keyStore[key][timestamp] = append(this.keyStore[key][timestamp], value)
}

func (this *TimeMap) Get(key string, timestamp int) string {
   if _, exists := this.keyStore[key]; !exists {
       return ""
   }
   
   seen := 0
   for time := range this.keyStore[key] {
       if time <= timestamp {
           seen = max(seen, time)
       }
   }
   
   if seen == 0 {
       return ""
   }
   values := this.keyStore[key][seen]
   return values[len(values)-1]
}

func max(a, b int) int {
   if a > b {
       return a
   }
   return b
}
```

```kotlin
class TimeMap() {
    private val keyStore = HashMap<String, HashMap<Int, MutableList<String>>>()
    
    fun set(key: String, value: String, timestamp: Int) {
        if (!keyStore.containsKey(key)) {
            keyStore[key] = HashMap()
        }
        if (!keyStore[key]!!.containsKey(timestamp)) {
            keyStore[key]!![timestamp] = mutableListOf()
        }
        keyStore[key]!![timestamp]!!.add(value)
    }
    
    fun get(key: String, timestamp: Int): String {
        if (!keyStore.containsKey(key)) {
            return ""
        }
        
        var seen = 0
        for (time in keyStore[key]!!.keys) {
            if (time <= timestamp) {
                seen = maxOf(seen, time)
            }
        }
        
        if (seen == 0) {
            return ""
        }
        return keyStore[key]!![seen]!!.last()
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of unique timestamps associated with a key and $m$ is the total number of keys.

---

## 2. Binary Search (Sorted Map)

::tabs-start

```python
from sortedcontainers import SortedDict

class TimeMap:
    def __init__(self):
        self.m = defaultdict(SortedDict)

    def set(self, key: str, value: str, timestamp: int) -> None:
        self.m[key][timestamp] = value

    def get(self, key: str, timestamp: int) -> str:
        if key not in self.m:
            return ""
        
        timestamps = self.m[key]
        idx = timestamps.bisect_right(timestamp) - 1
        
        if idx >= 0:
            closest_time = timestamps.iloc[idx]
            return timestamps[closest_time]
        return ""
```

```java
public class TimeMap {
    private Map<String, TreeMap<Integer, String>> m;

    public TimeMap() {
        m = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        m.computeIfAbsent(key, k -> new TreeMap<>()).put(timestamp, value);
    }

    public String get(String key, int timestamp) {
        if (!m.containsKey(key)) return "";
        TreeMap<Integer, String> timestamps = m.get(key);
        Map.Entry<Integer, String> entry = timestamps.floorEntry(timestamp);
        return entry == null ? "" : entry.getValue();
    }
}
```

```cpp
class TimeMap {
public:
    unordered_map<string, map<int, string>> m;

    TimeMap() {}

    void set(string key, string value, int timestamp) {
        m[key].insert({timestamp, value});
    }

    string get(string key, int timestamp) {
        auto it = m[key].upper_bound(timestamp);
        return it == m[key].begin() ? "" : prev(it)->second;
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

```csharp
public class TimeMap {
    private Dictionary<string, SortedList<int, string>> m;

    public TimeMap() {
        m = new Dictionary<string, SortedList<int, string>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!m.ContainsKey(key)) {
            m[key] = new SortedList<int, string>();
        }
        m[key][timestamp] = value;
    }

    public string Get(string key, int timestamp) {
        if (!m.ContainsKey(key)) return "";
        var timestamps = m[key];
        int left = 0;
        int right = timestamps.Count - 1;
        
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (timestamps.Keys[mid] == timestamp) {
                return timestamps.Values[mid];
            } else if (timestamps.Keys[mid] < timestamp) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
        
        if (right >= 0) {
            return timestamps.Values[right];
        }
        return "";
    }
}
```

```go
type TimeMap struct {
   m map[string][]pair
}

type pair struct {
   timestamp int
   value string
}

func Constructor() TimeMap {
   return TimeMap{
       m: make(map[string][]pair),
   }
}

func (this *TimeMap) Set(key string, value string, timestamp int)  {
   this.m[key] = append(this.m[key], pair{timestamp, value})
}

func (this *TimeMap) Get(key string, timestamp int) string {
   if _, exists := this.m[key]; !exists {
       return ""
   }
   
   pairs := this.m[key]
   idx := sort.Search(len(pairs), func(i int) bool {
       return pairs[i].timestamp > timestamp
   })
   
   if idx == 0 {
       return ""
   }
   return pairs[idx-1].value
}
```

```kotlin
class TimeMap() {
    private val m = HashMap<String, TreeMap<Int, String>>()
    
    fun set(key: String, value: String, timestamp: Int) {
        m.computeIfAbsent(key) { TreeMap() }[timestamp] = value
    }
    
    fun get(key: String, timestamp: Int): String {
        if (!m.containsKey(key)) return ""
        return m[key]!!.floorEntry(timestamp)?.value ?: ""
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(\log n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of values associated with a key and $m$ is the total number of keys.

---

## 3. Binary Search (Array)

::tabs-start

```python
class TimeMap:

    def __init__(self):
        self.keyStore = {}  # key : list of [val, timestamp]

    def set(self, key: str, value: str, timestamp: int) -> None:
        if key not in self.keyStore:
            self.keyStore[key] = []
        self.keyStore[key].append([value, timestamp])

    def get(self, key: str, timestamp: int) -> str:
        res, values = "", self.keyStore.get(key, [])
        l, r = 0, len(values) - 1
        while l <= r:
            m = (l + r) // 2
            if values[m][1] <= timestamp:
                res = values[m][0]
                l = m + 1
            else:
                r = m - 1
        return res
```

```java
public class TimeMap {
    
    private Map<String, List<Pair<Integer, String>>> keyStore;

    public TimeMap() {
        keyStore = new HashMap<>();
    }

    public void set(String key, String value, int timestamp) {
        keyStore.computeIfAbsent(key, k -> new ArrayList<>()).add(new Pair<>(timestamp, value));
    }

    public String get(String key, int timestamp) {
        List<Pair<Integer, String>> values = keyStore.getOrDefault(key, new ArrayList<>());
        int left = 0, right = values.size() - 1;
        String result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values.get(mid).getKey() <= timestamp) {
                result = values.get(mid).getValue();
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }

    private static class Pair<K, V> {
        private final K key;
        private final V value;

        public Pair(K key, V value) {
            this.key = key;
            this.value = value;
        }

        public K getKey() {
            return key;
        }

        public V getValue() {
            return value;
        }
    }
}
```

```cpp
class TimeMap {
private:
    unordered_map<string, vector<pair<int, string>>> keyStore;

public:
    TimeMap() {}

    void set(string key, string value, int timestamp) {
        keyStore[key].emplace_back(timestamp, value);
    }

    string get(string key, int timestamp) {
        auto& values = keyStore[key];
        int left = 0, right = values.size() - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values[mid].first <= timestamp) {
                result = values[mid].second;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
};
```

```javascript
class TimeMap {
    constructor() {
        this.keyStore = new Map();
    }

    /**
     * @param {string} key
     * @param {string} value
     * @param {number} timestamp
     * @return {void}
     */
    set(key, value, timestamp) {
        if (!this.keyStore.has(key)) {
            this.keyStore.set(key, []);
        }
        this.keyStore.get(key).push([timestamp, value]);
    }

    /**
     * @param {string} key
     * @param {number} timestamp
     * @return {string}
     */
    get(key, timestamp) {
        const values = this.keyStore.get(key) || [];
        let left = 0;
        let right = values.length - 1;
        let result = '';

        while (left <= right) {
            const mid = Math.floor((left + right) / 2);
            if (values[mid][0] <= timestamp) {
                result = values[mid][1];
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

```csharp
public class TimeMap {
    
    private Dictionary<string, List<Tuple<int, string>>> keyStore;

    public TimeMap() {
        keyStore = new Dictionary<string, List<Tuple<int, string>>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            keyStore[key] = new List<Tuple<int, string>>();
        }
        keyStore[key].Add(Tuple.Create(timestamp, value));
    }

    public string Get(string key, int timestamp) {
        if (!keyStore.ContainsKey(key)) {
            return "";
        }

        var values = keyStore[key];
        int left = 0, right = values.Count - 1;
        string result = "";

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (values[mid].Item1 <= timestamp) {
                result = values[mid].Item2;
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        return result;
    }
}
```

```go
type TimeMap struct {
   m map[string][]pair
}

type pair struct {
   timestamp int
   value     string
}

func Constructor() TimeMap {
   return TimeMap{
       m: make(map[string][]pair),
   }
}

func (this *TimeMap) Set(key string, value string, timestamp int) {
   this.m[key] = append(this.m[key], pair{timestamp, value})
}

func (this *TimeMap) Get(key string, timestamp int) string {
   if _, exists := this.m[key]; !exists {
       return ""
   }
   
   pairs := this.m[key]
   l, r := 0, len(pairs)-1
   
   for l <= r {
       mid := (l + r) / 2
       if pairs[mid].timestamp <= timestamp {
           if mid == len(pairs)-1 || pairs[mid+1].timestamp > timestamp {
               return pairs[mid].value
           }
           l = mid + 1
       } else {
           r = mid - 1
       }
   }
   return ""
}
```

```kotlin
class TimeMap() {
    private val keyStore = HashMap<String, MutableList<Pair<String, Int>>>()
    
    fun set(key: String, value: String, timestamp: Int) {
        if (!keyStore.containsKey(key)) {
            keyStore[key] = mutableListOf()
        }
        keyStore[key]!!.add(Pair(value, timestamp))
    }
    
    fun get(key: String, timestamp: Int): String {
        var res = ""
        val values = keyStore[key] ?: return res
        var l = 0
        var r = values.size - 1
        
        while (l <= r) {
            val m = (l + r) / 2
            if (values[m].second <= timestamp) {
                res = values[m].first
                l = m + 1
            } else {
                r = m - 1
            }
        }
        return res
    }
}
```

::tabs-end

### Time & Space Complexity

* Time complexity: $O(1)$ for $set()$ and $O(\log n)$ for $get()$.
* Space complexity: $O(m * n)$

> Where $n$ is the total number of values associated with a key and $m$ is the total number of keys.